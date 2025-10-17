// @ts-nocheck
'use client'

export default function DashboardPage() {
  const goSend = () => (window.location.href = '/launch/send')

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white px-6">
      <h1 className="text-3xl font-bold mb-2">Welcome to OwlPay Wallet</h1>
      <p className="text-gray-400 mb-8">Your demo KYC is verified ✅</p>

      <div className="bg-[#141414] rounded-2xl p-6 shadow-lg w-[22rem] text-center">
        <h2 className="text-2xl font-semibold mb-2">Balance</h2>
        <p className="text-4xl font-extrabold mb-6">$10,800.00</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={goSend}
            className="bg-gradient-to-r from-purple-500 to-blue-500 py-2 rounded-lg font-semibold"
          >
            Send
          </button>
          <button className="bg-gray-700 py-2 rounded-lg font-semibold">Deposit</button>
          <button className="bg-gray-700 py-2 rounded-lg font-semibold">Withdraw</button>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-500">
        First transfer limited to $5 for safety. Then up to $10,000/day.
      </p>
    </main>
  )
}
