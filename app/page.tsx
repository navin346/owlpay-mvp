'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { BrandMark } from '../components/BrandMark'

export default function Landing() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? 'bg-[#050509] text-white'
          : 'bg-gradient-to-br from-[#f7f8fc] via-[#eef2ff] to-[#f5f8ff] text-slate-900'
      }`}
    >
      <header
        className={`border-b px-6 py-5 transition-colors ${
          darkMode ? 'border-white/10' : 'border-slate-200/80'
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <BrandMark theme={darkMode ? 'dark' : 'light'} />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ocean">US ⇄ India</p>
              <h1 className="text-2xl font-semibold">Cross-border stablecoin banking</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button
              onClick={() => setDarkMode((value) => !value)}
              className={`rounded-full border px-4 py-2 transition ${
                darkMode
                  ? 'border-white/10 bg-white/10 text-white hover:bg-white/20'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <Link
              href="/start"
              className="rounded-full bg-gradient-to-r from-brand-500 via-ocean to-mint px-5 py-2 text-sm font-semibold text-white shadow-[0_18px_35px_-20px_rgba(59,130,246,0.8)]"
            >
              View flow outline
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-20 pt-16">
        <div className="grid items-center gap-12 md:grid-cols-[1.2fr,1fr]">
          <div className="space-y-6">
            <h2 className="text-4xl font-semibold md:text-5xl">
              Cross-border remittance built for trust, compliance, and speed.
            </h2>
            <p className={`text-lg ${darkMode ? 'text-white/70' : 'text-slate-600'}`}>
              OwlPay delivers a guided banking experience for the US ⇄ India corridor with progressive KYC, gasless USDC
              rails, and beautifully choreographed deposit, send, and receive flows.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/mvp"
                className="rounded-full bg-gradient-to-r from-brand-500 via-ocean to-mint px-6 py-3 text-base font-semibold text-white shadow-[0_24px_45px_-22px_rgba(59,130,246,0.75)]"
              >
                Launch Demo
              </Link>
              <Link
                href="/whitepaper"
                className={`rounded-full border px-6 py-3 text-base font-semibold transition ${
                  darkMode
                    ? 'border-white/20 text-white hover:bg-white/10'
                    : 'border-slate-300 text-slate-700 hover:bg-white'
                }`}
              >
                Read the whitepaper
              </Link>
            </div>
          </div>
          <div
            className={`rounded-3xl border p-6 shadow-2xl transition ${
              darkMode
                ? 'border-white/10 bg-white/5'
                : 'border-slate-200/80 bg-white/80 backdrop-blur'
            }`}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-ocean">Demo previews</p>
            <ul className={`mt-4 space-y-4 text-sm ${darkMode ? 'text-white/70' : 'text-slate-600'}`}>
              {[
                'OTP capture, verification, and KYC review loops for risk sign-off.',
                'Wallet shell with Visa & Mastercard tokens plus live FX updates.',
                'Guarded $5 intro send limits that unlock to $10k after delivery.',
              ].map((item) => (
                <li
                  key={item}
                  className={`rounded-2xl border p-4 transition ${
                    darkMode
                      ? 'border-white/10 bg-black/20'
                      : 'border-slate-200/80 bg-white/90 shadow-md'
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Compliance obsessed',
              copy: 'KYC-gated onboarding, OFAC screening, and FIU traceability across both jurisdictions.',
            },
            {
              title: 'Real-time FX locks',
              copy: 'Circle and CoinDCX liquidity for instant INR estimates, with paymaster-covered gas fees.',
            },
            {
              title: 'Customer delight',
              copy: 'Contact book payouts, WhatsApp-ready links, and adaptive limits create trust on day one.',
            },
          ].map((item) => (
            <article
              key={item.title}
              className={`rounded-3xl border p-6 transition ${
                darkMode ? 'border-white/10 bg-white/5' : 'border-slate-200/80 bg-white/90 shadow-lg'
              }`}
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${darkMode ? 'text-white/70' : 'text-slate-600'}`}>
                {item.copy}
              </p>
            </article>
          ))}
        </section>

        <section
          className={`rounded-3xl border p-10 text-center transition ${
            darkMode ? 'border-white/10 bg-gradient-to-r from-white/5 via-white/0 to-white/5' : 'border-slate-200/80 bg-white'
          }`}
        >
          <h3 className="text-3xl font-semibold">Experience the guided demo</h3>
          <p className={`mt-4 text-base ${darkMode ? 'text-white/70' : 'text-slate-600'}`}>
            Explore both the new customer and returning user journeys exactly as they would function in production.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/start"
              className={`rounded-full border px-6 py-3 text-base font-semibold transition ${
                darkMode
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-slate-300 text-slate-700 hover:bg-white'
              }`}
            >
              Review the flow outline
            </Link>
            <Link
              href="/whitepaper"
              className={`rounded-full border px-6 py-3 text-base font-semibold transition ${
                darkMode
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-slate-300 text-slate-700 hover:bg-white'
              }`}
            >
              Download the whitepaper
            </Link>
          </div>
        </section>
      </section>
    </main>
  )
}
