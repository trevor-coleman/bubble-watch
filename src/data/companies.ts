export interface Company {
  ticker: string;
  name: string;
  color: string;
  description: string;
}

export const COMPANIES: Record<string, Company> = {
  META: {
    ticker: "META",
    name: "Meta Platforms",
    color: "#c46a18",
    description: "Facebook, Instagram, WhatsApp. Fastest-growing depreciation burden relative to revenue.",
  },
  MSFT: {
    ticker: "MSFT",
    name: "Microsoft",
    color: "#1a6e3f",
    description: "Windows, Office, Azure. Large cushion from legacy software margins.",
  },
  GOOG: {
    ticker: "GOOG",
    name: "Alphabet",
    color: "#2c5d8f",
    description: "Search, YouTube, Google Cloud. Significant ad revenue buffer.",
  },
  AMZN: {
    ticker: "AMZN",
    name: "Amazon",
    color: "#6a4a8a",
    description: "AWS, e-commerce. Middle of the pack on depreciation exposure.",
  },
  ORCL: {
    ticker: "ORCL",
    name: "Oracle",
    color: "#b8281c",
    description: "Cloud infrastructure, databases. Most aggressive spending relative to revenue.",
  },
};

export const COMPANY_ORDER = ["META", "MSFT", "GOOG", "AMZN", "ORCL"] as const;
