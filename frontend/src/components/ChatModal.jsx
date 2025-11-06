import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || '/api';

function ChatModal({ questionId, questionText, userAnswer, mode, onClose }) {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'chat',
      message: "G'day! I'm C.H.A.T. - your AI guide! Ask me for a hint, or just chat about the question. I won't give you the answer directly, but I can help you think it through!"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newMessage = { role: 'user', message: userInput };
    setChatHistory([...chatHistory, newMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId,
          userInput,
          mode,
          questionText,
          userAnswer
        })
      });

      const data = await res.json();
      setChatHistory(prev => [...prev, { role: 'chat', message: data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatHistory(prev => [...prev, { 
        role: 'chat', 
        message: "System error! My circuits are a bit scrambled. Try again in a moment..." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickHints = [
    "Give me a hint",
    "What should I think about?",
    "Explain this concept",
    "How does this relate to councils?"
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="border-box border-box-amber">
          <h2 className="retro-font text-amber text-center">🤖 C.H.A.T. ASSISTANT</h2>
          <p className="text-center mt-1" style={{ fontSize: '16px' }}>
            Cognitive Heuristic Assistant Technology
          </p>
        </div>

        <div className="mt-2" style={{ 
          maxHeight: '300px', 
          overflowY: 'auto',
          border: '2px solid var(--green)',
          padding: '15px',
          background: 'rgba(0, 255, 0, 0.02)'
        }}>
          {chatHistory.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-2 ${msg.role === 'chat' ? 'text-amber' : ''}`}
              style={{ paddingBottom: '10px', borderBottom: '1px solid rgba(0, 255, 0, 0.2)' }}
            >
              <p className="retro-font" style={{ fontSize: '14px' }}>
                {msg.role === 'chat' ? '🤖 C.H.A.T.:' : '👤 YOU:'}
              </p>
              <p style={{ marginTop: '5px' }}>{msg.message}</p>
            </div>
          ))}
          {isLoading && (
            <div className="text-amber">
              <p className="loading"></p>
            </div>
          )}
        </div>

        <div className="mt-2">
          <p className="text-center mb-1" style={{ fontSize: '16px' }}>Quick hints:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
            {quickHints.map((hint, index) => (
              <button
                key={index}
                className="retro-button"
                style={{ padding: '5px 10px', fontSize: '10px' }}
                onClick={() => {
                  setUserInput(hint);
                  document.getElementById('chat-input').focus();
                }}
              >
                {hint}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSendMessage} className="mt-2">
          <input
            id="chat-input"
            type="text"
            placeholder="Type your question..."
            className="retro-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isLoading}
          />
          <div className="text-center mt-2">
            <button 
              type="submit" 
              className="retro-button retro-button-amber"
              disabled={isLoading || !userInput.trim()}
            >
              SEND MESSAGE
            </button>
            <button 
              type="button" 
              className="retro-button mt-2" 
              onClick={onClose}
            >
              CLOSE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatModal;
