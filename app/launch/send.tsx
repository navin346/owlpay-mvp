'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Send() {
  const router = useRouter()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white">
      <h2 className="text-3xl font-bold mb-4">Send Money</h2>
      <p className="text-gray-400 mb-8">Enter recipient & amount (demo only)</p>
      <input
        type="text"
        placeholder="Recipient phone or wallet"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="px-4 py-3 rounded-md bg-gray-800 border border-gray-700 w-80 mb-4"
      />
      <input
        type="number"
        placeholder="Amount (USDC)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="px-4 py-3 rounded-md bg-gray-800 border border-gray-700 w-80"
      />
      <button
        onClick={() => alert(`✅ Sent ${amount} USDC to ${recipient}! (Demo)`)}
        className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-semibold hover:scale-105 transition"
      >
        Confirm Transfer
      </button>
      <button
        onClick={() => router.push('/launch/dashboard')}
        className="mt-6 text-gray-400 hover:text-white"
      >
        ← Back to Dashboard
      </button>
    </main>
  )
}

