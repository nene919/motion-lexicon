// app/vocabulary/[id]/page.tsx
import { client } from "@/lib/client";
import WordCard from "@/app/components/WordCard";
import StudyTools from "@/app/components/StudyTools";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function WordDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // microCMSからデータを取得
  const item = await client.get({
    endpoint: "vocabulary",
    contentId: id,
  }).catch(() => null);

  if (!item) return notFound();

  // 関連ワード（同じ難易度）の取得
  const relatedResponse = await client.get({
    endpoint: "vocabulary",
    queries: { 
      filters: `difficulty[equals]${item.difficulty}[and]id[not_equals]${item.id}`, 
      limit: 3 
    }
  });

  return (
    <main className="min-h-screen bg-white">
      {/* 戻るボタン */}
      <div className="fixed top-10 left-10 z-50">
        <Link href="/" className="group flex items-center gap-3 text-[10px] font-black tracking-[0.3em] text-slate-300 hover:text-blue-600 transition-all">
          <span className="w-6 h-[1px] bg-slate-200 group-hover:bg-blue-600 transition-all"></span>
          CLOSE ARCHIVE
        </Link>
      </div>

      {/* メインのアニメーション表示エリア */}
      <section className="h-[75vh] flex flex-col items-center justify-center relative border-b border-slate-50 overflow-hidden bg-slate-50/20">
        <WordCard 
          word={item.word} 
          color={item.customColor} 
          font={item.customFont}
          animationJson={item.customAnimation} 
          transitionJson={item.customTransition}
          initialJson={item.customInitial}
        />
        
        {/* 学習ツール（読み上げ、クイズ、マスターボタン） */}
        <div className="absolute bottom-20 w-full max-w-2xl px-8">
          <StudyTools word={item.word} id={item.id} />
        </div>

        {/* 難易度表示 */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-sm ${i < (item.difficulty || 0) ? "text-yellow-400" : "text-slate-100"}`}>★</span>
            ))}
          </div>
        </div>
      </section>

      {/* 詳細情報エリア */}
      <article className="max-w-5xl mx-auto py-24 px-8 grid md:grid-cols-2 gap-20">
        <div className="space-y-10">
          <div className="space-y-4">
            <h3 className="text-blue-600 text-[10px] font-black tracking-[0.3em] uppercase italic">Definition</h3>
            {/* 💡 study-target クラスでぼかし制御 */}
            <h2 className="text-5xl font-bold text-slate-900 study-target transition-all duration-700 ease-in-out">
              {item.meaning}
            </h2>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-slate-300 text-[10px] font-black tracking-[0.3em] uppercase">Commentary</h3>
            <div 
              className="prose prose-slate text-slate-500 leading-loose study-target transition-all duration-700 ease-in-out" 
              dangerouslySetInnerHTML={{ __html: item.description || "No further description available." }} 
            />
          </div>
        </div>

        <div className="space-y-12">
          {/* 例文セクション */}
          <div className="bg-slate-900 p-12 rounded-[3rem] shadow-2xl shadow-slate-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-white text-6xl font-serif">“</div>
            <h3 className="text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase mb-8">Usage Example</h3>
            {/* 💡 study-target クラスでぼかし制御 */}
            <p className="text-2xl font-serif italic text-white mb-6 leading-relaxed study-target transition-all duration-700 ease-in-out">
              "{item.example_en || "Sample sentence not available."}"
            </p>
            <p className="text-slate-400 text-sm font-medium study-target transition-all duration-700 ease-in-out">
              {item.example_ja || ""}
            </p>
          </div>

          {/* 関連単語セクション */}
          {relatedResponse.contents.length > 0 && (
            <section className="pt-8">
              <h3 className="text-slate-300 text-[10px] font-black tracking-[0.3em] uppercase mb-8 text-center">Similar Difficulty</h3>
              <div className="grid gap-3">
                {relatedResponse.contents.map((rel: any) => (
                  <Link key={rel.id} href={`/vocabulary/${rel.id}`} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all group">
                    <span className="font-bold text-slate-800 group-hover:text-blue-600">{rel.word}</span>
                    <span className="text-xs text-slate-400 font-medium">{rel.meaning}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      {/* フッター（ページ送りなどの拡張用スペース） */}
      <footer className="py-20 border-t border-slate-50 text-center">
        <Link href="/" className="text-[10px] font-black text-slate-200 hover:text-blue-600 tracking-[0.4em] uppercase transition-colors">
          Back to Index
        </Link>
      </footer>
    </main>
  );
}