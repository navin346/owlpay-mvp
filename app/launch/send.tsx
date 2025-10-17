// @ts-nocheck
'use client'

import { useState } from 'react'

export default function SendPage() {
  const [country, setCountry] = useState('+91')
  const [mobile, setMobile] = useState('')
  const [amount, setAmount] = useState('')
  const [limitAlert, setLimitAlert] = useState(false)

  const handleSend = () => {
    const val = parseFloat(amount || '0')
    if (!mobile.trim()) return alert('Enter recipient mobile.')
    if (!val || val <= 0) return alert('Enter a valid amount.')
    if (val > 5) {
      setLimitAlert(true)
      return
    }
    alert(`$${val.toFixed(2)} sent successfully to ${country} ${mobile}! (Demo SMS/WhatsApp sent)`)
    window.location.href = '/launch/dashboard'
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white px-6">
      <h1 className="text-3xl font-bold mb-4">Send Money</h1>
      <p className="text-gray-400 mb-6 text-center">Enter recipient mobile number and amount to send.</p>

      <div className="flex gap-2 mb-3">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="bg-black border border-gray-600 p-2 rounded-md"
        >
          <option value="+91">🇮🇳 +91</option>
          <option value="+1">🇺🇸 +1</option>
        </select>
        <input
          type="tel"
          placeholder="Recipient Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="bg-black border border-gray-600 p-2 rounded-md text-white w-64"
        />
      </div>

      <input
        type="number"
        placeholder="Amount ($)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="bg-black border border-gray-600 p-2 rounded-md text-white mb-4 w-64"
      />

      <button
        onClick={handleSend}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-semibold hover:scale-105 transition"
      >
        Send
      </button>

      {limitAlert && (
        <div className="text-red-400 text-sm mt-4 max-w-sm text-center">
          🚨 For safety, the **first** demo transaction is limited to **$5**.  
          After your first successful send, the limit increases to **$10,000/day**.
        </div>
      )}
    </main>
  )
}
