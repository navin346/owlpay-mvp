'use client'

import { useState } from 'react'

export default function SendPage() {
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('')

  const sendMoney = () => {
    if (!phone || !amount) return alert('Fill all fields')
    if (parseFloat(amount) > 5)
      return alert('First transaction limited to $5 for demo safety.')
    alert(`✅ $${amount} sent to ${phone}!`)
    window.location.href = '/launch/dashboard'
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white px-6">
      <h1 className="text-3xl font-bold mb-6">Send Money</h1>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Recipient mobile"
        className="bg-zinc-800 rounded px-3 py-2 mb-4 w-64"
      />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (USD)"
        className="bg-zinc-800 rounded px-3 py-2 mb-6 w-64"
      />
      <button
        onClick={sendMoney}
        className="bg-gradient-to-r from-teal-400 to-blue-500 px-8 py-3 rounded-full font-semibold"
      >
        Send
      </button>
    </main>
  )
}
