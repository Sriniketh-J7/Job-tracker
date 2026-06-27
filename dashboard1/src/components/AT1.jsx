import { useState } from "react";
import { Eye, Trash2, ExternalLink } from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";
import { STATUS_META, ALL_STATUSES } from "../lib/constants.js";

const COLS = [
  "Company",
  "Role",
  "Status",
  "Date",
  "Location",
  "Resume",
  "Link",
  "Actions",
];

export default function AT1({
  apps,
  onStatusChange,
  onEdit,
  onDelete,
  filterStatus,
  onFilterChange,
  search,
}) {
  const filtered = apps.filter((a) => {
    const matchStatus = filterStatus === "All" || a.status === filterStatus;
    const matchSearch =
      !search ||
      [a.company, a.job_title, a.location].some((f) =>
        f?.toLowerCase().includes(search.toLowerCase()),
      );
    return matchStatus && matchSearch;
  });

  return (
    <div
      style={{
        background: "#1C1F2A",
        border: "1px solid #2B2F3A",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* Header & Filters */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid #2B2F3A",
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: 500,
            margin: 0,
            letterSpacing: "0.01em",
          }}
        >
          Recent Applications
        </h3>

        {/* Kept your filter logic, but styled to match the minimal dark theme */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["All", ...ALL_STATUSES].map((s) => {
            const active = filterStatus === s;
            const meta = STATUS_META[s];
            return (
              <button
                key={s}
                onClick={() => onFilterChange(s)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 500,
                  border: active
                    ? `1px solid ${meta?.color || "#6366F1"}`
                    : "1px solid transparent",
                  background: active
                    ? meta?.bg || "rgba(99,102,241,0.1)"
                    : "rgba(255,255,255,0.03)",
                  color: active ? meta?.color || "#6366F1" : "#8F95B2",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
        >
          <thead>
            <tr>
              {COLS.map((h, i) => (
                <th
                  key={h}
                  style={{
                    padding: "16px 24px",
                    textAlign: i === COLS.length - 1 ? "right" : "left",
                    color: "#8F95B2",
                    fontWeight: 400,
                    fontSize: 13,
                    borderBottom: "1px solid #2B2F3A",
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
                    padding: "64px",
                    textAlign: "center",
                    color: "#8F95B2",
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
                      i < filtered.length - 1 ? "1px solid #2B2F3A" : "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.02)")
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

                  <td style={{ padding: "16px 24px", color: "#D1D5DB" }}>
                    {row.job_title}
                  </td>

                  <td style={{ padding: "16px 24px" }}>
                    <StatusBadge
                      status={row.status}
                      editable
                      onChange={(s) => onStatusChange(row.id, s)}
                    />
                  </td>

                  <td
                    style={{
                      padding: "16px 24px",
                      color: "#8F95B2",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.date}
                  </td>
                  <td style={{ padding: "16px 24px", color: "#8F95B2" }}>
                    {row.location || "—"}
                  </td>

                  <td
                    style={{
                      padding: "16px 24px",
                      color: "#8F95B2",
                      fontSize: 13,
                      maxWidth: 140,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.resume_name || "—"}
                  </td>

                  <td style={{ padding: "16px 24px" }}>
                    {row.link ? (
                      <a
                        href={row.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "#8F95B2",
                          display: "flex",
                          alignItems: "center",
                          textDecoration: "none",
                        }}
                      >
                        <ExternalLink size={16} />
                      </a>
                    ) : (
                      <span style={{ color: "#4B5563" }}>—</span>
                    )}
                  </td>

                  {/* Actions styled to match the subtle target image icons */}
                  <td style={{ padding: "16px 24px" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        onClick={() => onEdit(row)}
                        title="View / Edit"
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          color: "#8F95B2",
                        }}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(row)}
                        title="Delete"
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          color: "#8F95B2",
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer matching target image "View all applications ->" styling */}
      <div
        style={{
          padding: "16px 24px",
          borderTop: "1px solid #2B2F3A",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#8F95B2", fontSize: 13 }}>
          Showing {filtered.length} of {apps.length} applications
        </span>

        <button
          style={{
            background: "transparent",
            border: "none",
            color: "#6366F1",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: 0,
          }}
        >
          View all applications &rarr;
        </button>
      </div>
    </div>
  );
}
