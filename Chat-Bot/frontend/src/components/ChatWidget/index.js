import React, { useState, useEffect, useRef } from "react";
import "./index.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! Welcome to Innoira.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { text: userText, sender: "user" }]);
    setInput("");
    setIsTyping(true);

    try {
      // API call to your backend
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) throw new Error("Backend connection failed");

      const data = await response.json();

      // Small delay to make it feel natural like a person is typing
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
        setIsTyping(false);
      }, 800);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Connection error. Is the server running?", sender: "bot" },
      ]);
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <p className="header-title">Innoira Support</p>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>
          <div className="msg-list" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`message-wrapper ${m.sender}`}>
                <div className={`bubble ${m.sender}`}>{m.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="message-wrapper bot">
                <div className="bubble bot typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          <div className="chat-input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              disabled={isTyping}
              className="send-btn"
            >
              ➔
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="chat-trigger">
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default ChatWidget;
