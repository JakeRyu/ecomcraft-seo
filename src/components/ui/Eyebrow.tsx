type EyebrowProps = {
  children: React.ReactNode;
  inverse?: boolean;
};

export function Eyebrow({ children, inverse = false }: EyebrowProps) {
  return (
    <div className="mb-4 flex items-center gap-1.5">
      <span className="text-[10px] text-signal leading-none">●</span>
      <span
        className={`text-[13px] font-bold uppercase tracking-[0.04em] ${
          inverse ? "text-white/50" : "text-slate"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
