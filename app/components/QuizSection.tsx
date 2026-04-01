// app/components/QuizSection.tsx
"use client";
import { useState } from "react";
import WordCarousel from "./WordCarousel";

export default function QuizSection({ allWords }: { allWords: any[] }) {
  const [quizWords, setQuizWords] = useState<any[]>([]);
  const [level, setLevel] = useState<number | null>(null);
  const [reveal, setReveal] = useState(false);

  const startQuiz = (lv: number) => {
    setLevel(lv);
    setReveal(false);
    const filtered = allWords
      .filter(w => Number(w.difficulty) === lv)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setQuizWords(filtered);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <h2 className="text-[10px] font-black tracking-widest text-orange-600 uppercase">Random Quiz</h2>
        <div className="flex items-center gap-4">
          {quizWords.length > 0 && (
            <button 
              onClick={() => setReveal(!reveal)} 
              className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${reveal ? "bg-slate-100 text-slate-400" : "bg-orange-500 text-white shadow-lg"}`}
            >
              {reveal ? "Hide Answer" : "Show Answer"}
            </button>
          )}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(lv => (
              <button key={lv} onClick={() => startQuiz(lv)} className={`w-9 h-9 rounded-xl text-[10px] font-black transition-all ${level === lv ? "bg-slate-900 text-white shadow-lg scale-110" : "bg-slate-50 text-slate-300 hover:bg-slate-200"}`}>
                {lv}
              </button>
            ))}
          </div>
        </div>
      </div>

      {quizWords.length > 0 ? (
        <WordCarousel 
          words={quizWords} 
          sectionId={`quiz-lv-${level}`} 
          isQuizMode={true} 
          showAnswer={reveal} 
        />
      ) : (
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] text-slate-200 text-[10px] font-black tracking-widest uppercase">
          Select Level to Start Quiz
        </div>
      )}
    </div>
  );
}