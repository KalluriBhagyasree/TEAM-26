import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('messages');

    useEffect(() => {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.backgroundColor = '#121212';
        return () => {
            document.body.style.margin = '';
            document.body.style.padding = '';
            document.body.style.backgroundColor = '';
        };
    }, []);

    // Mock Data
    const messages = [
        { id: 1, sender: "ServiceAlert", text: "Your message is sent to check...", time: "3:43 PM", isSpam: false },
        { id: 2, sender: "Unknown", text: "You have won a lottery! Click here...", time: "3:26 PM", isSpam: true },
        { id: 3, sender: "PromoDeals", text: "50% off on all items today only.", time: "10:33 PM", isSpam: false },
        { id: 4, sender: "Unknown", text: "Urgent: Update your bank details.", time: "12:56 PM", isSpam: true },
        { id: 5, sender: "ServiceAlert", text: "Maintenance scheduled for tonight.", time: "11:26 PM", isSpam: false },
        { id: 6, sender: "Unknown", text: "Congratulations! Claim your prize.", time: "11:21 PM", isSpam: true },
    ];

    return (
        <div className="container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="logo">NEON GUARD</div>
                <div className={`navItem ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                    <span>📊</span> Dashboard
                </div>
                <div className={`navItem ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
                    <span>💬</span> Messages
                </div>
                <div className={`navItem ${activeTab === 'spam' ? 'active' : ''}`} onClick={() => setActiveTab('spam')}>
                    <span>🛡️</span> Spam Filter
                </div>
                <div className={`navItem ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                    <span>⚙️</span> Settings
                </div>
            </div>

            {/* Main Content */}
            <div className="main">
                <div className="navbar">
                    <div className="tabTitle">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</div>
                    <input type="text" placeholder="Search messages or numbers..." className="searchBar" />
                    <div className="navIcons">
                        <span>🔔</span>
                        <div className="profileIcon">👤</div>
                    </div>
                </div>

                <div className="content">
                    <h2 className="sectionTitle">Inbox & Messages</h2>
                    <div className="grid">
                        {messages.map(msg => (
                            <div key={msg.id} className={`card ${msg.isSpam ? 'spamCard' : ''}`}>
                                <div className={`statusIndicator ${msg.isSpam ? 'spam' : 'ham'}`}></div>
                                <div className="sender">{msg.sender}</div>
                                <div className="messagePreview">{msg.text}</div>
                                <div className="timestamp">{msg.time}</div>
                                {msg.isSpam && <div className="spamLabel">SPAM DETECTED</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
