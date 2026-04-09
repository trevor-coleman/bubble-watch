"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { CISCO_STOCK_HISTORY } from "@/data/financials";
import ChartContainer from "@/components/ui/ChartContainer";

export default function CiscoChart() {
  const data = CISCO_STOCK_HISTORY.map((d) => ({
    year: d.year,
    price: d.price,
  }));

  return (
    <ChartContainer
      headline="The ghost from the last cycle."
      headlineEmphasis="Cisco, 1995-2025."
      subhead="Split-adjusted stock price, in US dollars"
      note="Source: Yahoo Finance, company filings. Cisco's stock closed at $80.25 on December 10, 2025, finally exceeding its March 27, 2000 peak of $80.06. 25 years, 8 months to recover."
    >
      <ResponsiveContainer width="100%" height={380}>
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
            tickFormatter={(v) => `$${v}`}
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
            formatter={(value) => [`$${Number(value).toFixed(2)}`, "Stock Price"]}
          />
          <ReferenceLine
            y={80.06}
            stroke="#b8281c"
            strokeDasharray="4 3"
            strokeWidth={1}
            label={{ value: "March 2000 peak: $80.06", fontSize: 10, fill: "#b8281c", position: "right" }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#c49a2c"
            fill="#c49a2c"
            fillOpacity={0.1}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: "#c49a2c" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
