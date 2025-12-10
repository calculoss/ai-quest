import React, { useRef, useEffect, useState } from 'react';
import soundManager from '../utils/soundManager';

const API_URL = process.env.REACT_APP_API_URL || '/api';

function CompletionScreen({ playerData, progress, gameContent, onViewLeaderboard, onPlayAgain }) {
  const certificateRef = useRef(null);
  const [playerRank, setPlayerRank] = useState(null);

  // Calculate total questions for this player mode
  // Backend sends questions as a flat array already filtered by mode
  const playerQuestions = Array.isArray(gameContent.questions)
    ? gameContent.questions
    : (gameContent.questions[playerData.mode] || []);
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

  // Copy shareable message to clipboard
  const copyShareMessage = () => {
    const message = `🎮 I scored ${progress.score} points in BASEMENT ARCHIVES: 1989 - Lake Macquarie's AI Challenge!\n⏱️ Time: ${playerData.completionTime}\n✅ Correct: ${correctAnswers}/${totalQuestions}\n🎯 Accuracy: ${percentage}%\n\nCan you beat my score? 🚀`;
    navigator.clipboard.writeText(message);
    alert('Message copied! Paste it in Teams to challenge your colleagues!');
  };

  return (
    <div className="text-center">
      <div className="mt-2">
        <h1 className="retro-font text-amber" style={{ fontSize: 'clamp(28px, 6vw, 40px)', marginBottom: '20px' }}>
          MISSION COMPLETE!
        </h1>
      </div>

      <div className="border-box border-box-amber mt-3">
        <h2 className="retro-font text-amber mb-2" style={{ fontSize: 'clamp(20px, 4vw, 28px)' }}>🎉 ARCHIVES RESTORED! 🎉</h2>
        <p className="mt-2" style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}>BASEMENT ARCHIVES: 1989 Successfully Completed!</p>
        <p className="mt-1" style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}>{modeEmoji} {modeLabel} Mode</p>
      </div>

      {/* CERTIFICATE SECTION */}
      <div ref={certificateRef} className="border-box border-box-amber mt-2" style={{
        background: 'linear-gradient(135deg, rgba(0,255,0,0.05), rgba(251,191,36,0.05))',
        padding: '30px'
      }}>
        <p className="retro-font text-amber" style={{ fontSize: 'clamp(20px, 4vw, 28px)', marginBottom: '15px' }}>
          ⭐ CERTIFICATE OF COMPLETION ⭐
        </p>
        <p style={{ fontSize: 'clamp(16px, 3vw, 20px)', color: '#10b981', marginBottom: '20px' }}>
          AI Network of Interest - AI Quiz Challenge
        </p>
        <p style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 'bold', marginBottom: '15px' }}>
          {playerData.email}
        </p>
        <div style={{
          background: 'rgba(255, 176, 0, 0.15)',
          border: '2px solid var(--amber)',
          padding: '20px',
          margin: '15px 0',
          borderRadius: '5px'
        }}>
          <p style={{ fontSize: 'clamp(16px, 3vw, 20px)', marginBottom: '10px' }}>Final Score</p>
          <p className="retro-font text-amber" style={{ fontSize: 'clamp(32px, 6vw, 44px)' }}>{progress.score}</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '15px',
          margin: '20px 0',
          fontSize: 'clamp(15px, 2.8vw, 18px)'
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
        <p style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', marginTop: '20px', color: '#10b981' }}>
          Lake Macquarie City Council • {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* SHARE BUTTON */}
      <div className="border-box mt-2">
        <p className="retro-font mb-2" style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}>📤 SHARE YOUR ACHIEVEMENT</p>
        <button
          className="retro-button retro-button-amber mt-1"
          style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', padding: '12px 24px' }}
          onClick={copyShareMessage}
        >
          📋 COPY MESSAGE FOR TEAMS
        </button>
      </div>

      <div className="border-box mt-2">
        <p className="retro-font mb-2" style={{ fontSize: 'clamp(18px, 3.5vw, 24px)' }}>FINAL STATS</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '15px',
          textAlign: 'left',
          margin: '20px 0',
          fontSize: 'clamp(15px, 2.8vw, 18px)'
        }}>
          <div>
            <p style={{ marginBottom: '5px' }}>⏱️ COMPLETION TIME:</p>
            <p className="text-amber" style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 'bold' }}>{playerData.completionTime}</p>
          </div>
          <div>
            <p style={{ marginBottom: '5px' }}>🎯 QUESTIONS CORRECT:</p>
            <p className="text-amber" style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 'bold' }}>{correctAnswers}/{totalQuestions}</p>
          </div>
          <div>
            <p style={{ marginBottom: '5px' }}>📊 ACCURACY:</p>
            <p className="text-amber" style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 'bold' }}>{percentage}%</p>
          </div>
          <div>
            <p style={{ marginBottom: '5px' }}>🏆 FINAL SCORE:</p>
            <p className="text-amber" style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 'bold' }}>{progress.score}</p>
          </div>
        </div>

        {/* Player Ranking */}
        {playerRank && playerRank.rank && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '5px',
            border: '2px solid rgba(16, 185, 129, 0.3)'
          }}>
            <p style={{ fontSize: 'clamp(16px, 3vw, 18px)', color: '#10b981' }}>
              🏅 YOUR RANK: <span className="text-amber" style={{ fontWeight: 'bold', fontSize: 'clamp(18px, 3.5vw, 22px)' }}>#{playerRank.rank}</span> out of {playerRank.total} players in {playerRank.mode === 'player1' ? 'Player 1' : 'Player 2'} mode
            </p>
          </div>
        )}
      </div>

      <div className="border-box mt-2">
        <p className="retro-font text-amber mb-2" style={{ fontSize: 'clamp(18px, 3.5vw, 24px)' }}>✨ ACHIEVEMENT UNLOCKED!</p>
        {percentage === 100 && (
          <p className="text-amber" style={{ fontSize: 'clamp(16px, 3vw, 22px)', fontWeight: 'bold' }}>🌟 PERFECT SCORE - AI MASTER!</p>
        )}
        {percentage >= 90 && percentage < 100 && (
          <p className="text-amber" style={{ fontSize: 'clamp(16px, 3vw, 22px)', fontWeight: 'bold' }}>⭐ EXCELLENT - AI EXPERT!</p>
        )}
        {percentage >= 80 && percentage < 90 && (
          <p className="text-amber" style={{ fontSize: 'clamp(16px, 3vw, 22px)', fontWeight: 'bold' }}>🎓 GREAT JOB - AI CHAMPION!</p>
        )}
        {percentage < 80 && (
          <p className="text-amber" style={{ fontSize: 'clamp(16px, 3vw, 22px)', fontWeight: 'bold' }}>📚 MISSION COMPLETE - AI LEARNER!</p>
        )}
        <p className="mt-2" style={{ fontSize: 'clamp(15px, 2.8vw, 18px)' }}>
          {playerData.mode === 'player1'
            ? "You've mastered AI fundamentals!"
            : "You've conquered the technical challenge!"
          }
        </p>
      </div>

      {/* 1970s ADMIN BUILDING PHOTO - Easter Egg */}
      <div className="border-box mt-2" style={{
        padding: '20px',
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
        <p style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', marginBottom: '15px', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>
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
        <p style={{ fontSize: 'clamp(13px, 2.3vw, 14px)', marginTop: '10px', textAlign: 'center', color: '#999', fontStyle: 'italic' }}>
          Click image to view full size
        </p>
      </div>

      {/* THE META MOMENT 🤯 */}
      <div className="border-box border-box-amber mt-2" style={{
        background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(16,185,129,0.1))',
        padding: '25px'
      }}>
        <p className="retro-font text-amber mb-2" style={{ fontSize: 'clamp(20px, 4vw, 26px)' }}>
          🤯 THE META MOMENT
        </p>
        <p className="text-green" style={{ fontSize: 'clamp(16px, 3vw, 20px)', lineHeight: '1.7', marginTop: '15px', fontWeight: 'bold' }}>
          This entire experience was <strong className="text-amber">built 100% with AI</strong>.
        </p>
        <p style={{ fontSize: 'clamp(15px, 2.8vw, 18px)', lineHeight: '1.7', marginTop: '15px' }}>
          Created by someone who cannot code traditionally, using AI assistance.
          What would have required many hours from a skilled developer was accomplished through AI collaboration.
        </p>
        <p className="text-amber" style={{ fontSize: 'clamp(15px, 2.8vw, 18px)', lineHeight: '1.7', marginTop: '15px', fontWeight: 'bold' }}>
          This showcases AI as a practical tool, not just theory!
        </p>
      </div>

      {/* RECRUITMENT HOOK - AI NETWORK OF INTEREST */}
      <div className="border-box border-box-amber mt-2" style={{
        background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(0,255,0,0.05))',
        padding: '25px'
      }}>
        <p className="retro-font text-amber mb-2" style={{ fontSize: 'clamp(20px, 4vw, 26px)' }}>
          🚀 JOIN THE AI NETWORK OF INTEREST!
        </p>
        <p style={{ fontSize: 'clamp(16px, 3vw, 20px)', lineHeight: '1.7', marginTop: '15px' }}>
          Get involved - AI is not going away. Experiment and find a way it can improve your workflow.
        </p>
        <a
          href="https://lakemacnswgovau.sharepoint.com/:u:/s/AI-Hub/EfOmuV_Ag35HoQ7zGiej-34BwbF8CiYXPW7tlYw3_b32jA?e=pcM5Gt"
          target="_blank"
          rel="noopener noreferrer"
          className="retro-button retro-button-amber mt-2"
          style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', padding: '14px 28px', display: 'inline-block', textDecoration: 'none' }}
        >
          📚 VISIT AI@LAKEMAC
        </a>
      </div>

      {/* LEARNING HUB */}
      <div className="border-box mt-2" style={{ textAlign: 'left', padding: '25px' }}>
        <p className="retro-font text-amber mb-2" style={{ fontSize: 'clamp(22px, 4.5vw, 28px)', textAlign: 'center', textTransform: 'uppercase' }}>
          Keep Learning: Your AI Journey Continues
        </p>
        <p style={{ fontSize: 'clamp(16px, 3vw, 20px)', marginBottom: '20px', textAlign: 'center', lineHeight: '1.7' }}>
          The best way to understand AI? Get stuck in and try it yourself. Here are some resources to keep you informed, inspired, and experimenting in your own time.
        </p>

        <div style={{ fontSize: 'clamp(15px, 2.8vw, 18px)', lineHeight: '1.7' }}>
          {/* Try Something Fun at Home */}
          <p className="text-green" style={{ fontWeight: 'bold', marginTop: '20px', fontSize: 'clamp(18px, 3.5vw, 22px)' }}>🎨 Try Something Fun at Home</p>
          <div style={{ marginLeft: '15px' }}>
            <p style={{ marginTop: '15px', marginBottom: '8px' }}>
              <strong className="text-amber" style={{ fontSize: 'clamp(16px, 3vw, 19px)' }}>Create Stories with Your Kids</strong>
            </p>
            <p style={{ fontSize: 'clamp(14px, 2.5vw, 17px)', marginBottom: '6px' }}>
              Google Gemini Storybook - <a href="https://gemini.google/overview/storybook" target="_blank" rel="noopener noreferrer" className="text-green">gemini.google/overview/storybook</a> Create personalised illustrated storybooks with your children. Just needs a Google account and your imagination.
            </p>
          </div>

          {/* Build Your Own Tools */}
          <p className="text-green" style={{ fontWeight: 'bold', marginTop: '25px', fontSize: 'clamp(18px, 3.5vw, 22px)' }}>Build Your Own Tools (No Coding Required!)</p>
          <p style={{ fontSize: 'clamp(15px, 2.8vw, 18px)', lineHeight: '1.7', marginTop: '15px', marginLeft: '15px' }}>
            You don't need to be technical to create useful things. Try asking ChatGPT, Claude, or Gemini to help you build:
          </p>
          <ul style={{ marginLeft: '30px', marginTop: '10px', fontSize: 'clamp(15px, 2.8vw, 18px)', lineHeight: '1.8' }}>
            <li>A simple game for your kids</li>
            <li>A meal planner based on what's in your fridge</li>
            <li>A budget tracker that works how YOU need it to</li>
            <li>A quiz for your hobby or interest</li>
          </ul>
          <p style={{ fontSize: 'clamp(15px, 2.8vw, 18px)', lineHeight: '1.7', marginTop: '15px', marginLeft: '15px' }}>
            The AI writes the code - you just describe what you want. Start small, learn as you go.
          </p>

          {/* LinkedIn Learning */}
          <p className="text-green" style={{ fontWeight: 'bold', marginTop: '25px', fontSize: 'clamp(18px, 3.5vw, 22px)' }}>LinkedIn Learning 📚 🔥</p>
          <p style={{ fontSize: 'clamp(15px, 2.8vw, 18px)', lineHeight: '1.7', marginTop: '15px', marginLeft: '15px' }}>
            We have corporate access - explore AI courses at your own pace (Range of courses from beginner to advanced)
          </p>

          {/* The Bottom Line */}
          <p className="text-green" style={{ fontWeight: 'bold', marginTop: '25px', fontSize: 'clamp(18px, 3.5vw, 22px)' }}>💡 The Bottom Line</p>
          <p style={{ fontSize: 'clamp(15px, 2.8vw, 18px)', lineHeight: '1.7', marginTop: '15px' }}>
            Don't just read about AI - experiment with it. The best way to understand what's possible is to try things yourself in your own time. Pick a use case that interests you and have a go.
          </p>
          <p style={{ fontSize: 'clamp(15px, 2.8vw, 18px)', lineHeight: '1.7', marginTop: '15px' }}>
            The AI landscape changes quickly, but that's what makes it exciting. Stay curious, stay informed, and most importantly - stay hands-on.
          </p>
        </div>
      </div>

      {/* BRAIN TEASER REVEALS - Show answers for missed brain teasers */}
      {missedBrainTeasers.length > 0 && (
        <div className="border-box border-box-amber mt-2" style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(16,185,129,0.1))',
          padding: '25px',
          textAlign: 'left'
        }}>
          <p className="retro-font text-amber mb-2" style={{ fontSize: 'clamp(20px, 4vw, 26px)', textAlign: 'center' }}>
            🧠 BRAIN TEASER REVEAL
          </p>
          <p style={{ fontSize: 'clamp(15px, 2.8vw, 18px)', marginBottom: '20px', textAlign: 'center' }}>
            Here's the answer to the brain teaser you missed:
          </p>
          {missedBrainTeasers.map((brainTeaser, index) => (
            <div key={brainTeaser.id} style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '20px',
              borderRadius: '5px',
              border: '2px solid rgba(251, 191, 36, 0.3)',
              marginTop: index > 0 ? '20px' : '0'
            }}>
              <p className="text-green" style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 'bold', marginBottom: '15px' }}>
                {brainTeaser.question}
              </p>
              <p className="text-amber" style={{ fontSize: 'clamp(15px, 2.8vw, 18px)', marginBottom: '15px', fontWeight: 'bold' }}>
                ✓ Correct Answer: {brainTeaser.options[brainTeaser.correct]}
              </p>
              <p style={{ fontSize: 'clamp(14px, 2.5vw, 17px)', lineHeight: '1.7', color: '#10b981' }}>
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
          style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', padding: '12px 24px' }}
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
          style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', padding: '12px 24px' }}
        >
          {playerData.mode === 'player1' ? 'TRY PLAYER 2 MODE' : 'PLAY AGAIN'}
        </button>
      </div>

      <div className="mt-3">
        <p style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}>
          Thanks for participating in BASEMENT ARCHIVES: 1989!
        </p>
        <p style={{ fontSize: 'clamp(15px, 2.8vw, 18px)', marginTop: '10px' }}>
          Keep exploring AI responsibly! 🤖
        </p>
      </div>
    </div>
  );
}

export default CompletionScreen;
