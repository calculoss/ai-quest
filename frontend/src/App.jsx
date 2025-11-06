import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import ModeSelect from './components/ModeSelect';
import GamePlay from './components/GamePlay';
import CompletionScreen from './components/CompletionScreen';
import Leaderboard from './components/Leaderboard';

const API_URL = process.env.REACT_APP_API_URL || '/api';

function App() {
  const [gameState, setGameState] = useState('start'); // start, mode, playing, completed, leaderboard
  const [playerData, setPlayerData] = useState(null);
  const [gameContent, setGameContent] = useState(null);
  const [progress, setProgress] = useState({
    currentRoom: 1,
    questionsAnswered: [],
    inventory: [],
    score: 0,
    startTime: null
  });

  // Load game content when mode is selected
  useEffect(() => {
    if (playerData?.mode) {
      fetch(`${API_URL}/content/${playerData.mode}`)
        .then(res => res.json())
        .then(data => setGameContent(data))
        .catch(err => console.error('Failed to load content:', err));
    }
  }, [playerData?.mode]);

  const handleStart = () => {
    setGameState('mode');
  };

  const handleModeSelect = async (email, mode) => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mode })
      });
      
      const data = await res.json();
      
      setPlayerData({
        email,
        mode,
        playerId: data.playerId,
        accessCode: data.accessCode
      });
      
      setProgress({
        ...progress,
        startTime: Date.now()
      });
      
      setGameState('playing');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Failed to start game. Please try again.');
    }
  };

  const handleLoadGame = async (email, accessCode) => {
    try {
      const res = await fetch(`${API_URL}/load`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, accessCode })
      });
      
      if (!res.ok) {
        alert('Invalid email or access code');
        return;
      }
      
      const data = await res.json();
      
      setPlayerData({
        email,
        mode: data.mode,
        playerId: data.playerId,
        accessCode
      });
      
      setProgress({
        currentRoom: data.currentRoom,
        questionsAnswered: data.questionsAnswered,
        inventory: data.inventory,
        score: data.score,
        startTime: Date.now() - (data.completionTime || 0) * 1000
      });
      
      if (data.completed) {
        setGameState('completed');
      } else {
        setGameState('playing');
      }
    } catch (error) {
      console.error('Load failed:', error);
      alert('Failed to load game. Please try again.');
    }
  };

  const handleGameComplete = (completionCode, completionTime, initials) => {
    setPlayerData({
      ...playerData,
      completionCode,
      completionTime,
      initials
    });
    setGameState('completed');
  };

  const handleViewLeaderboard = () => {
    setGameState('leaderboard');
  };

  const handleBackToStart = () => {
    setGameState('start');
    setPlayerData(null);
    setGameContent(null);
    setProgress({
      currentRoom: 1,
      questionsAnswered: [],
      inventory: [],
      score: 0,
      startTime: null
    });
  };

  return (
    <div className="arcade-cabinet">
      <div className="screen-container">
        <div className="crt-screen">
          <div className="crt-scanlines"></div>
          <div className="crt-glow"></div>
          <div className="game-screen">
            {gameState === 'start' && (
              <StartScreen 
                onStart={handleStart}
                onLoad={handleLoadGame}
                onViewLeaderboard={handleViewLeaderboard}
              />
            )}
            
            {gameState === 'mode' && (
              <ModeSelect onSelect={handleModeSelect} />
            )}
            
            {gameState === 'playing' && gameContent && (
              <GamePlay
                playerData={playerData}
                gameContent={gameContent}
                progress={progress}
                setProgress={setProgress}
                onComplete={handleGameComplete}
              />
            )}
            
            {gameState === 'completed' && (
              <CompletionScreen
                playerData={playerData}
                progress={progress}
                onViewLeaderboard={handleViewLeaderboard}
                onPlayAgain={handleBackToStart}
              />
            )}
            
            {gameState === 'leaderboard' && (
              <Leaderboard onBack={handleBackToStart} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
