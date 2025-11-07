import React, { useState, useEffect, useCallback } from 'react';

const API_URL = process.env.REACT_APP_API_URL || '/api';

function Leaderboard({ onBack }) {
  const [mode, setMode] = useState('player1');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/leaderboard/${mode}`);
      const data = await res.json();
      setLeaderboard(data);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }, [mode]);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRankDisplay = (index) => {
    const ranks = ['1ST', '2ND', '3RD', '4TH', '5TH', '6TH', '7TH', '8TH', '9TH', '10TH'];
    return ranks[index] || `${index + 1}TH`;
  };

  return (
    <div className="text-center">
      <div className="mt-2">
        <pre className="text-amber" style={{ fontSize: '16px', lineHeight: '1.2' }}>
{`
╔══════════════════════════════════════╗
║     ★ AI QUEST HIGH SCORES ★        ║
╚══════════════════════════════════════╝
`}
        </pre>
      </div>

      <div className="mt-2">
        <button
          className={`retro-button ${mode === 'player1' ? 'retro-button-amber' : ''}`}
          onClick={() => setMode('player1')}
        >
          🎮 PLAYER 1
        </button>
        <button
          className={`retro-button ${mode === 'player2' ? 'retro-button-amber' : ''}`}
          onClick={() => setMode('player2')}
        >
          💻 PLAYER 2
        </button>
      </div>

      <div className="border-box mt-2">
        <p className="retro-font text-amber mb-2">
          {mode === 'player1' ? '🎮 READY PLAYER 1' : '💻 READY PLAYER 2'}
        </p>

        {loading ? (
          <div className="loading"></div>
        ) : leaderboard.length === 0 ? (
          <p className="mt-2">No scores yet. Be the first!</p>
        ) : (
          <div className="leaderboard">
            <div className="leaderboard-entry leaderboard-header">
              <div>RANK</div>
              <div>NAME</div>
              <div>TIME</div>
              <div>SCORE</div>
            </div>
            {leaderboard.map((entry, index) => (
              <div key={index} className="leaderboard-entry">
                <div className="text-amber">{getRankDisplay(index)}</div>
                <div>{entry.initials.padEnd(3, '.')}</div>
                <div>{formatTime(entry.completion_time)}</div>
                <div>{entry.score}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {leaderboard.length > 0 && (
        <div className="border-box mt-2">
          <p className="retro-font text-amber mb-2">🏆 CURRENT CHAMPION</p>
          <p className="text-amber" style={{ fontSize: '28px' }}>
            {leaderboard[0]?.initials}
          </p>
          <p className="mt-1">
            TIME: {formatTime(leaderboard[0]?.completion_time)} | SCORE: {leaderboard[0]?.score}
          </p>
        </div>
      )}

      <div className="mt-3">
        <button className="retro-button retro-button-amber" onClick={onBack}>
          BACK TO START
        </button>
      </div>

      <div className="mt-3">
        <p className="blink" style={{ fontSize: '18px' }}>
          INSERT COIN TO PLAY
        </p>
        <p style={{ fontSize: '16px', marginTop: '10px' }}>
          CREDITS: ∞
        </p>
      </div>
    </div>
  );
}

export default Leaderboard;
