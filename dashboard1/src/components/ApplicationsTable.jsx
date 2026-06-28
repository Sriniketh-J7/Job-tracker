import { useState } from "react";
import { Pencil, Search, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";
import { STATUS_META, ALL_STATUSES } from "../lib/constants.js";

const COLS = ["Company", "Role", "Status", "Date", "Location", "Resume", "Link", "Actions"];

export default function ApplicationsTable({ apps, onSearchChange, search, onStatusChange, onEdit, onDelete, filterStatus, onFilterChange }) {

  const [openStatusId, setOpenStatusId] = useState(null);
  
  const filtered = apps.filter(a => {
    const matchStatus = filterStatus === "All" || a.status === filterStatus;
    const matchSearch = !search || [a.company, a.job_title, a.location]
      .some(f => f?.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchSearch;
  });

  return (
    <div
      style={{
        background: "#161B22",
        border: "1px solid #21262D",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Filter tabs */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #21262D",
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Search applications */}
        <div style={{ position: "relative" }}>
          <Search
            size={15}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#8B949E",
            }}
          />
          <input
            placeholder="Search applications, companies..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              paddingLeft: 36,
              paddingRight: 14,
              paddingTop: 9,
              paddingBottom: 9,
              borderRadius: 10,
              border: "1.5px solid #30363D",
              background: "#161B22",
              color: "#E6EDF3",
              fontSize: 13,
              outline: "none",
              width: 260,
              fontFamily: "inherit",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["All", ...ALL_STATUSES].map((s) => {
            const active = filterStatus === s;
            const meta = STATUS_META[s];
            return (
              <button
                key={s}
                onClick={() => onFilterChange(s)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  border: `1.5px solid ${active ? meta?.color || "#6366F1" : "#30363D"}`,
                  background: active
                    ? meta?.bg || "rgba(99,102,241,0.12)"
                    : "transparent",
                  color: active ? meta?.color || "#6366F1" : "#8B949E",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {meta?.icon || "🗂️"} {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid #21262D" }}>
              {COLS.map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    color: "#8B949E",
                    fontWeight: 600,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={COLS.length}
                  style={{
                    padding: "48px",
                    textAlign: "center",
                    color: "#8B949E",
                    fontSize: 14,
                  }}
                >
                  {apps.length === 0
                    ? "No applications yet. Hit '+ Add Application' to log your first one."
                    : "No results match your current filter."}
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom:
                      i < filtered.length - 1 ? "1px solid #21262D" : "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(99,102,241,0.04)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {/* Company with Target-style Logo Placeholder */}
                  <td style={{ padding: "16px 24px" }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          background: "#FFFFFF",
                          color: "#1C1F2A",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        {row.company.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 500, color: "#FFFFFF" }}>
                        {row.company}
                      </span>
                    </div>
                  </td>

                  <td
                    style={{
                      padding: "14px 16px",
                      fontSize: "14px",
                      color: "#C9D1D9",
                    }}
                  >
                    {row.job_title}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <StatusBadge
                      status={row.status}
                      editable
                      isOpen={openStatusId === row.id}
                      onToggle={() =>
                        setOpenStatusId(openStatusId === row.id ? null : row.id)
                      }
                      onClose={() => setOpenStatusId(null)}
                      onChange={(newStatus) => {
                        updateStatus(row.id, newStatus);
                      }}
                    />
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#8B949E",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.date}
                  </td>
                  <td style={{ padding: "14px 18px", color: "#8B949E" }}>
                    {row.location || "— —"}
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#8B949E",
                      fontSize: 12,
                      maxWidth: 140,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.resume_name || "—"}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    {row.link ? (
                      <a
                        href={row.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "#6366F1",
                          fontSize: 18,
                          textDecoration: "none",
                        }}
                      >
                        🔗
                      </a>
                    ) : (
                      <span style={{ color: "#8B949E" }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => onEdit(row)}
                        title="Edit"
                        style={{
                          background: "rgba(99,102,241,0.12)",
                          border: "none",
                          borderRadius: 7,
                          padding: "6px 8px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Pencil size={13} color="#6366F1" />
                      </button>
                      <button
                        onClick={() => onDelete(row)}
                        title="Delete"
                        style={{
                          background: "rgba(239,68,68,0.12)",
                          border: "none",
                          borderRadius: 7,
                          padding: "6px 8px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Trash2 size={13} color="#EF4444" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid #21262D",
          textAlign: "right",
        }}
      >
        <span style={{ color: "#8B949E", fontSize: 12 }}>
          Showing {filtered.length} of {apps.length} applications
        </span>
      </div>
    </div>
  );
}
