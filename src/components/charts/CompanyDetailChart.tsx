"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { CompanyFinancials } from "@/data/financials";
import { COMPANIES } from "@/data/companies";
import ChartContainer from "@/components/ui/ChartContainer";

interface Props {
  financials: CompanyFinancials;
}

export default function CompanyDetailChart({ financials }: Props) {
  const company = COMPANIES[financials.ticker];
  const data = financials.data.map((row) => ({
    year: row.year,
    revenue: row.revenue,
    capex: row.capex,
    depreciation: row.depreciation,
    netMargin: row.revenue > 0 ? parseFloat(((row.netIncome / row.revenue) * 100).toFixed(1)) : 0,
    isProjected: row.isProjected ?? false,
  }));

  return (
    <ChartContainer
      headline={`${company?.name ?? financials.ticker}: Revenue vs. the cost of infrastructure.`}
      subhead="Revenue (bars), capex, and depreciation in $B; net margin % on right axis"
      note={`Source: ${financials.ticker} 10-K filings. Depreciation assumes ${financials.usefulLifeYears}-year useful life. Dashed bars = projected.`}
    >
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d8d6d0" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", fill: "#5a5a5a" }}
            tickLine={false}
            axisLine={{ stroke: "#0f0f0f", strokeWidth: 1.5 }}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", fill: "#5a5a5a" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v}B`}
            width={60}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", fill: "#1a6e3f" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
            width={45}
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
              const n = String(name);
              if (n === "netMargin") return [`${value}%`, "Net Margin"];
              return [`$${Number(value).toFixed(1)}B`, n.charAt(0).toUpperCase() + n.slice(1)];
            }}
          />
          <Legend
            wrapperStyle={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}
            formatter={(value: string) => {
              const labels: Record<string, string> = {
                revenue: "Revenue",
                capex: "CapEx",
                depreciation: "Depreciation",
                netMargin: "Net Margin %",
              };
              return labels[value] ?? value;
            }}
          />
          <ReferenceLine x={2025} yAxisId="left" stroke="#0f0f0f" strokeDasharray="2 4" strokeWidth={1} opacity={0.3} />
          <Bar yAxisId="left" dataKey="revenue" fill="#d8d6d0" radius={[2, 2, 0, 0]} maxBarSize={40} />
          <Line yAxisId="left" type="monotone" dataKey="capex" stroke="#b8281c" strokeWidth={2.5} dot={{ r: 3, fill: "#b8281c" }} />
          <Line yAxisId="left" type="monotone" dataKey="depreciation" stroke="#c46a18" strokeWidth={2.5} dot={{ r: 3, fill: "#c46a18" }} />
          <Line yAxisId="right" type="monotone" dataKey="netMargin" stroke="#1a6e3f" strokeWidth={2} strokeDasharray="4 3" dot={{ r: 3, fill: "#1a6e3f" }} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
