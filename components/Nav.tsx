'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
      <div className="font-semibold text-lg tracking-tight">
        Owl<span className="text-brand-600">Pay</span>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="#"
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
        >
          Home
        </Link>
        <Link
          href="#"
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
        >
          Whitepaper
        </Link>
        <Link
          href="#"
          className="btn-primary"
        >
          Launch App
        </Link>
      </nav>

      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
        >
          ☰
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="absolute top-16 right-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg p-5 flex flex-col gap-3 md:hidden">
          <Link
            href="#"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
          >
            Whitepaper
          </Link>
          <Link
            href="#"
            className="btn-primary"
          >
            Launch App
          </Link>
        </div>
      )}
    </header>
  )
}
