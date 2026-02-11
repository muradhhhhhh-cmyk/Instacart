import React, { useState } from "react";
import { findBestBatchAggressive } from "./automation/batchFinderAggressive"; // adjust path if needed

// Example batches array (replace with your actual batches if you have them in data.js)
const allBatches = [
  { id: 1, store: "Instacourt Market", pay: 45, miles: 4, items: 5 },
  { id: 2, store: "Walmart", pay: 32, miles: 6, items: 8 },
  { id: 3, store: "Costco", pay: 50, miles: 7, items: 10 },
  { id: 4, store: "Target", pay: 40, miles: 3, items: 6 }
];

export default function App() {
  const [logs, setLogs] = useState([]);
  const [highlightedBatch, setHighlightedBatch] = useState(null);
  const [driverStatus, setDriverStatus] = useState("Offline");

  // Helper to add logs
  const addLog = (msg) => setLogs((prev) => [...prev, msg]);

  // Automation function: find best batch (aggressive)
  const showBestBatch = () => {
    const bestBatch = findBestBatchAggressive(allBatches);

    if (!bestBatch) {
      addLog("❌ No batch found");
      return;
    }

    setHighlightedBatch(bestBatch);
    addLog(`🚨 Best batch found! ${bestBatch.store} - $${bestBatch.pay}, ${bestBatch.miles} miles`);
  };

  // Optional: go online (can call showBestBatch automatically)
  const goOnline = () => {
    setDriverStatus("Online");
    addLog("🟢 Driver online");
    showBestBatch(); // automatically show best batch when online
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Instacourt Driver</h2>
      <p>Status: <b>{driverStatus}</b></p>

      {/* Go Online Button */}
      <button onClick={goOnline}>
        {driverStatus === "Online" ? "Online" : "Go Online"}
      </button>

      {/* Optional manual batch finder */}
      <button onClick={showBestBatch} style={{ marginLeft: 10 }}>
        Find Best Batch
      </button>

      {/* Highlighted batch */}
      {highlightedBatch && (
        <div style={{ marginTop: 20, padding: 10, border: "1px solid #333", borderRadius: 5 }}>
          <h4>📦 Best Batch</h4>
          <p>Store: {highlightedBatch.store}</p>
          <p>Pay: ${highlightedBatch.pay}</p>
          <p>Miles: {highlightedBatch.miles}</p>
          <p>Items: {highlightedBatch.items}</p>
        </div>
      )}

      {/* Logs */}
      <div style={{ marginTop: 20, maxHeight: 200, overflowY: "auto", background: "#f0f0f0", padding: 10, borderRadius: 5 }}>
        <h4>Logs:</h4>
        {logs.map((log, idx) => (
          <div key={idx}>{log}</div>
        ))}
      </div>
    </div>
  );
}
