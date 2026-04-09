import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Bill Comes Due — AI Infrastructure Metrics Dashboard",
  description:
    "Tracking capital expenditure, depreciation, and margin compression across major tech companies investing in AI infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-serif">{children}</body>
    </html>
  );
}
