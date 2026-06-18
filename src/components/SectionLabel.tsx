interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`inline-block text-xs uppercase tracking-[0.15em] text-solar font-mono ${className}`}
    >
      {text}
    </span>
  );
}
