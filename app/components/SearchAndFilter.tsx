"use client";

import { useRouter } from "next/navigation";

export default function SearchAndFilter({ initialLevel, onSearchChange }: any) {
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
      {/* 📦 外枠を消去し、直接横並び (flex) で配置 */}
      <div className="flex flex-col lg:flex-row items-center gap-8">
        
        {/* 🔍 検索ボックス: 背景 #f0f2f4 / 角丸 8px / 文字 800 (Extra Bold) */}
        <div className="relative flex-1 w-full">
          <div className="bg-[#f0f2f4] rounded-lg flex items-center gap-3 px-4 border border-transparent focus-within:border-[#2d3335]/20 focus-within:bg-white transition-all duration-200">
            <span className="text-[#2d3335]/40">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search for a movement word..."
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="bg-transparent border-none focus:ring-0 w-full py-3 text-[#1a1c1e] placeholder:text-[#2d3335]/30 text-sm font-[800] tracking-tight font-display outline-none"
            />
          </div>
        </div>

        {/* 🏷️ Difficulty: 検索ボックスの横に直列配置 */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-[10px] font-[900] text-[#2d3335]/40 uppercase tracking-[0.15em] font-display whitespace-nowrap">
            Difficulty:
          </span>
          
          <div className="flex flex-wrap gap-1.5">
            {levels.map((lvl) => {
              const isActive = initialLevel === lvl.value;
              return (
                <button
                  key={lvl.value}
                  onClick={() => router.push(lvl.value === "" ? "/" : `/?level=${lvl.value}`)}
                  className={`px-3 py-1.5 rounded-md text-[11px] font-[800] transition-all font-display border ${
                    isActive
                      ? "bg-[#2d3335] text-white border-[#2d3335] shadow-sm"
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