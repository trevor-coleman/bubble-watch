"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  Legend,
} from "recharts";
import { ALL_FINANCIALS } from "@/data/financials";
import { COMPANIES } from "@/data/companies";
import ChartContainer from "@/components/ui/ChartContainer";

interface DataPoint {
  year: number;
  [key: string]: number | undefined;
}

function buildRatioData(): DataPoint[] {
  const yearMap = new Map<number, DataPoint>();

  for (const company of ALL_FINANCIALS) {
    for (const row of company.data) {
      if (!yearMap.has(row.year)) {
        yearMap.set(row.year, { year: row.year });
      }
      const point = yearMap.get(row.year)!;
      const ratio = row.revenue > 0 ? (row.depreciation / row.revenue) * 100 : 0;
      point[company.ticker] = parseFloat(ratio.toFixed(1));
    }
  }

  return Array.from(yearMap.values()).sort((a, b) => a.year - b.year);
}

export default function DepRevenueRatioChart() {
  const data = buildRatioData();

  return (
    <ChartContainer
      headline="For every dollar earned, how much goes to pay yesterday's bills?"
      subhead="Depreciation as a share of revenue, 2018 through 2028 projected"
      note="Source: 10-K filings. Oracle uses fiscal year ending May; all others calendar year. 2026-2028 projected from committed capex."
    >
      <ResponsiveContainer width="100%" height={460}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d8d6d0" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", fill: "#5a5a5a" }}
            tickLine={false}
            axisLine={{ stroke: "#0f0f0f", strokeWidth: 1.5 }}
          />
          <YAxis
            tick={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", fill: "#5a5a5a" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}¢`}
            width={45}
            domain={[0, 50]}
          />
          <Tooltip
            contentStyle={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              background: "#fff",
              border: "1px solid #0f0f0f",
              borderRadius: 0,
            }}
            formatter={(value, name) => [
              `${Number(value).toFixed(1)}¢ per dollar`,
              COMPANIES[String(name)]?.name ?? String(name),
            ]}
          />
          <Legend
            wrapperStyle={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}
            formatter={(value: string) => COMPANIES[value]?.name ?? value}
          />
          <ReferenceArea y1={25} y2={50} fill="#f4ead0" fillOpacity={0.3} label={{ value: "Industrial territory", fontSize: 10, fill: "#5a5a5a", position: "insideTopLeft" }} />
          {ALL_FINANCIALS.map((company) => (
            <Line
              key={company.ticker}
              type="monotone"
              dataKey={company.ticker}
              stroke={COMPANIES[company.ticker]?.color ?? "#333"}
              strokeWidth={company.ticker === "ORCL" ? 3.5 : 2.5}
              dot={{ r: 3, fill: COMPANIES[company.ticker]?.color ?? "#333" }}
              activeDot={{ r: 5 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
