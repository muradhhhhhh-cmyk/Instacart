import React, { useState } from "react";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function botWorkflow(logFn) {
  logFn("🔍 Initializing bot");
  await sleep(1000);

  logFn("📡 Connecting to service");
  await sleep(1500);

  logFn("📦 Processing data");
  await sleep(2000);

  logFn("🧮 Running calculations");
  await sleep(1500);

  logFn("✅ Task completed successfully");
}

export default function App() {
  const [status, setStatus] = useState("Idle");
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);

  const addLog = (msg) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} — ${msg}`]);
  };

  const startBot = async () => {
    setRunning(true);
    setStatus("Running");
    setLogs([]);

    try {
      await botWorkflow(addLog);
      setStatus("Finished");
    } catch (err) {
      addLog("❌ Error: " + err.message);
      setStatus("Error");
    } finally {
      setRunning(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Automation Bot</h1>

      <p><strong>Status:</strong> {status}</p>

      <button
        onClick={startBot}
        disabled={running}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: running ? "not-allowed" : "pointer"
        }}
      >
        {running ? "Bot Running..." : "Start Bot"}
      </button>

      <div style={{
        marginTop: 20,
        background: "#111",
        color: "#0f0",
        padding: 10,
        minHeight: 150,
        fontFamily: "monospace",
        overflowY: "auto"
      }}>
        {logs.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}
