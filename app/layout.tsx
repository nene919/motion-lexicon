import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOVING.dict | 動く英単語図鑑",
  description: "言葉の意味をアニメーションで体感する、現代的な英単語帳",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}