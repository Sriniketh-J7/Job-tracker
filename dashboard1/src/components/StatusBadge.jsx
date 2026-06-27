import { useState } from "react";
import { STATUS_META, ALL_STATUSES } from "../lib/constants.js";

export default function StatusBadge({ status, onChange, editable = false }) {
  const [open, setOpen] = useState(false);
  const meta = STATUS_META[status] || STATUS_META["Applied"];

  const badge = (
    <span style={{
      color: meta.color, background: meta.bg,
      padding: "3px 10px", borderRadius: 6,
      fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
      cursor: editable ? "pointer" : "default",
      userSelect: "none", display: "inline-flex", alignItems: "center", gap: 4
    }}
      onClick={() => editable && setOpen(o => !o)}
    >
      {status} {editable && "▾"}
    </span>
  );

  if (!editable) return badge;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {badge}
      {open && (
        <div style={{
          position: "absolute", top: "110%", left: 0, zIndex: 99,
          background: "#161B22", border: "1px solid #30363D",
          borderRadius: 10, minWidth: 150,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
        }}>
          {ALL_STATUSES.map(s => {
            const m = STATUS_META[s];
            return (
              <div key={s}
                onClick={() => { onChange(s); setOpen(false); }}
                style={{
                  padding: "8px 14px", cursor: "pointer", color: m.color,
                  fontSize: 13, fontWeight: 500, display: "flex", gap: 8, alignItems: "center"
                }}
                onMouseEnter={e => e.currentTarget.style.background = m.bg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                {m.icon} {s}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
