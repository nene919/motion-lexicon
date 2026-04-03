"use client";

import React, { useState, useMemo } from "react";
import SearchAndFilter from "./SearchAndFilter";
import QuizSection from "./QuizSection";
import CustomQuizSection from "./CustomQuizSection";
import Link from "next/link";
import { BookOpen, Trophy, Bookmark, Search, Info, ChevronLeft, ChevronRight } from "lucide-react";
import WordCard from "./WordCard"; 

export default function MainContent({ allWords = [], initialLevel }: { allWords: any[], initialLevel: string }) {
  const [activeTab, setActiveTab] = useState<"archive" | "quiz" | "custom">("archive");
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

      {/* 2. タブナビゲーション */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 flex gap-10 overflow-x-auto no-scrollbar relative z-50">
          {(["archive", "quiz", "custom"] as const).map((tab) => {
            const labels = {
              archive: { label: "収録単語一覧", icon: <BookOpen size={18} /> },
              quiz: { label: "集中クイズ", icon: <Trophy size={18} /> },
              custom: { label: "カスタムデッキ", icon: <Bookmark size={18} /> }
            };
            return (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`py-6 text-base font-black tracking-tighter flex items-center gap-3 transition-all whitespace-nowrap border-b-4 ${
                  activeTab === tab ? "border-slate-900 text-slate-900" : "border-transparent text-slate-300 hover:text-slate-400"
                }`}
              >
                {labels[tab].icon}
                {labels[tab].label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. メインエリア */}
      <div className="min-h-screen py-8 md:py-12 relative z-10">
        {activeTab === "archive" && (
          <div className="animate-in fade-in duration-700">
            
            {/* 🔍 検索セクション: 見出しとグレーの外枠を削除してスッキリ配置 */}
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
                    <span className="text-lg font-black text-slate-900 tracking-widest uppercase italic leading-none block truncate">
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
              <div className="mt-24 flex items-center justify-center gap-2 relative z-30">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-4 rounded-full border border-slate-100 hover:bg-slate-50 disabled:opacity-20 transition-all disabled:cursor-not-allowed group"
                >
                  <ChevronLeft size={20} className="text-slate-400 group-hover:text-slate-900" />
                </button>
                <div className="flex items-center gap-1.5 bg-slate-50/50 p-1 rounded-full border border-slate-100 shadow-inner">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full font-black text-xs transition-all ${
                        currentPage === i + 1 
                        ? "bg-slate-900 text-white shadow-lg" 
                        : "text-slate-300 hover:text-slate-900 hover:bg-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-4 rounded-full border border-slate-100 hover:bg-slate-50 disabled:opacity-20 transition-all disabled:cursor-not-allowed group"
                >
                  <ChevronRight size={20} className="text-slate-400 group-hover:text-slate-900" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}