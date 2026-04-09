"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ALL_FINANCIALS } from "@/data/financials";
import { COMPANIES } from "@/data/companies";
import CompanyDetailChart from "@/components/charts/CompanyDetailChart";
import MetricCard from "@/components/ui/MetricCard";

export default function CompanyPage() {
  const params = useParams();
  const ticker = (params.ticker as string).toUpperCase();
  const financials = ALL_FINANCIALS.find((f) => f.ticker === ticker);
  const company = COMPANIES[ticker];

  if (!financials || !company) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-20">
        <h1 className="font-serif text-3xl font-bold mb-4">Company not found</h1>
        <Link href="/" className="font-mono text-sm text-accent underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const latest = financials.data.filter((d) => !d.isProjected).pop()!;
  const projected2028 = financials.data.find((d) => d.year === 2028);
  const earliest = financials.data[0];

  const currentMargin = (latest.netIncome / latest.revenue) * 100;
  const projectedMargin2028 = projected2028
    ? (projected2028.netIncome / projected2028.revenue) * 100
    : 0;
  const currentDepRev = (latest.depreciation / latest.revenue) * 100;
  const projectedDepRev2028 = projected2028
    ? (projected2028.depreciation / projected2028.revenue) * 100
    : 0;
  const capexGrowth = ((latest.capex - earliest.capex) / earliest.capex) * 100;

  return (
    <div className="min-h-screen">
      <header className="max-w-3xl mx-auto px-5 sm:px-7 pt-12 pb-8">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-wider text-accent uppercase hover:underline mb-6 inline-block"
        >
          &larr; Back to Dashboard
        </Link>
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: company.color }}
          />
          <span className="font-mono text-sm font-bold tracking-wider">
            {company.ticker}
          </span>
        </div>
        <h1 className="font-serif font-extrabold text-4xl sm:text-5xl leading-tight tracking-tight mb-4">
          {company.name}
        </h1>
        <p className="text-lg text-ink-soft max-w-xl">{company.description}</p>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-7 pb-24">
        {/* Key metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          <MetricCard
            label="Revenue"
            value={`$${latest.revenue.toFixed(0)}B`}
            subValue={`${latest.year}`}
          />
          <MetricCard
            label="Net Margin"
            value={`${currentMargin.toFixed(1)}%`}
            subValue={`${projectedMargin2028.toFixed(1)}% by '28`}
            trend={projectedMargin2028 < currentMargin ? "up" : "down"}
            color={company.color}
          />
          <MetricCard
            label="CapEx"
            value={`$${latest.capex.toFixed(0)}B`}
            subValue={`+${capexGrowth.toFixed(0)}% since '18`}
            trend="up"
          />
          <MetricCard
            label="Dep/Rev"
            value={`${currentDepRev.toFixed(1)}%`}
            subValue={`${projectedDepRev2028.toFixed(1)}% by '28`}
            trend="up"
            color={company.color}
          />
          <MetricCard
            label="P/E Ratio"
            value={latest.peRatio && latest.peRatio > 0 ? `${latest.peRatio}x` : "N/A"}
          />
          <MetricCard
            label="Free Cash Flow"
            value={`$${latest.freeCashFlow?.toFixed(0) ?? "N/A"}B`}
            trend={(latest.freeCashFlow ?? 0) < 0 ? "up" : "neutral"}
          />
        </div>

        {/* Detail chart */}
        <div className="mb-12">
          <CompanyDetailChart financials={financials} />
        </div>

        {/* Data table */}
        <div className="bg-bg-chart border border-rule overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-rule">
                <th className="font-mono text-[10px] tracking-widest uppercase text-ink-mid text-left p-3">
                  Year
                </th>
                <th className="font-mono text-[10px] tracking-widest uppercase text-ink-mid text-right p-3">
                  Revenue
                </th>
                <th className="font-mono text-[10px] tracking-widest uppercase text-ink-mid text-right p-3">
                  Net Income
                </th>
                <th className="font-mono text-[10px] tracking-widest uppercase text-ink-mid text-right p-3">
                  Margin
                </th>
                <th className="font-mono text-[10px] tracking-widest uppercase text-ink-mid text-right p-3">
                  CapEx
                </th>
                <th className="font-mono text-[10px] tracking-widest uppercase text-ink-mid text-right p-3">
                  D&A
                </th>
                <th className="font-mono text-[10px] tracking-widest uppercase text-ink-mid text-right p-3">
                  D/Rev
                </th>
                <th className="font-mono text-[10px] tracking-widest uppercase text-ink-mid text-right p-3">
                  FCF
                </th>
              </tr>
            </thead>
            <tbody>
              {financials.data.map((row) => {
                const margin = row.revenue > 0 ? (row.netIncome / row.revenue) * 100 : 0;
                const depRev = row.revenue > 0 ? (row.depreciation / row.revenue) * 100 : 0;
                return (
                  <tr
                    key={row.year}
                    className={`border-b border-rule-soft ${row.isProjected ? "text-ink-mid italic" : ""}`}
                  >
                    <td className="font-mono text-xs p-3 font-medium">
                      {row.year}
                      {row.isProjected && (
                        <span className="text-[9px] ml-1 text-ink-faint">proj</span>
                      )}
                    </td>
                    <td className="font-mono text-xs text-right p-3">${row.revenue.toFixed(1)}B</td>
                    <td className={`font-mono text-xs text-right p-3 ${row.netIncome < 0 ? "text-capex" : ""}`}>
                      ${row.netIncome.toFixed(1)}B
                    </td>
                    <td className={`font-mono text-xs text-right p-3 ${margin < 10 ? "text-capex font-medium" : ""}`}>
                      {margin.toFixed(1)}%
                    </td>
                    <td className="font-mono text-xs text-right p-3">${row.capex.toFixed(1)}B</td>
                    <td className="font-mono text-xs text-right p-3 text-depreciation">
                      ${row.depreciation.toFixed(1)}B
                    </td>
                    <td className={`font-mono text-xs text-right p-3 ${depRev > 25 ? "text-capex font-medium" : ""}`}>
                      {depRev.toFixed(1)}%
                    </td>
                    <td className={`font-mono text-xs text-right p-3 ${(row.freeCashFlow ?? 0) < 0 ? "text-capex" : ""}`}>
                      {row.freeCashFlow !== undefined ? `$${row.freeCashFlow.toFixed(1)}B` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 font-mono text-[10px] text-ink-mid tracking-wide">
          Source: {company.ticker} 10-K filings via SEC EDGAR. Projected years based
          on company capex guidance and {financials.usefulLifeYears}-year useful-life
          depreciation schedule.
        </div>
      </main>
    </div>
  );
}
