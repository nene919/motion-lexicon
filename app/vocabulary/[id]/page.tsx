// app/vocabulary/[id]/page.tsx
import { client } from "@/lib/client";
import WordCard from "@/app/components/WordCard";
import WordDetailActions from "@/app/components/WordDetailActions";
import TopNav from "@/app/components/TopNav";
import Link from "next/link";
import { notFound } from "next/navigation";

// キャッシュを無効化し、常に最新のデータを取得
export const revalidate = 0;

export default async function WordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. microCMSから特定の単語データを取得
  let item: any;
  try {
    item = await client.get({
      endpoint: "vocabulary",
      contentId: id,
    });
  } catch (error) {
    // データが見つからない場合は404ページを表示
    notFound();
  }

  // 2. Discover More：同じ難易度の他単語をプールからランダムに最大4件
  let discoverWords: any[] = [];
  try {
    const list = await client.get({
      endpoint: "vocabulary",
      queries: {
        limit: 100,
        orders: "-createdAt",
      },
    });
    const level = String(item.difficulty ?? "");
    let pool = (list.contents || []).filter(
      (w: any) => w.id !== id && String(w.difficulty ?? "") === level
    );
    // Fisher–Yates シャッフル（毎リクエストで順序が変わる）
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    discoverWords = pool.slice(0, 4);
  } catch (error) {
    discoverWords = [];
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* --- 共通トップナビ --- */}
      <TopNav />

      <div className="pt-32 pb-24 px-6 md:px-10 max-w-5xl mx-auto">
        {/* --- サブヘッダー: 戻るリンク --- */}
        <div className="mb-16">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-display text-xs md:text-sm font-[800] tracking-[0.18em] uppercase text-outline hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined !text-[16px]">arrow_back</span>
            Back to home
          </Link>
        </div>

        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-6">
            {/* --- 中央フォーカス: 単語表示（Today's Pickups と同じ動き＆色） --- */}
            <section className="relative group">
              <div className="relative bg-white py-16 md:py-20 px-10 md:px-20 rounded-3xl border border-surface-container-highest flex flex-col items-center justify-center text-center overflow-hidden">
                <div className="flex items-center justify-center">
                  <div className="scale-75 md:scale-90">
                    <WordCard item={item} />
                  </div>
                </div>
              </div>
            </section>

            {/* Today's Pickups. と同じスピーカー / ブックマーク（枠の下・意味の上） */}
            <WordDetailActions item={item} />
          </div>

          {/* --- 詳細情報グリッド --- */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start">
            {/* 左カラム：意味・定義・例文 */}
            <div className="md:col-span-7 flex flex-col gap-12">
              {/* 日本語の意味 */}
              <div>
                <span className="font-display text-sm md:text-[13px] font-[800] tracking-[0.16em] text-outline mb-3 block">
                  日本語の意味
                </span>
                <p className="text-[2rem] font-display font-bold text-on-surface leading-tight mb-2">
                  {item.meaning_ja || item.meaning}
                </p>
                {item.note_ja && (
                  <p className="text-outline font-body italic">
                    {item.note_ja}
                  </p>
                )}
              </div>

              {/* 英語の定義 */}
              <div className="pt-8 border-t border-surface-container-highest">
                <span className="font-display text-sm md:text-[13px] font-[800] tracking-[0.16em] text-outline mb-3 block">
                  英語の定義
                </span>
                <p className="text-xl font-display font-semibold text-on-surface leading-relaxed">
                  {item.definition_en}
                </p>
              </div>

              {/* 例文 */}
              <div className="pt-8 border-t border-surface-container-highest">
                <span className="font-display text-sm md:text-[13px] font-[800] tracking-[0.16em] text-outline mb-6 block">
                  例文
                </span>
                <div className="space-y-10">
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-3 w-4 h-[1px] bg-outline-variant" />
                    <p className="text-on-surface-variant italic font-serif text-2xl md:text-3xl leading-snug">
                      "{item.example_en}"
                    </p>
                    <p className="text-outline text-sm md:text-[19px] font-medium tracking-tight font-body mt-2">
                      {item.example_ja}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 右カラム：Difficulty・メタ情報・広告枠 */}
            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-10">
              {/* Difficulty + メタ情報 */}
              <div className="flex flex-col gap-8 bg-surface-container-low p-8 rounded-2xl">
                <div>
                  <span className="font-display text-sm md:text-[13px] font-[800] tracking-[0.16em] text-outline mb-2 block">
                    難易度
                  </span>
                  <div className="inline-flex items-center">
                    <span className="font-display font-bold text-3xl md:text-4xl text-primary leading-none uppercase tracking-widest">
                      {item.difficulty}
                    </span>
                  </div>
                </div>
                <div className="space-y-6 pt-6 border-t border-surface-container-highest">
                  <div>
                    <span className="font-display text-sm md:text-[13px] font-[800] tracking-[0.16em] text-outline mb-1 block">
                      作成日
                    </span>
                    <span className="font-display font-bold text-sm text-primary">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-display text-sm md:text-[13px] font-[800] tracking-[0.16em] text-outline mb-1 block">
                      更新日
                    </span>
                    <span className="font-display font-bold text-sm text-primary">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Advertisement Placeholder */}
              <div className="bg-surface-container-highest/20 border border-dashed border-outline-variant rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[260px]">
                <span className="font-display text-[9px] tracking-widest uppercase text-outline mb-6">
                  Advertisement
                </span>
                <div className="w-full h-32 bg-white/60 rounded-xl mb-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-outline-variant opacity-40 text-3xl">
                    image
                  </span>
                </div>
                <div className="text-outline/50 italic font-body text-[10px] uppercase tracking-widest">
                  Sponsored Space
                </div>
              </div>
            </div>
          </section>

          {/* --- Discover More セクション（背景帯なし・トップと同じカード） --- */}
          {discoverWords.length > 0 && (
            <section className="mt-16">
              <div>
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-display font-extrabold tracking-tight text-primary">
                    Discover More
                  </h2>
                  <Link
                    href="/"
                    className="font-display text-xs md:text-sm font-[800] tracking-[0.18em] uppercase text-outline hover:text-primary transition-colors flex items-center gap-2"
                  >
                    Word List
                    <span className="material-symbols-outlined !text-[14px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {discoverWords.map((item) => (
                  <Link
                    key={item.id}
                    href={`/vocabulary/${item.id}`}
                    className="group relative rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[140px] overflow-hidden isolate flex items-center justify-center"
                  >
                    {/* ホバー前の大きい単語 */}
                    <div className="z-10 transition-all duration-500 group-hover:opacity-0 group-hover:scale-50 pointer-events-none text-center px-4">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight lowercase leading-tight block truncate font-display">
                        {item.word}
                      </span>
                    </div>

                    {/* ホバー後に WordCard を表示（Today's Pickups と同じ） */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-0 pointer-events-none overflow-hidden isolate">
                      <div className="w-full h-full flex items-center justify-center relative">
                        <div className="transform scale-[0.35] group-hover:scale-[0.45] transition-transform duration-700 ease-out flex items-center justify-center whitespace-nowrap">
                          <WordCard item={item} />
                        </div>
                      </div>
                    </div>

                    {/* 外枠ボーダー */}
                    <div className="absolute inset-0 rounded-[2.5rem] border border-slate-100 pointer-events-none z-20 group-hover:border-slate-200/50 transition-colors"></div>
                  </Link>
                ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* --- 共通フッター（トップページと同じ） --- */}
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