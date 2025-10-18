'use client';
import Link from 'next/link';

export default function Header({ title = 'OwlPay Wallet' }: { title?: string }) {
  return (
    <div className="w-full bg-black/80 text-white border-b border-zinc-800 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold text-lg">
          {title}
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:text-teal-300">Dashboard</Link>
          <Link href="/" className="hover:text-teal-300">Website</Link>
        </nav>
      </div>
    </div>
  );
}
