import { useState } from "react";
import { ALL_STATUSES } from "../lib/constants.js";

const inputStyle = {
  width: "100%", padding: "9px 12px", borderRadius: 8,
  border: "1.5px solid #30363D", background: "#0D1117",
  color: "#E6EDF3", fontSize: 13, outline: "none",
  boxSizing: "border-box", fontFamily: "inherit"
};

const labelStyle = {
  color: "#8B949E", fontSize: 11, fontWeight: 600,
  textTransform: "uppercase", letterSpacing: "0.05em",
  display: "block", marginBottom: 4
};

export default function EditModal({ row, onSave, onCancel }) {
  const [form, setForm] = useState({ ...row });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const fields = [
    ["Company", "company", "text"],
    ["Job Title", "job_title", "text"],
    ["Location", "location", "text"],
    ["Resume Name", "resume_name", "text"],
    ["Link", "link", "text"],
    ["Notes", "notes", "text"],
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200
    }}>
      <div className="modal-box">
        <h3 style={{ color: "#E6EDF3", fontSize: 18, fontWeight: 700, marginBottom: 20 }}>✏️ Edit Application</h3>

        {fields.map(([label, key]) => (
          <div key={key} style={{ marginBottom: 14 }}>
            <label style={labelStyle}>{label}</label>
            <input value={form[key] || ""} onChange={e => set(key, e.target.value)} style={inputStyle} />
          </div>
        ))}

        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Status</label>
          <select value={form.status} onChange={e => set("status", e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}>
            {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Date</label>
          <input type="date" value={form.date || ""} onChange={e => set("date", e.target.value)} style={inputStyle} />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: "10px", borderRadius: 8, background: "transparent",
            border: "1.5px solid #30363D", color: "#E6EDF3", fontSize: 14,
            cursor: "pointer", fontFamily: "inherit"
          }}>Cancel</button>
          <button onClick={() => onSave(form)} style={{
            flex: 1, padding: "10px", borderRadius: 8,
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            color: "#fff", fontSize: 14, fontWeight: 600,
            border: "none", cursor: "pointer", fontFamily: "inherit"
          }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
