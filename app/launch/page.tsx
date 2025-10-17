'use client'

import { useRouter } from 'next/navigation'

export default function LaunchHome() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white">
      <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-teal-400">
        OwlPay Demo
      </h1>
      <p className="text-gray-400 mb-10 text-center max-w-lg">
        Explore the full investor demo — from sign-up to sending money.
      </p>

      {/* @ts-ignore */}
      <button
        onClick={() => router.push('/launch/signup')}
        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-semibold hover:scale-105 transition"
      >
        Start Demo →
      </button>
    </main>
  )
}
