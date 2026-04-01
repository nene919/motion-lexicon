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
    // 1. microCMSからデータを取得
    const data = await client.get({
      endpoint: "vocabulary",
      queries: { 
        limit: 100, 
        orders: "-createdAt" 
      },
    });
    allWords = data.contents || [];

    // 2. ヒーローカルーセル用（ランダムに5つ抽出）
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
      {/* --- 1. HERO SECTION --- */}
      <section className="pt-20 pb-28 bg-gradient-to-b from-slate-50/80 to-white overflow-hidden">
        <header className="px-8 mb-14 max-w-7xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-[10px] font-black tracking-[0.5em] text-blue-600 uppercase">
              Interactive Lexicon
            </h1>
            <p className="text-5xl font-bold tracking-tighter text-slate-900">
              Today's Pickups.
            </p>
          </div>
        </header>

        {/* randomPickupsが空でも落ちないようにwordsとして渡す */}
        <WordCarousel words={randomPickups} sectionId="hero-home" />
      </section>

      {/* --- 2. MAIN CONTENT (Tabs & Archive) --- */}
      <MainContent 
        allWords={allWords} 
        initialLevel={level} 
      />

      {/* --- 3. FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-24 px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2 space-y-6">
              <h2 className="text-white text-2xl font-bold tracking-tighter">Motion Lexicon.</h2>
              <p className="text-sm max-w-sm leading-relaxed opacity-70">
                英単語に動きを、学びに驚きを。視覚と音で体験する新しいアーカイブ。
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-white text-[10px] font-black tracking-widest uppercase">Legal</h3>
              <ul className="text-sm space-y-3">
                <li><Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">免責事項</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-white text-[10px] font-black tracking-widest uppercase">Support</h3>
              <ul className="text-sm space-y-3">
                <li><Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-800 text-[10px] font-medium tracking-[0.4em] flex flex-col md:flex-row justify-between items-center gap-4 uppercase opacity-50">
            <p>&copy; 2026 MOTION LEXICON PROJECT</p>
            <p>DESIGNED FOR MOTION INTERFACE</p>
          </div>
        </div>
      </footer>
    </main>
  );
}