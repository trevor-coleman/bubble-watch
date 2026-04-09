"use client";

import {
  AreaChart,
  Area,
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
  totalCapex: number;
  totalDepreciation: number;
  gap: number;
}

function buildAggregateData(): DataPoint[] {
  const yearMap = new Map<number, { capex: number; dep: number }>();

  for (const company of ALL_FINANCIALS) {
    for (const row of company.data) {
      if (!yearMap.has(row.year)) {
        yearMap.set(row.year, { capex: 0, dep: 0 });
      }
      const point = yearMap.get(row.year)!;
      point.capex += row.capex;
      point.dep += row.depreciation;
    }
  }

  return Array.from(yearMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([year, vals]) => ({
      year,
      totalCapex: Math.round(vals.capex),
      totalDepreciation: Math.round(vals.dep),
      gap: Math.round(vals.capex - vals.dep),
    }));
}

export default function DepreciationWaveChart() {
  const data = buildAggregateData();

  return (
    <ChartContainer
      headline="The depreciation wave is still building."
      subhead="Combined capex vs. depreciation for all five hyperscalers, in billions"
      note="Source: 10-K filings and company guidance. Depreciation projected mechanically from prior capex and stated useful-life schedules."
    >
      <ResponsiveContainer width="100%" height={420}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
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
            width={65}
          />
          <Tooltip
            contentStyle={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              background: "#fff",
              border: "1px solid #0f0f0f",
              borderRadius: 0,
            }}
            formatter={(value, name) => {
              const labels: Record<string, string> = {
                totalCapex: "Total CapEx",
                totalDepreciation: "Total Depreciation",
                gap: "Gap (future bills)",
              };
              return [`$${value}B`, labels[String(name)] ?? String(name)];
            }}
          />
          <Legend
            wrapperStyle={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}
            formatter={(value: string) => {
              const labels: Record<string, string> = {
                totalCapex: "Total CapEx (spending)",
                totalDepreciation: "Total Depreciation (the bill)",
              };
              return labels[value] ?? value;
            }}
          />
          <ReferenceLine x={2025} stroke="#0f0f0f" strokeDasharray="2 4" strokeWidth={1} opacity={0.3} label={{ value: "Projected →", fontSize: 9, fill: "#5a5a5a", position: "top" }} />
          <Area
            type="monotone"
            dataKey="totalCapex"
            stroke="#b8281c"
            fill="#b8281c"
            fillOpacity={0.08}
            strokeWidth={3}
            dot={{ r: 3, fill: "#b8281c" }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="totalDepreciation"
            stroke="#c46a18"
            strokeWidth={3}
            dot={{ r: 3, fill: "#c46a18" }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
