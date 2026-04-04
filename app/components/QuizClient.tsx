"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import WordCarousel from "@/app/components/WordCarousel";
import QuizAdSlot from "@/app/components/QuizAdSlot";
import {
  BOOKMARKS_CHANGED_EVENT,
  getBookmarkWords,
} from "@/lib/bookmarks";

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
const COUNTS = [10, 20, 30] as const;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type SourceTab = "random" | "bookmarks";

type Props = {
  allWords: any[];
};

export default function QuizClient({ allWords }: Props) {
  const [tab, setTab] = useState<SourceTab>("random");
  const [level, setLevel] = useState<(typeof LEVELS)[number] | null>(null);
  const [count, setCount] = useState<(typeof COUNTS)[number] | null>(null);
  const [quizWords, setQuizWords] = useState<any[] | null>(null);
  const [sessionKey, setSessionKey] = useState(0);
  const [quizSource, setQuizSource] = useState<SourceTab>("random");
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    const sync = () => setBookmarks(getBookmarkWords());
    sync();
    window.addEventListener(BOOKMARKS_CHANGED_EVENT, sync);
    return () => window.removeEventListener(BOOKMARKS_CHANGED_EVENT, sync);
  }, []);

  const startRandomQuiz = useCallback(() => {
    if (!level || !count) return;
    const pool = allWords.filter((w) => String(w.difficulty ?? "") === level);
    const shuffled = shuffle(pool);
    const picked = shuffled.slice(0, Math.min(count, shuffled.length));
    setQuizSource("random");
    setSessionKey((k) => k + 1);
    setQuizWords(picked.length > 0 ? picked : null);
  }, [allWords, level, count]);

  const startBookmarkQuiz = useCallback(() => {
    if (!count) return;
    const pool = getBookmarkWords();
    const shuffled = shuffle(pool);
    const picked = shuffled.slice(0, Math.min(count, shuffled.length));
    setQuizSource("bookmarks");
    setSessionKey((k) => k + 1);
    setQuizWords(picked.length > 0 ? picked : null);
  }, [count]);

  const backToSetup = useCallback(() => {
    setQuizWords(null);
  }, []);

  const emptyRandomPool = useMemo(() => {
    if (!level || !count) return false;
    return allWords.filter((w) => String(w.difficulty ?? "") === level).length === 0;
  }, [allWords, level, count]);

  const canStartRandom = level !== null && count !== null && !emptyRandomPool;
  const canStartBookmarks =
    count !== null && bookmarks.length > 0;

  if (quizWords && quizWords.length > 0) {
    return (
      <div className="pb-32">
        <div className="max-w-7xl mx-auto px-8 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            type="button"
            onClick={backToSetup}
            className="font-display text-xs font-[800] tracking-[0.18em] uppercase text-outline hover:text-primary transition-colors w-fit"
          >
            ← 設定に戻る
          </button>
          <p className="text-sm text-on-surface-variant font-body">
            {quizSource === "random" ? (
              <>
                <span className="font-display font-bold text-on-surface">{level}</span>
                {" · "}
                {quizWords.length} 問（ランダム）
              </>
            ) : (
              <>
                <span className="font-display font-bold text-on-surface">ブックマーク</span>
                {" · "}
                {quizWords.length} 問
              </>
            )}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-8 mb-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black tracking-tighter text-slate-900 uppercase font-display">
              Quiz Session.
            </h2>
            <div className="h-[1px] flex-grow bg-slate-200" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 mb-8">
          <QuizAdSlot />
        </div>

        <WordCarousel
          key={sessionKey}
          words={quizWords}
          isQuizMode
          quizBlurMeaningsOnly
          sectionId={`quiz-${sessionKey}`}
        />

        <div className="max-w-7xl mx-auto px-8 mt-16">
          <QuizAdSlot />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <div className="flex flex-wrap gap-2 border-b border-surface-container-highest pb-1">
        <button
          type="button"
          onClick={() => setTab("random")}
          className={`px-5 py-2.5 rounded-t-lg text-sm font-[800] font-display transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
            tab === "random"
              ? "bg-primary text-white active:bg-primary active:text-white"
              : "text-outline hover:text-on-surface hover:bg-surface-container-low"
          }`}
        >
          ランダム出題
        </button>
        <button
          type="button"
          onClick={() => setTab("bookmarks")}
          className={`px-5 py-2.5 rounded-t-lg text-sm font-[800] font-display transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
            tab === "bookmarks"
              ? "bg-primary text-white active:bg-primary active:text-white"
              : "text-outline hover:text-on-surface hover:bg-surface-container-low"
          }`}
        >
          ブックマーク
          <span
            className={`ml-1.5 text-xs font-bold opacity-80 ${tab === "bookmarks" ? "text-white/90" : ""}`}
          >
            ({bookmarks.length})
          </span>
        </button>
      </div>

      {tab === "random" && (
        <>
          <p className="text-on-surface-variant text-sm md:text-base leading-relaxed font-body">
            CEFR レベルと出題数を選んで開始します。単語はアニメーション付きで表示され、意味と例文の日本語は伏せられます。「開示」で答えが表示されます。
          </p>

          <div className="rounded-2xl border border-surface-container-highest bg-surface-container-low/30 p-8 space-y-8">
            <div>
              <h3 className="font-display text-xs font-[800] tracking-[0.18em] uppercase text-outline mb-4">
                難易度（CEFR）
              </h3>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((lv) => (
                  <button
                    key={lv}
                    type="button"
                    onClick={() => setLevel(lv)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-[800] font-display border min-w-[2.75rem] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      level === lv
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-white border-[#dee2e6] text-[#44474e] hover:bg-[#f0f2f4]"
                    }`}
                  >
                    {lv}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-surface-container-highest">
              <h3 className="font-display text-xs font-[800] tracking-[0.18em] uppercase text-outline mb-4">
                出題数
              </h3>
              <div className="flex flex-wrap gap-2">
                {COUNTS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCount(n)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-[800] font-display border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      count === n
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-white border-[#dee2e6] text-[#44474e] hover:bg-[#f0f2f4]"
                    }`}
                  >
                    {n} 問
                  </button>
                ))}
              </div>
            </div>

            {emptyRandomPool && level && (
              <p className="text-sm text-red-600 font-body">
                このレベルの単語がデータにありません。別のレベルを選んでください。
              </p>
            )}

            <button
              type="button"
              disabled={!canStartRandom}
              onClick={startRandomQuiz}
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-primary text-white font-display font-bold text-sm tracking-tight hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              クイズを開始
            </button>
          </div>

          <QuizAdSlot className="mt-8" />
        </>
      )}

      {tab === "bookmarks" && (
        <>
          <p className="text-on-surface-variant text-sm md:text-base leading-relaxed font-body">
            一覧や詳細でブックマークした単語だけが出題されます。カルーセルや詳細のブックマークボタンで追加してください。
          </p>

          <div className="rounded-2xl border border-surface-container-highest bg-surface-container-low/30 p-8 space-y-8">
            <div>
              <h3 className="font-display text-xs font-[800] tracking-[0.18em] uppercase text-outline mb-2">
                登録済み
              </h3>
              <p className="text-2xl font-display font-extrabold text-on-surface tabular-nums">
                {bookmarks.length}
                <span className="text-sm font-semibold text-outline ml-2">語</span>
              </p>
              {bookmarks.length === 0 && (
                <p className="text-sm text-outline font-body mt-3">
                  まだブックマークがありません。
                </p>
              )}
            </div>

            <div className="pt-6 border-t border-surface-container-highest">
              <h3 className="font-display text-xs font-[800] tracking-[0.18em] uppercase text-outline mb-4">
                出題数
              </h3>
              <div className="flex flex-wrap gap-2">
                {COUNTS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCount(n)}
                    disabled={bookmarks.length === 0}
                    className={`px-5 py-2.5 rounded-lg text-sm font-[800] font-display border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed ${
                      count === n
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-white border-[#dee2e6] text-[#44474e] hover:bg-[#f0f2f4]"
                    }`}
                  >
                    {n} 問
                  </button>
                ))}
              </div>
              <p className="text-xs text-outline font-body mt-3">
                登録数が出題数より少ない場合は、登録されている語数だけ出題されます。
              </p>
            </div>

            <button
              type="button"
              disabled={!canStartBookmarks}
              onClick={startBookmarkQuiz}
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-primary text-white font-display font-bold text-sm tracking-tight hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              クイズを開始
            </button>
          </div>

          <QuizAdSlot className="mt-8" />
        </>
      )}
    </div>
  );
}
