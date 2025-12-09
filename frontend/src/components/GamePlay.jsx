import React, { useState, useEffect, useCallback } from 'react';
import soundManager from '../utils/soundManager';

const API_URL = process.env.REACT_APP_API_URL || '/api';

function GamePlay({ playerData, gameContent, progress, setProgress, onComplete }) {
  // ============================================
  // STATE DECLARATIONS
  // ============================================
  
  // Game phase state - always start with playing (intro removed)
  const [gamePhase, setGamePhase] = useState('playing');

  // Room transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState('');
  
  // Existing state
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [konamiKeys, setKonamiKeys] = useState([]);
  const [showKonamiMessage, setShowKonamiMessage] = useState(false);
  const [soundMuted, setSoundMuted] = useState(soundManager.getState().isMuted);
  const [soundTheme, setSoundTheme] = useState(soundManager.getState().theme);
  const [showSoundSettings, setShowSoundSettings] = useState(false);

  const currentRoom = gameContent.rooms.find(r => r.id === progress.currentRoom);
  const character = currentRoom ? gameContent.dialogue[currentRoom.character] : null;

  // Get questions for current player mode
  // Backend sends questions as a flat array already filtered by mode
  const playerQuestions = Array.isArray(gameContent.questions)
    ? gameContent.questions
    : (gameContent.questions[playerData.mode] || []);

  // Get questions for current room that haven't been answered
  const roomQuestions = playerQuestions.filter(
    q => q.room === progress.currentRoom &&
         !progress.questionsAnswered.find(qa => qa.id === q.id)
  );

  // Check if this room has been fully completed (had questions and all are answered)
  const roomTotalQuestions = playerQuestions.filter(q => q.room === progress.currentRoom);
  const roomIsCleared = roomTotalQuestions.length > 0 && roomQuestions.length === 0;

  const saveProgress = useCallback(async () => {
    try {
      await fetch(`${API_URL}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: playerData.playerId,
          currentRoom: progress.currentRoom,
          questionsAnswered: progress.questionsAnswered,
          inventory: progress.inventory,
          score: progress.score
        })
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, [progress, playerData.playerId]);

  useEffect(() => {
    if (roomQuestions.length > 0 && !currentQuestion) {
      setCurrentQuestion(roomQuestions[0]);
    }
  }, [roomQuestions, currentQuestion]);

  // Auto-save progress every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveProgress();
    }, 30000);
    return () => clearInterval(interval);
  }, [saveProgress]);

  // Timer - update elapsed time every second
  useEffect(() => {
    if (gamePhase === 'playing') {
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - progress.startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gamePhase, progress.startTime]);

  // Konami Code Easter Egg: ↑↑↓↓←→←→BA
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase() === 'arrowup' || e.key.toLowerCase() === 'arrowdown' ||
                   e.key.toLowerCase() === 'arrowleft' || e.key.toLowerCase() === 'arrowright'
                   ? e.key : e.key.toLowerCase();

      setKonamiKeys(prev => {
        const newKeys = [...prev, key].slice(-10); // Keep last 10 keys

        // Check if the sequence matches the Konami code
        if (newKeys.length === 10 && newKeys.every((k, i) => k.toLowerCase() === konamiCode[i].toLowerCase())) {
          soundManager.play('konami'); // Play epic retro sound
          setShowKonamiMessage(true);
          setTimeout(() => setShowKonamiMessage(false), 15000); // Hide after 15 seconds
          return []; // Reset
        }

        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // ============================================
  // EXISTING GAME FUNCTIONS
  // ============================================

  const handleAnswerSelect = (index) => {
    if (!showResult) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.correct;
    setIsCorrect(correct);
    setShowResult(true);

    // Play sound effect
    soundManager.play(correct ? 'correct' : 'wrong');

    if (correct) {
      const points = Math.max(currentQuestion.points - (attempts * 25), 25);
      setPointsEarned(points); // Track points earned for display
      const newScore = progress.score + points;

      const newQuestionsAnswered = [
        ...progress.questionsAnswered,
        {
          id: currentQuestion.id,
          correct: true,
          attempts: attempts + 1,
          points
        }
      ];

      setProgress({
        ...progress,
        score: newScore,
        questionsAnswered: newQuestionsAnswered
      });

      // Show continue button after brief delay
      setTimeout(() => {
        setShowContinueButton(true);
        // Auto-scroll to continue button after it appears
        setTimeout(() => {
          const continueButton = document.querySelector('.continue-button-scroll-target');
          if (continueButton) {
            continueButton.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);
      }, 1500); // Give time to read feedback first

      // NO auto-advance - user must click CONTINUE
      // This ensures they have time to read the explanation
    } else {
      setPointsEarned(-25); // Show penalty
      setAttempts(attempts + 1);

      // For wrong answers, give MUCH more time to read feedback
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswer(null);
        setPointsEarned(0);
      }, 10000); // Extended to 10 seconds so they can read what went wrong
    }
  };

  const handleContinueAfterCorrect = (newQuestionsAnswered) => {
    setShowResult(false);
    setSelectedAnswer(null);
    setCurrentQuestion(null);
    setAttempts(0);
    setPointsEarned(0);
    setShowContinueButton(false);

    // Check if room complete
    const remaining = roomQuestions.filter(
      q => !newQuestionsAnswered.find(qa => qa.id === q.id)
    );

    if (remaining.length === 0) {
      // Room complete - auto-advance to next room or complete game
      const allQuestions = playerQuestions;
      const allAnswered = newQuestionsAnswered;

      // Check if all questions in game are answered
      if (allAnswered.length >= allQuestions.length) {
        completeGame();
        return;
      }

      // Find next room with unanswered questions
      const nextRoomWithQuestions = gameContent.rooms.find(room => {
        const roomHasQuestions = allQuestions.some(q =>
          q.room === room.id && !allAnswered.find(qa => qa.id === q.id)
        );
        return roomHasQuestions && room.id !== progress.currentRoom;
      });

      if (nextRoomWithQuestions) {
        // Show brief transition
        const character = gameContent.dialogue[currentRoom.character];
        const encouragement = character?.roomComplete || `"Good work! Keep going!"`;

        setIsTransitioning(true);
        setTransitionMessage(`${currentRoom.character}: ${encouragement}`);

        // Auto-advance after 2 seconds
        setTimeout(() => {
          setProgress({
            ...progress,
            currentRoom: nextRoomWithQuestions.id,
            questionsAnswered: newQuestionsAnswered
          });
          setIsTransitioning(false);
          saveProgress();
        }, 2000);
      }
    }
  };

  const handleMoveRoom = (direction) => {
    const targetRoom = gameContent.rooms.find(r => r.name === direction);
    if (targetRoom) {
      setProgress({
        ...progress,
        currentRoom: targetRoom.id
      });
      setCurrentQuestion(null);
      setSelectedAnswer(null);
      setShowResult(false);
      setAttempts(0);
      saveProgress();
    }
  };

  const completeGame = async () => {
    const completionTime = Math.floor((Date.now() - progress.startTime) / 1000);
    const minutes = Math.floor(completionTime / 60);
    const seconds = completionTime % 60;
    const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Prompt for initials
    const initials = prompt('ENTER YOUR INITIALS (3 letters):') || 'AAA';
    
    try {
      const res = await fetch(`${API_URL}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: playerData.playerId,
          score: progress.score,
          completionTime,
          initials: initials.substring(0, 3).toUpperCase()
        })
      });
      
      const data = await res.json();
      onComplete(data.completionCode, timeStr, initials);
    } catch (error) {
      console.error('Failed to complete game:', error);
    }
  };

  // ============================================
  // MAIN GAME RENDER FUNCTION
  // ============================================

  const renderGame = () => {
    if (!currentRoom) return <div className="loading"></div>;

    // Calculate progress percentage
    const totalQuestions = playerQuestions.length;
    const answeredQuestions = progress.questionsAnswered.length;
    const progressPercent = (answeredQuestions / totalQuestions) * 100;

    // Format elapsed time as MM:SS
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    return (
      <div>
        {/* KONAMI CODE EASTER EGG MESSAGE */}
        {showKonamiMessage && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 99999,
            background: 'linear-gradient(135deg, #000000, #1a1a1a)',
            border: '6px double #fbbf24',
            borderRadius: '15px',
            padding: '40px',
            maxWidth: '700px',
            width: '90vw',
            boxShadow: '0 0 100px rgba(251, 191, 36, 0.8), 0 0 50px rgba(16, 185, 129, 0.5), inset 0 0 30px rgba(251, 191, 36, 0.1)',
            animation: 'konamiBurst 0.5s ease-out'
          }}>
            <style>{`
              @keyframes konamiBurst {
                0% {
                  transform: translate(-50%, -50%) scale(0.5);
                  opacity: 0;
                }
                50% {
                  transform: translate(-50%, -50%) scale(1.1);
                }
                100% {
                  transform: translate(-50%, -50%) scale(1);
                  opacity: 1;
                }
              }
              @keyframes konamiGlow {
                0%, 100% {
                  text-shadow: 0 0 10px #fbbf24, 0 0 20px #fbbf24, 0 0 30px #fbbf24;
                }
                50% {
                  text-shadow: 0 0 20px #fbbf24, 0 0 30px #fbbf24, 0 0 40px #fbbf24, 0 0 50px #ff0000;
                }
              }
            `}</style>
            <div style={{
              textAlign: 'center',
              borderBottom: '3px solid #fbbf24',
              paddingBottom: '20px',
              marginBottom: '25px'
            }}>
              <p className="retro-font" style={{
                fontSize: 'clamp(24px, 5vw, 36px)',
                color: '#fbbf24',
                marginBottom: '10px',
                animation: 'konamiGlow 2s infinite',
                letterSpacing: '3px'
              }}>
                ⬆⬆⬇⬇⬅➡⬅➡🅱🅰
              </p>
              <p className="retro-font" style={{
                fontSize: 'clamp(18px, 4vw, 28px)',
                color: '#ff0000',
                textShadow: '0 0 10px #ff0000, 0 0 20px #ff0000'
              }}>
                🎮 KONAMI CODE ACTIVATED 🎮
              </p>
            </div>

            <p className="retro-font" style={{
              fontSize: 'clamp(16px, 3.5vw, 22px)',
              lineHeight: '1.6',
              color: '#10b981',
              textAlign: 'center',
              marginBottom: '20px',
              textShadow: '0 0 5px #10b981'
            }}>
              ⚡ ACHIEVEMENT UNLOCKED ⚡
            </p>

            <p style={{
              fontSize: 'clamp(14px, 3vw, 18px)',
              lineHeight: '1.8',
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              You have discovered the sacred sequence known only to the ancient order of 1980s gamers. Your power level is <span style={{color: '#fbbf24', fontWeight: 'bold'}}>OVER 9000</span>.
            </p>

            <div style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '2px solid #fbbf24',
              borderRadius: '8px',
              padding: '15px',
              marginTop: '20px'
            }}>
              <p className="retro-font" style={{
                fontSize: 'clamp(12px, 2.5vw, 16px)',
                color: '#fbbf24',
                textAlign: 'center',
                marginBottom: '8px'
              }}>
                ⚠️ CLASSIFIED INFORMATION ⚠️
              </p>
              <p style={{
                fontSize: 'clamp(11px, 2.2vw, 14px)',
                lineHeight: '1.6',
                color: '#cccccc',
                textAlign: 'center'
              }}>
                The existence of this code is not to be spoken of in polite company. Those who lack the ancient gaming knowledge must not learn of this power.
              </p>
            </div>

            <p style={{
              fontSize: 'clamp(10px, 2vw, 13px)',
              marginTop: '25px',
              textAlign: 'center',
              color: '#666',
              fontStyle: 'italic'
            }}>
              (This sacred message will self-destruct in 15 seconds...)
            </p>
          </div>
        )}

        {/* Header with stats - ULTRA COMPACT */}
        <div className="border-box border-box-amber" style={{ padding: 'clamp(6px, 1.5vw, 10px)', margin: '0 0 clamp(8px, 1.5vh, 12px) 0', overflow: 'hidden' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 'clamp(4px, 1vw, 8px)',
            alignItems: 'center',
            width: '100%',
            maxWidth: '100%'
          }}>
            <div style={{ textAlign: 'center', minWidth: 0 }}>
              <div className="retro-font" style={{ fontSize: 'clamp(14px, 3vw, 20px)', color: '#fbbf24' }}>
                {progress.score}
              </div>
              <div style={{ fontSize: 'clamp(8px, 1.6vw, 10px)' }}>SCORE</div>
            </div>
            <div style={{ textAlign: 'center', minWidth: 0 }}>
              <div className="retro-font" style={{ fontSize: 'clamp(14px, 3vw, 20px)', color: '#10b981' }}>
                {timeDisplay}
              </div>
              <div style={{ fontSize: 'clamp(8px, 1.6vw, 10px)' }}>TIME</div>
            </div>
            <div style={{ textAlign: 'center', minWidth: 0 }}>
              <button
                className="retro-button"
                style={{
                  padding: '3px 6px',
                  fontSize: 'clamp(7px, 1.3vw, 9px)',
                  minHeight: '22px',
                  width: 'auto',
                  maxWidth: '55px',
                  margin: '0 auto'
                }}
                onClick={() => setShowAccessCode(!showAccessCode)}
              >
                CODE
              </button>
              <div style={{ fontSize: 'clamp(7px, 1.4vw, 9px)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentRoom.name}
              </div>
            </div>
          </div>
        </div>

        {showAccessCode && (
          <div className="border-box mt-1 text-center">
            <p className="retro-font">YOUR ACCESS CODE:</p>
            <p className="text-amber" style={{ fontSize: '32px', margin: '10px 0' }}>
              {playerData.accessCode}
            </p>
            <p style={{ fontSize: '16px' }}>Write this down to continue later!</p>
          </div>
        )}

        {/* Sound Settings Panel */}
        <div className="border-box mt-1" style={{ padding: 'clamp(6px, 1.5vw, 10px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              className="retro-button"
              style={{ fontSize: 'clamp(10px, 2vw, 12px)', padding: '5px 10px' }}
              onClick={() => {
                soundManager.play('click');
                const newMuted = soundManager.toggleMute();
                setSoundMuted(newMuted);
              }}
            >
              {soundMuted ? '🔇 UNMUTE' : '🔊 MUTE'}
            </button>
            <button
              className="retro-button"
              style={{ fontSize: 'clamp(10px, 2vw, 12px)', padding: '5px 10px' }}
              onClick={() => {
                soundManager.play('click');
                setShowSoundSettings(!showSoundSettings);
              }}
            >
              🎵 SOUND
            </button>
          </div>

          {/* Sound Theme Selector */}
          {showSoundSettings && (
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(10px, 2vw, 12px)', marginBottom: '5px' }}>SOUND THEME:</p>
              <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {['classic', 'mario', 'retro'].map(theme => (
                  <button
                    key={theme}
                    className={`retro-button ${soundTheme === theme ? 'retro-button-amber' : ''}`}
                    style={{ fontSize: 'clamp(9px, 1.8vw, 11px)', padding: '4px 8px' }}
                    onClick={() => {
                      soundManager.play('click');
                      soundManager.setTheme(theme);
                      setSoundTheme(theme);
                    }}
                  >
                    {theme.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="progress-bar mt-2">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <p className="text-center mt-1" style={{ fontSize: '16px' }}>
          QUEST PROGRESS: {answeredQuestions}/{totalQuestions}
        </p>

        {/* Room description - COMPACT */}
        <div className="border-box mt-2" style={{ padding: 'clamp(8px, 1.5vw, 12px)', textAlign: 'center' }}>
          <p className="retro-font text-amber" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', marginBottom: 'clamp(4px, 0.8vh, 8px)' }}>{currentRoom.name}</p>
          <p style={{ fontSize: 'clamp(11px, 2vw, 14px)', lineHeight: '1.4', color: '#10b981' }}>{currentRoom.character}</p>
        </div>

        {/* Current question or navigation */}
        {currentQuestion ? (
          <div className="mt-2">
            <div className="border-box" style={{ padding: 'clamp(12px, 2.5vw, 18px)' }}>
              <p className="retro-font mb-2" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', color: '#fbbf24' }}>{currentRoom.character} ASKS:</p>

              {/* Display image if this is an image question */}
              {currentQuestion.type === 'image' && currentQuestion.imagePath && (
                <div className="question-image-container">
                  <img
                    src={`${process.env.PUBLIC_URL || ''}${currentQuestion.imagePath}`}
                    alt="Question image - Is it AI-generated or real?"
                    className="question-image"
                    onError={(e) => {
                      console.error('Image failed to load:', currentQuestion.imagePath);
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="image-error">⚠️ Image not found - check console</div>';
                    }}
                  />
                </div>
              )}
              
              <p className="mb-2" style={{ fontSize: 'clamp(14px, 2.6vw, 18px)', lineHeight: '1.6' }}>{currentQuestion.question}</p>
              
              <ul className="option-list mt-2">
                {currentQuestion.options.map((option, index) => (
                  <li
                    key={index}
                    className={`option-item ${
                      selectedAnswer === index ? 'selected' : ''
                    } ${
                      showResult && index === currentQuestion.correct ? 'correct' : ''
                    } ${
                      showResult && selectedAnswer === index && !isCorrect ? 'incorrect' : ''
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {String.fromCharCode(65 + index)}) {option}
                  </li>
                ))}
              </ul>

              {showResult && (
                <>
                  {/* Large Result Banner */}
                  <div className={`border-box mt-2 text-center ${isCorrect ? 'border-box-amber' : 'border-box-red'}`}
                       style={{ padding: '20px', backgroundColor: isCorrect ? 'rgba(251, 191, 36, 0.1)' : 'rgba(239, 68, 68, 0.1)' }}>
                    <div className="retro-font" style={{ fontSize: '32px', color: isCorrect ? '#fbbf24' : '#ef4444' }}>
                      {isCorrect ? '✓ CORRECT!' : '✗ INCORRECT'}
                    </div>
                    <div className="retro-font" style={{ fontSize: '24px', color: isCorrect ? '#10b981' : '#ef4444', marginTop: '10px' }}>
                      {pointsEarned > 0 ? `+${pointsEarned} POINTS` : `${pointsEarned} POINTS`}
                    </div>
                    {!isCorrect && attempts < 3 && (
                      <div style={{ marginTop: '10px', fontSize: '14px' }}>
                        Try again! (Attempt {attempts + 1}/3)
                      </div>
                    )}
                  </div>

                  {/* Character Response & Explanation - ALWAYS SHOW EXPLANATION */}
                  <div className={`border-box mt-2 ${isCorrect ? 'border-box-amber' : ''}`} style={{ padding: 'clamp(15px, 3vw, 20px)' }}>
                    {/* REMOVED character-specific dialogue - it was mismatched with questions */}
                    {/* Now just show the actual explanation which is question-specific */}
                    {/* BRAIN TEASER: Show hint instead of answer when wrong */}

                    <div style={{
                      marginTop: '0',
                      padding: '15px',
                      backgroundColor: isCorrect ? 'rgba(251, 191, 36, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                      borderRadius: '5px',
                      border: isCorrect ? '2px solid rgba(251, 191, 36, 0.3)' : '2px solid rgba(239, 68, 68, 0.3)'
                    }}>
                      <p style={{
                        fontSize: 'clamp(16px, 2.8vw, 20px)',
                        lineHeight: '1.8',
                        color: isCorrect ? '#fbbf24' : '#ef4444',
                        textShadow: isCorrect ? '0 0 5px rgba(251, 191, 36, 0.3)' : '0 0 5px rgba(239, 68, 68, 0.3)',
                        fontWeight: 'bold'
                      }}>
                        {/* Brain teaser: show hint if wrong, explanation if correct */}
                        {currentQuestion.type === 'brain_teaser' && !isCorrect
                          ? currentQuestion.brain_teaser_hint
                          : currentQuestion.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Continue Button (only for correct answers) */}
                  {isCorrect && showContinueButton && (
                    <div className="mt-2 text-center continue-button-scroll-target">
                      <button
                        className="retro-button retro-button-amber"
                        style={{ fontSize: '16px', padding: '10px 20px' }}
                        onClick={() => {
                          soundManager.play('click');
                          handleContinueAfterCorrect(progress.questionsAnswered);
                        }}
                      >
                        CONTINUE →
                      </button>
                    </div>
                  )}
                </>
              )}

              {!showResult && (
                <div className="mt-2 text-center">
                  <button
                    className="retro-button retro-button-amber"
                    onClick={() => {
                      soundManager.play('click');
                      handleSubmitAnswer();
                    }}
                    disabled={selectedAnswer === null}
                  >
                    SUBMIT ANSWER
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : isTransitioning ? (
          <div className="mt-2">
            {/* Brief transition message */}
            <div className="border-box border-box-amber" style={{ padding: '25px', textAlign: 'center' }}>
              <p className="retro-font text-amber" style={{ fontSize: 'clamp(22px, 4vw, 28px)', marginBottom: '15px' }}>
                ✓ AREA CLEARED!
              </p>
              <p style={{ fontSize: 'clamp(16px, 3vw, 20px)', lineHeight: '1.7', color: '#10b981' }}>
                {transitionMessage}
              </p>
              <p style={{ marginTop: '15px', fontSize: 'clamp(15px, 2.8vw, 18px)', fontStyle: 'italic', color: '#fbbf24' }}>
                Moving to next department...
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-2">
            <div className="border-box text-center" style={{ padding: '20px' }}>
              <p className="retro-font text-green" style={{ fontSize: '18px' }}>Loading...</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // MAIN COMPONENT RETURN
  // ============================================

  // Always render the main game (intro removed)
  return renderGame();
}

export default GamePlay;
