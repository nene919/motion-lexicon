// app/components/WordCarousel.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Volume2, Bookmark, BookmarkCheck, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [isBookmarked, setIsBookmarked] = useState(false);

  const isRevealed = externalShowAnswer !== undefined ? externalShowAnswer : localShowAnswer;

  useEffect(() => {
    setLocalShowAnswer(false);
    setIsBookmarked(false);
  }, [currentIndex]);

  const speak = useCallback((text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  if (!words || words.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % words.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);

  const item = words[currentIndex];
  const isBlurred = isQuizMode && !isRevealed;

  return (
    <div className="relative max-w-7xl mx-auto px-12 md:px-20"> {/* 左右に大きな余白を確保 */}
      
      {/* 1. メインコンテナ */}
      <div className="bg-white rounded-[4rem] overflow-hidden border border-slate-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] relative z-10">
        <div className="grid md:grid-cols-2 min-h-[580px]">
          
          {/* 左側：WordCard & アクションボタン */}
          <div className="flex items-center justify-center bg-slate-50/50 p-12 md:p-16 relative border-r border-slate-100 overflow-hidden">
            <div className={`transition-all duration-700 ${isBlurred ? "blur-3xl opacity-10 scale-50" : "scale-100"}`}>
              <WordCard item={item} />
            </div>

            {isBlurred && (
              <button onClick={() => setLocalShowAnswer(true)} className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="px-8 py-4 bg-slate-900 text-white rounded-full font-black text-[10px] tracking-widest uppercase shadow-xl hover:scale-110 transition-transform">
                  Tap to Reveal
                </div>
              </button>
            )}

            {/* アクションボタン */}
            {!isBlurred && (
              <div className="absolute bottom-8 left-8 flex gap-3 z-20">
                <button onClick={() => speak(item.word)} className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm hover:bg-slate-900 hover:text-white transition-all active:scale-90 group">
                  <Volume2 size={22} className="group-hover:animate-pulse" />
                </button>
                <button onClick={() => setIsBookmarked(!isBookmarked)} className={`w-14 h-14 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm transition-all active:scale-90 ${isBookmarked ? "text-blue-600 border-blue-100 bg-blue-50" : "text-slate-300 hover:text-blue-600"}`}>
                  {isBookmarked ? <BookmarkCheck size={22} /> : <Bookmark size={22} />}
                </button>
              </div>
            )}
          </div>

          {/* 右側：テキスト情報 */}
          <div className={`p-12 md:p-20 flex flex-col justify-center relative transition-all duration-700 ${isBlurred ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"}`}>
            
            {/* Level表示を最上部へ移動 (意味との距離を確保) */}
            <div className="absolute top-12 left-12 md:left-20">
              <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100/50">
                Level {item.difficulty}
              </span>
            </div>

            <div className="space-y-12">
              <h3 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                {item.meaning}
              </h3>

              <div className="space-y-6 border-l-4 border-slate-100 pl-8">
                <p className="text-slate-600 italic font-serif text-2xl md:text-3xl leading-snug">"{item.example_en}"</p>
                <p className="text-slate-400 text-base font-bold tracking-tight">{item.example_ja}</p>
              </div>

              <Link href={`/vocabulary/${item.id}`} className="inline-flex items-center gap-4 text-[11px] font-black text-slate-900 group tracking-[0.2em] uppercase border-2 border-slate-900 px-8 py-4 rounded-full w-fit hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                Explore Details
                <ArrowRight size={18} className="text-blue-500 group-hover:translate-x-1.5 transition-transform duration-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ナビゲーションボタン (カードの外側へ移動) */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
        <button 
          onClick={prev} 
          className="pointer-events-auto -translate-x-6 md:-translate-x-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-2xl border border-slate-50 flex items-center justify-center text-slate-300 hover:bg-slate-900 hover:text-white transition-all active:scale-90"
        >
          <ChevronLeft size={32} strokeWidth={2} />
        </button>
        <button 
          onClick={next} 
          className="pointer-events-auto translate-x-6 md:translate-x-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-2xl border border-slate-50 flex items-center justify-center text-slate-300 hover:bg-slate-900 hover:text-white transition-all active:scale-90"
        >
          <ChevronRight size={32} strokeWidth={2} />
        </button>
      </div>

      {/* 3. ページネーション (丸ポチ) */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {words.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-500 rounded-full ${currentIndex === index ? "w-10 h-2 bg-slate-900" : "w-2 h-2 bg-slate-200"}`}
          />
        ))}
      </div>
    </div>
  );
}