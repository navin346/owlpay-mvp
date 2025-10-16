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
      className={`min-h-screen transition-all duration-700 ${
        darkMode
          ? 'bg-[#050509] text-white'
          : 'bg-gradient-to-br from-[#f5f6fa] via-[#e6ecff] to-[#f7f9ff] text-gray-900'
      } font-[Inter,sans-serif]`}
    >
      {/* Header */}
      <header
        className={`flex items-center justify-between px-6 py-5 border-b ${
          darkMode ? 'border-gray-800/50' : 'border-gray-300/40'
        }`}
      >
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#4f46e5] to-[#06b6d4]">
            OwlPay
          </span>
        </h1>
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-[#8b5cf6] transition">
            Home
          </Link>
          <Link href="#" className="hover:text-[#8b5cf6] transition">
            Whitepaper
          </Link>
          <Link
            href="#"
            className="px-4 py-2 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full font-medium text-white shadow-md hover:shadow-[0_0_25px_-5px_#8b5cf6] transition"
          >
            Launch App
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`ml-3 p-2 rounded-md ${
              darkMode
                ? 'border border-gray-700 hover:bg-gray-800'
                : 'border border-gray-400 hover:bg-gray-200'
            } transition`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center mt-20 px-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
          Cross-border remittance,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#10b981]">
            fast, compliant & elegant
          </span>
        </h1>
        <p
          className={`max-w-2xl mx-auto mt-6 text-lg ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Move money between the US and India using stablecoins with KYC-gated
          flows and bank-linked ramps. Designed for speed, trust, and
          self-custody.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            href="#"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#8b5cf6] via-[#6366f1] to-[#06b6d4] font-semibold hover:scale-105 hover:shadow-[0_0_20px_-5px_#7c3aed] transition"
          >
            Launch App
          </Link>
          <Link
            href="#"
            className={`px-6 py-3 rounded-full font-semibold border ${
              darkMode
                ? 'border-gray-600 hover:border-[#8b5cf6]'
                : 'border-gray-400 hover:border-[#6366f1]'
            } transition`}
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
            className={`rounded-2xl p-6 border backdrop-blur-xl transition ${
              darkMode
                ? 'border-gray-800 bg-[#0e0e12]/70 hover:shadow-[0_0_25px_-5px_#7c3aed]'
                : 'border-gray-300 bg-white/60 hover:shadow-[0_0_20px_-5px_#6366f1]'
            }`}
          >
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#8b5cf6] to-[#10b981]">
              {title}
            </h3>
            <ul
              className={`mt-3 space-y-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-700'
              } text-sm`}
            >
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
              className={`p-5 rounded-2xl border backdrop-blur-xl ${
                darkMode
                  ? 'border-gray-800 bg-[#0e0e12]/70'
                  : 'border-gray-300 bg-white/60'
              }`}
            >
              <div className="text-lg font-semibold mb-1 text-[#8b5cf6]">
                {step}
              </div>
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-700'
                }`}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety & Limits */}
      <section className="px-6 mt-24 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#10b981] to-[#3b82f6]">
          Safety & Limits
        </h2>
        <ul
          className={`mt-5 space-y-2 text-base ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
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
          className="px-8 py-4 bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899] rounded-full font-semibold text-white shadow-lg hover:scale-110 transition"
        >
          🚀 Launch the Demo
        </Link>
      </section>

      {/* Footer */}
      <footer
        className={`text-center text-sm pb-10 ${
          darkMode ? 'text-gray-500' : 'text-gray-600'
        }`}
      >
        © 2025 OwlPay — Cross-border stablecoin remittance demo.
      </footer>
    </main>
  )
}
