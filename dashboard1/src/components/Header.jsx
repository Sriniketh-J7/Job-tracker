import { Bell, Search } from "lucide-react";

export default function Header({ onAddClick, search, onSearchChange, onLogout }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "24px 36px", borderBottom: "1px solid #21262D",
      background: "#0D1117", position: "sticky", top: 0, zIndex: 50
    }}>
      {/* Left - greeting */}
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#E6EDF3", margin: 0 }}>
          {greeting}, Sriniketh 👋
        </h1>
        <p style={{ color: "#8B949E", fontSize: 13, margin: "3px 0 0" }}>
          Here's your job search overview
        </p>
      </div>

      {/* Right - search + icons + button */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8B949E" }} />
          <input
            placeholder="Search applications, companies..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            style={{
              paddingLeft: 36, paddingRight: 14, paddingTop: 9, paddingBottom: 9,
              borderRadius: 10, border: "1.5px solid #30363D", background: "#161B22",
              color: "#E6EDF3", fontSize: 13, outline: "none", width: 260,
              fontFamily: "inherit"
            }}
          />
        </div>

        {/* Notification bell */}
        <button style={{
          background: "#161B22", border: "1.5px solid #30363D", borderRadius: 10,
          padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center",
          position: "relative"
        }}>
          <Bell size={17} color="#8B949E" />
          <span style={{
            position: "absolute", top: 6, right: 6, width: 7, height: 7,
            background: "#6366F1", borderRadius: "50%", border: "1.5px solid #0D1117"
          }} />
        </button>

        {/* Avatar + logout */}
        <div
          onClick={onLogout}
          title="Logout"
          style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
            userSelect: "none", flexShrink: 0
          }}>
          SJ
        </div>

        
      </div>
    </div>
  );
}
