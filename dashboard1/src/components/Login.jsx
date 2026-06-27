import { useState } from "react";
import { DASHBOARD_PASSWORD } from "../config.js";

export default function Login({ onLogin }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);

  const attempt = () => {
    if (pw === DASHBOARD_PASSWORD) {
      localStorage.setItem("jt_auth", "1");
      onLogin();
    } else {
      setErr(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#0D1117"
    }}>
      <div style={{
        background: "#161B22", border: "1px solid #30363D", borderRadius: 20,
        padding: "48px 40px", width: 360, textAlign: "center",
        boxShadow: "0 20px 60px rgba(99,102,241,0.12)"
      }}>
        <div style={{ fontSize: 42, marginBottom: 12 }}>🗂️</div>
        <h2 style={{ color: "#E6EDF3", fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Job Tracker</h2>
        <p style={{ color: "#8B949E", fontSize: 14, marginBottom: 28 }}>Enter your password to continue</p>
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={e => { setPw(e.target.value); setErr(false); }}
          onKeyDown={e => e.key === "Enter" && attempt()}
          style={{
            width: "100%", padding: "12px 16px", borderRadius: 10,
            border: `1.5px solid ${err ? "#EF4444" : "#30363D"}`,
            background: "#0D1117", color: "#E6EDF3", fontSize: 15, outline: "none",
            boxSizing: "border-box", marginBottom: 8,
            animation: shake ? "shake 0.4s ease" : "none",
            fontFamily: "inherit"
          }}
        />
        {err && <p style={{ color: "#EF4444", fontSize: 13, marginBottom: 8 }}>Wrong password. Try again.</p>}
        <button onClick={attempt} style={{
          width: "100%", padding: "12px", borderRadius: 10,
          background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
          color: "#fff", fontSize: 15, fontWeight: 600,
          border: "none", cursor: "pointer", marginTop: 8, fontFamily: "inherit"
        }}>
          Unlock →
        </button>
      </div>
    </div>
  );
}
