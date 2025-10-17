'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SendPage() {
  const router = useRouter()
  const [mobile, setMobile] = useState('')
  const [amount, setAmount] = useState('')
  const [limitAlert, setLimitAlert] = useState(false)

  const handleSend = () => {
    if (parseFloat(amount) > 5) {
      setLimitAlert(true)
      return
    }
    alert(`$${amount} sent successfully to ${mobile}!`)
    // @ts-ignore
    router.push('/launch/dashboard')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white">
      <h1 className="text-3xl font-bold mb-4">Send Money</h1>
      <p className="text-gray-400 mb-6 text-center">Enter recipient mobile number and amount to send.</p>

      <input
        type="tel"
        placeholder="Recipient Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="bg-black border border-gray-600 p-2 rounded-md text-white mb-3 w-60"
      />
      <input
        type="number"
        placeholder="Amount ($)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="bg-black border border-gray-600 p-2 rounded-md text-white mb-3 w-60"
      />

      <button
        onClick={handleSend}
        className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-semibold hover:scale-105 transition"
      >
        Send
      </button>

      {limitAlert && (
        <div className="text-red-400 text-sm mt-4 max-w-sm text-center">
          🚨 First demo transaction is limited to $5 for safety. Subsequent transactions can reach $10,000/day.
        </div>
      )}
    </main>
  )
}
