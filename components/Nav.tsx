'use client';
import Link from 'next/link';

export default function Nav() {
  return (
    <header className="w-full bg-gradient-to-r from-black via-zinc-900 to-black text-white py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-teal-300 bg-clip-text text-transparent">
          OwlPay
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-teal-300">Home</Link>
          <Link href="/whitepaper" className="hover:text-teal-300">Whitepaper</Link>
          <Link
            href="/mvp"
            className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-full font-semibold"
          >
            Launch Demo
          </Link>
        </nav>
      </div>
    </header>
  );
}
