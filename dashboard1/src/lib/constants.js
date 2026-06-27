export const STATUS_META = {
  Applied:      { color: "#4e7aff", bg: "rgba(28, 73, 210, 0.17)",   icon: "📤", label: "Applied" },
  Interview:    { color: "#f1ac4b", bg: "rgba(244, 199, 37, 0.23)",   icon: "🎙️", label: "Interview" },
  Accepted:     { color: "#21d96b", bg: "rgba(16,185,129,0.15)",   icon: "✅", label: "Accepted" },
  Rejected:     { color: "#EF4444", bg: "rgba(239,68,68,0.15)",    icon: "❌", label: "Rejected" },
  Ghosted:      { color: "#92a6c2", bg: "rgba(90, 105, 127, 0.15)",  icon: "👻", label: "Ghosted" },
  // Scheduled:    { color: "#3B82F6", bg: "rgba(59,130,246,0.15)",   icon: "📅", label: "Scheduled" },
};

export const ALL_STATUSES = Object.keys(STATUS_META);

export const PIE_COLORS = [
  "#F59E0B", "#8B5CF6", "#10B981", "#EF4444", "#6366F1", "#3B82F6", "#64748B", "#10B981"
];
