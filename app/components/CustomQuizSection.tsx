// app/components/CustomQuizSection.tsx
"use client";
import { useState, useEffect } from "react";
import WordCarousel from "./WordCarousel";

export default function CustomQuizSection({ allWords }: { allWords: any[] }) {
  const [markedWords, setMarkedWords] = useState<any[]>([]);

  const loadCustomQuiz = () => {
    const list = JSON.parse(localStorage.getItem("mastered_words") || "[]");
    const filtered = allWords.filter(w => list.includes(w.id)).slice(0, 10);
    setMarkedWords(filtered);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-[10px] font-black tracking-widest text-green-600 uppercase">Custom Deck Quiz</h2>
        <button onClick={loadCustomQuiz} className="px-6 py-2 bg-green-500 text-white text-[10px] font-black rounded-full hover:bg-green-600 transition-all uppercase tracking-widest">
          Load Marked Words
        </button>
      </div>

      {markedWords.length > 0 ? (
        <div className="study-target-custom blur-xl transition-all duration-700">
           <WordCarousel words={markedWords} />
        </div>
      ) : (
        <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-300 text-[10px] font-black tracking-widest uppercase">
          No marked words found
        </div>
      )}
    </div>
  );
}