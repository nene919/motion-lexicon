// app/components/CustomQuizSection.tsx
"use client";
import { useState } from "react";
import WordCarousel from "./WordCarousel";

export default function CustomQuizSection({ allWords }: { allWords: any[] }) {
  const [markedWords, setMarkedWords] = useState<any[]>([]);

  const loadCustomQuiz = () => {
    const list = JSON.parse(localStorage.getItem("mastered_words") || "[]");
    const filtered = allWords.filter(w => list.includes(w.id)).slice(0, 10);
    setMarkedWords(filtered);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <h2 className="text-[10px] font-black tracking-widest text-green-600 uppercase">Custom Deck</h2>
        <button 
          onClick={loadCustomQuiz} 
          className="px-8 py-3 bg-green-500 text-white text-[10px] font-black rounded-full hover:bg-green-600 transition-all uppercase tracking-widest shadow-lg shadow-green-100"
        >
          🔄 Load Marked Words
        </button>
      </div>

      {markedWords.length > 0 ? (
        <WordCarousel 
          words={markedWords} 
          sectionId="custom-deck-carousel" 
          isQuizMode={true} 
        />
      ) : (
        <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/30 text-slate-300">
          <p className="text-[10px] font-black tracking-widest uppercase text-center">No marked words found</p>
        </div>
      )}
    </div>
  );
}