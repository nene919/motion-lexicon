// app/components/MainContent.tsx
"use client";

import { useState } from "react";
import SearchAndFilter from "./SearchAndFilter";
import QuizSection from "./QuizSection";
import CustomQuizSection from "./CustomQuizSection";
import Link from "next/link";

export default function MainContent({ allWords = [], initialLevel }: { allWords: any[], initialLevel: string }) {
  const [activeTab, setActiveTab] = useState<"archive" | "quiz" | "custom">("archive");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWords = allWords.filter((item: any) => {
    const matchesSearch = item.word.toLowerCase().includes(searchQuery.toLowerCase()) || item.meaning.includes(searchQuery);
    const matchesLevel = initialLevel ? item.difficulty.toString() === initialLevel : true;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="w-full">
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8 flex gap-12">
          {["archive", "quiz", "custom"].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab as any)} 
              className={`py-6 text-[10px] font-black tracking-widest uppercase border-b-2 transition-all ${activeTab === tab ? "border-slate-900 text-slate-900" : "border-transparent text-slate-300"}`}
            >
              {tab === "archive" ? "📚 Archive" : tab === "quiz" ? "🎲 Random Quiz" : "🔖 Custom Deck"}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[800px] py-12">
        {activeTab === "archive" && (
          <div className="animate-in fade-in duration-700">
            <SearchAndFilter initialLevel={initialLevel} words={allWords} onSearchChange={(q: string) => setSearchQuery(q)} />
            <section className="py-20 px-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredWords.map((item: any) => (
                <Link key={item.id} href={`/vocabulary/${item.id}`} className="group p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 min-h-[280px] flex flex-col justify-between">
                  <div className="h-28 flex items-center justify-center">
                    <span style={{ color: item.customColor || '#0f172a' }} className="text-3xl font-black group-hover:scale-125 transition-transform duration-700">{item.word}</span>
                  </div>
                  <div className="border-t border-slate-100 pt-6">
                    <p className="text-base font-bold text-slate-900">{item.meaning}</p>
                    <p className="text-[9px] font-black text-slate-300 uppercase mt-2">Lv.{item.difficulty}</p>
                  </div>
                </Link>
              ))}
            </section>
          </div>
        )}

        {activeTab === "quiz" && (
          <div className="px-8 max-w-7xl mx-auto">
            <QuizSection allWords={allWords} />
          </div>
        )}

        {activeTab === "custom" && (
          <div className="px-8 max-w-7xl mx-auto">
            <CustomQuizSection allWords={allWords} />
          </div>
        )}
      </div>
    </div>
  );
}