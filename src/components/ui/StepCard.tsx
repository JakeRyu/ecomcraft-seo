type StepCardProps = {
  number: string;
  title: string;
  description: string;
};

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="rounded-[40px] bg-white px-7 py-8 shadow-card">
      <div className="mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink">
        <span className="text-[13px] font-bold tracking-[0.03em] text-canvas">
          {number}
        </span>
      </div>
      <h3 className="mb-2.5 text-xl font-medium leading-tight tracking-[-0.02em] text-ink">
        {title}
      </h3>
      <p className="text-[15px] font-normal leading-[22px] text-slate">
        {description}
      </p>
    </div>
  );
}
