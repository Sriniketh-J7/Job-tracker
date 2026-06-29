export default function StatCard({ icon, label, value, color, bg, trend }) {
  return (
    <div
      className="statcard-inner"
      style={{
        background: "#161B22", border: "1px solid #21262D",
        borderRadius: 18, padding: "22px",
        display: "flex", flexDirection: "column", gap: 18,
        boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
      }}
    >
      <div className="statcard-top-row" style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <div
          className="statcard-icon"
          style={{
            width: 58, height: 64, borderRadius: 14,
            background: bg, display: "flex", justifyContent: "center",
            alignItems: "center", color, fontSize: 22, flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <div className="statcard-label" style={{ color: "#E6EDF3", fontSize: 18, fontWeight: 500 }}>
            {label}
          </div>
          <div className="statcard-value" style={{ marginTop: 12, color: "#FFFFFF", fontSize: 32, fontWeight: 700, lineHeight: 1 }}>
            {value}
          </div>
        </div>
      </div>

      {trend !== undefined && (
        <div className="statcard-trend" style={{ display: "flex", alignItems: "center", gap: 6, color: "#54D2A0", fontSize: 14, fontWeight: 600 }}>
          <span>↗</span>
          <span>{trend}%</span>
          <span style={{ color: "#A1A8B3", fontWeight: 400 }}>from last month</span>
        </div>
      )}
    </div>
  );
}
