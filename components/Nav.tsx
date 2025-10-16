'use client'
import Link from 'next/link'

export default function Nav(){
  return (
    <div className="flex items-center justify-between py-4">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-blue-500 flex items-center justify-center">🦉</div>
        <span className="font-semibold tracking-tight">OwlPay</span>
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link href="/whitepaper" className="text-zinc-300 hover:text-white">Whitepaper</Link>
        <Link href="/start" className="btn-primary">Launch App</Link>
      </div>
    </div>
  )
}
