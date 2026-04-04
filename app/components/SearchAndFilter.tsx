"use client";

import { useRouter } from "next/navigation";

type Props = {
  initialLevel?: string;
  onSearchChange?: (q: string) => void;
};

export default function SearchAndFilter({ initialLevel, onSearchChange }: Props) {
  const router = useRouter();

  // A1, A2... 独立したレベルボタンの定義
  const levels = [
    { value: "", label: "ALL" },
    { value: "A1", label: "A1" },
    { value: "A2", label: "A2" },
    { value: "B1", label: "B1" },
    { value: "B2", label: "B2" },
    { value: "C1", label: "C1" },
    { value: "C2", label: "C2" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-4">
      {/* 見出し（Today's Pickups. と同じスタイル） */}
      <div className="mb-4 flex items-center gap-4">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 font-display">
          Word List.
        </h2>
        <div className="h-[1px] flex-grow bg-slate-200" />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
        {/* 検索（横幅を抑える） */}
        <div className="relative w-full max-w-[min(100%,24rem)] shrink-0">
          <div className="bg-surface-container-low rounded-lg flex items-center gap-2.5 px-3 border border-transparent focus-within:border-outline-variant transition-colors">
            <span className="text-outline shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search for a movement word..."
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="bg-transparent border-none focus:ring-0 w-full min-w-0 py-2.5 text-on-surface placeholder:text-outline-variant font-body text-sm font-normal outline-none"
            />
          </div>
        </div>

        {/* 難易度（残り幅を使い、ボタンを大きく） */}
        <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 min-w-0 w-full">
          <span className="text-xs font-[900] text-[#2d3335]/50 uppercase tracking-[0.12em] font-display whitespace-nowrap shrink-0">
            Difficulty:
          </span>

          <div className="flex flex-wrap gap-2">
            {levels.map((lvl) => {
              const isActive = initialLevel === lvl.value;
              return (
                <button
                  key={lvl.value}
                  onClick={() =>
                    router.push(lvl.value === "" ? "/" : `/?level=${lvl.value}`, {
                      scroll: false,
                    })
                  }
                  className={`px-4 py-2.5 rounded-lg text-sm font-[800] transition-all font-display border min-w-[2.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d3335] focus-visible:ring-offset-2 ${
                    isActive
                      ? "bg-[#2d3335] text-white border-[#2d3335] shadow-sm active:bg-[#2d3335] active:text-white"
                      : "bg-white border-[#dee2e6] text-[#44474e] hover:bg-[#f0f2f4] hover:border-[#2d3335]/30"
                  }`}
                >
                  {lvl.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}