import { Bell, Search, LogOut } from "lucide-react";
import { username, userTitle } from "../lib/constants";
import { useState } from "react";

export default function Header({ onAddClick, search, onSearchChange, onLogout }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="header-root">
      {/* Left - greeting */}
      <div className="header-greeting">
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#E6EDF3", margin: 0 }}>
          {greeting}, {username} 👋
        </h1>
        <p style={{ color: "#8B949E", fontSize: 13, margin: "3px 0 0" }}>
          Here's your job search overview
        </p>
      </div>

      {/* Right - icons */}
      <div className="header-right" style={{ display: "flex", alignItems: "center", gap: 14 }}>

        {/* Notification bell */}
        <button
          className="header-bell"
          style={{
            background: "#161B22", border: "1.5px solid #30363D",
            borderRadius: 10, padding: "8px 10px", cursor: "pointer",
            display: "flex", alignItems: "center", position: "relative",
          }}
        >
          <Bell size={17} color="#8B949E" />
          <span style={{
            position: "absolute", top: 6, right: 6,
            width: 7, height: 7, background: "#6366F1",
            borderRadius: "50%", border: "1.5px solid #0D1117",
          }} />
        </button>

        {/* Avatar + logout */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setShowMenu(!showMenu)}
            title="Account"
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: 14,
              cursor: "pointer", userSelect: "none", flexShrink: 0,
            }}
          >
            {userTitle}
          </div>

          {showMenu && (
            <div style={{
              position: "absolute", top: 46, right: 0, width: 80,
              background: "#c21919", border: "1px solid #828282",
              borderRadius: 6, overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)", zIndex: 1000,
            }}>
              <div
                onClick={onLogout}
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "1px 6px", color: "#ffdfdf",
                  cursor: "pointer", fontWeight: 600, fontSize: 13,
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#2b2b2b"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <LogOut /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
