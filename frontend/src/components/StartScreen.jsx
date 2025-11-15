import React, { useState, useEffect } from 'react';
import soundManager from '../utils/soundManager';

function StartScreen({ onStart, onLoad, onViewLeaderboard }) {
  const [showLoad, setShowLoad] = useState(false);
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');

  // Play intro theme when screen loads
  useEffect(() => {
    // Small delay to ensure audio context is ready
    const timer = setTimeout(() => {
      soundManager.play('intro');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleLoad = (e) => {
    e.preventDefault();
    if (email && accessCode) {
      onLoad(email, accessCode);
    }
  };

  return (
    <div className="text-center">
      <div className="mt-3">
        <h1 className="retro-font text-amber" style={{
          fontSize: 'clamp(32px, 8vw, 48px)',
          lineHeight: '1.2',
          marginBottom: '10px',
          textShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
        }}>
          OPERATION C.H.A.T.
        </h1>
        <p className="text-green retro-font" style={{ fontSize: 'clamp(16px, 3.5vw, 24px)', marginTop: '10px' }}>
          AI QUEST 1989
        </p>
        <p style={{ fontSize: 'clamp(12px, 2.5vw, 16px)', marginTop: '15px', color: '#10b981' }}>
          Lake Macquarie City Council
        </p>
      </div>

      <div className="border-box mt-3">
        <p className="blink text-amber retro-font">INSERT COIN TO PLAY</p>
        <p className="mt-2">CREDITS: ∞</p>
      </div>

      {!showLoad ? (
        <div className="mt-3">
          <button
            className="retro-button retro-button-amber"
            onClick={() => {
              soundManager.play('click');
              onStart();
            }}
          >
            PRESS START
          </button>
          <br />
          <button
            className="retro-button mt-2"
            onClick={() => {
              soundManager.play('click');
              setShowLoad(true);
            }}
          >
            CONTINUE QUEST
          </button>
          <br />
          <button
            className="retro-button mt-2"
            onClick={() => {
              soundManager.play('click');
              onViewLeaderboard();
            }}
          >
            HIGH SCORES
          </button>
        </div>
      ) : (
        <div className="mt-3">
          <div className="border-box">
            <p className="retro-font mb-2">LOAD YOUR QUEST</p>
            <form onSubmit={handleLoad}>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="retro-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="4-DIGIT CODE"
                className="retro-input"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                maxLength="4"
                required
              />
              <button type="submit" className="retro-button mt-2">
                LOAD GAME
              </button>
              <button 
                type="button" 
                className="retro-button mt-2" 
                onClick={() => setShowLoad(false)}
              >
                BACK
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-3">
        <p style={{ fontSize: '16px' }}>© 2024 SYNAPSE SYSTEMS INC.</p>
        <p style={{ fontSize: '14px', marginTop: '10px' }}>
          A NSW LOCAL GOVERNMENT PROJECT
        </p>
      </div>
    </div>
  );
}

export default StartScreen;
