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
      <footer className="bg-slate-900 text-slate-400 py-24 px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2 space-y-6">
              <h2 className="text-white text-2xl font-bold tracking-tighter">うごく英単語帖.</h2>
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
            <p>&copy; 2026 うごく英単語帖 PROJECT</p>
            <p>DESIGNED FOR MOTION INTERFACE</p>
          </div>
        </div>
      </footer>
    </main>
  );
}