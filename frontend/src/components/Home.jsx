import React from 'react';
import { useState } from 'react';
import './home.css';

const Home = () => {
    const [message, setMessage] = useState("");
const [result, setResult] = useState(null);


const handleCheck = () => {
if (message.toLowerCase().includes("http") || message.toLowerCase().includes("win")) {
setResult("Spam ❌");
} else {
setResult("Ham ✅");
}
};
    return (
        <div className="container">
<div className="card">
<h1>SMS Spam Detector</h1>
<textarea
placeholder="Paste your SMS here..."
value={message}
onChange={(e) => setMessage(e.target.value)}
/>
<div className="buttons">
<button onClick={handleCheck} className="check-btn">Check Message</button>
<button onClick={() => { setMessage(''); setResult(null); }} className="clear-btn">Clear</button>
</div>
{result && (
<div className={`result ${result.includes('Spam') ? 'spam' : 'ham'}`}>Result: {result}</div>
)}
</div>
</div>
    );
}
export default Home;