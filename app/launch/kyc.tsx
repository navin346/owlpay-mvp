
'use client'
import { useRouter } from 'next/navigation'

export default function KYC() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white">
      <h2 className="text-3xl font-bold mb-4">KYC Verification</h2>
      <p className="text-gray-400 mb-6">
        Upload your ID and proof of address (Demo auto-approve)
      </p>
      <div className="p-6 rounded-lg border border-gray-700 bg-gray-900/60">
        <input type="file" className="block mb-4 text-sm" />
        <input type="file" className="block text-sm" />
      </div>
      <button
        onClick={() => router.push('/launch/dashboard')}
        className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:scale-105 transition"
      >
        Submit & Continue
      </button>
    </main>
  )
}
