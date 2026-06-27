import { useState } from "react";

export default function DeleteDialog({ company, onConfirm, onCancel }) {
  const [val, setVal] = useState("");
  const match = val === company;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200
    }}>
      <div style={{
        background: "#161B22", border: "1px solid #30363D", borderRadius: 16,
        padding: 32, width: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
      }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🗑️</div>
        <h3 style={{ color: "#E6EDF3", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Delete Application</h3>
        <p style={{ color: "#8B949E", fontSize: 14, marginBottom: 16 }}>
          Type <strong style={{ color: "#EF4444" }}>{company}</strong> to confirm deletion. This cannot be undone.
        </p>
        <input
          type="text"
          placeholder={`Type "${company}" here`}
          value={val}
          onChange={e => setVal(e.target.value)}
          style={{
            width: "100%", padding: "10px 14px", borderRadius: 8,
            border: "1.5px solid #30363D", background: "#0D1117",
            color: "#E6EDF3", fontSize: 14, outline: "none",
            boxSizing: "border-box", marginBottom: 16, fontFamily: "inherit"
          }}
        />
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: "10px", borderRadius: 8,
            background: "transparent", border: "1.5px solid #30363D",
            color: "#E6EDF3", fontSize: 14, cursor: "pointer", fontFamily: "inherit"
          }}>Cancel</button>
          <button onClick={() => match && onConfirm()} disabled={!match} style={{
            flex: 1, padding: "10px", borderRadius: 8,
            background: match ? "#EF4444" : "rgba(239,68,68,0.2)",
            color: "#fff", fontSize: 14, fontWeight: 600,
            border: "none", cursor: match ? "pointer" : "not-allowed", fontFamily: "inherit"
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}
