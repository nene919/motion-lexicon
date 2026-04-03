// app/page.tsx
import { client } from "@/lib/client";
import WordCarousel from "@/app/components/WordCarousel";
import MainContent from "@/app/components/MainContent";
import Link from "next/link";

export const revalidate = 0;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const resolvedParams = await searchParams;
  const level = resolvedParams.level || "";

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
      
      {/* --- 1. タイトルとサブタイトル (一番上) --- */}
      <header className="pt-20 pb-10 px-8 max-w-7xl mx-auto border-b border-slate-50">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black tracking-[0.3em] text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">
              System v1.0
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900">
            うごく英単語帖
          </h1>
          <p className="text-lg font-bold text-slate-400 tracking-tight">
            言葉の「動き」を記憶に刻む、視覚的な語彙ギャラリー
          </p>
        </div>
      </header>

      {/* --- 2. Today's Pickups. (タイトルのすぐ下) --- */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 mb-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black tracking-tighter text-slate-900 uppercase">
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
      <footer className="w-full py-16 px-10 border-t border-[#dee2e6] bg-white mt-20">
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
            <a className="text-[#44474e] hover:text-[#1a1c1e] transition-colors" href="#">Contact</a>
            <a className="text-[#44474e] hover:text-[#1a1c1e] transition-colors" href="#">Terms</a>
            <a className="text-[#44474e] hover:text-[#1a1c1e] transition-colors" href="#">Privacy</a>
            <a className="text-[#44474e] hover:text-[#1a1c1e] transition-colors" href="#">Help</a>
          </div>

        </div>
      </footer>
    </main>
  );
}