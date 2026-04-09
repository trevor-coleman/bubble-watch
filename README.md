# Bubble Watch

A metrics dashboard tracking capital expenditure, depreciation, and margin compression across the five largest AI infrastructure investors (META, MSFT, GOOG, AMZN, ORCL).

**Thesis:** These companies are being priced as software businesses while becoming industrial ones. History (Cisco, 2000) suggests you cannot be both for very long.

## Key Metrics Tracked

- **Capital Expenditure** — Infrastructure spending by company
- **Depreciation Wave** — The delayed accounting cost of prior spending
- **Net Profit Margins** — Compression from software to industrial territory
- **Depreciation / Revenue** — The key ratio showing exposure
- **P/E Ratios** — Current valuation multiples vs. industrial benchmarks
- **Free Cash Flow** — Cash generation turning negative

## Data Sources

- SEC EDGAR (10-K, 10-Q filings)
- Company earnings calls and guidance
- CreditSights, Platformonomics
- Yahoo Finance (stock data)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Tech Stack

- Next.js 16 + TypeScript
- Tailwind CSS 4
- Recharts
