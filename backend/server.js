require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { pool, initDatabase } = require('./database');
const gameContent = require('./gameContent');

const app = express();
const PORT = process.env.PORT || 3001;

// Build CORS allowed origins from environment variable
const allowedOrigins = [
  'http://localhost:3000', // For local development
  'http://localhost:3001', // For local development
];

// Add production frontend URL if provided
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
  // Also allow without https:// prefix in case of misconfiguration
  if (!process.env.FRONTEND_URL.startsWith('http')) {
    allowedOrigins.push(`https://${process.env.FRONTEND_URL}`);
  }
}

// Fallback to hardcoded URL if FRONTEND_URL not set (backwards compatibility)
if (!process.env.FRONTEND_URL) {
  allowedOrigins.push('https://stunning-forgiveness-production-1b7c.up.railway.app');
}

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Utility: Generate 4-digit code from email
function generateAccessCode(email) {
  const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  return hash.substring(0, 4).toUpperCase();
}

// Utility: Generate completion code
function generateCompletionCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid ambiguous characters
  let code = 'AIWIN-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  code += '-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ========== API ROUTES ==========

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Quest Server Running!' });
});

// Helper function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper function to shuffle question options and update correct index
function shuffleQuestionOptions(question) {
  // Don't shuffle if there are no options (shouldn't happen, but safety check)
  if (!question.options || question.options.length === 0) {
    return question;
  }

  // Create array of indices
  const indices = question.options.map((_, i) => i);

  // Shuffle the indices
  const shuffledIndices = shuffleArray(indices);

  // Reorder options according to shuffled indices
  const shuffledOptions = shuffledIndices.map(i => question.options[i]);

  // Find where the correct answer ended up
  const newCorrectIndex = shuffledIndices.indexOf(question.correct);

  // Return question with shuffled options
  return {
    ...question,
    options: shuffledOptions,
    correct: newCorrectIndex
  };
}

// Get game content (rooms, questions for a mode) with randomization
app.get('/api/content/:mode', (req, res) => {
  const { mode } = req.params;
  const allQuestions = mode === 'player1' ? gameContent.questions.player1 : gameContent.questions.player2;

  // Separate question types: brain teasers are MANDATORY, images are kept, others are randomized
  const brainTeasers = allQuestions.filter(q => q.type === 'brain_teaser');
  const imageQuestions = allQuestions.filter(q => q.type === 'image');
  const regularQuestions = allQuestions.filter(q => q.type !== 'image' && q.type !== 'brain_teaser');

  // Randomize regular questions
  const shuffledRegular = shuffleArray(regularQuestions);

  // Select subset based on mode (accounting for mandatory brain teaser)
  let selectedRegular;
  if (mode === 'player1') {
    // Player 1: Keep all 12 images + 1 brain teaser + 17 random regular = 30 total
    selectedRegular = shuffledRegular.slice(0, 17);
  } else {
    // Player 2: Keep all 6 images + 1 brain teaser + 23 random regular = 30 total
    selectedRegular = shuffledRegular.slice(0, 23);
  }

  // Combine all selected questions
  const selectedQuestions = [...brainTeasers, ...imageQuestions, ...selectedRegular];

  // Shuffle the options for each question to prevent answer pattern exploitation
  const questionsWithShuffledOptions = selectedQuestions.map(q => shuffleQuestionOptions(q));

  // Shuffle the question order
  const finalQuestions = shuffleArray(questionsWithShuffledOptions);

  res.json({
    rooms: gameContent.rooms,
    questions: finalQuestions,
    dialogue: gameContent.dialogue
  });
});

// Register player / Get access code
app.post('/api/register', async (req, res) => {
  const { email, mode } = req.body;
  
  if (!email || !mode) {
    return res.status(400).json({ error: 'Email and mode required' });
  }

  if (!['player1', 'player2'].includes(mode)) {
    return res.status(400).json({ error: 'Invalid mode' });
  }

  const accessCode = generateAccessCode(email);

  try {
    // Check if player exists
    let result = await pool.query(
      'SELECT id FROM players WHERE email = $1',
      [email.toLowerCase()]
    );

    let playerId;
    
    if (result.rows.length === 0) {
      // Create new player
      result = await pool.query(
        'INSERT INTO players (email, access_code, mode) VALUES ($1, $2, $3) RETURNING id',
        [email.toLowerCase(), accessCode, mode]
      );
      playerId = result.rows[0].id;

      // Initialize game progress
      await pool.query(
        'INSERT INTO game_progress (player_id) VALUES ($1)',
        [playerId]
      );
    } else {
      playerId = result.rows[0].id;
      // Update mode if changed
      await pool.query(
        'UPDATE players SET mode = $1 WHERE id = $2',
        [mode, playerId]
      );
    }

    res.json({ 
      accessCode,
      playerId,
      message: 'Access code generated! Write this down to continue your quest later.'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register player' });
  }
});

// Load game progress with access code
app.post('/api/load', async (req, res) => {
  const { email, accessCode } = req.body;
  
  if (!email || !accessCode) {
    return res.status(400).json({ error: 'Email and access code required' });
  }

  try {
    const result = await pool.query(
      `SELECT p.id, p.mode, gp.current_room, gp.questions_answered, 
              gp.inventory, gp.score, gp.completed, gp.completion_code
       FROM players p
       JOIN game_progress gp ON p.id = gp.player_id
       WHERE p.email = $1 AND p.access_code = $2`,
      [email.toLowerCase(), accessCode.toUpperCase()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invalid email or access code' });
    }

    const progress = result.rows[0];
    res.json({
      playerId: progress.id,
      mode: progress.mode,
      currentRoom: progress.current_room,
      questionsAnswered: progress.questions_answered,
      inventory: progress.inventory,
      score: progress.score,
      completed: progress.completed,
      completionCode: progress.completion_code
    });
  } catch (error) {
    console.error('Load error:', error);
    res.status(500).json({ error: 'Failed to load game progress' });
  }
});

// Save game progress
app.post('/api/save', async (req, res) => {
  const { playerId, currentRoom, questionsAnswered, inventory, score } = req.body;
  
  try {
    await pool.query(
      `UPDATE game_progress 
       SET current_room = $1, questions_answered = $2, inventory = $3, 
           score = $4, updated_at = NOW()
       WHERE player_id = $5`,
      [currentRoom, JSON.stringify(questionsAnswered), JSON.stringify(inventory), score, playerId]
    );

    res.json({ message: 'Progress saved!' });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

// Complete game
app.post('/api/complete', async (req, res) => {
  const { playerId, score, completionTime, initials } = req.body;
  
  try {
    const completionCode = generateCompletionCode();
    
    // Mark game as completed
    await pool.query(
      `UPDATE game_progress 
       SET completed = true, completion_code = $1, completion_time = $2, updated_at = NOW()
       WHERE player_id = $3`,
      [completionCode, completionTime, playerId]
    );

    // Get player mode and email
    const playerResult = await pool.query(
      'SELECT mode, email FROM players WHERE id = $1',
      [playerId]
    );
    const mode = playerResult.rows[0].mode;
    const email = playerResult.rows[0].email;

    // Add to leaderboard (if top score or new completion)
    try {
      await pool.query(
        `INSERT INTO leaderboard (player_id, email, initials, mode, completion_time, score, completion_code)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (player_id, mode)
         DO UPDATE SET
           completion_time = EXCLUDED.completion_time,
           score = EXCLUDED.score,
           initials = EXCLUDED.initials,
           email = EXCLUDED.email
         WHERE EXCLUDED.score > leaderboard.score OR
               (EXCLUDED.score = leaderboard.score AND EXCLUDED.completion_time < leaderboard.completion_time)`,
        [playerId, email, initials.toUpperCase().substring(0, 3), mode, completionTime, score, completionCode]
      );
    } catch (err) {
      console.log('Leaderboard update skipped or failed:', err.message);
    }

    res.json({ 
      completionCode,
      message: 'Quest completed! Save this code to claim your prize!'
    });
  } catch (error) {
    console.error('Completion error:', error);
    res.status(500).json({ error: 'Failed to complete game' });
  }
});

// Get leaderboard
app.get('/api/leaderboard/:mode', async (req, res) => {
  const { mode } = req.params;

  try {
    const result = await pool.query(
      `SELECT initials, completion_time, score, created_at
       FROM leaderboard
       WHERE mode = $1
       ORDER BY score DESC, completion_time ASC
       LIMIT 10`,
      [mode]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get player's rank
app.get('/api/player-rank/:playerId', async (req, res) => {
  const { playerId } = req.params;

  try {
    // Get player's mode and score
    const playerResult = await pool.query(
      `SELECT p.mode, l.score, l.completion_time
       FROM players p
       LEFT JOIN leaderboard l ON p.id = l.player_id AND p.mode = l.mode
       WHERE p.id = $1`,
      [playerId]
    );

    if (playerResult.rows.length === 0 || !playerResult.rows[0].score) {
      return res.json({ rank: null, total: 0 });
    }

    const { mode, score, completion_time } = playerResult.rows[0];

    // Count total players in this mode
    const totalResult = await pool.query(
      `SELECT COUNT(*) as total
       FROM leaderboard
       WHERE mode = $1`,
      [mode]
    );

    const total = parseInt(totalResult.rows[0].total);

    // Calculate rank (better scores or same score but faster time)
    const rankResult = await pool.query(
      `SELECT COUNT(*) + 1 as rank
       FROM leaderboard
       WHERE mode = $1
       AND (score > $2 OR (score = $2 AND completion_time < $3))`,
      [mode, score, completion_time]
    );

    const rank = parseInt(rankResult.rows[0].rank);

    res.json({ rank, total, mode });
  } catch (error) {
    console.error('Player rank error:', error);
    res.status(500).json({ error: 'Failed to fetch player rank' });
  }
});

// ========== ADMIN ROUTES ==========

// Admin: Get all completions
app.get('/api/admin/completions', async (req, res) => {
  const { adminKey } = req.query;
  
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const result = await pool.query(
      `SELECT p.email, p.mode, l.initials, l.completion_time, l.score, 
              l.completion_code, l.prize_claimed, l.created_at
       FROM players p
       JOIN leaderboard l ON p.id = l.player_id
       ORDER BY l.created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Admin error:', error);
    res.status(500).json({ error: 'Failed to fetch completions' });
  }
});

// Admin: Verify completion code
app.post('/api/admin/verify', async (req, res) => {
  const { completionCode, adminKey } = req.body;
  
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const result = await pool.query(
      `SELECT p.email, p.mode, l.initials, l.completion_time, l.score, l.prize_claimed
       FROM players p
       JOIN leaderboard l ON p.id = l.player_id
       WHERE l.completion_code = $1`,
      [completionCode.toUpperCase()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invalid completion code' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ error: 'Failed to verify code' });
  }
});

// Admin: Mark prize as claimed
app.post('/api/admin/claim', async (req, res) => {
  const { completionCode, adminKey } = req.body;
  
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    await pool.query(
      `UPDATE leaderboard 
       SET prize_claimed = true 
       WHERE completion_code = $1`,
      [completionCode.toUpperCase()]
    );

    res.json({ message: 'Prize marked as claimed' });
  } catch (error) {
    console.error('Claim error:', error);
    res.status(500).json({ error: 'Failed to mark prize as claimed' });
  }
});

// Admin: Get top scorers with emails
app.get('/api/admin/leaderboard/:mode', async (req, res) => {
  const { mode } = req.params;
  const { adminKey } = req.query;

  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const result = await pool.query(
      `SELECT email, initials, completion_time, score, completion_code,
              prize_claimed, created_at
       FROM leaderboard
       WHERE mode = $1
       ORDER BY score DESC, completion_time ASC
       LIMIT 20`,
      [mode]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Admin leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch admin leaderboard' });
  }
});

// Admin: Get statistics
app.get('/api/admin/stats', async (req, res) => {
  const { adminKey } = req.query;

  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const stats = await pool.query(`
      SELECT
        COUNT(DISTINCT p.id) as total_players,
        COUNT(DISTINCT CASE WHEN gp.completed THEN p.id END) as completions,
        AVG(CASE WHEN gp.completed THEN gp.completion_time END) as avg_time,
        AVG(CASE WHEN gp.completed THEN gp.score END) as avg_score
      FROM players p
      LEFT JOIN game_progress gp ON p.id = gp.player_id
    `);

    res.json(stats.rows[0]);
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Initialize database and start server
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n🎮 AI QUEST SERVER RUNNING ON PORT ${PORT}\n`);
      console.log(`Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
      console.log(`Claude API: ${process.env.CLAUDE_API_KEY ? 'Configured' : 'Not configured'}`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
