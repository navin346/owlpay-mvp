'use client';
import Link from 'next/link';

export default function Nav() {
  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-5 px-6">
        <Link href="/" className="font-semibold text-xl tracking-tight">
          <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
            OwlPay
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white">
            Home
          </Link>
          <Link href="/whitepaper" className="text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white">
            Whitepaper
          </Link>
          <Link href="/launch" className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold">
            Launch App
          </Link>
        </nav>
      </div>
    </header>
  );
}
