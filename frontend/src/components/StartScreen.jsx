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
      {/* 1979 Council Building Image */}
      <div className="mt-3" style={{
        maxWidth: '600px',
        margin: '0 auto 20px',
        border: '3px solid #10b981',
        boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
        background: '#000'
      }}>
        <img
          src="/images/Admin_Outside.jpeg"
          alt="Lake Macquarie City Council Admin Building - 1979"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            filter: 'sepia(0.3) contrast(1.1)',
            opacity: '0.95'
          }}
        />
      </div>

      <div className="mt-3">
        <h1 className="retro-font text-amber" style={{
          fontSize: 'clamp(28px, 7vw, 42px)',
          lineHeight: '1.2',
          marginBottom: '5px',
          textShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
          letterSpacing: '2px'
        }}>
          BASEMENT ARCHIVES
        </h1>
        <p className="text-green retro-font" style={{ fontSize: 'clamp(24px, 5vw, 36px)', marginTop: '5px', fontWeight: 'bold' }}>
          1989
        </p>
        <p className="text-green retro-font" style={{ fontSize: 'clamp(14px, 3vw, 20px)', marginTop: '10px' }}>
          AI QUEST
        </p>
        <p style={{ fontSize: 'clamp(12px, 2.5vw, 16px)', marginTop: '10px', color: '#10b981' }}>
          Lake Macquarie City Council
        </p>
        <p style={{ fontSize: 'clamp(10px, 2vw, 14px)', marginTop: '5px', color: '#059669' }}>
          126-138 Main Rd, Speers Point NSW 2284
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
