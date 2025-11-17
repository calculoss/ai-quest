const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function clearLeaderboard() {
  const client = await pool.connect();
  try {
    console.log('Clearing leaderboard...');
    const result = await client.query('DELETE FROM leaderboard');
    console.log(`✅ Leaderboard cleared! Deleted ${result.rowCount} entries.`);
  } catch (error) {
    console.error('❌ Error clearing leaderboard:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

clearLeaderboard();
