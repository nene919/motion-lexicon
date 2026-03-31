// app/components/QuizSection.tsx
"use client";
import { useState } from "react";
import WordCarousel from "./WordCarousel"; // 再利用

export default function QuizSection({ allWords }: { allWords: any[] }) {
  const [quizWords, setQuizWords] = useState<any[]>([]);
  const [level, setLevel] = useState<number | null>(null);

  const startQuiz = (lv: number) => {
    setLevel(lv);
    const filtered = allWords
      .filter(w => w.difficulty === lv)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setQuizWords(filtered);
    
    // QuizModeを強制するために、DOMが描画された後にぼかしを入れる
    setTimeout(() => {
       document.querySelectorAll(".study-target").forEach(el => el.classList.add("blur-xl", "select-none"));
    }, 100);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-[10px] font-black tracking-widest text-orange-600 uppercase">Random Quiz</h2>
        <div className="flex gap-2">
          {[1,2,3,4,5].map(lv => (
            <button key={lv} onClick={() => startQuiz(lv)} className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${level === lv ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400 hover:bg-orange-100"}`}>
              {lv}
            </button>
          ))}
        </div>
      </div>

      {quizWords.length > 0 ? (
        <div className="relative">
          <div className="study-target transition-all duration-700">
            <WordCarousel words={quizWords} />
          </div>
          <div className="absolute top-4 right-4 z-20">
             <button onClick={() => document.querySelectorAll(".study-target").forEach(el => el.classList.toggle("blur-xl"))} className="px-4 py-2 bg-slate-900 text-white text-[8px] font-black rounded-full uppercase tracking-widest">Toggle Answer</button>
          </div>
        </div>
      ) : (
        <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-300 text-[10px] font-black tracking-widest uppercase">
          Select Difficulty to Start
        </div>
      )}
    </div>
  );
}