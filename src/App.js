import React, { useState } from "react";

function App() {
  const [status, setStatus] = useState("Bot is idle");

  // Example function to simulate bot running
  const runBot = () => {
    setStatus("Bot is running...");
    
    // Simulate async task (replace this with your real bot logic)
    setTimeout(() => {
      setStatus("Bot finished running!");
    }, 3000);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Instacart Bot</h1>
      <p>Status: {status}</p>
      <button 
        onClick={runBot} 
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Start Bot
      </button>
    </div>
  );
}

export default App;
