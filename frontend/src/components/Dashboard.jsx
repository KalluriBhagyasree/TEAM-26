import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import SpamChecker from './SpamChecker';

const Dashboard = () => {
  const [user, setUser] = useState(null); // Logged-in user
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [activeTab, setActiveTab] = useState('analyze');
  const [messages, setMessages] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  
  // OTP/Login states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Fetch messages after login
  useEffect(() => {
    if (user) {
      fetch('http://127.0.0.1:5000/messages')
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(err => console.error(err));
    }
  }, [user]);

  // ----------------- Login/OTP -----------------
  const sendOtp = async () => {
    if (!name || !phone) return alert("Enter name and phone number");

    await fetch("http://127.0.0.1:5000/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone })
    });
    setOtpSent(true);
  };

  const verifyOtp = async () => {
    const res = await fetch("http://127.0.0.1:5000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp })
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.user);
    } else {
      alert("Invalid OTP");
    }
  };

  // ----------------- Message AI Check -----------------
  const handleCheck = async () => {
    if (!message.trim()) {
      setResult('Please enter a message');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: { sender_id: user.phone, sender_type: 'PERSONAL' },
          message
        }),
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2)); // Display JSON with reasons
    } catch (error) {
      console.error(error);
      setResult('Server not responding');
    }
  };

  // ----------------- Render -----------------
if (!user) {
  return (
    <div className="loginPage">
      <div className="loginCard">
        <h2 className="loginTitle">📱 Login / Register</h2>

        {!otpSent ? (
          <>
            <input
              className="loginInput"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <input
              className="loginInput"
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />

            <button className="loginBtn" onClick={sendOtp}>
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              className="loginInput"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />

            <button className="loginBtn" onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}


  return (
    <div className="container">
      <Sidebar
  activeTab={activeTab}
  setActiveTab={setActiveTab}
  onProfileClick={() => setShowProfile(true)}
/>


      <div className="mainContent">
        {/* Sender Spam Checker */}
        {activeTab === 'senderSpam' && (
          <div className="inputCard">
            <h2 className="title">Sender-based Spam Checker</h2>
            <SpamChecker user={user} />
          </div>
        )}

        {/* SMS Analyze Section */}
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

            {result && <pre className="result">{result}</pre>}
          </div>
        )}

        {/* Spam Messages */}
        {activeTab === 'spam' && (
          <div className="grid">
            {messages.filter(msg => msg.isSpam).map((msg, idx) => (
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
            {messages.filter(msg => !msg.isSpam).map((msg, idx) => (
              <div key={idx} className="card">
                <div className="statusIndicator ham"></div>
                <div className="sender">HAM</div>
                <div className="messagePreview">{msg.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showProfile && (
  <div className="profileOverlay">
    <div className="profileCard">
      <h2>👤 User Profile</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Phone:</strong> {user.phone}</p>

      <button
        className="closeBtn"
        onClick={() => setShowProfile(false)}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;

const styles = {
  input: { display: "block", margin: "10px auto", padding: "8px", width: "220px" },
  button: { padding: "10px 15px", margin: "10px", cursor: "pointer" }
};
