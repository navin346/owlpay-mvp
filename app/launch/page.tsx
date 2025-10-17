'use client'
import { useRouter } from 'next/navigation'

export default function Launch() {
  const router = useRouter()
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white">
      <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-teal-400">
        OwlPay Demo
      </h1>
      <p className="mb-8 text-gray-400 max-w-md text-center">
        Experience the full flow of a compliant, fast, and elegant cross-border remittance demo.
      </p>
      <button
        onClick={() => router.push('/launch/signup')}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-semibold hover:scale-105 transition"
      >
        Start Demo →
      </button>
    </main>
  )
}
