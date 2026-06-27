import {
  LineChart as RechartsLine, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Dot
} from "recharts";
import { useState } from "react";

function buildChartData(apps, range) {
  const now = new Date();
  const months = [];

  for (let i = range - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleString("default", { month: "short" }),
      count: 0,
    });
  }

  apps.forEach(a => {
    if (!a.date) return;
    const key = a.date.slice(0, 7);
    const m = months.find(m => m.key === key);
    if (m) m.count++;
  });

  return months;
}

const RANGES = [
  { label: "Last 3 Months", value: 3 },
  { label: "Last 6 Months", value: 6 },
  { label: "Last 12 Months", value: 12 },
];

export default function LineGraph({ apps }) {
  const [range, setRange] = useState(6);
  const data = buildChartData(apps, range);

  return (
    <div
      style={{
        background: "#161B22",
        border: "1px solid #21262D",
        borderRadius: 16,
        padding: "24px",
        flex: 1.4,
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h3
          style={{ color: "#E6EDF3", fontSize: 15, fontWeight: 600, margin: 0 }}
        >
          Applications Over Time
        </h3>
        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          style={{
            background: "#0D1117",
            border: "1px solid #30363D",
            borderRadius: 8,
            color: "#8B949E",
            fontSize: 12,
            padding: "5px 10px",
            cursor: "pointer",
            fontFamily: "inherit",
            outline: "none",
          }}
        >
          {RANGES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <RechartsLine data={data}>
          <CartesianGrid  stroke="#2f3238" />
          <XAxis
            dataKey="label"
            tick={{ fill: "#8B949E", fontSize: 11 }}
            axisLine={{ stroke: "#21262D" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#8B949E", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              background: "#0D1117",
              border: "1px solid #30363D",
              borderRadius: 8,
              fontSize: 12,
            }}
            itemStyle={{ color: "#6384f1" }}
            labelStyle={{ color: "#E6EDF3", fontWeight: 600 }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#6366F1"
            strokeWidth={2.5}
            dot={{
              r: 4,
              fill: "#FFFFFF", // Inside white
              stroke: "#6366F1", // Blue border
              strokeWidth: 2.5,
            }}
            activeDot={{
              r: 7,
              fill: "#FFFFFF",
              stroke: "#6366F1",
              strokeWidth: 3,
            }}
            name="Applications"
          />
        </RechartsLine>
      </ResponsiveContainer>
    </div>
  );
}
