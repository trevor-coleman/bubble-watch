"use client";

import Link from "next/link";
import { COMPANIES } from "@/data/companies";
import { CompanyFinancials } from "@/data/financials";

interface Props {
  financials: CompanyFinancials;
}

export default function CompanySummaryRow({ financials }: Props) {
  const company = COMPANIES[financials.ticker];
  const latest = financials.data.filter((d) => !d.isProjected).pop();
  const projected2028 = financials.data.find((d) => d.year === 2028);

  if (!latest || !company) return null;

  const currentMargin = latest.revenue > 0 ? (latest.netIncome / latest.revenue) * 100 : 0;
  const projectedMargin = projected2028 && projected2028.revenue > 0
    ? (projected2028.netIncome / projected2028.revenue) * 100 : 0;
  const currentDepRev = latest.revenue > 0 ? (latest.depreciation / latest.revenue) * 100 : 0;
  const projectedDepRev = projected2028 && projected2028.revenue > 0
    ? (projected2028.depreciation / projected2028.revenue) * 100 : 0;

  return (
    <Link
      href={`/company/${financials.ticker.toLowerCase()}`}
      className="block bg-bg-chart border border-rule-soft hover:border-rule transition-colors p-5 sm:p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: company.color }} />
            <span className="font-mono text-xs font-bold tracking-wider">{company.ticker}</span>
          </div>
          <div className="font-serif text-lg font-semibold mt-1">{company.name}</div>
        </div>
        {latest.peRatio && latest.peRatio > 0 && (
          <div className="text-right">
            <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mid">P/E</div>
            <div className="font-serif font-bold text-2xl">{latest.peRatio}x</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="bg-bg p-2">
          <div className="font-mono text-[9px] tracking-wider uppercase text-ink-mid">CapEx</div>
          <div className="font-serif font-bold text-sm">${latest.capex.toFixed(0)}B</div>
        </div>
        <div className="bg-bg p-2">
          <div className="font-mono text-[9px] tracking-wider uppercase text-ink-mid">Net Margin</div>
          <div className="font-serif font-bold text-sm">{currentMargin.toFixed(1)}%</div>
          <div className="font-mono text-[9px] text-capex">
            {projectedMargin.toFixed(1)}% by &apos;28
          </div>
        </div>
        <div className="bg-bg p-2">
          <div className="font-mono text-[9px] tracking-wider uppercase text-ink-mid">Dep/Rev</div>
          <div className="font-serif font-bold text-sm">{currentDepRev.toFixed(1)}%</div>
          <div className="font-mono text-[9px] text-capex">
            {projectedDepRev.toFixed(1)}% by &apos;28
          </div>
        </div>
        <div className="bg-bg p-2">
          <div className="font-mono text-[9px] tracking-wider uppercase text-ink-mid">FCF</div>
          <div className={`font-serif font-bold text-sm ${(latest.freeCashFlow ?? 0) < 0 ? "text-capex" : ""}`}>
            ${latest.freeCashFlow?.toFixed(0) ?? "N/A"}B
          </div>
        </div>
      </div>

      <div className="mt-3 font-mono text-[10px] text-ink-faint">
        {company.description}
      </div>
    </Link>
  );
}
