import React from 'react';
import './Sldebar.css';

const Sidebar = ({ activeTab, setActiveTab, onProfileClick }) => {
  return (
    <div className="sidebar">
      <h2 className="logo">AI SMS</h2>

      <button
        className={activeTab === "senderSpam" ? "active" : ""}
        onClick={() => setActiveTab("senderSpam")}
      >
        Sender Spam Checker
      </button>

      <button
        className={activeTab === 'analyze' ? 'active' : ''}
        onClick={() => setActiveTab('analyze')}
      >
        Analyze message with AI
      </button>

      <button
        className={activeTab === 'spam' ? 'active' : ''}
        onClick={() => setActiveTab('spam')}
      >
        Spam messages
      </button>

      <button
        className={activeTab === 'ham' ? 'active' : ''}
        onClick={() => setActiveTab('ham')}
      >
        Ham messages
      </button>

      {/* 👤 PROFILE */}
      <div className="profileSection" onClick={onProfileClick}>
        <div className="profileIcon">👤</div>
        <div className="profileText">
          <p className="profileName">Profile</p>
          <span className="profileView">View details</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
