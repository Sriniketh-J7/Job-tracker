import { useEffect } from "react";

export default function Toast({ message, type = "success", onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [message]);

  if (!message) return null;

  const colors = {
    success: { bg: "rgba(16,185,129,0.15)", color: "#10B981", border: "rgba(16,185,129,0.3)" },
    error:   { bg: "rgba(239,68,68,0.12)",  color: "#EF4444", border: "rgba(239,68,68,0.3)" },
  };
  const c = colors[type] || colors.success;

  return (
    <div style={{
      position: "fixed", top: 24, right: 24, zIndex: 300,
      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
      padding: "12px 20px", borderRadius: 10, fontWeight: 600,
      fontSize: 14, boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
      animation: "fadeIn 0.2s ease"
    }}>
      {message}
    </div>
  );
}
