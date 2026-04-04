import type { Metadata } from "next";
import TopNav from "@/app/components/TopNav";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | MOVING.dict",
  description: "Moving Dictionary の利用規約",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-on-surface">
      <TopNav />

      <section className="max-w-3xl mx-auto px-8 pt-28 pb-20">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 font-display">
          Terms of Use
        </h1>
        <p className="text-outline text-xs font-body mb-10">
          最終更新日: 2026年4月3日
        </p>

        <div className="space-y-10 text-sm md:text-base text-on-surface-variant font-body leading-relaxed">
          <p>
            本ページは Moving Dictionary（以下「本サービス」）の利用条件を定めるものです。本サービスをご利用になる前に、以下をお読みください。
          </p>

          <section>
            <h2 className="font-display text-sm font-[800] tracking-tight text-on-surface mb-3">
              1. サービスの内容
            </h2>
            <p>
              本サービスは、英単語とその意味・例文などを閲覧するためのオンラインコンテンツを提供します。表示内容や機能は予告なく変更・終了する場合があります。
            </p>
          </section>

          <section>
            <h2 className="font-display text-sm font-[800] tracking-tight text-on-surface mb-3">
              2. 利用上の注意
            </h2>
            <p>
              法令または公序良俗に反する目的での利用、他者の権利を侵害する行為、過度な負荷を与える行為、その他運営が不適切と判断する行為を禁止します。
            </p>
          </section>

          <section>
            <h2 className="font-display text-sm font-[800] tracking-tight text-on-surface mb-3">
              3. 知的財産権
            </h2>
            <p>
              本サービスに含まれる文章、デザイン、ロゴ、プログラム等に関する権利は、運営または正当な権利者に帰属します。私的利用の範囲を超える複製・改変・配布等は、事前の許可がない限り禁止します。
            </p>
          </section>

          <section>
            <h2 className="font-display text-sm font-[800] tracking-tight text-on-surface mb-3">
              4. 免責
            </h2>
            <p>
              本サービスの内容の正確性・完全性・有用性について、運営は保証しません。本サービスの利用により生じた損害について、運営に故意または重過失がある場合を除き、責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="font-display text-sm font-[800] tracking-tight text-on-surface mb-3">
              5. 規約の変更
            </h2>
            <p>
              運営は必要に応じて本規約を変更できます。変更後の規約は、本ページに掲載した時点から効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="font-display text-sm font-[800] tracking-tight text-on-surface mb-3">
              6. お問い合わせ
            </h2>
            <p>
              本規約に関するお問い合わせは、
              <Link href="/contact" className="text-primary font-semibold hover:underline underline-offset-2">
                Contact
              </Link>
              ページよりご連絡ください。
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-surface-container-highest">
          <Link
            href="/"
            className="font-display text-xs md:text-sm font-[800] tracking-[0.18em] uppercase text-outline hover:text-primary transition-colors inline-flex items-center gap-2"
          >
            ← Back to home
          </Link>
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
