import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // 🔹 Input states
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  // 🔹 Messages from backend
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/messages')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMessages(data);
      })
      .catch(err => console.error(err));
  }, []);

  // 🔹 Button handler
  const handleCheck = () => {
    if (message.trim() === '') {
      setResult('Please enter a message');
    } else {
      setResult('Message received (AI check coming soon)');
    }
  };

  return (
    <div className="container">

      {/* INPUT UI */}
      <div className="inputCard">
        <h2 className="title">SMS Spam Checker</h2>

        <textarea
          className="inputBox"
          placeholder="Type your SMS message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="checkBtn" onClick={handleCheck}>
          Check Spam
        </button>

        {result && <div className="result">{result}</div>}
      </div>

      {/* MESSAGE LIST */}
      <div className="content">
        <div className="grid">
          {messages.length === 0 && (
            <p style={{ color: 'white' }}>No messages loaded</p>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`card ${msg.isSpam ? 'spamCard' : ''}`}>
              <div
                className={`statusIndicator ${msg.isSpam ? 'spam' : 'ham'}`}
              ></div>

              <div className="sender">
                {msg.isSpam ? 'SPAM' : 'HAM'}
              </div>

              <div className="messagePreview">{msg.message}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
