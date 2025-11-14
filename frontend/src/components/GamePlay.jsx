import React, { useState, useEffect, useCallback } from 'react';
import ChatModal from './ChatModal';
import soundManager from '../utils/soundManager';

const API_URL = process.env.REACT_APP_API_URL || '/api';

function GamePlay({ playerData, gameContent, progress, setProgress, onComplete }) {
  // ============================================
  // STATE DECLARATIONS
  // ============================================
  
  // New state for intro sequence
  const [gamePhase, setGamePhase] = useState(() => {
    // If this is a new game (no questions answered, at start), show intro
    // Otherwise skip straight to playing
    if (progress.questionsAnswered.length === 0 && progress.currentRoom === 1) {
      return 'discovery';
    }
    return 'playing';
  });
  
  // Existing state
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showChat, setShowChat] = useState(false);
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
  
  // Get questions for current room that haven't been answered
  const roomQuestions = gameContent.questions.filter(
    q => q.room === progress.currentRoom && 
         !progress.questionsAnswered.find(qa => qa.id === q.id)
  );

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
          setShowKonamiMessage(true);
          setTimeout(() => setShowKonamiMessage(false), 10000); // Hide after 10 seconds
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

    if (remaining.length <= 1) {
      // Room complete - check if game complete
      if (progress.currentRoom === 8) {
        completeGame();
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
  // NEW INTRO SEQUENCE RENDER FUNCTIONS
  // ============================================

  const renderDiscovery = () => {
    return (
      <div className="intro-sequence discovery">
        <div className="intro-content">
          <div className="intro-header">
            <h1 className="retro-font">LAKE MACQUARIE CITY COUNCIL</h1>
            <h2>Records Management</h2>
            <p className="date">November 8, 2025</p>
          </div>
          
          <div className="story-text">
            <p>You're helping digitise old council records in the basement archives. Decades of files, dusty boxes, obsolete equipment.</p>
            
            <p className="mt-2">Your colleague Sarah calls out: <span className="text-amber">"Check this out!"</span></p>
            
            <p className="mt-2">She's holding a cardboard box marked:</p>
            
            <div className="box-label border-box border-box-amber mt-2 mb-2">
              <p className="retro-font">DATA PROCESSING DEPT - 1989</p>
              <p className="retro-font">OPERATION C.H.A.T. - STAFF TRAINING</p>
            </div>
            
            <p>Inside: Dot matrix printouts, a yellowed manual, and three 5.25" floppy disks in paper sleeves.</p>
            
            <p className="mt-2">The disk labels read:</p>
            
            <div className="disk-label border-box mt-2 mb-2">
              <p className="retro-font text-amber">LAKE MACQUARIE CITY COUNCIL</p>
              <p>C.H.A.T. RESTART PROTOCOL</p>
              <p>Electronic Data Processing Dept</p>
              <p>Version 1.2 - September 1989</p>
              <p className="mt-2">⚠️ DO NOT ERASE - TRAINING DATA</p>
            </div>
            
            <p className="mt-2"><strong>Sarah:</strong> "No way these still work. When did we even have a 'Data Processing Department'?"</p>
            
            <p><strong>You:</strong> "1989? That's before most people even had computers at home."</p>
            
            <p className="mt-2"><strong>Sarah:</strong> "Wonder what this training was for?"</p>
          </div>
          
          <div className="text-center mt-3">
            <button 
              className="retro-button retro-button-amber"
              onClick={() => setGamePhase('bootSequence')}
            >
              [Boot the disk] →
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderBootSequence = () => {
    return (
      <div className="intro-sequence boot">
        <div className="intro-content">
          <div className="story-text">
            <p>You boot up the old disk reader...</p>
            
            <div className="dos-screen border-box mt-3 mb-3">
              <p>IBM Personal Computer DOS</p>
              <p>Version 3.30 (C) Copyright IBM Corp 1981-1987</p>
              <p className="mt-2">A:\&gt;DIR</p>
              <p className="mt-1">Volume in drive A is AIQUEST89</p>
              <p>Directory of A:\</p>
              <p className="mt-1">AIQUEST  EXE    43,288   15-09-89   3:45p</p>
              <p>QUESTIONS DAT    12,044   15-09-89   3:45p</p>
              <p>README   TXT     1,823   15-09-89   3:46p</p>
              <p>         3 File(s)     57,155 bytes</p>
              <p>                      302,592 bytes free</p>
              <p className="mt-2">A:\&gt;AIQUEST</p>
              <p className="mt-1">Loading C.H.A.T. Restart Protocol...</p>
            </div>
            
            <div className="loading-bar">
              <div className="loading-progress">
                <div className="progress-fill" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div className="loading-checklist mt-2">
              <p><span>Initializing system</span> <span className="text-green">[OK]</span></p>
              <p><span>Loading question database</span> <span className="text-green">[OK]</span></p>
              <p><span>Checking integrity</span> <span className="text-green">[OK]</span></p>
              <p><span>Ready to launch</span> <span className="text-green">[OK]</span></p>
            </div>
          </div>
          
          <div className="text-center mt-3">
            <button 
              className="retro-button retro-button-amber"
              onClick={() => setGamePhase('message')}
            >
              [Continue] →
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderMessage1989 = () => {
    return (
      <div className="intro-sequence message">
        <div className="intro-content">
          <div className="intro-header">
            <h1 className="retro-font text-amber">MESSAGE FROM 1989</h1>
          </div>
          
          <div className="memo border-box mt-2">
            <p className="retro-font text-amber">URGENT MEMORANDUM</p>
            <hr />
            <p><strong>TO:</strong> Computer Services Cadet (NEW HIRE)</p>
            <p><strong>FROM:</strong> Data Processing Manager</p>
            <p><strong>DATE:</strong> 15 September 1989, 0830 HOURS</p>
            <p><strong>RE:</strong> OPERATION C.H.A.T. - EMERGENCY</p>
            <p className="text-amber"><strong>PRIORITY: URGENT</strong></p>
            <hr />

            <p className="mt-2">Welcome to your first day. Unfortunately, we have a crisis:</p>

            <p className="mt-2">Our new <strong>C.H.A.T.</strong> (Cognitive Heuristic Assistant Technology) Expert System crashed at 0245 hours. State Government officials arrive at <strong>4:00 PM TODAY</strong> for a demonstration.</p>

            <p className="mt-2"><strong>YOUR MISSION:</strong></p>
            <ul style={{ marginLeft: '30px', marginTop: '10px' }}>
              <li>Visit ALL department heads</li>
              <li>Prove you understand AI principles</li>
              <li>Collect their authorization codes</li>
              <li>Restart the C.H.A.T. system</li>
            </ul>

            <p className="mt-2">Each department head will test your knowledge before giving you their code. You'll need <strong>all 6 codes</strong> to restart C.H.A.T.</p>

            <p className="mt-2"><strong>Time until demo: 7 hours, 30 minutes</strong></p>

            <p className="mt-3"><strong>Start at RECEPTION. Good luck, Cadet!</strong></p>

            <p className="mt-2">— M. Stevens, Data Processing</p>
          </div>
          
          <div className="text-center mt-3">
            <button
              className="retro-button retro-button-amber"
              onClick={() => setGamePhase('entering')}
            >
              [Begin Mission] →
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderEnteringSimulation = () => {
    return (
      <div className="intro-sequence entering">
        <div className="intro-content">
          <div className="intro-header">
            <h1 className="retro-font text-green">INITIALIZING...</h1>
          </div>

          <div className="border-box mt-3 note-2025">
            <p className="retro-font text-amber">NOTE FROM 2025:</p>
            <hr className="mt-1 mb-1" style={{ borderColor: '#00ff00' }} />
            <p>You're about to experience a 1989 training program about "Expert Systems" - the cutting-edge AI of that era.</p>
            <p className="mt-2">After each task, you'll see how those 1989 concepts connect to modern AI. The technology evolved, but the fundamental principles remain surprisingly relevant.</p>
            <p className="mt-2"><strong className="text-amber">Ready to travel back to 1989? Let's begin...</strong></p>
          </div>

          <div className="text-center mt-3">
            <button
              className="retro-button retro-button-amber"
              onClick={() => {
                soundManager.play('startup');
                setGamePhase('playing');
              }}
            >
              [Press ENTER to begin]
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // MAIN GAME RENDER FUNCTION
  // ============================================

  const renderGame = () => {
    if (!currentRoom) return <div className="loading"></div>;

    // Calculate progress percentage
    const totalQuestions = gameContent.questions.length;
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
            background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(16,185,129,0.2))',
            border: '4px solid #fbbf24',
            padding: '30px',
            maxWidth: '500px',
            boxShadow: '0 0 50px rgba(251, 191, 36, 0.5)',
            animation: 'pulse 2s infinite'
          }}>
            <p className="retro-font text-amber" style={{ fontSize: '20px', marginBottom: '15px', textAlign: 'center' }}>
              🎮 KONAMI CODE DETECTED 🎮
            </p>
            <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#10b981', textAlign: 'center' }}>
              Your level of geek transcends the expectation of this organisation.
            </p>
            <p style={{ fontSize: '13px', lineHeight: '1.7', marginTop: '15px', color: '#fbbf24', textAlign: 'center' }}>
              <strong>WARNING:</strong> You are not supposed to know this. Please keep this to yourself as if you were to mention it to any normal person they may think you are crazy.
            </p>
            <p style={{ fontSize: '11px', marginTop: '15px', textAlign: 'center', color: '#666' }}>
              (Message will self-destruct in 10 seconds...)
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
                    src={currentQuestion.imagePath}
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
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Continue Button (only for correct answers) */}
                  {isCorrect && showContinueButton && (
                    <div className="mt-2 text-center continue-button-scroll-target">
                      <button
                        className="retro-button retro-button-amber"
                        style={{ fontSize: '16px', padding: '10px 20px' }}
                        onClick={() => handleContinueAfterCorrect(progress.questionsAnswered)}
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
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                  >
                    SUBMIT ANSWER
                  </button>
                  <button
                    className="retro-button mt-2"
                    onClick={() => setShowChat(true)}
                  >
                    TALK TO C.H.A.T. 🤖
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-2">
            {/* QUEST PROGRESSION - Story beats */}
            <div className="border-box border-box-amber mb-2" style={{ padding: '20px' }}>
              <p className="retro-font text-amber" style={{ fontSize: '24px', marginBottom: '15px' }}>
                ✓ AREA CLEARED!
              </p>

              {/* Quest Progress Indicator */}
              <div style={{
                padding: '15px',
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
                borderRadius: '5px',
                border: '2px solid rgba(251, 191, 36, 0.3)',
                marginBottom: '15px'
              }}>
                <p className="retro-font" style={{ fontSize: '18px', color: '#10b981' }}>
                  AUTHORIZATION CODE #{progress.currentRoom} COLLECTED
                </p>
                <p style={{ marginTop: '10px', fontSize: '16px' }}>
                  {progress.currentRoom < 8
                    ? `${8 - progress.currentRoom} department${8 - progress.currentRoom > 1 ? 's' : ''} remaining...`
                    : 'All departments visited!'}
                </p>
                {progress.currentRoom < 8 && (
                  <p style={{ marginTop: '10px', fontSize: '14px', fontStyle: 'italic', color: '#fbbf24' }}>
                    ⏰ GM's demo at 4PM - Keep moving!
                  </p>
                )}
              </div>

              {/* Story-specific messages based on room */}
              <div style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.6' }}>
                {progress.currentRoom === 1 && (
                  <p>Rita gives you a thumbs up. "Good start! Now head to the other departments and collect their codes. The clock is ticking!"</p>
                )}
                {progress.currentRoom === 2 && (
                  <p>The council staff member nods approvingly. "You know your stuff! Keep going - the Systems team will want to see you next."</p>
                )}
                {progress.currentRoom === 3 && (
                  <p>The Systems Manager makes a note in their logbook. "Excellent. The Planning Officer in the Map Room is waiting for you."</p>
                )}
                {progress.currentRoom === 4 && (
                  <p>The Planning Officer smiles. "Perfect! Communications will need to brief you on public messaging about C.H.A.T. Head there next."</p>
                )}
                {progress.currentRoom === 5 && (
                  <p>The Communications Officer looks relieved. "Great work! Governance needs to sign off on the ethics. They're just down the hall."</p>
                )}
                {progress.currentRoom === 6 && (
                  <p>The Governance Officer makes a final note. "You understand the responsibilities. Almost there - just need C.H.A.T.'s authorization and the GM's approval."</p>
                )}
                {progress.currentRoom === 7 && (
                  <p>C.H.A.T.'s screen flickers: "AUTHORIZATION VERIFIED. ONLY GENERAL MANAGER CODE REQUIRED. PROCEED TO EXECUTIVE OFFICE."</p>
                )}
              </div>

              <p className="retro-font mb-2" style={{ fontSize: '16px' }}>CHOOSE YOUR PATH:</p>

              {currentRoom.exits.map((exit, index) => (
                <button
                  key={index}
                  className="retro-button retro-button-amber mt-2"
                  style={{ fontSize: '16px' }}
                  onClick={() => handleMoveRoom(exit)}
                >
                  → PROCEED TO {exit.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* C.H.A.T. Modal */}
        {showChat && currentQuestion && (
          <ChatModal
            questionId={currentQuestion.id}
            questionText={currentQuestion.question}
            userAnswer={selectedAnswer !== null ? currentQuestion.options[selectedAnswer] : null}
            mode={playerData.mode}
            onClose={() => setShowChat(false)}
          />
        )}
      </div>
    );
  };

  // ============================================
  // MAIN COMPONENT RETURN
  // ============================================
  
  // Phase routing - check intro phases first
  if (gamePhase === 'discovery') return renderDiscovery();
  if (gamePhase === 'bootSequence') return renderBootSequence();
  if (gamePhase === 'message') return renderMessage1989();
  if (gamePhase === 'entering') return renderEnteringSimulation();
  
  // Otherwise render the main game
  return renderGame();
}

export default GamePlay;
