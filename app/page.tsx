// app/page.tsx
import { client } from "@/lib/client";
import WordCarousel from "@/app/components/WordCarousel";
import MainContent from "@/app/components/MainContent";
import TopNav from "@/app/components/TopNav";
import Link from "next/link";

export const revalidate = 0;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; tab?: string }>;
}) {
  const resolvedParams = await searchParams;
  const level = resolvedParams.level || "";
  const tabParam = resolvedParams.tab;
  const initialTab =
    tabParam === "quiz" || tabParam === "custom" ? tabParam : "archive";

  let allWords = [];
  let randomPickups = [];

  try {
    const data = await client.get({
      endpoint: "vocabulary",
      queries: { 
        limit: 100, 
        orders: "-createdAt" 
      },
    });
    allWords = data.contents || [];

    if (allWords.length > 0) {
      randomPickups = [...allWords]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    }
  } catch (error) {
    console.error("Failed to fetch words:", error);
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopNav />

      {/* --- 1. ヒーロー（コンパクト） --- */}
      <header className="pt-20 px-6 md:px-8 pb-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-3">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-on-surface leading-snug font-display">
            サイトについて
          </h1>
          <p className="text-sm md:text-[15px] text-on-surface-variant leading-relaxed font-light font-body max-w-2xl">
            英単語の意味だけでなく、「どう動くのか」をアニメーション付きで体感できるミニマルな語彙プラットフォームです。
          </p>
          <div className="inline-flex items-center gap-2 rounded-md bg-surface-container-low border border-surface-container-highest px-3 py-1.5">
            <span className="text-[10px] uppercase tracking-widest font-bold text-outline font-display">
              掲載語数
            </span>
            <span className="text-base font-extrabold text-on-surface font-display tabular-nums">
              {allWords.length.toLocaleString()}語
            </span>
          </div>
        </div>
      </header>

      {/* --- 2. Today's Pickups. (タイトルのすぐ下) --- */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 mb-10">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 font-display">
              Today's Pickups.
            </h2>
            <div className="h-[1px] flex-grow bg-slate-200" />
          </div>
        </div>
        
        {/* randomPickupsを渡す */}
        <WordCarousel words={randomPickups} sectionId="hero-home" />
      </section>

      {/* --- 3. MAIN CONTENT (Tabs & Archive / 以降変更なし) --- */}
      <MainContent 
        allWords={allWords} 
        initialLevel={level} 
      />

      {/* --- 4. FOOTER --- */}
      <footer className="w-full py-16 px-10 mt-20 border-t border-indigo-200/50 bg-gradient-to-r from-indigo-50 via-sky-50/90 to-cyan-50 shadow-[0_-6px_28px_-10px_rgba(79,70,229,0.12)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          
          {/* 左側：ロゴとコピーライト */}
          <div className="flex flex-col gap-3">
            <div className="text-sm font-[800] text-[#1a1c1e] font-display uppercase tracking-widest">
              Moving Vocab
            </div>
            <p className="font-body text-[11px] text-[#74777f] uppercase tracking-wider">
              © 2024 Kinetic Learning Lab. All Rights Reserved.
            </p>
          </div>

          {/* 右側：リンクメニュー */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 font-display text-xs font-[700] uppercase tracking-widest">
            <Link className="text-[#44474e] hover:text-[#1a1c1e] transition-colors" href="/contact">
              Contact
            </Link>
            <Link className="text-[#44474e] hover:text-[#1a1c1e] transition-colors" href="/terms">
              Terms
            </Link>
            <Link className="text-[#44474e] hover:text-[#1a1c1e] transition-colors" href="/privacy">
              Privacy
            </Link>
            <a className="text-[#44474e] hover:text-[#1a1c1e] transition-colors" href="#">Help</a>
          </div>

        </div>
      </footer>
    </main>
  );
}