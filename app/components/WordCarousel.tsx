// app/components/WordCarousel.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Volume2,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";
import WordCard from "./WordCard";
import { isWordBookmarked, toggleBookmarkWord } from "@/lib/bookmarks";

type Props = {
  words: any[];
  isQuizMode?: boolean;
  showAnswer?: boolean;
  sectionId: string;
  /** true のとき: 単語は常に表示し、意味・例文の日本語だけブラー。開示で解除し、再タップで伏せる */
  quizBlurMeaningsOnly?: boolean;
};

export default function WordCarousel({
  words = [],
  isQuizMode = false,
  showAnswer: externalShowAnswer,
  sectionId,
  quizBlurMeaningsOnly = false,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localShowAnswer, setLocalShowAnswer] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const isRevealed = externalShowAnswer !== undefined ? externalShowAnswer : localShowAnswer;

  const speak = useCallback((text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  useEffect(() => {
    setLocalShowAnswer(false);
    if (!words.length) {
      setIsBookmarked(false);
      return;
    }
    const idx = Math.min(currentIndex, words.length - 1);
    const id = words[idx]?.id;
    setIsBookmarked(id != null ? isWordBookmarked(String(id)) : false);
  }, [currentIndex, words]);

  if (!words || words.length === 0) return null;

  const goToIndex = (index: number) => {
    setLocalShowAnswer(false);
    setCurrentIndex(index);
  };

  const next = () => {
    setLocalShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  const prev = () => {
    setLocalShowAnswer(false);
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
  };

  const item = words[Math.min(currentIndex, words.length - 1)];
  const isBlurred = isQuizMode && !isRevealed;
  const hideWordAndPanel = isQuizMode && !quizBlurMeaningsOnly && isBlurred;
  const blurMeaningsQuiz = isQuizMode && quizBlurMeaningsOnly;

  const toggleQuizReveal = useCallback(() => {
    if (externalShowAnswer !== undefined) return;
    setLocalShowAnswer((prev) => !prev);
  }, [externalShowAnswer]);

  return (
    <div className="relative max-w-7xl mx-auto px-12 md:px-20"> {/* 左右に大きな余白を確保 */}
      
      {/* 1. メインコンテナ */}
      <div className="bg-white rounded-[4rem] overflow-hidden border border-surface-container-highest shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] relative z-10">
        <div className="grid md:grid-cols-2 min-h-[580px]">
          
          {/* 左側：WordCard & アクションボタン */}
          <div className="flex items-center justify-center bg-surface-container-low/50 p-12 md:p-16 relative border-r border-surface-container-highest overflow-hidden">
            <div
              className={`transition-all duration-700 ${
                hideWordAndPanel ? "blur-3xl opacity-10 scale-50" : "scale-100"
              }`}
            >
              <WordCard item={item} />
            </div>

            {hideWordAndPanel && (
              <button
                type="button"
                onClick={() => setLocalShowAnswer(true)}
                className="absolute inset-0 z-20 flex items-center justify-center"
              >
                <div className="px-8 py-4 bg-primary text-white rounded-full font-bold text-[10px] tracking-widest uppercase font-display shadow-xl hover:scale-110 transition-transform">
                  Tap to Reveal
                </div>
              </button>
            )}
          </div>

          {/* 右側：テキスト情報 */}
          <div
            className={`p-12 md:p-20 flex flex-col relative transition-all duration-700 min-h-[580px] ${
              blurMeaningsQuiz ? "justify-between" : "justify-center"
            } ${hideWordAndPanel ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"}`}
          >
            
            {/* Level / 品詞（Today's Pickups 等で item.pos を併記） */}
            <div className="absolute top-12 left-12 md:left-20 flex flex-wrap items-center gap-2">
              <span className="text-xs md:text-sm font-bold text-outline uppercase tracking-widest bg-surface-container-low px-5 py-2 rounded-md border border-surface-container-highest font-display">
                Level {item.difficulty}
              </span>
              {item?.pos != null && String(item.pos).trim() !== "" && (
                <span className="text-xs md:text-sm font-bold text-outline bg-surface-container-low px-5 py-2 rounded-md border border-surface-container-highest font-display tracking-wide">
                  {String(item.pos).trim()}
                </span>
              )}
            </div>

            <div
              className={`space-y-12 ${blurMeaningsQuiz ? "flex-1 flex flex-col min-h-0 pt-14 sm:pt-16 md:pt-[4.5rem]" : ""}`}
            >
              <h3
                key={blurMeaningsQuiz ? `meaning-${item.id}` : undefined}
                className={`text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-none font-display transition-[filter] duration-300 ${
                  blurMeaningsQuiz && isBlurred ? "blur-md select-none" : ""
                }`}
              >
                {item.meaning}
              </h3>

              <div className="space-y-6 border-l-4 border-surface-container-highest pl-8">
                <p className="text-on-surface-variant italic font-serif text-2xl md:text-3xl leading-snug">
                  &quot;{item.example_en}&quot;
                </p>
                <p
                  key={blurMeaningsQuiz ? `exja-${item.id}` : undefined}
                  className={`text-outline text-sm md:text-[19px] font-medium tracking-tight font-body transition-[filter] duration-300 ${
                    blurMeaningsQuiz && isBlurred ? "blur-md select-none" : ""
                  }`}
                >
                  {item.example_ja}
                </p>
              </div>

              {blurMeaningsQuiz && (
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => speak(item.word)}
                      aria-label="発音"
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-on-surface-variant border border-surface-container-highest shadow-sm hover:bg-primary hover:text-white transition-all active:scale-90 group"
                    >
                      <Volume2 size={20} className="group-hover:animate-pulse" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsBookmarked(toggleBookmarkWord(item))}
                      aria-label={isBookmarked ? "ブックマークを外す" : "ブックマーク"}
                      className={`w-12 h-12 bg-white rounded-full flex items-center justify-center border border-surface-container-highest shadow-sm transition-all active:scale-90 ${
                        isBookmarked
                          ? "text-on-surface border-outline-variant bg-surface-container-low"
                          : "text-outline hover:text-on-surface"
                      }`}
                    >
                      {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={toggleQuizReveal}
                    disabled={externalShowAnswer !== undefined}
                    aria-label={isBlurred ? "開示" : "伏せる"}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-on-surface-variant border border-surface-container-highest shadow-sm hover:bg-surface-container-low transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBlurred ? <Eye size={22} strokeWidth={2} /> : <EyeOff size={22} strokeWidth={2} />}
                  </button>
                </div>
              )}

              {(!isQuizMode || !isBlurred) && !blurMeaningsQuiz && (
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => speak(item.word)}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-on-surface-variant border border-surface-container-highest shadow-sm hover:bg-primary hover:text-white transition-all active:scale-90 group"
                    >
                      <Volume2 size={20} className="group-hover:animate-pulse" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsBookmarked(toggleBookmarkWord(item))}
                      className={`w-12 h-12 bg-white rounded-full flex items-center justify-center border border-surface-container-highest shadow-sm transition-all active:scale-90 ${
                        isBookmarked
                          ? "text-on-surface border-outline-variant bg-surface-container-low"
                          : "text-outline hover:text-on-surface"
                      }`}
                    >
                      {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                    </button>
                  </div>

                  <Link
                    href={`/vocabulary/${item.id}`}
                    className="inline-flex items-center gap-2 text-sm font-body text-outline hover:text-on-surface transition-colors group w-fit"
                  >
                    Explore Details
                    <ArrowRight
                      size={18}
                      className="shrink-0 text-outline group-hover:text-on-surface group-hover:translate-x-0.5 transition-transform duration-300"
                    />
                  </Link>
                </div>
              )}
            </div>

            {blurMeaningsQuiz && (
              <div className="mt-auto pt-16 pb-4 shrink-0">
                <Link
                  href={`/vocabulary/${item.id}`}
                  className="inline-flex items-center gap-2 text-sm font-body text-outline hover:text-on-surface transition-colors group w-fit"
                >
                  Explore Details
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-outline group-hover:text-on-surface group-hover:translate-x-0.5 transition-transform duration-300"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. ナビゲーションボタン (カードの外側へ移動) */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
        <button 
          onClick={prev} 
          className="pointer-events-auto -translate-x-6 md:-translate-x-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-2xl border border-surface-container-highest flex items-center justify-center text-outline hover:bg-primary hover:text-white transition-all active:scale-90"
        >
          <ChevronLeft size={32} strokeWidth={2} />
        </button>
        <button 
          onClick={next} 
          className="pointer-events-auto translate-x-6 md:translate-x-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-2xl border border-surface-container-highest flex items-center justify-center text-outline hover:bg-primary hover:text-white transition-all active:scale-90"
        >
          <ChevronRight size={32} strokeWidth={2} />
        </button>
      </div>

      {/* 3. ページネーション (丸ポチ) */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {words.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`単語 ${index + 1}`}
            onClick={() => goToIndex(index)}
            className={`transition-all duration-500 rounded-full ${currentIndex === index ? "w-10 h-2 bg-slate-900" : "w-2 h-2 bg-slate-200"}`}
          />
        ))}
      </div>
    </div>
  );
}