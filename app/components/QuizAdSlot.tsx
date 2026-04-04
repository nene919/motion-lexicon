type Props = {
  className?: string;
};

/** 広告タグを差し込むためのプレースホルダー */
export default function QuizAdSlot({ className = "" }: Props) {
  return (
    <aside
      aria-label="広告"
      className={`min-h-[100px] w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50/90 flex items-center justify-center px-4 py-6 text-center ${className}`}
    >
      <span className="text-[11px] font-display font-extrabold uppercase tracking-[0.2em] text-slate-400">
        広告エリア
      </span>
    </aside>
  );
}
