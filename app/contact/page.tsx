import type { Metadata } from "next";
import TopNav from "@/app/components/TopNav";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | MOVING.dict",
  description: "Moving Dictionary へのお問い合わせ",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-on-surface">
      <TopNav />

      <section className="max-w-3xl mx-auto px-8 pt-28 pb-20">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 font-display">
          Contact
        </h1>
        <p className="text-on-surface-variant text-sm md:text-base leading-relaxed font-body mb-10">
          ご質問・不具合のご報告・コンテンツに関するご提案など、お気軽にご連絡ください。
        </p>

        <div className="rounded-2xl border border-surface-container-highest bg-surface-container-low/40 p-8 md:p-10 space-y-6">
          <div>
            <h2 className="font-display text-xs font-[800] tracking-[0.18em] uppercase text-outline mb-2">
              Email
            </h2>
            <a
              href="mailto:hello@kineticlearning.lab"
              className="text-primary font-display font-semibold text-lg hover:underline underline-offset-4"
            >
              hello@kineticlearning.lab
            </a>
            <p className="text-outline text-xs font-body mt-2">
              返信まで数日かかる場合があります。
            </p>
          </div>

          <div className="pt-6 border-t border-surface-container-highest">
            <Link
              href="/"
              className="font-display text-xs md:text-sm font-[800] tracking-[0.18em] uppercase text-outline hover:text-primary transition-colors inline-flex items-center gap-2"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </section>

      <footer className="w-full py-16 px-10 mt-auto border-t border-indigo-200/50 bg-gradient-to-r from-indigo-50 via-sky-50/90 to-cyan-50 shadow-[0_-6px_28px_-10px_rgba(79,70,229,0.12)]">
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
            <Link
              className="text-[#44474e] hover:text-[#1a1c1e] transition-colors"
              href="/contact"
            >
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
