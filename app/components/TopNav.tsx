"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isQuiz = pathname === "/quiz";
  const isAbout = pathname === "/about";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 max-w-full bg-gradient-to-r from-sky-100/95 via-white/92 to-indigo-100/95 backdrop-blur-md border-b border-sky-200/60 shadow-[0_4px_24px_-8px_rgba(14,116,144,0.25)]">
      <Link href="/" className="text-xl font-extrabold tracking-tight text-on-surface font-display uppercase">
        Moving Vocab
      </Link>

      <div className="hidden md:flex gap-8 items-center font-display font-semibold text-sm tracking-wide">
        <Link
          href="/"
          className={
            isHome
              ? "text-on-surface border-b-2 border-on-surface pb-1"
              : "text-on-surface-variant hover:text-on-surface transition-all duration-300"
          }
        >
          Home
        </Link>
        <Link
          href="/quiz"
          className={
            isQuiz
              ? "text-on-surface border-b-2 border-on-surface pb-1"
              : "text-on-surface-variant hover:text-on-surface transition-all duration-300"
          }
        >
          Quizzes
        </Link>
        <Link
          href="/about"
          className={
            isAbout
              ? "text-on-surface border-b-2 border-on-surface pb-1"
              : "text-on-surface-variant hover:text-on-surface transition-all duration-300"
          }
        >
          About
        </Link>
      </div>

      <div className="flex items-center gap-4">
      </div>
    </nav>
  );
}

