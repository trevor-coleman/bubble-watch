/**
 * Financial data sourced from SEC 10-K filings, company guidance, and public earnings reports.
 * All dollar amounts in billions USD.
 *
 * Sources:
 * - Revenue, Net Income, CapEx, D&A: Company 10-K and 10-Q filings via SEC EDGAR
 * - 2026-2028 CapEx: Company guidance from earnings calls
 * - 2026-2028 Depreciation: Mechanical projection using each company's stated useful-life schedule
 * - P/E Ratios: Trailing P/E from public market data
 *
 * Last updated: April 2026
 */

export interface AnnualFinancials {
  year: number;
  revenue: number;           // Total revenue ($B)
  netIncome: number;         // Net income ($B)
  capex: number;             // Capital expenditures ($B)
  depreciation: number;      // Depreciation & amortization ($B)
  isProjected?: boolean;     // Whether this is projected vs actual
  peRatio?: number;          // Trailing P/E ratio (year-end)
  freeCashFlow?: number;     // Free cash flow ($B)
}

export interface CompanyFinancials {
  ticker: string;
  usefulLifeYears: number;   // Average useful life for depreciation
  data: AnnualFinancials[];
}

// ============================================================================
// META PLATFORMS
// ============================================================================
// Useful life: ~5.5 years average (servers ~5yr, buildings longer)
// Sources: Meta 10-K filings, Q4 2025 earnings guidance
export const META_FINANCIALS: CompanyFinancials = {
  ticker: "META",
  usefulLifeYears: 5.5,
  data: [
    { year: 2018, revenue: 55.8,  netIncome: 22.1, capex: 13.9, depreciation: 4.3,  peRatio: 20,  freeCashFlow: 15.4 },
    { year: 2019, revenue: 70.7,  netIncome: 18.5, capex: 15.1, depreciation: 5.7,  peRatio: 33,  freeCashFlow: 21.2 },
    { year: 2020, revenue: 86.0,  netIncome: 29.1, capex: 15.1, depreciation: 6.9,  peRatio: 27,  freeCashFlow: 23.6 },
    { year: 2021, revenue: 117.9, netIncome: 39.4, capex: 19.2, depreciation: 7.9,  peRatio: 24,  freeCashFlow: 39.1 },
    { year: 2022, revenue: 116.6, netIncome: 23.2, capex: 32.0, depreciation: 9.3,  peRatio: 14,  freeCashFlow: 19.0 },
    { year: 2023, revenue: 134.9, netIncome: 39.1, capex: 28.1, depreciation: 11.1, peRatio: 30,  freeCashFlow: 43.0 },
    { year: 2024, revenue: 164.5, netIncome: 62.4, capex: 39.2, depreciation: 14.2, peRatio: 26,  freeCashFlow: 52.1 },
    { year: 2025, revenue: 188.0, netIncome: 56.0, capex: 72.0, depreciation: 18.4, peRatio: 23,  freeCashFlow: 22.0 },
    { year: 2026, revenue: 215.0, netIncome: 52.0, capex: 125.0, depreciation: 30.0, isProjected: true, freeCashFlow: -5.0 },
    { year: 2027, revenue: 245.0, netIncome: 45.0, capex: 135.0, depreciation: 50.0, isProjected: true, freeCashFlow: -20.0 },
    { year: 2028, revenue: 275.0, netIncome: 38.0, capex: 120.0, depreciation: 72.0, isProjected: true, freeCashFlow: -10.0 },
  ],
};

// ============================================================================
// MICROSOFT
// ============================================================================
// Useful life: ~4-6 years (servers ~4yr, buildings 15-25yr, blended ~5yr)
// Sources: Microsoft 10-K filings (fiscal year ending June, shifted to calendar approx)
export const MSFT_FINANCIALS: CompanyFinancials = {
  ticker: "MSFT",
  usefulLifeYears: 5,
  data: [
    { year: 2018, revenue: 110.4, netIncome: 16.6, capex: 11.6, depreciation: 10.3, peRatio: 24, freeCashFlow: 32.3 },
    { year: 2019, revenue: 125.8, netIncome: 39.2, capex: 13.9, depreciation: 11.7, peRatio: 30, freeCashFlow: 38.3 },
    { year: 2020, revenue: 143.0, netIncome: 44.3, capex: 15.4, depreciation: 12.8, peRatio: 35, freeCashFlow: 45.2 },
    { year: 2021, revenue: 168.1, netIncome: 61.3, capex: 20.6, depreciation: 13.5, peRatio: 36, freeCashFlow: 56.1 },
    { year: 2022, revenue: 198.3, netIncome: 72.7, capex: 23.9, depreciation: 14.5, peRatio: 26, freeCashFlow: 65.1 },
    { year: 2023, revenue: 211.9, netIncome: 72.4, capex: 28.1, depreciation: 16.5, peRatio: 35, freeCashFlow: 59.5 },
    { year: 2024, revenue: 245.1, netIncome: 88.1, capex: 44.5, depreciation: 22.3, peRatio: 34, freeCashFlow: 74.1 },
    { year: 2025, revenue: 277.0, netIncome: 95.0, capex: 80.0, depreciation: 30.0, peRatio: 30, freeCashFlow: 55.0 },
    { year: 2026, revenue: 315.0, netIncome: 98.0, capex: 110.0, depreciation: 45.0, isProjected: true, freeCashFlow: 30.0 },
    { year: 2027, revenue: 355.0, netIncome: 100.0, capex: 120.0, depreciation: 62.0, isProjected: true, freeCashFlow: 15.0 },
    { year: 2028, revenue: 400.0, netIncome: 102.0, capex: 110.0, depreciation: 80.0, isProjected: true, freeCashFlow: 10.0 },
  ],
};

// ============================================================================
// ALPHABET (GOOGLE)
// ============================================================================
// Useful life: ~5-6 years (servers ~5yr, network equipment ~5yr)
// Sources: Alphabet 10-K filings
export const GOOG_FINANCIALS: CompanyFinancials = {
  ticker: "GOOG",
  usefulLifeYears: 5.5,
  data: [
    { year: 2018, revenue: 136.8, netIncome: 30.7, capex: 25.1, depreciation: 9.0,   peRatio: 23, freeCashFlow: 22.8 },
    { year: 2019, revenue: 161.9, netIncome: 34.3, capex: 23.5, depreciation: 11.2,  peRatio: 28, freeCashFlow: 30.9 },
    { year: 2020, revenue: 182.5, netIncome: 40.3, capex: 22.3, depreciation: 12.9,  peRatio: 34, freeCashFlow: 42.8 },
    { year: 2021, revenue: 257.6, netIncome: 76.0, capex: 24.6, depreciation: 13.9,  peRatio: 26, freeCashFlow: 67.0 },
    { year: 2022, revenue: 282.8, netIncome: 59.6, capex: 31.5, depreciation: 15.3,  peRatio: 20, freeCashFlow: 60.0 },
    { year: 2023, revenue: 307.4, netIncome: 73.8, capex: 32.3, depreciation: 17.0,  peRatio: 27, freeCashFlow: 69.5 },
    { year: 2024, revenue: 350.0, netIncome: 94.3, capex: 52.5, depreciation: 20.8,  peRatio: 24, freeCashFlow: 72.8 },
    { year: 2025, revenue: 390.0, netIncome: 95.0, capex: 75.0, depreciation: 27.0,  peRatio: 22, freeCashFlow: 55.0 },
    { year: 2026, revenue: 435.0, netIncome: 92.0, capex: 100.0, depreciation: 40.0, isProjected: true, freeCashFlow: 25.0 },
    { year: 2027, revenue: 480.0, netIncome: 88.0, capex: 110.0, depreciation: 58.0, isProjected: true, freeCashFlow: 5.0 },
    { year: 2028, revenue: 530.0, netIncome: 85.0, capex: 100.0, depreciation: 78.0, isProjected: true, freeCashFlow: -5.0 },
  ],
};

// ============================================================================
// AMAZON
// ============================================================================
// Useful life: ~5-6 years (servers ~5yr, network ~5yr, leases longer)
// Sources: Amazon 10-K filings
export const AMZN_FINANCIALS: CompanyFinancials = {
  ticker: "AMZN",
  usefulLifeYears: 5.5,
  data: [
    { year: 2018, revenue: 232.9, netIncome: 10.1, capex: 13.4, depreciation: 15.3, peRatio: 80,  freeCashFlow: 19.4 },
    { year: 2019, revenue: 280.5, netIncome: 11.6, capex: 16.9, depreciation: 21.8, peRatio: 80,  freeCashFlow: 25.8 },
    { year: 2020, revenue: 386.1, netIncome: 21.3, capex: 40.1, depreciation: 25.3, peRatio: 73,  freeCashFlow: 31.0 },
    { year: 2021, revenue: 469.8, netIncome: 33.4, capex: 61.1, depreciation: 34.4, peRatio: 60,  freeCashFlow: -9.1 },
    { year: 2022, revenue: 514.0, netIncome: -2.7, capex: 63.6, depreciation: 41.9, peRatio: -1,  freeCashFlow: -11.6 },
    { year: 2023, revenue: 574.8, netIncome: 30.4, capex: 48.4, depreciation: 48.7, peRatio: 58,  freeCashFlow: 36.8 },
    { year: 2024, revenue: 638.0, netIncome: 59.2, capex: 77.6, depreciation: 55.2, peRatio: 38,  freeCashFlow: 38.2 },
    { year: 2025, revenue: 700.0, netIncome: 62.0, capex: 100.0, depreciation: 62.0, peRatio: 35, freeCashFlow: 25.0 },
    { year: 2026, revenue: 770.0, netIncome: 58.0, capex: 120.0, depreciation: 75.0, isProjected: true, freeCashFlow: 5.0 },
    { year: 2027, revenue: 845.0, netIncome: 55.0, capex: 130.0, depreciation: 92.0, isProjected: true, freeCashFlow: -10.0 },
    { year: 2028, revenue: 925.0, netIncome: 52.0, capex: 120.0, depreciation: 110.0, isProjected: true, freeCashFlow: -15.0 },
  ],
};

// ============================================================================
// ORACLE
// ============================================================================
// Useful life: ~4-5 years (aggressive schedule)
// Oracle fiscal year ends May; shifted to calendar year for comparison
// Sources: Oracle 10-K filings, investor presentations
export const ORCL_FINANCIALS: CompanyFinancials = {
  ticker: "ORCL",
  usefulLifeYears: 4.5,
  data: [
    { year: 2018, revenue: 39.8, netIncome: 3.8,  capex: 1.7,  depreciation: 1.5,  peRatio: 18, freeCashFlow: 12.5 },
    { year: 2019, revenue: 39.5, netIncome: 11.1, capex: 1.6,  depreciation: 1.9,  peRatio: 17, freeCashFlow: 11.5 },
    { year: 2020, revenue: 40.5, netIncome: 10.1, capex: 1.6,  depreciation: 2.1,  peRatio: 19, freeCashFlow: 11.2 },
    { year: 2021, revenue: 42.4, netIncome: 13.7, capex: 3.6,  depreciation: 2.5,  peRatio: 20, freeCashFlow: 10.1 },
    { year: 2022, revenue: 50.0, netIncome: 6.7,  capex: 6.8,  depreciation: 3.0,  peRatio: 28, freeCashFlow: 4.2 },
    { year: 2023, revenue: 53.0, netIncome: 8.5,  capex: 8.3,  depreciation: 4.5,  peRatio: 35, freeCashFlow: 1.5 },
    { year: 2024, revenue: 56.1, netIncome: 10.5, capex: 11.0, depreciation: 5.8,  peRatio: 40, freeCashFlow: -1.0 },
    { year: 2025, revenue: 63.0, netIncome: 10.0, capex: 20.0, depreciation: 8.5,  peRatio: 35, freeCashFlow: -6.0 },
    { year: 2026, revenue: 72.0, netIncome: 7.0,  capex: 35.0, depreciation: 14.0, isProjected: true, freeCashFlow: -18.0 },
    { year: 2027, revenue: 82.0, netIncome: 3.0,  capex: 40.0, depreciation: 24.0, isProjected: true, freeCashFlow: -28.0 },
    { year: 2028, revenue: 92.0, netIncome: -2.0, capex: 35.0, depreciation: 36.0, isProjected: true, freeCashFlow: -30.0 },
  ],
};

// ============================================================================
// CISCO (historical comparison)
// ============================================================================
export const CISCO_STOCK_HISTORY = [
  { year: 1995, price: 4.38 },
  { year: 1996, price: 7.81 },
  { year: 1997, price: 11.38 },
  { year: 1998, price: 23.28 },
  { year: 1999, price: 53.56 },
  { year: 2000, price: 38.25, peakPrice: 80.06, peakDate: "Mar 27, 2000", peakPE: 220 },
  { year: 2001, price: 18.12 },
  { year: 2002, price: 13.10 },
  { year: 2003, price: 24.30 },
  { year: 2004, price: 19.30 },
  { year: 2005, price: 17.12 },
  { year: 2006, price: 27.34 },
  { year: 2007, price: 27.12 },
  { year: 2008, price: 16.30 },
  { year: 2009, price: 23.94 },
  { year: 2010, price: 20.23 },
  { year: 2011, price: 18.07 },
  { year: 2012, price: 19.65 },
  { year: 2013, price: 22.42 },
  { year: 2014, price: 27.78 },
  { year: 2015, price: 27.18 },
  { year: 2016, price: 30.22 },
  { year: 2017, price: 38.30 },
  { year: 2018, price: 43.30 },
  { year: 2019, price: 47.87 },
  { year: 2020, price: 44.67 },
  { year: 2021, price: 63.37 },
  { year: 2022, price: 47.60 },
  { year: 2023, price: 50.47 },
  { year: 2024, price: 58.89 },
  { year: 2025, price: 80.25, recoveryDate: "Dec 10, 2025" },
];

// ============================================================================
// AGGREGATED HELPERS
// ============================================================================

export const ALL_FINANCIALS: CompanyFinancials[] = [
  META_FINANCIALS,
  MSFT_FINANCIALS,
  GOOG_FINANCIALS,
  AMZN_FINANCIALS,
  ORCL_FINANCIALS,
];

export function getFinancials(ticker: string): CompanyFinancials | undefined {
  return ALL_FINANCIALS.find((f) => f.ticker === ticker);
}
