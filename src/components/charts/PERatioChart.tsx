"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { ALL_FINANCIALS } from "@/data/financials";
import { COMPANIES } from "@/data/companies";
import ChartContainer from "@/components/ui/ChartContainer";

interface DataPoint {
  ticker: string;
  name: string;
  peRatio: number;
  color: string;
}

function buildPEData(): DataPoint[] {
  return ALL_FINANCIALS
    .map((company) => {
      const latest = company.data.filter((d) => !d.isProjected && d.peRatio && d.peRatio > 0).pop();
      return {
        ticker: company.ticker,
        name: COMPANIES[company.ticker]?.name ?? company.ticker,
        peRatio: latest?.peRatio ?? 0,
        color: COMPANIES[company.ticker]?.color ?? "#333",
      };
    })
    .sort((a, b) => b.peRatio - a.peRatio);
}

export default function PERatioChart() {
  const data = buildPEData();

  return (
    <ChartContainer
      headline="What the market pays for each dollar of earnings."
      subhead="Trailing P/E ratio, most recent fiscal year"
      note="Source: Market data. A high P/E signals the market believes these are software businesses. A re-rating to industrial multiples (12-18x) would halve some valuations."
    >
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 40, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#d8d6d0" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", fill: "#5a5a5a" }}
            tickLine={false}
            axisLine={{ stroke: "#0f0f0f", strokeWidth: 1.5 }}
            tickFormatter={(v) => `${v}x`}
          />
          <YAxis
            type="category"
            dataKey="ticker"
            tick={{ fontSize: 12, fontFamily: "JetBrains Mono, monospace", fill: "#0f0f0f", fontWeight: 700 }}
            tickLine={false}
            axisLine={false}
            width={55}
          />
          <Tooltip
            contentStyle={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              background: "#fff",
              border: "1px solid #0f0f0f",
              borderRadius: 0,
            }}
            formatter={(value, _name, props) => [
              `${value}x earnings`,
              (props as unknown as { payload: DataPoint }).payload.name,
            ]}
          />
          <ReferenceLine
            x={15}
            stroke="#5a5a5a"
            strokeDasharray="4 3"
            strokeWidth={1}
            label={{ value: "Industrial avg ~15x", fontSize: 10, fill: "#5a5a5a", position: "top" }}
          />
          <Bar dataKey="peRatio" radius={[0, 4, 4, 0]} maxBarSize={36}>
            {data.map((entry) => (
              <Cell key={entry.ticker} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
