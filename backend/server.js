require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { pool, initDatabase } = require('./database');
const gameContent = require('./gameContent');
const ClaudeService = require('./claudeService');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000', // For local development
    'https://stunning-forgiveness-production-1b7c.up.railway.app' // Your frontend URL
  ],
  credentials: true
}));
app.use(express.json());

// Initialize Claude service
const claudeService = new ClaudeService(process.env.CLAUDE_API_KEY);

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

// Get game content (rooms, questions for a mode) with randomization
app.get('/api/content/:mode', (req, res) => {
  const { mode } = req.params;
  const allQuestions = mode === 'player1' ? gameContent.questions.player1 : gameContent.questions.player2;

  // Separate image questions from others
  const imageQuestions = allQuestions.filter(q => q.type === 'image');
  const nonImageQuestions = allQuestions.filter(q => q.type !== 'image');

  // Randomize non-image questions
  const shuffledNonImage = shuffleArray(nonImageQuestions);

  // Select subset based on mode
  let selectedNonImage;
  if (mode === 'player1') {
    // Player 1: Keep all 12 images + 18 random from 28 non-image = 30 total
    selectedNonImage = shuffledNonImage.slice(0, 18);
  } else {
    // Player 2: Keep all 6 images + 24 random from 41 non-image = 30 total
    selectedNonImage = shuffledNonImage.slice(0, 24);
  }

  // Combine and shuffle all selected questions
  const finalQuestions = shuffleArray([...imageQuestions, ...selectedNonImage]);

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

    // Get player mode
    const modeResult = await pool.query(
      'SELECT mode FROM players WHERE id = $1',
      [playerId]
    );
    const mode = modeResult.rows[0].mode;

    // Add to leaderboard (if top score or new completion)
    try {
      await pool.query(
        `INSERT INTO leaderboard (player_id, initials, mode, completion_time, score, completion_code)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (player_id, mode) 
         DO UPDATE SET 
           completion_time = EXCLUDED.completion_time,
           score = EXCLUDED.score,
           initials = EXCLUDED.initials
         WHERE EXCLUDED.score > leaderboard.score OR 
               (EXCLUDED.score = leaderboard.score AND EXCLUDED.completion_time < leaderboard.completion_time)`,
        [playerId, initials.toUpperCase().substring(0, 3), mode, completionTime, score, completionCode]
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
       ORDER BY completion_time ASC, score DESC
       LIMIT 10`,
      [mode]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// C.H.A.T. assistance
app.post('/api/chat', async (req, res) => {
  const { questionId, userInput, mode, questionText, userAnswer } = req.body;
  
  if (!process.env.CLAUDE_API_KEY) {
    return res.json({ 
      response: "C.H.A.T. is offline! (Claude API key not configured)" 
    });
  }

  try {
    const response = await claudeService.getChatHelp(
      questionId, 
      userInput, 
      mode, 
      questionText, 
      userAnswer
    );
    
    res.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      response: "System malfunction! Try again in a moment..." 
    });
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
