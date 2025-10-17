// @ts-nocheck
'use client'

import { useRouter } from 'next/navigation'

export default function LaunchHome() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center">
        OwlPay <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400">Investor Demo</span>
      </h1>
      <p className="text-gray-400 mb-10 text-center max-w-2xl">
        Walk through the complete MVP flow: Sign-up → OTP → KYC → Dashboard → Send.
      </p>

      <button
        onClick={() => router.push('/launch/signup')}
        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-semibold hover:scale-105 transition"
      >
        Start Demo →
      </button>
    </main>
  )
}
