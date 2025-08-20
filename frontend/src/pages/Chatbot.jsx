import React, { useState } from "react";
import "./chatbot.css";
import chatIcon from "../assets/fl.jpg";
function Chatbot() {
  const [complaint, setComplaint] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    if (!complaint.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("http://localhost:5000/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complaint }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Server error. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <div className="chatbot-icon" onClick={() => setIsOpen(true)}>
           <img
  src={chatIcon}   // use the imported image
  alt="Chat Icon"
  style={{ width: "40px", height: "40px" }}
/>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Legal Chatbot</span>
            <button
              onClick={() => setIsOpen(false)}
              className="close-btn"
              aria-label="Close Chatbot"
            >
              ✖
            </button>
          </div>

          <div className="chatbot-messages">
            <textarea
              className="chatbot-textarea"
              placeholder="Type your complaint..."
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="chatbot-submit"
            >
              {loading ? "Analyzing..." : "Submit"}
            </button>

            {response && (
              <div className="chatbot-response">
                {response.error ? (
                  <p className="error">{response.error}</p>
                ) : (
                  <>
                    <p>
                      <strong>Complaint:</strong> {response.complaint}
                    </p>
                    <p>
                      <strong>Section:</strong>{" "}
                      <span className="highlight">
                        {response.predicted_section}
                      </span>
                    </p>
                    <p>
                      <strong>Confidence:</strong>{" "}
                      {Math.round(response.confidence * 100)}%
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
