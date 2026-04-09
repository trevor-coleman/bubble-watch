"use client";

interface MetricCardProps {
  label: string;
  value: string;
  subValue?: string;
  trend?: "up" | "down" | "neutral";
  color?: string;
}

export default function MetricCard({
  label,
  value,
  subValue,
  trend,
  color,
}: MetricCardProps) {
  const trendColor =
    trend === "up"
      ? "text-capex"
      : trend === "down"
        ? "text-revenue"
        : "text-ink-mid";

  return (
    <div className="bg-bg-chart border border-rule-soft p-5">
      <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mid mb-2">
        {label}
      </div>
      <div
        className="font-serif font-bold text-3xl tracking-tight"
        style={color ? { color } : undefined}
      >
        {value}
      </div>
      {subValue && (
        <div className={`font-mono text-[11px] mt-1 ${trendColor}`}>
          {subValue}
        </div>
      )}
    </div>
  );
}
