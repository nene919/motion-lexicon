"use client";

import React, { useState, useMemo } from "react";
import SearchAndFilter from "./SearchAndFilter";
import Link from "next/link";
import { Info, ChevronLeft, ChevronRight } from "lucide-react";
import WordCard from "./WordCard"; 

export default function MainContent({
  allWords = [],
  initialLevel,
}: {
  allWords: any[];
  initialLevel: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 11;

  const filteredWords = useMemo(() => {
    return allWords.filter((item: any) => {
      const matchesSearch = item.word.toLowerCase().includes(searchQuery.toLowerCase()) || item.meaning.includes(searchQuery);
      // initialLevel が A1, A2 などの文字列として渡ってくる想定
      const matchesLevel = initialLevel ? item.difficulty.toString() === initialLevel : true;
      return matchesSearch && matchesLevel;
    });
  }, [allWords, searchQuery, initialLevel]);

  const totalPages = Math.ceil(filteredWords.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredWords.slice(start, start + itemsPerPage);
  }, [filteredWords, currentPage]);

  // ページ番号の表示ロジック（全部出さず、周辺＋端だけ）
  const pageNumbers = (() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const addPage = (p: number) => {
      if (p >= 1 && p <= totalPages && !pages.includes(p)) pages.push(p);
    };

    addPage(1);
    addPage(currentPage - 1);
    addPage(currentPage);
    addPage(currentPage + 1);
    addPage(totalPages);

    const uniqueSorted = [...new Set(pages.filter((p) => typeof p === "number") as number[])].sort(
      (a, b) => a - b
    );

    const result: (number | string)[] = [];
    for (let i = 0; i < uniqueSorted.length; i++) {
      const current = uniqueSorted[i];
      const prev = uniqueSorted[i - 1];
      if (prev !== undefined && current - prev > 1) {
        result.push(prev + 1 === current - 1 ? prev + 1 : "dots-" + i);
      }
      result.push(current);
    }

    return result;
  })();

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  return (
    <div className="w-full bg-white font-sans selection:bg-slate-900 selection:text-white isolate">
      
      {/* 1. 横長広告枠 (ページ上部) */}
      <div className="max-w-7xl mx-auto px-8 pt-8 pb-4">
        <div className="w-full min-h-[80px] bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center group hover:bg-slate-100 transition-all cursor-pointer relative z-10">
          <p className="text-slate-300 font-black text-[9px] tracking-[0.4em] uppercase">Sponsored</p>
        </div>
      </div>

      {/* 2. メインエリア（収録単語一覧のみ） */}
      <div className="min-h-screen py-8 md:py-12 relative z-10">
        <div className="animate-in fade-in duration-700">
          
          {/* 🔍 検索セクション */}
          <div className="max-w-7xl mx-auto mb-8 relative z-20">
            <SearchAndFilter 
              initialLevel={initialLevel} 
              onSearchChange={handleSearchChange} 
            />
          </div>

          {/* 📊 単語グリッド */}
          <section className="px-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {/* 【固定広告スロット】 */}
            <div className="p-6 rounded-[2.5rem] bg-blue-50/30 border border-blue-100 flex flex-col justify-center gap-3 min-h-[140px] relative overflow-hidden group/ad hover:bg-blue-50 transition-colors isolate">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500 shrink-0 z-10"><Info size={18} /></div>
              <div className="text-left z-10">
                <span className="text-[8px] font-black text-blue-400 tracking-widest uppercase block mb-1">Promoted</span>
                <p className="text-xs font-bold text-slate-500 leading-tight">Official Study Kit <br/> Available Now</p>
              </div>
              <div className="absolute inset-0 rounded-[2.5rem] border border-blue-100/50 pointer-events-none z-20"></div>
            </div>

            {/* 単語カード */}
            {currentItems.map((item: any) => (
              <Link 
                key={item.id} 
                href={`/vocabulary/${item.id}`} 
                className="group relative rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[140px] overflow-hidden isolate flex items-center justify-center"
              >
                <div className="z-10 transition-all duration-500 group-hover:opacity-0 group-hover:scale-50 pointer-events-none text-center px-4">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight lowercase leading-tight block truncate font-display">
                    {item.word}
                  </span>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-0 pointer-events-none overflow-hidden isolate">
                  <div className="w-full h-full flex items-center justify-center relative">
                    <div className="transform scale-[0.35] group-hover:scale-[0.45] transition-transform duration-700 ease-out flex items-center justify-center whitespace-nowrap">
                      <WordCard item={item} />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-[2.5rem] border border-slate-100 pointer-events-none z-20 group-hover:border-slate-200/50 transition-colors"></div>
              </Link>
            ))}
          </section>

          {/* 🔢 ページネーション */}
          {totalPages > 1 && (
            <div className="mt-24 flex items-center justify-center gap-3 relative z-30">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-12 h-12 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 disabled:opacity-20 transition-all duration-300 disabled:cursor-not-allowed group flex items-center justify-center"
              >
                <ChevronLeft size={20} className="text-on-surface-variant group-hover:text-on-surface transition-colors" />
              </button>
              <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-2xl">
                {pageNumbers.map((p, idx) =>
                  typeof p === "number" ? (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`min-w-[2.75rem] h-12 px-2 rounded-xl font-black text-base tabular-nums tracking-tight transition-all duration-300 border ${
                        currentPage === p
                          ? "bg-white text-primary border-primary shadow-soft"
                          : "bg-white text-slate-500 border-slate-100 hover:text-on-surface hover:bg-surface-container-low"
                      }`}
                    >
                      {p}
                    </button>
                  ) : (
                    <span
                      key={p + "-" + idx}
                      className="min-w-[1.75rem] px-1 text-center text-sm font-bold text-slate-400 select-none leading-none"
                    >
                      ...
                    </span>
                  )
                )}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-12 h-12 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 disabled:opacity-20 transition-all duration-300 disabled:cursor-not-allowed group flex items-center justify-center"
              >
                <ChevronRight size={20} className="text-on-surface-variant group-hover:text-on-surface transition-colors" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}