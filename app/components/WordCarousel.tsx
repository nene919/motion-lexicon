// app/components/WordCarousel.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import WordCard from "./WordCard";

type Props = {
  words: any[];
  isQuizMode?: boolean; 
  showAnswer?: boolean; 
  sectionId: string;
};

export default function WordCarousel({ 
  words = [], 
  isQuizMode = false, 
  showAnswer: externalShowAnswer, 
  sectionId 
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localShowAnswer, setLocalShowAnswer] = useState(false);

  // 親からの指示があればそれを優先、なければ自分のボタンの状態を使う
  const isRevealed = externalShowAnswer !== undefined ? externalShowAnswer : localShowAnswer;

  // 単語が切り替わったら「答えを表示」状態をリセット
  useEffect(() => {
    setLocalShowAnswer(false);
  }, [currentIndex]);

  if (!words || words.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem]">
        <p className="text-[10px] font-black text-slate-200 tracking-widest uppercase">No data found</p>
      </div>
    );
  }

  const next = () => setCurrentIndex((prev) => (prev + 1) % words.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);

  const item = words[currentIndex];
  const isBlurred = isQuizMode && !isRevealed;

  return (
    <div className="relative group max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 min-h-[500px] shadow-2xl shadow-slate-200/50">
        <div className="grid md:grid-cols-2 min-h-[500px]">
          
          {/* 左側：WordCard表示 */}
          <div className="flex items-center justify-center bg-slate-50/30 p-12 relative border-r border-slate-100 overflow-hidden">
            <div 
              className={`transition-all duration-700 ${isBlurred ? "blur-3xl opacity-10 scale-50" : "scale-100"}`} 
              key={`${sectionId}-${item.id}`}
            >
              <WordCard item={item} />
            </div>
            
            {isBlurred && (
              <button 
                onClick={() => setLocalShowAnswer(true)}
                className="absolute inset-0 z-20 flex items-center justify-center"
              >
                <div className="px-8 py-4 bg-slate-900 text-white rounded-full font-black text-[10px] tracking-widest uppercase shadow-xl hover:scale-110 transition-transform">
                  Tap to Reveal
                </div>
              </button>
            )}
          </div>

          {/* 右側：テキスト情報 */}
          <div className={`p-12 flex flex-col justify-center space-y-8 transition-all duration-700 ${isBlurred ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"}`}>
            <span className="w-fit text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Level {item.difficulty}
            </span>
            <h3 className="text-5xl font-bold text-slate-900 tracking-tighter">{item.meaning}</h3>
            <div className="space-y-4">
              <p className="text-slate-600 italic font-serif text-xl md:text-2xl">"{item.example_en}"</p>
              <p className="text-slate-400 text-sm font-medium">{item.example_ja}</p>
            </div>
            <Link href={`/vocabulary/${item.id}`} className="text-[10px] font-black text-slate-300 hover:text-slate-900 tracking-widest uppercase transition-colors">
              Explore Details →
            </Link>
          </div>
        </div>
      </div>

      {/* ナビゲーション */}
      <div className="absolute inset-y-0 -left-6 -right-6 flex items-center justify-between pointer-events-none">
        <button onClick={prev} className="pointer-events-auto w-14 h-14 rounded-full bg-white shadow-xl border border-slate-50 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all active:scale-90">←</button>
        <button onClick={next} className="pointer-events-auto w-14 h-14 rounded-full bg-white shadow-xl border border-slate-50 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all active:scale-90">→</button>
      </div>
    </div>
  );
}