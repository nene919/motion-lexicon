// app/page.tsx
import { client } from "@/lib/client";
import SearchAndFilter from "@/app/components/SearchAndFilter";
import WordCarousel from "@/app/components/WordCarousel";
import QuizSection from "@/app/components/QuizSection";
import CustomQuizSection from "@/app/components/CustomQuizSection";

export const revalidate = 0;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const resolvedParams = await searchParams;
  const level = resolvedParams.level || "";

  // 1. 全単語を取得（リスト表示 & カルーセル用）
  const filters = level ? `difficulty[equals]${level}` : "";
  const data = await client.get({
    endpoint: "vocabulary",
    queries: { 
      limit: 100,
      orders: "word",
      filters: filters
    },
  });

  const allWords = data.contents;

  // 2. ランダムピックアップ用（5個）
  const randomPickups = [...allWords]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-white text-slate-900 pb-20">
      {/* --- ヘッダー --- */}
      <header className="px-8 pt-16 pb-4">
        <div className="max-w-7xl mx-auto space-y-1">
          <h1 className="text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">
            Digital Archive
          </h1>
          <p className="text-4xl font-bold tracking-tighter text-slate-900 leading-none">
            Motion Lexicon.
          </p>
        </div>
      </header>

      {/* --- セクション1: 検索バー & 単語リスト (10個程度表示) --- */}
      <section className="mb-20">
        <SearchAndFilter 
          initialLevel={level} 
          words={allWords} 
          initialAlpha="" // 索引不要のため空文字
        />
      </section>

      {/* --- セクション2: ランダムピックアップ (詳細内容表示) --- */}
      <section className="mb-24">
        <div className="px-8 max-w-7xl mx-auto mb-8 border-t border-slate-50 pt-12">
          <h2 className="text-[10px] font-black tracking-widest text-blue-600 uppercase">
            Today's Pickups
          </h2>
        </div>
        <WordCarousel words={randomPickups} />
      </section>

      {/* --- セクション3: 難易度別ランダムクイズ --- */}
      <section className="mb-24 px-8 max-w-7xl mx-auto">
        <QuizSection allWords={allWords} />
      </section>

      {/* --- セクション4: カスタムクイズ (マークした単語) --- */}
      <section className="px-8 max-w-7xl mx-auto">
        <CustomQuizSection allWords={allWords} />
      </section>

      <footer className="mt-32 py-10 text-center border-t border-slate-50">
        <p className="text-[9px] font-black text-slate-200 tracking-[0.5em] uppercase">
          &copy; 2026 Motion Lexicon Project
        </p>
      </footer>
    </main>
  );
}