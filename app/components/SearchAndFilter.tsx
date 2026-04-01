// app/components/SearchAndFilter.tsx
"use client";

import { useRouter } from "next/navigation";

// 💡 型定義に onSearchChange を追加します
type SearchAndFilterProps = {
  initialLevel: string;
  words: any[];
  onSearchChange?: (query: string) => void; // 検索入力時に呼ばれる関数（任意）
};

export default function SearchAndFilter({ 
  initialLevel, 
  words, 
  onSearchChange 
}: SearchAndFilterProps) {
  const router = useRouter();

  const handleLevelChange = (level: string) => {
    if (level === "") {
      router.push("/");
    } else {
      router.push(`/?level=${level}`);
    }
  };

  const levels = [
    { value: "", label: "ALL LEVELS" },
    { value: "1", label: "LEVEL 1" },
    { value: "2", label: "LEVEL 2" },
    { value: "3", label: "LEVEL 3" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row gap-6 items-center justify-between">
      {/* Search Input */}
      <div className="relative w-full md:max-w-md group">
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
          🔍
        </span>
        <input
          type="text"
          placeholder="SEARCH WORDS OR MEANINGS..."
          onChange={(e) => onSearchChange?.(e.target.value)} // 入力値を親へ渡す
          className="w-full bg-white border border-slate-100 py-4 pl-14 pr-6 rounded-full text-[10px] font-black tracking-widest focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all shadow-sm"
        />
      </div>

      {/* Level Filter Buttons */}
      <div className="flex gap-2 p-1.5 bg-slate-100/50 rounded-full border border-slate-100 w-fit">
        {levels.map((lvl) => (
          <button
            key={lvl.value}
            onClick={() => handleLevelChange(lvl.value)}
            className={`px-6 py-2.5 rounded-full text-[9px] font-black tracking-widest transition-all uppercase ${
              initialLevel === lvl.value
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {lvl.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="hidden lg:block text-[9px] font-black text-slate-300 tracking-[0.3em] uppercase">
        {words.length} Entries Loaded
      </div>
    </div>
  );
}