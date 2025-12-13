import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';

const Dashboard = () => {
  // 🔹 Input states
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [activeTab, setActiveTab] = useState('analyze');

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
  const handleCheck = async () => {
    if (!message.trim()) {
      setResult('Please enter a message');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setResult(data.result);

    } catch (error) {
      console.error(error);
      setResult('Server not responding');
    }
  };

  return (
    <div className="container">

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="mainContent">

        {/* Analyze Section */}
        {activeTab === 'analyze' && (
          <div className="inputCard">
            <h2 className="title">SMS Spam Checker</h2>

            <textarea
              className="inputBox"
              placeholder="Type your SMS message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className="checkBtn" onClick={handleCheck}>
              Analyze Message with AI
            </button>

            {result && <div className="result">{result}</div>}
          </div>
        )}

        {/* Spam Messages */}
        {activeTab === 'spam' && (
          <div className="grid">
            {messages
              .filter(msg => msg.isSpam)
              .map((msg, idx) => (
                <div key={idx} className="card spamCard">
                  <div className="statusIndicator spam"></div>
                  <div className="sender">SPAM</div>
                  <div className="messagePreview">{msg.message}</div>
                </div>
              ))}
          </div>
        )}

        {/* Ham Messages */}
        {activeTab === 'ham' && (
          <div className="grid">
            {messages
              .filter(msg => !msg.isSpam)
              .map((msg, idx) => (
                <div key={idx} className="card">
                  <div className="statusIndicator ham"></div>
                  <div className="sender">HAM</div>
                  <div className="messagePreview">{msg.message}</div>
                </div>
              ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
