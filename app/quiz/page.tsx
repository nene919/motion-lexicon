import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/lib/client";
import TopNav from "@/app/components/TopNav";
import QuizClient from "@/app/components/QuizClient";

export const metadata: Metadata = {
  title: "Quizzes | MOVING.dict",
  description: "ランダム出題またはブックマーク単語でクイズ",
};

export const revalidate = 0;

export default async function QuizPage() {
  let allWords: any[] = [];
  try {
    const data = await client.get({
      endpoint: "vocabulary",
      queries: {
        limit: 100,
        orders: "-createdAt",
      },
    });
    allWords = data.contents || [];
  } catch {
    allWords = [];
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopNav />

      <div className="pt-28 pb-8 px-6 md:px-10 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display text-on-surface mb-2">
          Quizzes
        </h1>
        <p className="text-outline text-sm font-body mb-10">
          ランダム（CEFR と出題数）か、ブックマークした単語だけを選んで出題できます。意味と和訳は伏せて学習できます。
        </p>

        <QuizClient allWords={allWords} />
      </div>

      <footer className="w-full py-16 px-10 mt-20 border-t border-indigo-200/50 bg-gradient-to-r from-indigo-50 via-sky-50/90 to-cyan-50 shadow-[0_-6px_28px_-10px_rgba(79,70,229,0.12)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="flex flex-col gap-3">
            <div className="text-sm font-[800] text-[#1a1c1e] font-display uppercase tracking-widest">
              Moving Vocab
            </div>
            <p className="font-body text-[11px] text-[#74777f] uppercase tracking-wider">
              © 2024 Kinetic Learning Lab. All Rights Reserved.
            </p>
          </div>
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
            <a className="text-[#44474e] hover:text-[#1a1c1e] transition-colors" href="#">
              Help
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
