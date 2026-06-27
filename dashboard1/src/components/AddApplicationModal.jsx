import { useState } from "react";
import { ALL_STATUSES } from "../lib/constants.js";

const inputStyle = {
  width: "100%", padding: "9px 12px", borderRadius: 8,
  border: "1.5px solid #30363D", background: "#0D1117",
  color: "#E6EDF3", fontSize: 13, outline: "none",
  boxSizing: "border-box", fontFamily: "inherit", marginBottom: 14
};

const labelStyle = {
  color: "#8B949E", fontSize: 11, fontWeight: 600,
  textTransform: "uppercase", letterSpacing: "0.05em",
  display: "block", marginBottom: 4
};

const today = new Date().toISOString().split("T")[0];

const EMPTY = {
  company: "", job_title: "", location: "", link: "",
  resume_name: "", status: "Applied", date: today, notes: ""
};

export default function AddApplicationModal({ onSave, onCancel }) {
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.company.trim() || !form.job_title.trim()) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200
    }}>
      <div style={{
        background: "#161B22", border: "1px solid #30363D", borderRadius: 16,
        padding: 32, width: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        maxHeight: "90vh", overflowY: "auto"
      }}>
        <h3 style={{ color: "#E6EDF3", fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
          + Add Application
        </h3>

        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Company *</label>
            <input value={form.company} onChange={e => set("company", e.target.value)} style={inputStyle} placeholder="Google" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Date</label>
            <input type="date" value={form.date} onChange={e => set("date", e.target.value)} style={inputStyle} />
          </div>
        </div>

        <label style={labelStyle}>Job Title *</label>
        <input value={form.job_title} onChange={e => set("job_title", e.target.value)} style={inputStyle} placeholder="Software Engineer" />

        <label style={labelStyle}>Location</label>
        <input value={form.location} onChange={e => set("location", e.target.value)} style={inputStyle} placeholder="Bangalore, India" />

        <label style={labelStyle}>Job Link</label>
        <input value={form.link} onChange={e => set("link", e.target.value)} style={inputStyle} placeholder="https://careers.google.com/..." />

        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Resume Used</label>
            <input value={form.resume_name} onChange={e => set("resume_name", e.target.value)} style={inputStyle} placeholder="sriniketh_resume_SWE" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Status</label>
            <select value={form.status} onChange={e => set("status", e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}>
              {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <label style={labelStyle}>Notes</label>
        <textarea
          value={form.notes}
          onChange={e => set("notes", e.target.value)}
          placeholder="Referral, recruiter name, follow-up date..."
          style={{ ...inputStyle, resize: "vertical", minHeight: 70, marginBottom: 20 }}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: "10px", borderRadius: 8, background: "transparent",
            border: "1.5px solid #30363D", color: "#E6EDF3", fontSize: 14,
            cursor: "pointer", fontFamily: "inherit"
          }}>Cancel</button>
          <button onClick={handleSave} disabled={saving || !form.company.trim() || !form.job_title.trim()} style={{
            flex: 1, padding: "10px", borderRadius: 8,
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            color: "#fff", fontSize: 14, fontWeight: 600,
            border: "none", cursor: "pointer", fontFamily: "inherit",
            opacity: saving ? 0.7 : 1
          }}>
            {saving ? "Saving..." : "Add Application"}
          </button>
        </div>
      </div>
    </div>
  );
}
