const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Database schema initialization
const initDatabase = async () => {
  const client = await pool.connect();
  try {
    // Players table
    await client.query(`
      CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        access_code VARCHAR(4) NOT NULL,
        mode VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Game progress table
    await client.query(`
      CREATE TABLE IF NOT EXISTS game_progress (
        id SERIAL PRIMARY KEY,
        player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
        current_room INTEGER DEFAULT 1,
        questions_answered JSONB DEFAULT '[]',
        inventory JSONB DEFAULT '[]',
        score INTEGER DEFAULT 0,
        completed BOOLEAN DEFAULT FALSE,
        completion_code VARCHAR(20),
        completion_time INTEGER,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Leaderboard table
    await client.query(`
      CREATE TABLE IF NOT EXISTS leaderboard (
        id SERIAL PRIMARY KEY,
        player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
        initials VARCHAR(3) NOT NULL,
        mode VARCHAR(20) NOT NULL,
        completion_time INTEGER NOT NULL,
        score INTEGER NOT NULL,
        completion_code VARCHAR(20) NOT NULL,
        prize_claimed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(player_id, mode)
      )
    `);

    // Claude API cache (to reduce API costs)
    await client.query(`
      CREATE TABLE IF NOT EXISTS chat_cache (
        id SERIAL PRIMARY KEY,
        question_id INTEGER NOT NULL,
        user_input TEXT NOT NULL,
        mode VARCHAR(20) NOT NULL,
        response TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create index for faster lookups
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_players_email ON players(email);
      CREATE INDEX IF NOT EXISTS idx_players_access_code ON players(access_code);
      CREATE INDEX IF NOT EXISTS idx_leaderboard_mode_time ON leaderboard(mode, completion_time);
    `);

    console.log('✅ Database initialized successfully');
  } catch (err) {
    console.error('❌ Error initializing database:', err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { pool, initDatabase };
