// app/components/WordCarousel.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import WordCard from "./WordCard";

export default function WordCarousel({ words }: { words: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % words.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);

  const item = words[currentIndex];

  return (
    <div className="relative group">
      <div className="max-w-5xl mx-auto bg-slate-50/50 rounded-[3rem] overflow-hidden border border-slate-100 transition-all duration-500">
        <div className="grid md:grid-cols-2 min-h-[500px]">
          {/* 左：アニメーション */}
          <div className="flex items-center justify-center border-r border-slate-100 bg-white p-10">
            <div className="scale-75">
              <WordCard 
                word={item.word} 
                color={item.customColor} 
                font={item.customFont}
                animationJson={item.customAnimation}
                transitionJson={item.customTransition}
              />
            </div>
          </div>
          {/* 右：詳細 */}
          <div className="p-12 flex flex-col justify-center space-y-6">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Lv.{item.difficulty}</span>
            <h3 className="text-4xl font-bold text-slate-900">{item.meaning}</h3>
            <p className="text-slate-500 italic font-serif leading-relaxed">"{item.example_en}"</p>
            <Link href={`/vocabulary/${item.id}`} className="inline-block pt-4 text-[10px] font-black text-slate-400 hover:text-blue-600 tracking-widest transition-colors">
              VIEW FULL DETAILS →
            </Link>
          </div>
        </div>
      </div>

      {/* ナビゲーションボタン */}
      <button onClick={prev} className="absolute left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all z-10">←</button>
      <button onClick={next} className="absolute right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all z-10">→</button>
    </div>
  );
}