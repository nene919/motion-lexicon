import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOVING.dict | 動く英単語図鑑",
  description: "言葉の意味をアニメーションで体感する、現代的な英単語帳",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* Google Fonts を直接インポート (sample.html と同じ構成) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Be_Vietnam_Pro:wght@300;400;500;600&display=swap" rel="stylesheet" />
        {/* TopNav / 単語詳細などの material-symbols-outlined 用 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* globals.css で設定した font-body を適用 */}
      <body className="antialiased font-body">
        {children}
      </body>
    </html>
  );
}