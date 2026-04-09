"use client";

import { ALL_FINANCIALS } from "@/data/financials";
import SectionHeader from "@/components/ui/SectionHeader";
import CompanySummaryRow from "@/components/dashboard/CompanySummaryRow";
import CapExChart from "@/components/charts/CapExChart";
import DepreciationWaveChart from "@/components/charts/DepreciationWaveChart";
import MarginChart from "@/components/charts/MarginChart";
import DepRevenueRatioChart from "@/components/charts/DepRevenueRatioChart";
import PERatioChart from "@/components/charts/PERatioChart";
import FreeCashFlowChart from "@/components/charts/FreeCashFlowChart";
import CiscoChart from "@/components/charts/CiscoChart";

export default function Dashboard() {
  const latestYear = 2025;
  const totalCapex = ALL_FINANCIALS.reduce((sum, c) => {
    const row = c.data.find((d) => d.year === latestYear);
    return sum + (row?.capex ?? 0);
  }, 0);
  const projected2026Capex = ALL_FINANCIALS.reduce((sum, c) => {
    const row = c.data.find((d) => d.year === 2026);
    return sum + (row?.capex ?? 0);
  }, 0);

  return (
    <div className="min-h-screen">
      {/* Masthead */}
      <header className="max-w-3xl mx-auto px-5 sm:px-7 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-accent mb-8 pb-5 border-b border-rule flex justify-between items-baseline">
          <span>Metrics Dashboard</span>
          <span className="text-ink-mid font-normal">Updated April 2026</span>
        </div>
        <h1 className="font-serif font-extrabold text-5xl sm:text-7xl leading-[0.9] tracking-tight mb-8">
          The bill<br />comes <em className="font-normal italic text-ink-soft">due</em>.
        </h1>
        <p className="text-xl sm:text-[23px] leading-relaxed text-ink-soft max-w-xl mb-8">
          Tracking capital expenditure, depreciation, and margin compression
          across the five largest AI infrastructure investors. The thesis: these
          companies are being priced as software businesses while becoming
          industrial ones.
        </p>
        <div className="font-mono text-[10px] tracking-wider text-ink-mid uppercase pt-5 border-t border-rule-soft">
          Data from SEC filings, company guidance, and public market sources
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-7 pb-24">
        {/* Headline stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-rule-soft border border-rule-soft mb-16">
          <div className="bg-bg-chart p-6 text-center">
            <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mid mb-2">
              2025 Combined CapEx
            </div>
            <div className="font-serif font-bold text-4xl tracking-tight text-capex">
              ${totalCapex.toFixed(0)}B
            </div>
            <div className="font-mono text-[10px] text-ink-faint mt-1">
              five companies
            </div>
          </div>
          <div className="bg-bg-chart p-6 text-center">
            <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mid mb-2">
              2026 Planned CapEx
            </div>
            <div className="font-serif font-bold text-4xl tracking-tight text-accent">
              ${projected2026Capex.toFixed(0)}B
            </div>
            <div className="font-mono text-[10px] text-ink-faint mt-1">
              per company guidance
            </div>
          </div>
          <div className="bg-bg-chart p-6 text-center">
            <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mid mb-2">
              The Cisco Precedent
            </div>
            <div className="font-serif font-bold text-4xl tracking-tight text-gold">
              25 yrs
            </div>
            <div className="font-mono text-[10px] text-ink-faint mt-1">
              to recover from re-rating
            </div>
          </div>
        </div>

        {/* Company overview cards */}
        <SectionHeader number="Overview" title="Five companies under the microscope." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {ALL_FINANCIALS.map((financials) => (
            <CompanySummaryRow key={financials.ticker} financials={financials} />
          ))}
        </div>

        {/* Capital Expenditure */}
        <SectionHeader
          number="Chart 1 — Capital Expenditure"
          title="The spending is unprecedented and accelerating."
        />
        <p className="text-lg leading-relaxed text-ink-soft mb-8 max-w-2xl">
          After ChatGPT launched in November 2022, every major tech company
          began racing to build AI infrastructure at enormous scale. Combined
          spending for 2026 is projected at ${projected2026Capex.toFixed(0)}B —
          larger than the GDP of most countries.
        </p>
        <div className="mb-16">
          <CapExChart />
        </div>

        {/* Depreciation Wave */}
        <SectionHeader
          number="Chart 2 — The Depreciation Wave"
          title="The bill arrives on a delay."
        />
        <p className="text-lg leading-relaxed text-ink-soft mb-8 max-w-2xl">
          Capital spending creates depreciation costs that arrive over the next
          5-6 years. The gap between spending and its accounting cost is still
          widening. The biggest bills from 2025-2026 spending haven&apos;t arrived yet.
        </p>
        <div className="mb-16">
          <DepreciationWaveChart />
        </div>

        {/* Profit Margins */}
        <SectionHeader
          number="Chart 3 — Margin Compression"
          title="From software margins to industrial territory."
        />
        <p className="text-lg leading-relaxed text-ink-soft mb-8 max-w-2xl">
          As depreciation bills arrive, net profit margins compress. Companies
          that once earned 30-40% margins may find themselves at 10-20% — still
          profitable, but no longer priced like software businesses.
        </p>
        <div className="mb-16">
          <MarginChart />
        </div>

        {/* Dep / Revenue Ratio - The Key Chart */}
        <SectionHeader
          number="Chart 4 — The Key Metric"
          title="For every dollar earned, how much goes to yesterday's bills?"
        />
        <p className="text-lg leading-relaxed text-ink-soft mb-8 max-w-2xl">
          This is the single most important chart. In 2020, every hyperscaler
          spent 5-10 cents of every revenue dollar on depreciation. By 2028,
          Oracle will spend 44 cents. Meta, 33 cents. The fan-out reveals who
          is most exposed.
        </p>
        <div className="mb-16">
          <DepRevenueRatioChart />
        </div>

        {/* P/E Ratios */}
        <SectionHeader
          number="Chart 5 — Valuation"
          title="What the market pays for each dollar of earnings."
        />
        <p className="text-lg leading-relaxed text-ink-soft mb-8 max-w-2xl">
          These companies are still priced at software multiples (20-40x
          earnings). If the market decides they deserve industrial multiples
          (12-18x), stock prices could halve even if earnings stay flat. This is
          how a re-rating works.
        </p>
        <div className="mb-16">
          <PERatioChart />
        </div>

        {/* Free Cash Flow */}
        <SectionHeader
          number="Chart 6 — Free Cash Flow"
          title="Cash generation is turning negative."
        />
        <p className="text-lg leading-relaxed text-ink-soft mb-8 max-w-2xl">
          Free cash flow — operating cash minus capital spending — is the
          lifeblood of any business. Oracle is already negative. Several others
          are heading there. Negative FCF means borrowing or diluting to fund
          the buildout.
        </p>
        <div className="mb-16">
          <FreeCashFlowChart />
        </div>

        {/* Cisco */}
        <SectionHeader
          number="Chart 7 — The Precedent"
          title="Twenty-five years ago, the same thing happened."
        />
        <p className="text-lg leading-relaxed text-ink-soft mb-8 max-w-2xl">
          Cisco became the most valuable company in the world building internet
          infrastructure. Its stock fell 89% and took 25 years to recover — not
          because the business failed, but because investors had paid software
          prices for a hardware business.
        </p>
        <div className="mb-16">
          <CiscoChart />
        </div>

        {/* Methodology */}
        <div className="mt-20 pt-12 border-t border-rule">
          <div className="font-mono text-[10px] leading-relaxed text-ink-mid tracking-wide space-y-3">
            <p>
              <strong className="text-ink-soft font-bold">METHODOLOGY.</strong>{" "}
              Historical figures from company 10-K and 10-Q filings via SEC
              EDGAR. 2026-2028 projections reflect company capex guidance and
              mechanical depreciation on stated useful-life schedules.
            </p>
            <p>
              <strong className="text-ink-soft font-bold">CAVEATS.</strong>{" "}
              Projections are scenarios, not predictions. Capex commitments
              through 2027 are largely locked in by infrastructure contracts.
              This is not investment advice.
            </p>
            <p>
              <strong className="text-ink-soft font-bold">DATA SOURCES.</strong>{" "}
              SEC EDGAR, CreditSights, Platformonomics, Yahoo Finance, company
              earnings calls and investor presentations.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
