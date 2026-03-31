// app/components/SearchAndFilter.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

type Word = {
  id: string;
  word: string;
  difficulty: number;
};

type Props = {
  initialAlpha: string;
  initialLevel: string;
  words: Word[];
};

export default function SearchAndFilter({ initialAlpha, initialLevel, words }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  // リアルタイム検索（英単語のみ対象）
  const filteredWords = words.filter((item) =>
    item.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const levels = [1, 2, 3, 4, 5];

  const getFilterUrl = (alpha: string | null, lv: string | null) => {
    const params = new URLSearchParams();
    if (alpha) params.set("initial", alpha);
    if (lv) params.set("level", lv);
    const queryString = params.toString();
    return queryString ? `/?${queryString}` : "/";
  };

  return (
    <div className="px-8 py-12 max-w-7xl mx-auto space-y-8">
      
      {/* 🔍 検索 & レベル選択 (進捗バーは削除) */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="relative w-full lg:w-80">
          <input
            type="text"
            placeholder="Search word..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-1 focus:ring-slate-900 transition-all outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {levels.map((lv) => (
            <Link
              key={lv}
              href={getFilterUrl(initialAlpha, String(lv))}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-[10px] font-black transition-all ${
                Number(initialLevel) === lv 
                ? "bg-slate-900 text-white" 
                : "bg-slate-50 text-slate-300 hover:text-slate-900"
              }`}
            >
              {lv}
            </Link>
          ))}
          {(initialAlpha || initialLevel) && (
            <Link href="/" className="ml-4 text-[10px] font-black text-slate-300 hover:text-red-500 uppercase tracking-widest">Reset</Link>
          )}
        </div>
      </div>

      {/* 🔤 A-Z ナビ */}
      <div className="flex flex-wrap gap-1.5 justify-center py-4 border-y border-slate-50">
        {alphabet.map((char) => (
          <Link
            key={char}
            href={getFilterUrl(char, initialLevel)}
            className={`w-7 h-7 flex items-center justify-center rounded-md text-[10px] font-black transition-all ${
              initialAlpha === char ? "bg-slate-900 text-white" : "text-slate-200 hover:text-slate-900"
            }`}
          >
            {char}
          </Link>
        ))}
      </div>

      {/* 🗂️ 単語グリッド (カード高さを低縮小・情報を削除) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-6">
        {filteredWords.map((item) => (
          <Link
            key={item.id}
            href={`/vocabulary/${item.id}`}
            className="group relative bg-white border border-slate-100 rounded-2xl px-6 py-8 h-32 flex items-center justify-center hover:border-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* 背景の薄い数字（難易度）をさりげなく配置 */}
            <span className="absolute top-2 left-4 text-[10px] font-black text-slate-100 group-hover:text-slate-200 transition-colors uppercase tracking-widest">
              Lv.{item.difficulty}
            </span>

            <h3 className="text-xl font-bold text-slate-800 tracking-tighter group-hover:text-slate-900 transition-colors relative z-10">
              {item.word}
            </h3>

            {/* 装飾: ホバー時にのみ現れる細いライン */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-slate-900 group-hover:w-full transition-all duration-500" />
          </Link>
        ))}
      </div>
    </div>
  );
}