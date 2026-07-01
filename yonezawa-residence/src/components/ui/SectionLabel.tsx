interface Props {
  en: string;
  ja: string;
  light?: boolean;
}

export default function SectionLabel({ en, ja, light }: Props) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="w-8 h-px bg-brand-gold" />
      <span className="text-brand-gold font-cinzel text-xs tracking-[0.3em] uppercase">{en}</span>
      <span
        className={`font-noto text-xs ${light ? "text-[#4a4a4a]" : "text-brand-ice-dim"}`}
      >
        / {ja}
      </span>
    </div>
  );
}
