"use client";

import { ReactNode } from "react";

interface ChartContainerProps {
  headline: string;
  headlineEmphasis?: string;
  subhead: string;
  note: string;
  children: ReactNode;
}

export default function ChartContainer({
  headline,
  headlineEmphasis,
  subhead,
  note,
  children,
}: ChartContainerProps) {
  return (
    <div className="bg-bg-chart border border-rule p-6 sm:p-10">
      <h3 className="font-serif font-bold text-xl sm:text-2xl leading-tight mb-2 tracking-tight max-w-[720px]">
        {headline}
        {headlineEmphasis && (
          <em className="font-normal italic text-ink-soft">
            {" "}
            {headlineEmphasis}
          </em>
        )}
      </h3>
      <div className="font-mono text-[11px] tracking-widest uppercase text-ink-mid mb-6 pb-3 border-b border-rule-soft">
        {subhead}
      </div>
      <div className="w-full overflow-x-auto">{children}</div>
      <div className="font-mono text-[10px] leading-relaxed text-ink-mid tracking-wide mt-5 pt-3 border-t border-rule-soft uppercase">
        {note}
      </div>
    </div>
  );
}
