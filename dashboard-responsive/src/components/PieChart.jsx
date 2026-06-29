import { PieChart as RechartsPie, Pie, Cell, Tooltip, ResponsiveContainer, Label } from "recharts";
import { STATUS_META, PIE_COLORS } from "../lib/constants.js";

const RADIAN = Math.PI / 180;

function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function PieChart({ apps }) {
  const counts = {};
  apps.forEach(a => { counts[a.status] = (counts[a.status] || 0) + 1; });
  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));
  const total = apps.length;

  if (data.length === 0) {
    return (
      <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 16, padding: 24, flex: 1 }}>
        <h3 style={{ color: "#E6EDF3", fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Application Status</h3>
        <div style={{ color: "#8B949E", textAlign: "center", padding: "40px 0", fontSize: 13 }}>No data yet</div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#161B22",
        border: "1px solid #21262D",
        borderRadius: 16,
        padding: "24px",
        flex: 1,
        minWidth: 0,
      }}
    >
      <h3
        style={{
          color: "#E6EDF3",
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        Application Status
      </h3>

      <ResponsiveContainer width="100%" height={220}>
        <RechartsPie>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            labelLine={false}
            label={CustomLabel}
          >
            {data.map((entry, i) => (
              <Cell
                key={entry.name}
                fill={
                  STATUS_META[entry.name]?.color ||
                  PIE_COLORS[i % PIE_COLORS.length]
                }
              />
            ))}

            <Label
              position="center"
              content={({ viewBox }) => {
                const { cx, cy } = viewBox;

                return (
                  <g>
                    <text
                      x={cx}
                      y={cy - 6}
                      textAnchor="middle"
                      fill="#dddddd"
                      fontSize="24"
                      fontWeight="700"
                    >
                      {total}
                    </text>

                    <text
                      x={cx}
                      y={cy + 16}
                      textAnchor="middle"
                      fill="#a8adb3"
                      fontSize="13"
                      fontWeight="500"
                    >
                      Total
                    </text>
                  </g>
                );
              }}
            />
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#0D1117",
              border: "1px solid #30363D",
              borderRadius: 8,
              fontSize: 12,
            }}
            itemStyle={{ color: "#E6EDF3" }}
          />
        </RechartsPie>
      </ResponsiveContainer>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginTop: 8,
        }}
      >
        {data.map((entry, i) => {
          const color =
            STATUS_META[entry.name]?.color || PIE_COLORS[i % PIE_COLORS.length];
          const pct = ((entry.value / total) * 100).toFixed(1);
          return (
            <div
              key={entry.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 3,
                    background: color,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: "#8B949E", fontSize: 12 }}>
                  {entry.name}
                </span>
              </div>
              <span style={{ color: "#E6EDF3", fontSize: 12, fontWeight: 600 }}>
                {entry.value} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
