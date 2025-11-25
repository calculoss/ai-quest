import React, { useRef, useEffect, useState } from 'react';
import soundManager from '../utils/soundManager';

const API_URL = process.env.REACT_APP_API_URL || '/api';

function CompletionScreen({ playerData, progress, gameContent, onViewLeaderboard, onPlayAgain }) {
  const certificateRef = useRef(null);
  const [playerRank, setPlayerRank] = useState(null);

  // Calculate total questions for this player mode
  const playerQuestions = gameContent?.questions?.[playerData.mode] || [];
  const totalQuestions = playerQuestions.length;

  // Count questions answered correctly (on first try means attempts = 1)
  const correctAnswers = progress.questionsAnswered.filter(qa => qa.correct && qa.attempts === 1).length;
  const totalAnswered = progress.questionsAnswered.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  // Find brain teaser questions that were answered incorrectly
  const missedBrainTeasers = playerQuestions
    .filter(q => q.type === 'brain_teaser')
    .map(brainTeaser => {
      const answered = progress.questionsAnswered.find(qa => qa.id === brainTeaser.id);
      return answered && !answered.correct ? brainTeaser : null;
    })
    .filter(Boolean);

  // Play victory theme when screen loads
  useEffect(() => {
    // Small delay for dramatic effect
    const timer = setTimeout(() => {
      soundManager.play('victory');
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Fetch player rank
  useEffect(() => {
    const fetchRank = async () => {
      try {
        const response = await fetch(`${API_URL}/player-rank/${playerData.playerId}`);
        const data = await response.json();
        setPlayerRank(data);
      } catch (error) {
        console.error('Failed to fetch player rank:', error);
      }
    };

    if (playerData.playerId) {
      fetchRank();
    }
  }, [playerData.playerId]);

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
    const message = `🎮 I scored ${progress.score} points in BASEMENT ARCHIVES: 1989 - Lake Macquarie's AI Challenge!\n⏱️ Time: ${playerData.completionTime}\n✅ Correct: ${correctAnswers}/${totalQuestions}\n🎯 Accuracy: ${percentage}%\n\nCan you beat my score? 🚀`;
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
        <h2 className="retro-font text-amber mb-2" style={{ fontSize: 'clamp(18px, 3.5vw, 24px)' }}>🎉 ARCHIVES RESTORED! 🎉</h2>
        <p className="mt-2" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)' }}>BASEMENT ARCHIVES: 1989 Successfully Completed!</p>
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
          <div style={{ gridColumn: '1 / -1' }}>
            <p>✅ Questions Correct: <span className="text-amber">{correctAnswers}/{totalQuestions}</span></p>
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
          💾 Save this code for your records!
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

        {/* Player Ranking */}
        {playerRank && playerRank.rank && (
          <div style={{
            marginTop: '15px',
            padding: '10px',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '5px',
            border: '2px solid rgba(16, 185, 129, 0.3)'
          }}>
            <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', color: '#10b981' }}>
              🏅 YOUR RANK: <span className="text-amber" style={{ fontWeight: 'bold' }}>#{playerRank.rank}</span> out of {playerRank.total} players in {playerRank.mode === 'player1' ? 'Player 1' : 'Player 2'} mode
            </p>
          </div>
        )}
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

      {/* 1970s ADMIN BUILDING PHOTO - Easter Egg */}
      <div className="border-box mt-2" style={{
        padding: '15px',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(16,185,129,0.05))',
        cursor: 'pointer'
      }}
        onClick={() => {
          const imagePath = playerData.mode === 'player1'
            ? '/images/admin_int_one.jpg'
            : '/images/admin_int_two.jpg';
          window.open(imagePath, '_blank');
        }}
        title="Click to view full size"
      >
        <p style={{ fontSize: 'clamp(11px, 2vw, 14px)', marginBottom: '10px', textAlign: 'center', color: '#10b981' }}>
          Lake Macquarie Council Administration Building - 1979
        </p>
        <img
          src={playerData.mode === 'player1' ? '/images/admin_int_one.jpg' : '/images/admin_int_two.jpg'}
          alt="Lake Macquarie Council Administration Building interior from 1979"
          style={{
            width: '100%',
            maxWidth: '600px',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
            border: '2px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '3px'
          }}
          onError={(e) => {
            console.error('1970s admin building image failed to load');
            e.target.parentElement.style.display = 'none';
          }}
        />
        <p style={{ fontSize: 'clamp(9px, 1.8vw, 11px)', marginTop: '8px', textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
          Click image to view full size
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
        <p className="retro-font text-amber mb-2" style={{ fontSize: 'clamp(20px, 4vw, 26px)', textAlign: 'center' }}>
          Keep Learning: Your AI Journey Continues
        </p>
        <p style={{ fontSize: 'clamp(15px, 2.8vw, 18px)', marginBottom: '15px', textAlign: 'center' }}>
          The best way to understand AI? Get stuck in and try it yourself. Here are some resources to keep you informed, inspired, and experimenting in your own time.
        </p>

        <div style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', lineHeight: '1.7' }}>
          <p className="text-green" style={{ fontWeight: 'bold', marginTop: '15px', fontSize: 'clamp(16px, 3vw, 20px)' }}>🎧 Podcasts: Different Perspectives on AI</p>
          <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginTop: '8px', marginBottom: '10px', fontStyle: 'italic' }}>
            Technical Level Guide: 🟢 Accessible | 🟡 Mixed | 🔴 Technical
          </p>

          <div style={{ marginLeft: '10px' }}>
            <p style={{ marginTop: '12px', marginBottom: '4px' }}>
              <strong className="text-amber">Lenny's Podcast</strong> 🟡
            </p>
            <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '4px' }}>Product, growth, and technology insights</p>
            <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '4px' }}>
              <strong>Great episode:</strong> <a href="https://open.spotify.com/episode/2dhEd0KW8FjXDSB91LgSKl?si=f611c41a740e485e" target="_blank" rel="noopener noreferrer" className="text-green">Benjamin Mann (Anthropic Co-founder)</a>
            </p>
            <p style={{ fontSize: 'clamp(12px, 2.2vw, 15px)', lineHeight: '1.5', color: '#aaa' }}>Real talk about AI safety, where we're heading, and what it means for jobs and society. Fascinating insights from someone building Claude. You don't need to be technical, though there are technical aspects discussed.</p>

            <p style={{ marginTop: '12px', marginBottom: '4px' }}>
              <strong className="text-amber">Dwarkesh Podcast</strong> 🟡
            </p>
            <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '4px' }}>Deep conversations with AI industry leaders</p>
            <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '4px' }}>
              <a href="https://dwarkeshpatel.substack.com/" target="_blank" rel="noopener noreferrer" className="text-green">dwarkeshpatel.substack.com</a>
            </p>
            <p style={{ fontSize: 'clamp(12px, 2.2vw, 15px)', lineHeight: '1.5', color: '#aaa' }}>Get inside the minds of the people shaping AI. Fascinating insights into what these leaders are actually thinking about the future.</p>

            <p style={{ marginTop: '12px', marginBottom: '4px' }}>
              <strong className="text-amber">Me, Myself, and AI</strong> 🟢
            </p>
            <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '4px' }}>MIT Sloan Review</p>
            <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '4px' }}>
              <a href="https://sloanreview.mit.edu/audio/" target="_blank" rel="noopener noreferrer" className="text-green">MIT Sloan Review Audio Series</a>
            </p>
            <p style={{ fontSize: 'clamp(12px, 2.2vw, 15px)', lineHeight: '1.5', color: '#aaa' }}>Practical perspectives on AI in business and everyday life. Very accessible.</p>

            <p style={{ marginTop: '12px', marginBottom: '4px' }}>
              <strong className="text-amber">Lex Fridman</strong> 🟡
            </p>
            <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '4px' }}>Long-form conversations with leading thinkers</p>
            <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '4px' }}>
              <strong>Recommended:</strong> Sundar Pichai episode
            </p>
            <p style={{ fontSize: 'clamp(12px, 2.2vw, 15px)', lineHeight: '1.5', color: '#aaa' }}>In-depth discussions with tech leaders. Thoughtful and wide-ranging.</p>
          </div>

          <p className="text-green" style={{ fontWeight: 'bold', marginTop: '15px', fontSize: 'clamp(16px, 3vw, 20px)' }}>📺 YouTube: Stay Current</p>
          <div style={{ marginLeft: '10px' }}>
            <p style={{ marginTop: '12px', marginBottom: '4px' }}>
              <strong className="text-amber">AI News & Strategy Daily</strong> 🔴
            </p>
            <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '4px' }}>Nate B Jones</p>
            <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '4px' }}>
              <a href="https://www.youtube.com/@NateBJones" target="_blank" rel="noopener noreferrer" className="text-green">Watch on YouTube</a>
            </p>
            <p style={{ fontSize: 'clamp(12px, 2.2vw, 15px)', lineHeight: '1.5', color: '#aaa' }}>Daily technical commentary on model updates, new features, and how to use them. Great if you're comfortable with tech and want to stay right up to date.</p>
          </div>

          <p className="text-green" style={{ fontWeight: 'bold', marginTop: '15px', fontSize: 'clamp(16px, 3vw, 20px)' }}>🛠️ Hands-On Learning</p>
          <div style={{ marginLeft: '10px' }}>
            <p style={{ marginTop: '12px', marginBottom: '4px' }}>
              <strong className="text-amber">Claude Use Cases</strong> 🟢
            </p>
            <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '4px' }}>Real examples you can try yourself</p>
            <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '4px' }}>
              <a href="https://claude.ai/resources/use-cases" target="_blank" rel="noopener noreferrer" className="text-green">claude.ai/resources/use-cases</a>
            </p>

            <p style={{ marginTop: '12px', marginBottom: '4px' }}>
              <strong className="text-amber">LinkedIn Learning</strong> 🟢-🔴
            </p>
            <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '4px' }}>We have corporate access - explore AI courses at your own pace</p>
            <p style={{ fontSize: 'clamp(12px, 2.2vw, 15px)', lineHeight: '1.5', color: '#aaa' }}>(Range of courses from beginner to advanced)</p>
          </div>

          <p className="text-green" style={{ fontWeight: 'bold', marginTop: '20px', fontSize: 'clamp(16px, 3vw, 20px)' }}>💡 The Bottom Line</p>
          <p style={{ fontSize: 'clamp(14px, 2.6vw, 17px)', lineHeight: '1.7', marginTop: '10px' }}>
            Don't just read about AI - experiment with it. The best way to understand what's possible is to try things yourself in your own time. Pick a use case that interests you and have a go.
          </p>
          <p style={{ fontSize: 'clamp(14px, 2.6vw, 17px)', lineHeight: '1.7', marginTop: '10px' }}>
            The AI landscape changes quickly, but that's what makes it exciting. Stay curious, stay informed, and most importantly - stay hands-on.
          </p>
        </div>
      </div>

      {/* BRAIN TEASER REVEALS - Show answers for missed brain teasers */}
      {missedBrainTeasers.length > 0 && (
        <div className="border-box border-box-amber mt-2" style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(16,185,129,0.1))',
          padding: '20px',
          textAlign: 'left'
        }}>
          <p className="retro-font text-amber mb-2" style={{ fontSize: 'clamp(16px, 3vw, 22px)', textAlign: 'center' }}>
            🧠 BRAIN TEASER REVEAL
          </p>
          <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '15px', textAlign: 'center' }}>
            Here's the answer to the brain teaser you missed:
          </p>
          {missedBrainTeasers.map((brainTeaser, index) => (
            <div key={brainTeaser.id} style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '15px',
              borderRadius: '5px',
              border: '2px solid rgba(251, 191, 36, 0.3)',
              marginTop: index > 0 ? '15px' : '0'
            }}>
              <p className="text-green" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', fontWeight: 'bold', marginBottom: '10px' }}>
                {brainTeaser.question}
              </p>
              <p className="text-amber" style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginBottom: '10px' }}>
                ✓ Correct Answer: {brainTeaser.options[brainTeaser.correct]}
              </p>
              <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', lineHeight: '1.6', color: '#10b981' }}>
                {brainTeaser.explanation}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3">
        <button
          className="retro-button retro-button-amber"
          onClick={() => {
            soundManager.play('click');
            onViewLeaderboard();
          }}
          style={{ fontSize: 'clamp(12px, 2.2vw, 16px)', padding: '10px 20px' }}
        >
          VIEW HIGH SCORES
        </button>
        <br />
        <button
          className="retro-button mt-2"
          onClick={() => {
            soundManager.play('click');
            onPlayAgain();
          }}
          style={{ fontSize: 'clamp(12px, 2.2vw, 16px)', padding: '10px 20px' }}
        >
          {playerData.mode === 'player1' ? 'TRY PLAYER 2 MODE' : 'PLAY AGAIN'}
        </button>
      </div>

      <div className="mt-3">
        <p style={{ fontSize: 'clamp(14px, 2.5vw, 18px)' }}>
          Thanks for participating in BASEMENT ARCHIVES: 1989!
        </p>
        <p style={{ fontSize: 'clamp(13px, 2.3vw, 16px)', marginTop: '10px' }}>
          Keep exploring AI responsibly! 🤖
        </p>
      </div>
    </div>
  );
}

export default CompletionScreen;
