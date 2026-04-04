import type { Metadata } from "next";
import TopNav from "@/app/components/TopNav";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | MOVING.dict",
  description: "Moving Dictionary のプライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-on-surface">
      <TopNav />

      <section className="max-w-3xl mx-auto px-8 pt-28 pb-20">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 font-display">
          Privacy Policy
        </h1>
        <p className="text-outline text-xs font-body mb-10">
          最終更新日: 2026年4月3日
        </p>

        <div className="space-y-10 text-sm md:text-base text-on-surface-variant font-body leading-relaxed">
          <p>
            Moving Dictionary（以下「本サービス」）は、ユーザーの皆様の個人情報の取扱いについて、以下の方針に基づき適切に管理します。
          </p>

          <section>
            <h2 className="font-display text-sm font-[800] tracking-tight text-on-surface mb-3">
              1. 取得する情報
            </h2>
            <p>
              本サービスでは、現時点でアカウント登録を必須としない範囲で提供する場合、お問い合わせ時にご入力いただいたメールアドレス等の連絡先情報を取得することがあります。また、アクセス解析のために Cookie や類似の技術を利用する場合があります。
            </p>
          </section>

          <section>
            <h2 className="font-display text-sm font-[800] tracking-tight text-on-surface mb-3">
              2. 利用目的
            </h2>
            <p>
              取得した情報は、お問い合わせへの対応、本サービスの品質改善・不正利用の防止、法令に基づく対応のために利用します。
            </p>
          </section>

          <section>
            <h2 className="font-display text-sm font-[800] tracking-tight text-on-surface mb-3">
              3. 第三者提供
            </h2>
            <p>
              法令に基づく場合を除き、本人の同意なく第三者に個人情報を提供しません。ホスティングや解析ツールの利用に伴い、委託先がデータを処理する場合があります。
            </p>
          </section>

          <section>
            <h2 className="font-display text-sm font-[800] tracking-tight text-on-surface mb-3">
              4. 保管期間
            </h2>
            <p>
              個人情報は、利用目的の達成に必要な期間のみ保管し、不要となった場合は適切に削除または匿名化します。
            </p>
          </section>

          <section>
            <h2 className="font-display text-sm font-[800] tracking-tight text-on-surface mb-3">
              5. お問い合わせ
            </h2>
            <p>
              本ポリシーに関するご質問は、
              <Link href="/contact" className="text-primary font-semibold hover:underline underline-offset-2">
                Contact
              </Link>
              ページよりご連絡ください。
            </p>
          </section>

          <section>
            <h2 className="font-display text-sm font-[800] tracking-tight text-on-surface mb-3">
              6. 改定
            </h2>
            <p>
              本ポリシーは法令の改正やサービス内容の変更に応じて改定することがあります。改定後の内容は本ページに掲載した時点から適用されます。
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
