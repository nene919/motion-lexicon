"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const TABS = [
  { id: "site" as const, label: "サイトについて" },
  { id: "author" as const, label: "作者・運営" },
  { id: "works" as const, label: "その他のコンテンツ" },
  { id: "links" as const, label: "ブログ・リンク" },
];

function ExternalRow({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start justify-between gap-4 rounded-xl border border-surface-container-highest bg-white px-5 py-4 transition-colors hover:bg-surface-container-low/60"
    >
      <div>
        <p className="font-display font-bold text-on-surface">{title}</p>
        {description ? (
          <p className="mt-1 text-sm text-on-surface-variant font-body leading-relaxed">{description}</p>
        ) : null}
        <p className="mt-1.5 text-xs text-outline font-body break-all">{href}</p>
      </div>
      <ArrowUpRight
        size={20}
        className="shrink-0 text-outline group-hover:text-on-surface transition-colors mt-0.5"
        aria-hidden
      />
    </a>
  );
}

export default function AboutTabs() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("site");

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2 border-b border-surface-container-highest pb-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={`px-4 py-2.5 rounded-t-lg text-sm font-[800] font-display transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              active === t.id
                ? "bg-primary text-white active:bg-primary active:text-white"
                : "text-outline hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {active === "site" && (
        <div className="space-y-6 text-on-surface-variant text-sm md:text-base leading-relaxed font-body">
          <p>
            MOVING.dict（Moving Vocab）は、英単語の意味だけでなく「どう動くか」をアニメーションで体感できるミニマルな語彙サイトです。CEFR
            レベルや検索で単語を探し、Today's Pickups でランダムに出会うこともできます。
          </p>
          <p>
            Quizzes ではランダム出題・ブックマーク単語のみの出題を選べ、意味や和訳を伏せたまま学習し、必要なときに開示できます。ブックマークはブラウザに保存され、一覧や詳細からいつでも追加・解除できます。
          </p>
          <p className="text-outline text-sm">
            掲載内容・デザインは予告なく変更される場合があります。
          </p>
        </div>
      )}

      {active === "author" && (
        <div className="space-y-6 text-on-surface-variant text-sm md:text-base leading-relaxed font-body">
          <p>
            本サイトは <strong className="text-on-surface font-semibold">Kinetic Learning Lab</strong>{" "}
            が企画・運営しています。言語学習とモーション・タイポグラフィの交差から、記憶に残りやすい学習体験を試作・公開しています。
          </p>
          <p>
            ご意見・ご感想・不具合報告は{" "}
            <Link href="/contact" className="text-primary font-semibold underline underline-offset-4 hover:opacity-90">
              Contact
            </Link>{" "}
            からお送りください。
          </p>
        </div>
      )}

      {active === "works" && (
        <div className="space-y-4 text-on-surface-variant text-sm md:text-base leading-relaxed font-body">
          <p className="mb-2">
            同じコンセプトや姉妹プロジェクトの一例です。URL は実際の公開先に合わせて差し替えてください。
          </p>
          <ul className="space-y-3 list-disc pl-5 marker:text-outline">
            <li>
              <span className="text-on-surface font-semibold">モーション付き語彙シリーズ</span>
              — 動きと色で語のニュアンスを補助する実験的コンテンツ（本サイトがそのひとつです）。
            </li>
            <li>
              <span className="text-on-surface font-semibold">学習ノート・テンプレート</span>
              — 語彙整理用のワークシートやチェックリスト（別途配布している場合）。
            </li>
            <li>
              <span className="text-on-surface font-semibold">ワークショップ・記事</span>
              — イベントや技術メモをブログ・note 等で公開している場合は、隣のタブのリンクからどうぞ。
            </li>
          </ul>
        </div>
      )}

      {active === "links" && (
        <div className="space-y-4">
          <p className="text-on-surface-variant text-sm md:text-base leading-relaxed font-body">
            更新情報や長文の解説はブログ・SNS で発信している場合があります。下記はプレースホルダーです。運営の実URLに置き換えてください。
          </p>
          <div className="space-y-3">
            <ExternalRow
              href="https://note.com/"
              title="note（ブログ・記事）"
              description="リリースノートや学習Tips、制作裏話など。"
            />
            <ExternalRow
              href="https://twitter.com/"
              title="X（旧 Twitter）"
              description="短い更新やお知らせ。"
            />
            <div className="rounded-xl border border-dashed border-surface-container-highest bg-surface-container-low/30 px-5 py-4">
              <p className="text-xs font-display font-[800] uppercase tracking-widest text-outline mb-1">
                このサイト内
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-body">
                <li>
                  <Link href="/" className="text-primary font-semibold hover:underline underline-offset-4">
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link href="/quiz" className="text-primary font-semibold hover:underline underline-offset-4">
                    Quizzes
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-primary font-semibold hover:underline underline-offset-4">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-primary font-semibold hover:underline underline-offset-4">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-primary font-semibold hover:underline underline-offset-4">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
