"use client";

interface SectionHeaderProps {
  number: string;
  title: string;
}

export default function SectionHeader({ number, title }: SectionHeaderProps) {
  return (
    <div className="pt-16 sm:pt-20 mt-12 border-t border-rule-soft">
      <div className="font-mono text-[11px] font-medium tracking-[0.22em] text-accent uppercase mb-5 flex items-center gap-3.5">
        <span className="w-8 h-px bg-accent" />
        {number}
      </div>
      <h2 className="font-serif font-bold text-3xl sm:text-4xl leading-tight tracking-tight mb-6 max-w-[640px]">
        {title}
      </h2>
    </div>
  );
}
