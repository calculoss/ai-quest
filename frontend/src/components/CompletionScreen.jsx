import React, { useRef } from 'react';

function CompletionScreen({ playerData, progress, onViewLeaderboard, onPlayAgain }) {
  const certificateRef = useRef(null);

  const totalQuestions = 30; // Randomized selection: 30 questions per game
  const correctAnswers = progress.questionsAnswered.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const modeLabel = playerData.mode === 'player1' ? 'READY PLAYER 1' : 'READY PLAYER 2';
  const modeEmoji = playerData.mode === 'player1' ? '🎮' : '💻';

  // Download certificate as PNG
  const downloadCertificate = () => {
    // Create a canvas from the certificate section
    const cert = certificateRef.current;
    if (!cert) return;

    // For now, we'll use a simple approach - create an image from the certificate div
    // In production, you might want to use html2canvas library
    alert('Certificate download feature - will implement with html2canvas library');
  };

  // Copy shareable message to clipboard
  const copyShareMessage = () => {
    const message = `🎮 I scored ${progress.score} points in Operation C.H.A.T. - Lake Macquarie's AI Challenge!\n⏱️ Time: ${playerData.completionTime}\n🎯 Accuracy: ${percentage}%\n\nCan you beat my score? 🚀`;
    navigator.clipboard.writeText(message);
    alert('Message copied! Paste it in Teams/Slack to challenge your colleagues!');
  };

  return (
    <div className="text-center">
      <div className="mt-2">
        <h1 className="retro-font text-amber" style={{ fontSize: 'clamp(24px, 5vw, 36px)', marginBottom: '20px' }}>
          MISSION COMPLETE!
        </h1>
      </div>

      <div className="border-box border-box-amber mt-3">
        <h2 className="retro-font text-amber mb-2" style={{ fontSize: 'clamp(18px, 3.5vw, 24px)' }}>🎉 C.H.A.T. SYSTEM RESTARTED! 🎉</h2>
        <p className="mt-2" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)' }}>Operation C.H.A.T. Successfully Completed!</p>
        <p className="mt-1" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)' }}>{modeEmoji} {modeLabel} Mode</p>
      </div>

      {/* CERTIFICATE SECTION - For download */}
      <div ref={certificateRef} className="border-box border-box-amber mt-2" style={{
        background: 'linear-gradient(135deg, rgba(0,255,0,0.05), rgba(251,191,36,0.05))',
        padding: '25px'
      }}>
        <p className="retro-font text-amber" style={{ fontSize: 'clamp(18px, 3.5vw, 24px)', marginBottom: '10px' }}>
          ⭐ CERTIFICATE OF COMPLETION ⭐
        </p>
        <p style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', color: '#10b981', marginBottom: '15px' }}>
          AI Network of Interest - AI Quiz Challenge
        </p>
        <p style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', fontWeight: 'bold', marginBottom: '10px' }}>
          {playerData.email}
        </p>
        <div style={{
          background: 'rgba(255, 176, 0, 0.1)',
          border: '2px solid var(--amber)',
          padding: '15px',
          margin: '10px 0',
          borderRadius: '5px'
        }}>
          <p style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', marginBottom: '5px' }}>Final Score</p>
          <p className="retro-font text-amber" style={{ fontSize: 'clamp(24px, 5vw, 36px)' }}>{progress.score}</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          margin: '15px 0',
          fontSize: 'clamp(12px, 2.2vw, 16px)'
        }}>
          <div>
            <p>⏱️ Time: <span className="text-amber">{playerData.completionTime}</span></p>
          </div>
          <div>
            <p>🎯 Accuracy: <span className="text-amber">{percentage}%</span></p>
          </div>
        </div>
        <p style={{ fontSize: 'clamp(11px, 2vw, 14px)', marginTop: '15px', color: '#10b981' }}>
          Lake Macquarie City Council • {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* SHARE BUTTONS */}
      <div className="border-box mt-2">
        <p className="retro-font mb-2" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)' }}>📤 SHARE YOUR ACHIEVEMENT</p>
        <button
          className="retro-button retro-button-amber mt-1"
          style={{ fontSize: 'clamp(12px, 2.2vw, 16px)', padding: '10px 18px' }}
          onClick={copyShareMessage}
        >
          📋 COPY MESSAGE FOR TEAMS/SLACK
        </button>
        <button
          className="retro-button mt-1"
          style={{ fontSize: 'clamp(12px, 2.2vw, 16px)', padding: '10px 18px' }}
          onClick={downloadCertificate}
        >
          💾 DOWNLOAD CERTIFICATE (Coming Soon)
        </button>
      </div>

      <div className="border-box mt-2">
        <p className="retro-font text-amber mb-2" style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}>YOUR COMPLETION CODE:</p>
        <div style={{
          background: 'rgba(255, 176, 0, 0.1)',
          border: '3px solid var(--amber)',
          padding: '20px',
          margin: '15px 0',
          fontSize: 'clamp(24px, 5vw, 36px)',
          letterSpacing: '3px',
          color: 'var(--amber)',
          textShadow: '0 0 20px var(--amber)',
          fontFamily: 'Press Start 2P, cursive'
        }}>
          {playerData.completionCode}
        </div>
        <p className="mt-2" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)' }}>
          📧 Email this code to your coordinator to claim your prize!
        </p>
      </div>

      <div className="border-box mt-2">
        <p className="retro-font mb-2" style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}>FINAL STATS:</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          textAlign: 'left',
          margin: '15px 0',
          fontSize: 'clamp(13px, 2.3vw, 16px)'
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
        <p className="retro-font text-amber mb-2" style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}>✨ ACHIEVEMENT UNLOCKED!</p>
        {percentage === 100 && (
          <p className="text-amber" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)' }}>🌟 PERFECT SCORE - AI MASTER!</p>
        )}
        {percentage >= 90 && percentage < 100 && (
          <p className="text-amber" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)' }}>⭐ EXCELLENT - AI EXPERT!</p>
        )}
        {percentage >= 80 && percentage < 90 && (
          <p className="text-amber" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)' }}>🎓 GREAT JOB - AI CHAMPION!</p>
        )}
        {percentage < 80 && (
          <p className="text-amber" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)' }}>📚 MISSION COMPLETE - AI LEARNER!</p>
        )}
        <p className="mt-2" style={{ fontSize: 'clamp(13px, 2.3vw, 16px)' }}>
          {playerData.mode === 'player1'
            ? "You've mastered AI fundamentals!"
            : "You've conquered the technical challenge!"
          }
        </p>
      </div>

      {/* THE META MOMENT 🤯 */}
      <div className="border-box border-box-amber mt-2" style={{
        background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(16,185,129,0.1))',
        padding: '20px'
      }}>
        <p className="retro-font text-amber mb-2" style={{ fontSize: 'clamp(16px, 3vw, 22px)' }}>
          🤯 THE META MOMENT
        </p>
        <p className="text-green" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', lineHeight: '1.6', marginTop: '10px' }}>
          This entire experience was <strong className="text-amber">built 100% with AI</strong>.
        </p>
        <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', lineHeight: '1.6', marginTop: '10px' }}>
          Created by someone who cannot code traditionally, using AI assistance.
          What would have required many hours from a skilled developer was accomplished through AI collaboration.
        </p>
        <p className="text-amber" style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', lineHeight: '1.6', marginTop: '10px', fontWeight: 'bold' }}>
          This showcases AI as a practical tool, not just theory!
        </p>
      </div>

      {/* RECRUITMENT HOOK - AI NETWORK OF INTEREST */}
      <div className="border-box border-box-amber mt-2" style={{
        background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(0,255,0,0.05))',
        padding: '20px'
      }}>
        <p className="retro-font text-amber mb-2" style={{ fontSize: 'clamp(16px, 3vw, 22px)' }}>
          🚀 JOIN THE AI NETWORK OF INTEREST!
        </p>
        <p style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', lineHeight: '1.7', marginTop: '10px' }}>
          Get involved - AI is not going away. Experiment and find a way it can improve your workflow.
        </p>
        <a
          href="https://lakemacnswgovau.sharepoint.com/:u:/s/AI-Hub/EfOmuV_Ag35HoQ7zGiej-34BwbF8CiYXPW7tlYw3_b32jA?e=pcM5Gt"
          target="_blank"
          rel="noopener noreferrer"
          className="retro-button retro-button-amber mt-2"
          style={{ fontSize: 'clamp(12px, 2.2vw, 16px)', padding: '12px 24px', display: 'inline-block', textDecoration: 'none' }}
        >
          📚 VISIT AI@LAKEMAC
        </a>
      </div>

      {/* LEARNING HUB */}
      <div className="border-box mt-2" style={{ textAlign: 'left' }}>
        <p className="retro-font text-amber mb-2" style={{ fontSize: 'clamp(16px, 3vw, 20px)', textAlign: 'center' }}>
          📚 WANT TO LEARN MORE?
        </p>
        <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '10px' }}>
          Expand your AI knowledge with these resources:
        </p>

        <div style={{ fontSize: 'clamp(12px, 2.2vw, 15px)', lineHeight: '1.8' }}>
          <p className="text-green" style={{ fontWeight: 'bold', marginTop: '10px' }}>🎧 Podcasts:</p>
          <ul style={{ marginLeft: '20px', marginTop: '5px' }}>
            <li><a href="https://lexfridman.com/ai/" target="_blank" rel="noopener noreferrer" className="text-amber">Lex Fridman Podcast</a> - Deep AI conversations</li>
            <li><a href="https://twimlai.com/" target="_blank" rel="noopener noreferrer" className="text-amber">TWiML AI Podcast</a> - Machine learning insights</li>
            <li><a href="https://www.youtube.com/@AIPodcast" target="_blank" rel="noopener noreferrer" className="text-amber">The AI Podcast (NVIDIA)</a> - Industry leaders</li>
          </ul>

          <p className="text-green" style={{ fontWeight: 'bold', marginTop: '15px' }}>🌐 Online Learning:</p>
          <ul style={{ marginLeft: '20px', marginTop: '5px' }}>
            <li><a href="https://www.deeplearning.ai/" target="_blank" rel="noopener noreferrer" className="text-amber">DeepLearning.AI</a> - Free courses by Andrew Ng</li>
            <li><a href="https://www.coursera.org/learn/ai-for-everyone" target="_blank" rel="noopener noreferrer" className="text-amber">AI For Everyone</a> - Non-technical intro</li>
            <li><a href="https://www.anthropic.com/index/introducing-claude" target="_blank" rel="noopener noreferrer" className="text-amber">Anthropic Claude Docs</a> - Learn about the AI that powers this game</li>
          </ul>

          <p className="text-green" style={{ fontWeight: 'bold', marginTop: '15px' }}>💬 Water Cooler Moments:</p>
          <ul style={{ marginLeft: '20px', marginTop: '5px' }}>
            <li>Did you know? A single ChatGPT query uses ~500ml of water for cooling!</li>
            <li>AI "hallucinations" happen because models predict plausible text, not truth</li>
            <li>The term "neural network" comes from biological neurons in your brain</li>
          </ul>
        </div>
      </div>

      <div className="mt-3">
        <button className="retro-button retro-button-amber" onClick={onViewLeaderboard} style={{ fontSize: 'clamp(12px, 2.2vw, 16px)', padding: '10px 20px' }}>
          VIEW HIGH SCORES
        </button>
        <br />
        <button className="retro-button mt-2" onClick={onPlayAgain} style={{ fontSize: 'clamp(12px, 2.2vw, 16px)', padding: '10px 20px' }}>
          {playerData.mode === 'player1' ? 'TRY PLAYER 2 MODE' : 'PLAY AGAIN'}
        </button>
      </div>

      <div className="mt-3">
        <p style={{ fontSize: 'clamp(14px, 2.5vw, 18px)' }}>
          Thanks for participating in Operation C.H.A.T.!
        </p>
        <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginTop: '10px' }}>
          Keep exploring AI responsibly! 🤖
        </p>
      </div>
    </div>
  );
}

export default CompletionScreen;
