// app/vocabulary/[id]/page.tsx
import { client } from "@/lib/client";
import WordCard from "@/app/components/WordCard";
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
  let item;
  try {
    item = await client.get({
      endpoint: "vocabulary",
      contentId: id,
    });
  } catch (error) {
    // データが見つからない場合は404ページを表示
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 pb-20">
      {/* --- ヘッダー・ナビゲーション --- */}
      <nav className="px-8 pt-12 max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="text-[10px] font-black tracking-widest text-slate-400 hover:text-slate-900 transition-colors uppercase"
        >
          ← Back to Archive
        </Link>
        <span className="text-[10px] font-black tracking-[0.3em] text-slate-200 uppercase">
          Word Detail / {id}
        </span>
      </nav>

      {/* --- メインビジュアル: 単語カードエリア --- */}
      <section className="px-8 mt-8">
        <div className="max-w-7xl mx-auto h-[500px] bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center justify-center relative overflow-hidden">
          {/* 💡 WordCardにitemオブジェクトをまるごと渡す */}
          <div className="scale-125 md:scale-150">
            <WordCard item={item} />
          </div>
          
          {/* 背景の装飾テキスト */}
          <div className="absolute bottom-10 right-12 opacity-[0.03] select-none pointer-events-none">
            <span className="text-[15vw] font-black italic uppercase leading-none">
              {item.word}
            </span>
          </div>
        </div>
      </section>

      {/* --- 詳細情報セクション --- */}
      <section className="px-8 mt-20 max-w-5xl mx-auto grid md:grid-cols-3 gap-16">
        
        {/* 意味・難易度 */}
        <div className="md:col-span-1 space-y-8">
          <div>
            <h2 className="text-[10px] font-black tracking-widest text-blue-600 uppercase mb-4">Meaning</h2>
            <p className="text-4xl font-bold text-slate-900 tracking-tighter">
              {item.meaning}
            </p>
          </div>
          <div className="pt-4 border-t border-slate-50">
            <h2 className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Difficulty</h2>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-4 h-1 rounded-full ${i < item.difficulty ? "bg-slate-900" : "bg-slate-100"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 例文セクション */}
        <div className="md:col-span-2 space-y-12">
          <div>
            <h2 className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-6">Usage Examples</h2>
            <div className="space-y-8">
              <div className="group">
                <p className="text-2xl md:text-3xl italic font-serif text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">
                  "{item.example_en}"
                </p>
                <p className="mt-3 text-slate-400 font-medium tracking-tight">
                  {item.example_ja}
                </p>
              </div>
            </div>
          </div>

          {/* 追加情報（もしあれば） */}
          <div className="pt-10 border-t border-slate-50 flex flex-wrap gap-10">
            <div>
              <h2 className="text-[10px] font-black tracking-widest text-slate-300 uppercase mb-2">Created</h2>
              <p className="text-[10px] font-mono text-slate-400">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h2 className="text-[10px] font-black tracking-widest text-slate-300 uppercase mb-2">Last Updated</h2>
              <p className="text-[10px] font-mono text-slate-400">
                {new Date(item.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 下部ナビゲーション --- */}
      <footer className="mt-32 px-8 max-w-7xl mx-auto text-center">
        <Link 
          href="/" 
          className="inline-block px-10 py-4 bg-slate-900 text-white rounded-full text-[10px] font-black tracking-[0.3em] uppercase hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
        >
          Return to Lexicon
        </Link>
      </footer>
    </main>
  );
}