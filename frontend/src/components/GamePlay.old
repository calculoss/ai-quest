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
              <p className="retro-font">TRAINING MATERIALS</p>
            </div>
            
            <p>Inside: Dot matrix printouts, a yellowed training manual, and three 5.25" floppy disks in paper sleeves.</p>
            
            <p className="mt-2">The disk labels read:</p>
            
            <div className="disk-label border-box mt-2 mb-2">
              <p className="retro-font text-amber">LAKE MACQUARIE CITY COUNCIL</p>
              <p>COMPUTER LITERACY TRAINING SYSTEM</p>
              <p>Electronic Data Processing Dept</p>
              <p>Version 1.2 - September 1989</p>
              <p className="mt-2">⚠️ DO NOT ERASE - TRAINING DATA</p>
            </div>
            
            <p className="mt-2"><strong>Sarah:</strong> "No way these still work. When did we even have a 'Data Processing Department'?"</p>
            
            <p><strong>You:</strong> "1980s terminology. Before IT became a thing."</p>
            
            <p><strong>Sarah:</strong> "Think the old PC in the corner still boots?"</p>
            
            <p className="mt-2">You find the ancient beige tower unit covered in dust. Power button glows amber. The CRT monitor flickers...</p>
          </div>
          
          <div className="text-center mt-3">
            <button 
              className="retro-button retro-button-amber"
              onClick={() => setGamePhase('bootSequence')}
            >
              [Press ENTER to continue]
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
          <div className="loading-bar mt-3 mb-3">
            <div className="loading-progress">
              <div className="progress-fill" style={{ width: '75%', transition: 'width 2s' }}></div>
            </div>
            <p className="text-center mt-1">Loading... 75%</p>
          </div>
          
          <div className="dos-screen border-box mt-3 mb-3">
            <p>MS-DOS Version 3.30</p>
            <p>Copyright 1981-1989 Microsoft Corp.</p>
            <p className="mt-2">A:\&gt;<span className="cursor-blink">_</span></p>
          </div>
          
          <p className="text-center">[Disk drive whirrs and clicks]</p>
          
          <div className="border-box border-box-amber mt-3">
            <div className="text-center">
              <p className="retro-font text-amber mt-2">▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄</p>
              <p className="retro-font mt-2">LAKE MACQUARIE CITY COUNCIL</p>
              <p>Electronic Data Processing Department</p>
              <p className="mt-2 retro-font">TRAINING PROGRAMME v1.2</p>
              <p>September 1989</p>
              <p className="retro-font mt-2">▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀</p>
              
              <p className="mt-3">INITIALISING SYSTEM PROTOCOLS...</p>
              <p>LOADING TRAINING MODULES...</p>
              <p>PREPARING ASSESSMENT DATABASE...</p>
              
              <p className="text-amber mt-3 retro-font">READY.</p>
            </div>
          </div>
          
          <div className="text-center mt-3">
            <button 
              className="retro-button retro-button-amber"
              onClick={() => setGamePhase('message')}
            >
              [Press ENTER to begin]
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
          <div className="border-box border-box-amber">
            <h2 className="retro-font text-amber text-center">A MESSAGE FROM THE PAST</h2>
          </div>
          
          <div className="memo border-box mt-3">
            <p><strong>TO:</strong> Future Council Employee</p>
            <p><strong>FROM:</strong> J. Thompson, Systems Manager</p>
            <p style={{ marginLeft: '3rem' }}>Electronic Data Processing Department</p>
            <p><strong>DATE:</strong> 15 September 1989</p>
            <p><strong>RE:</strong> A Message to the Future</p>
            
            <hr className="mt-2 mb-2" style={{ borderColor: '#00ff00' }} />
            
            <p className="mt-2"><strong>Greetings from 1989!</strong></p>
            
            <p className="mt-2">If you're reading this, computing has probably changed in ways we can only imagine. We're in the age of mainframes, floppy disks, and 2400 baud modems.</p>
            
            <p className="mt-2">You're probably working with technology that would seem like science fiction to us - perhaps computers that fit in your pocket, or global networks connecting everyone instantly.</p>
            
            <p className="mt-2">We're just beginning to experiment with something called "Expert Systems" - computers that can make decisions using programmed rules. Some call it "Artificial Intelligence," though I'm not sure about that name.</p>
            
            <p className="mt-2"><strong>But here's what I want you to understand:</strong></p>
            
            <p className="mt-2">The PRINCIPLES we're teaching in this training programme - logic, ethics, data integrity, transparency, human oversight, responsible use - these will never change.</p>
            
            <p className="mt-2">Whether you're working with our 1989 mainframe or your future AI systems, these fundamentals remain the same.</p>
            
            <p className="mt-2">Complete this training to understand where your modern systems came from. Learn from our mistakes and our successes. The more things change, the more they stay the same.</p>
            
            <p className="mt-2">Throughout the programme, you'll see notes bridging our 1989 concepts to your 2025 reality. Pay attention to them. History repeats, and the lessons are timeless.</p>
            
            <p className="mt-2"><strong>Good luck on your quest!</strong></p>
            
            <p className="mt-3">J. Thompson<br/>
            Systems Manager<br/>
            Electronic Data Processing Department<br/>
            Lake Macquarie City Council</p>
            
            <p className="mt-2" style={{ fontSize: '14px' }}><em>P.S. - If our council's AI systems are running smoothly in your time, we did something right. If they're causing problems... well, hopefully this training helps you understand why.</em></p>
          </div>
          
          <div className="border-box border-box-amber mt-3 text-center">
            <p className="mt-2 mb-2">You are about to begin the 1989 Computer Services Cadet training programme.</p>
            <p className="mb-2">Your progress is being tracked with access code: <span className="text-amber retro-font">{playerData.accessCode}</span></p>
          </div>
          
          <div className="text-center mt-3">
            <button 
              className="retro-button retro-button-amber"
              onClick={() => setGamePhase('entering')}
            >
              [Press ENTER to begin the 1989 training]
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
          <div className="border-box border-box-amber text-center">
            <h2 className="retro-font mt-2">LOADING 1989 ENVIRONMENT...</h2>
            
            <div className="loading-checklist mt-3">
              <p>Initialising mainframe connection... <span className="text-amber">[ OK ]</span></p>
              <p>Loading building layout... <span className="text-amber">[ OK ]</span></p>
              <p>Preparing staff interactions... <span className="text-amber">[ OK ]</span></p>
              <p>Setting date to 15 September 1989... <span className="text-amber">[ OK ]</span></p>
            </div>
            
            <p className="retro-font text-amber mt-3 mb-2">READY TO BEGIN</p>
          </div>
          
          <div className="border-box mt-3">
            <div className="text-center">
              <h2 className="retro-font mt-2">LAKE MACQUARIE CITY COUNCIL</h2>
              <p>120 King Street, Newcastle</p>
              
              <p className="mt-3 retro-font text-amber">15 SEPTEMBER 1989</p>
              <p className="retro-font text-amber">0900 HOURS</p>
              
              <p className="mt-3">You are a new <strong>Computer Services Cadet</strong>.</p>
              
              <p className="mt-2">Today is your first day in the Electronic Data Processing Department.</p>
              
              <p className="mt-2">Your task: Complete the training programme, learning about the council's new computer systems and the "Expert System" pilot project.</p>
              
              <p className="mt-3 text-amber">Report to RECEPTION for your security pass.</p>
            </div>
          </div>
          
          <div className="border-box mt-3 note-2025">
            <p className="retro-font text-amber">NOTE FROM 2025:</p>
            <hr className="mt-1 mb-1" style={{ borderColor: '#00ff00' }} />
            <p>You're about to experience council computing from 1989.</p>
            <p className="mt-2">Pay attention to the PRINCIPLES they teach, not just the specific technologies. These fundamentals evolved into the AI governance you work with today.</p>
            <p className="mt-2">After each room, you'll see how 1989 concepts connect to 2025 AI applications. This isn't just history - it's understanding the foundation of modern AI systems.</p>
            <p className="mt-2"><strong>Ready? Let's step back in time...</strong></p>
          </div>
          
          <div className="text-center mt-3">
            <button 
              className="retro-button retro-button-amber"
              onClick={() => setGamePhase('playing')}
            >
              [Press ENTER to begin your 1989 training]
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

        {/* Room description */}
        <div className="border-box mt-2">
          <p className="retro-font text-amber mb-2">{currentRoom.name}</p>
          <p>{currentRoom.description}</p>
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
