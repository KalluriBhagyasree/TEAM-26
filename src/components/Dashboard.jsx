import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/messages')
      .then(res => res.json())
      .then(data => {
        console.log(data); // DEBUG
        setMessages(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
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

              {/* FIXED LINE */}
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
