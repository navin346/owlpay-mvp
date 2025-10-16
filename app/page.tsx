'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

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
          ? 'bg-[#0b0b0f] text-white'
          : 'bg-gradient-to-br from-white via-slate-50 to-gray-200 text-gray-900'
      }`}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800/50">
        <h1 className="text-xl font-semibold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-teal-300">
            OwlPay
          </span>
        </h1>
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-purple-400">
            Home
          </Link>
          <Link href="#" className="hover:text-purple-400">
            Whitepaper
          </Link>
          <Link
            href="#"
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-semibold hover:scale-105 transition"
          >
            Launch App
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-3 p-2 rounded-md border border-gray-700 hover:bg-gray-800"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center mt-24 px-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight">
          Cross-border remittance,
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7c3aed] via-[#4f46e5] to-[#14b8a6]">
            fast, compliant & elegant
          </span>
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-400 dark:text-gray-300">
          Move money between the US and India using stablecoins with KYC-gated
          flows and bank-linked ramps. Designed for speed, trust, and
          self-custody.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Link
            href="#"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-semibold hover:scale-105 transition"
          >
            Launch App
          </Link>
          <Link
            href="#"
            className="px-6 py-3 rounded-full border border-gray-600 hover:border-purple-400 font-semibold transition"
          >
            Read Whitepaper
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-6 mt-24 max-w-6xl mx-auto">
        {[
          {
            title: "KYC’d & Fully Compliant",
            points: [
              'Only verified users',
              'Permissioned flows',
              'Jurisdiction rules',
              'FIU compliant',
            ],
          },
          {
            title: 'On/Off Ramp',
            points: [
              'US on-ramp via Bridge',
              'INR off-ramp via CoinDCX',
              'Stablecoin rails',
              'Secure fiat gateways',
            ],
          },
          {
            title: 'Paymaster UX',
            points: [
              'Account abstraction',
              'No gas at checkout',
              'USDC-as-gas model',
              'Mobile-first simplicity',
            ],
          },
        ].map(({ title, points }) => (
          <div
            key={title}
            className="rounded-2xl p-6 border border-gray-700 bg-gradient-to-br from-gray-900/70 to-gray-800/40 backdrop-blur-sm hover:shadow-[0_0_25px_-5px_#7c3aed] transition"
          >
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">
              {title}
            </h3>
            <ul className="mt-3 space-y-1 text-gray-300 text-sm">
              {points.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* How It Works */}
      <section className="px-6 mt-24 max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-semibold mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            ['1. Sign Up', 'Enter phone number (US/India) → OTP verification'],
            ['2. Verify', 'Upload ID + proof of address. Auto-approve (demo)'],
            ['3. Deposit', 'Add bank account and deposit USD'],
            ['4. Send', 'Send funds instantly by mobile or contact'],
          ].map(([step, desc]) => (
            <div
              key={step}
              className="p-5 rounded-2xl border border-gray-700 bg-gray-900/40 backdrop-blur-sm"
            >
              <div className="text-lg font-semibold mb-1 text-purple-400">
                {step}
              </div>
              <p className="text-gray-300 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety & Limits */}
      <section className="px-6 mt-24 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-500">
          Safety & Limits
        </h2>
        <ul className="mt-5 text-gray-300 space-y-2">
          <li>✅ First transfer capped at <b>$5</b> for safety</li>
          <li>💸 Daily limit up to <b>$10,000</b></li>
          <li>🔒 All transactions validated & irreversible</li>
          <li>🛡️ Privacy roadmap via MPC & zk-tech</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center mt-24 mb-16">
        <Link
          href="#"
          className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full font-semibold text-white shadow-lg hover:scale-110 transition"
        >
          🚀 Launch the Demo
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 pb-10">
        © 2025 OwlPay — Cross-border stablecoin remittance demo.
      </footer>
    </main>
  )
}
