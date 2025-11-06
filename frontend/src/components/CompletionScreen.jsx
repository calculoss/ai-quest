import React from 'react';

function CompletionScreen({ playerData, progress, onViewLeaderboard, onPlayAgain }) {
  const totalQuestions = 20;
  const correctAnswers = progress.questionsAnswered.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  const modeLabel = playerData.mode === 'player1' ? 'READY PLAYER 1' : 'READY PLAYER 2';
  const modeEmoji = playerData.mode === 'player1' ? '🎮' : '💻';

  return (
    <div className="text-center">
      <div className="mt-2">
        <pre className="text-amber blink" style={{ fontSize: '20px', lineHeight: '1.2' }}>
{`
   ██████╗  ██████╗ ███╗   ██╗ ██████╗ 
   ██╔══██╗██╔═══██╗████╗  ██║██╔════╝ 
   ██║  ██║██║   ██║██╔██╗ ██║██║  ███╗
   ██║  ██║██║   ██║██║╚██╗██║██║   ██║
   ██████╔╝╚██████╔╝██║ ╚████║╚██████╔╝
   ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ 
`}
        </pre>
      </div>

      <div className="border-box border-box-amber mt-3">
        <h2 className="retro-font text-amber mb-2">🎉 QUEST COMPLETE! 🎉</h2>
        <p className="mt-2">You've mastered the AI Quest!</p>
        <p className="mt-1">{modeEmoji} {modeLabel} Mode</p>
      </div>

      <div className="border-box mt-2">
        <p className="retro-font text-amber mb-2">YOUR COMPLETION CODE:</p>
        <div style={{
          background: 'rgba(255, 176, 0, 0.1)',
          border: '3px solid var(--amber)',
          padding: '20px',
          margin: '15px 0',
          fontSize: '32px',
          letterSpacing: '3px',
          color: 'var(--amber)',
          textShadow: '0 0 20px var(--amber)',
          fontFamily: 'Press Start 2P, cursive'
        }}>
          {playerData.completionCode}
        </div>
        <p className="mt-2" style={{ fontSize: '18px' }}>
          📧 Email this code to your coordinator to claim your prize!
        </p>
      </div>

      <div className="border-box mt-2">
        <p className="retro-font mb-2">FINAL STATS:</p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '10px',
          textAlign: 'left',
          margin: '15px 0'
        }}>
          <div>
            <p>⏱️ COMPLETION TIME:</p>
            <p className="text-amber">{playerData.completionTime}</p>
          </div>
          <div>
            <p>🎯 QUESTIONS CORRECT:</p>
            <p className="text-amber">{correctAnswers}/{totalQuestions}</p>
          </div>
          <div>
            <p>📊 ACCURACY:</p>
            <p className="text-amber">{percentage}%</p>
          </div>
          <div>
            <p>🏆 FINAL SCORE:</p>
            <p className="text-amber">{progress.score}</p>
          </div>
        </div>
      </div>

      <div className="border-box mt-2">
        <p className="retro-font text-amber mb-2">✨ ACHIEVEMENT UNLOCKED!</p>
        {percentage === 100 && (
          <p className="text-amber">🌟 PERFECT SCORE - AI MASTER!</p>
        )}
        {percentage >= 90 && percentage < 100 && (
          <p className="text-amber">⭐ EXCELLENT - AI EXPERT!</p>
        )}
        {percentage >= 80 && percentage < 90 && (
          <p className="text-amber">🎓 GREAT JOB - AI CHAMPION!</p>
        )}
        {percentage < 80 && (
          <p className="text-amber">📚 QUEST COMPLETE - AI LEARNER!</p>
        )}
        <p className="mt-2">
          {playerData.mode === 'player1' 
            ? "You've learned the AI fundamentals!"
            : "You've conquered the technical challenge!"
          }
        </p>
      </div>

      <div className="mt-3">
        <button className="retro-button retro-button-amber" onClick={onViewLeaderboard}>
          VIEW HIGH SCORES
        </button>
        <br />
        <button className="retro-button mt-2" onClick={onPlayAgain}>
          {playerData.mode === 'player1' ? 'TRY PLAYER 2 MODE' : 'PLAY AGAIN'}
        </button>
      </div>

      <div className="mt-3">
        <p style={{ fontSize: '16px' }}>
          Thanks for playing AI Quest!
        </p>
        <p style={{ fontSize: '14px', marginTop: '10px' }}>
          Keep exploring AI responsibly! 🤖
        </p>
      </div>
    </div>
  );
}

export default CompletionScreen;
