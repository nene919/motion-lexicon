import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/app/components/TopNav";
import AboutTabs from "@/app/components/AboutTabs";

export const metadata: Metadata = {
  title: "About | MOVING.dict",
  description: "MOVING.dict の概要、運営、関連リンク",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-on-surface">
      <TopNav />

      <div className="max-w-3xl mx-auto px-8 pt-28 pb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 font-display">About</h1>
        <p className="text-outline text-sm font-body mb-10">
          サイトの説明、運営者、関連コンテンツ、ブログ・外部リンクをタブで切り替えられます。
        </p>

        <AboutTabs />
      </div>

      <footer className="w-full py-16 px-10 mt-12 border-t border-indigo-200/50 bg-gradient-to-r from-indigo-50 via-sky-50/90 to-cyan-50 shadow-[0_-6px_28px_-10px_rgba(79,70,229,0.12)]">
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
