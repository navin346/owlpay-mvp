'use client';
import Link from 'next/link';

export default function Header({ title = 'OwlPay Wallet' }: { title?: string }) {
  return (
    <div className="w-full border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-black/40 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/launch" className="font-semibold">
          {title}
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/launch" className="text-sm text-zinc-600 dark:text-zinc-300 hover:underline">
            Dashboard
          </Link>
          <Link href="/" className="text-sm text-zinc-600 dark:text-zinc-300 hover:underline">
            Website
          </Link>
        </div>
      </div>
    </div>
  );
}
