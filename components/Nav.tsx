// components/Nav.tsx (keep this version)
'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Nav(){
  const [theme, setTheme] = useState<'light'|'dark'>('dark')
  useEffect(() => {
    const t = (typeof window !== 'undefined' && (localStorage.getItem('theme') as 'light'|'dark')) || 'dark'
    setTheme(t)
  }, [])
  function toggleTheme(){
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    if (next === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', next)
  }
  return (
    <div className="flex items-center justify-between py-4">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-ocean flex items-center justify-center">🦉</div>
        <span className="font-semibold tracking-tight">OwlPay</span>
      </Link>
      <div className="flex items-center gap-3 text-sm">
        <button onClick={toggleTheme} className="btn-secondary px-3 py-2 rounded-xl">
          {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
        </button>
        <Link href="/whitepaper" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Whitepaper</Link>
        <Link href="/launch" className="btn-primary">Launch App</Link>
      </div>
    </div>
  )
}
