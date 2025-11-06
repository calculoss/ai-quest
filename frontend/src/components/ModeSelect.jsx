import React, { useState } from 'react';

function ModeSelect({ onSelect }) {
  const [email, setEmail] = useState('');
  const [selectedMode, setSelectedMode] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && selectedMode) {
      onSelect(email, selectedMode);
    }
  };

  return (
    <div className="text-center">
      <h1 className="title">SYNAPSE SYSTEMS INC.</h1>
      <p className="subtitle">EMPLOYEE REGISTRATION</p>

      <form onSubmit={handleSubmit}>
        <div className="border-box mt-3">
          <p className="retro-font mb-2">ENTER EMAIL ADDRESS:</p>
          <input
            type="email"
            placeholder="your.email@council.nsw.gov.au"
            className="retro-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p style={{ fontSize: '16px', marginTop: '10px' }}>
            (You'll receive a 4-digit code to save your progress)
          </p>
        </div>

        <div className="mt-3">
          <p className="retro-font mb-2 text-amber">CHOOSE YOUR PATH:</p>
          
          <div 
            className={`border-box mt-2 ${selectedMode === 'player1' ? 'border-box-amber' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedMode('player1')}
          >
            <p className="retro-font">🎮 READY PLAYER 1</p>
            <p className="mt-1">"Press start to begin!"</p>
            <p className="mt-1" style={{ fontSize: '18px' }}>
              Perfect for first-timers and AI explorers.
            </p>
          </div>

          <div 
            className={`border-box mt-2 ${selectedMode === 'player2' ? 'border-box-amber' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedMode('player2')}
          >
            <p className="retro-font">💻 READY PLAYER 2</p>
            <p className="mt-1">"Hard mode unlocked!"</p>
            <p className="mt-1" style={{ fontSize: '18px' }}>
              For tech-savvy players seeking a challenge.
            </p>
          </div>
        </div>

        <div className="mt-3">
          <button 
            type="submit" 
            className="retro-button retro-button-amber"
            disabled={!email || !selectedMode}
          >
            START QUEST
          </button>
        </div>
      </form>

      <p className="mt-3" style={{ fontSize: '16px' }}>
        (You can always come back and try the other mode!)
      </p>
    </div>
  );
}

export default ModeSelect;
