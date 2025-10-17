
'use client'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white flex flex-col items-center py-16">
      <h1 className="text-4xl font-bold mb-4">Welcome to OwlPay</h1>
      <p className="text-gray-400 mb-8">Your KYC is approved ✅</p>
      <div className="grid md:grid-cols-3 gap-6 w-11/12 max-w-4xl">
        <div className="p-6 rounded-2xl bg-gray-900/70 border border-gray-800 text-center">
          <h3 className="text-xl font-semibold mb-2 text-purple-400">Balance</h3>
          <p className="text-2xl font-bold">$2,450 USDC</p>
        </div>
        <div className="p-6 rounded-2xl bg-gray-900/70 border border-gray-800 text-center">
          <h3 className="text-xl font-semibold mb-2 text-blue-400">Recent Transfers</h3>
          <p className="text-gray-400">2 transfers to INR wallets</p>
        </div>
        <div className="p-6 rounded-2xl bg-gray-900/70 border border-gray-800 text-center">
          <h3 className="text-xl font-semibold mb-2 text-teal-400">Limit</h3>
          <p className="text-gray-400">$10,000/day remaining</p>
        </div>
      </div>

      <button
        onClick={() => router.push('/launch/send')}
        className="mt-12 px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full font-semibold hover:scale-110 transition"
      >
        Send Money →
      </button>
    </main>
  )
}
