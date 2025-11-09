import React, { useState, useEffect, useCallback } from 'react';
import ChatModal from './ChatModal';

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

    if (correct) {
      const points = Math.max(currentQuestion.points - (attempts * 25), 25);
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

      // Auto advance after showing result
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswer(null);
        setCurrentQuestion(null);
        setAttempts(0);
        
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
      }, 3000);
    } else {
      setAttempts(attempts + 1);
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswer(null);
      }, 2000);
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
              <p className="retro-font">STAFF QUIZ GAME</p>
            </div>
            
            <p>Inside: Dot matrix printouts, a yellowed manual, and three 5.25" floppy disks in paper sleeves.</p>
            
            <p className="mt-2">The disk labels read:</p>
            
            <div className="disk-label border-box mt-2 mb-2">
              <p className="retro-font text-amber">LAKE MACQUARIE CITY COUNCIL</p>
              <p>AI KNOWLEDGE CHALLENGE</p>
              <p>Electronic Data Processing Dept</p>
              <p>Version 1.2 - September 1989</p>
              <p className="mt-2">⚠️ DO NOT ERASE - GAME DATA</p>
            </div>
            
            <p className="mt-2"><strong>Sarah:</strong> "No way these still work. When did we even have a 'Data Processing Department'?"</p>
            
            <p><strong>You:</strong> "1989? That's before most people even had computers at home."</p>
            
            <p className="mt-2"><strong>Sarah:</strong> "Wonder what the quiz was about?"</p>
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
              <p className="mt-1">Loading AI Knowledge Challenge...</p>
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
            <p className="retro-font text-amber">INTERNAL MEMORANDUM</p>
            <hr />
            <p><strong>TO:</strong> All Council Staff</p>
            <p><strong>FROM:</strong> Data Processing Manager</p>
            <p><strong>DATE:</strong> 15 September 1989</p>
            <p><strong>RE:</strong> New Computer Quiz Challenge</p>
            <hr />
            
            <p className="mt-2">Council has invested in new <strong>Expert System</strong> technology for our IBM System/36 mainframe. This represents the cutting edge of artificial intelligence.</p>
            
            <p className="mt-2">To help staff understand these systems, we've created an interactive quiz challenge. Navigate through council departments, answer questions, and learn about:</p>
            
            <ul style={{ marginLeft: '30px', marginTop: '10px' }}>
              <li>Knowledge bases and inference engines</li>
              <li>Rule-based decision making</li>
              <li>Data accuracy and validation</li>
              <li>Responsible technology implementation</li>
            </ul>
            
            <p className="mt-2">Top scores will be recognised at the quarterly staff meeting!</p>
            
            <p className="mt-3"><strong>Good luck!</strong></p>
            
            <p className="mt-2">— M. Stevens, Data Processing</p>
          </div>
          
          <div className="text-center mt-3">
            <button 
              className="retro-button retro-button-amber"
              onClick={() => setGamePhase('entering')}
            >
              [Load the quiz] →
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
            <h1 className="retro-font text-green">LOADING SIMULATION...</h1>
          </div>
          
          <div className="border-box mt-3">
            <div className="text-center">
              <h2 className="retro-font mt-2">LAKE MACQUARIE CITY COUNCIL</h2>
              <p>120 King Street, Newcastle</p>
              
              <p className="mt-3 retro-font text-amber">15 SEPTEMBER 1989</p>
              <p className="retro-font text-amber">0900 HOURS</p>
              
              <p className="mt-3">You're playing as a <strong>Computer Services Cadet</strong> on your first day.</p>
              
              <p className="mt-2">Your challenge: Navigate through council departments, meeting staff and answering questions about the new "Expert System" technology.</p>
              
              <p className="mt-2">Get questions right to score points. Move fast to beat the leaderboard!</p>
              
              <p className="mt-3 text-amber">Start at RECEPTION to begin your quest.</p>
            </div>
          </div>
          
          <div className="border-box mt-3 note-2025">
            <p className="retro-font text-amber">NOTE FROM 2025:</p>
            <hr className="mt-1 mb-1" style={{ borderColor: '#00ff00' }} />
            <p>This 1989 quiz asks about "Expert Systems" - the AI of that era.</p>
            <p className="mt-2">After each question, you'll see how those 1989 concepts connect to modern AI. The technology evolved, but the fundamental principles haven't changed.</p>
            <p className="mt-2"><strong>Ready to see how much (or how little) has changed? Let's go!</strong></p>
          </div>
          
          <div className="text-center mt-3">
            <button 
              className="retro-button retro-button-amber"
              onClick={() => setGamePhase('playing')}
            >
              [Press ENTER to start the quiz]
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

    return (
      <div>
        {/* Header with stats */}
        <div className="border-box border-box-amber">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className="retro-font">SCORE: {progress.score}</span>
            </div>
            <div>
              <span className="retro-font">ROOM: {currentRoom.name}</span>
            </div>
            <div>
              <button 
                className="retro-button" 
                style={{ padding: '5px 10px', fontSize: '10px' }}
                onClick={() => setShowAccessCode(!showAccessCode)}
              >
                CODE
              </button>
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

        {/* Progress bar */}
        <div className="progress-bar mt-2">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <p className="text-center mt-1" style={{ fontSize: '16px' }}>
          QUEST PROGRESS: {answeredQuestions}/{totalQuestions}
        </p>

        {/* Room description - CRITICAL FIX HERE */}
        <div className="border-box mt-2">
          <p className="retro-font text-amber mb-2">{currentRoom.name}</p>
          <pre className="room-description">{currentRoom.description}</pre>
        </div>

        {/* Current question or navigation */}
        {currentQuestion ? (
          <div className="mt-2">
            <div className="border-box">
              <p className="retro-font mb-2">{currentRoom.character} ASKS:</p>
              
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
              
              <p className="mb-2">{currentQuestion.question}</p>
              
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
                <div className={`border-box mt-2 ${isCorrect ? 'border-box-amber' : ''}`}>
                  <p className="retro-font">
                    {isCorrect ? character?.correct : character?.wrong}
                  </p>
                  {isCorrect && (
                    <p className="mt-2">{currentQuestion.explanation}</p>
                  )}
                </div>
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
            <div className="border-box text-center">
              <p className="retro-font text-amber mb-2">AREA CLEARED!</p>
              <p className="mb-2">Choose your next destination:</p>
              
              {currentRoom.exits.map((exit, index) => (
                <button
                  key={index}
                  className="retro-button mt-2"
                  onClick={() => handleMoveRoom(exit)}
                >
                  → {exit}
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
