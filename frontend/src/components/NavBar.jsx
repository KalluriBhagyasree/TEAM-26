import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (role) => {
    setOpen(false);
    if (role === "sender") navigate("/sender");
    if (role === "receiver") navigate("/receiver");
  };

  return (
    <nav className="navbar">
      <h2>SMS Spam Detector</h2>

      <div className="profile">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="profile"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="role-box">
            <p>Who are you?</p>
            <button onClick={() => handleSelect("sender")}>
              Sender
            </button>
            <button onClick={() => handleSelect("receiver")}>
              Receiver
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
