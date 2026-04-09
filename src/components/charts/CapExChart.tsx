"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import { ALL_FINANCIALS } from "@/data/financials";
import { COMPANIES } from "@/data/companies";
import ChartContainer from "@/components/ui/ChartContainer";

interface DataPoint {
  year: number;
  [key: string]: number | undefined;
}

function buildCapExData(): DataPoint[] {
  const yearMap = new Map<number, DataPoint>();

  for (const company of ALL_FINANCIALS) {
    for (const row of company.data) {
      if (!yearMap.has(row.year)) {
        yearMap.set(row.year, { year: row.year });
      }
      const point = yearMap.get(row.year)!;
      point[company.ticker] = row.capex;
    }
  }

  return Array.from(yearMap.values()).sort((a, b) => a.year - b.year);
}

export default function CapExChart() {
  const data = buildCapExData();

  return (
    <ChartContainer
      headline="Capital expenditure is going vertical."
      subhead="Annual capex by company, in billions of dollars"
      note="Source: 10-K filings and company guidance. 2026-2028 based on stated plans."
    >
      <ResponsiveContainer width="100%" height={420}>
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
            tickFormatter={(v) => `$${v}B`}
            width={60}
          />
          <Tooltip
            contentStyle={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              background: "#fff",
              border: "1px solid #0f0f0f",
              borderRadius: 0,
            }}
            formatter={(value, name) => [`$${Number(value).toFixed(1)}B`, COMPANIES[String(name)]?.name ?? String(name)]}
            labelFormatter={(label) => `${label}`}
          />
          <Legend
            wrapperStyle={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}
            formatter={(value: string) => COMPANIES[value]?.name ?? value}
          />
          <ReferenceLine x={2022} stroke="#b8281c" strokeDasharray="3 3" strokeWidth={1} opacity={0.5} label={{ value: "ChatGPT", fontSize: 10, fill: "#b8281c", position: "top" }} />
          {ALL_FINANCIALS.map((company) => (
            <Line
              key={company.ticker}
              type="monotone"
              dataKey={company.ticker}
              stroke={COMPANIES[company.ticker]?.color ?? "#333"}
              strokeWidth={company.ticker === "ORCL" ? 3 : 2}
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
