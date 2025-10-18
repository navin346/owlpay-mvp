'use client'

export default function LaunchPage() {
  const goSignup = () => (window.location.href = '/launch/signup')

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white text-center px-6">
      <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
        OwlPay Demo Launch
      </h1>
      <p className="text-zinc-400 max-w-md">
        Experience our cross-border stablecoin payments demo between India 🇮🇳 and the US 🇺🇸
      </p>
      <div className="mt-10 flex flex-col gap-4">
        <button
          onClick={goSignup}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-semibold"
        >
          New User
        </button>
        <button
          onClick={() => (window.location.href = '/launch/dashboard')}
          className="px-8 py-3 rounded-full bg-gray-700 font-semibold"
        >
          Existing User
        </button>
      </div>
    </main>
  )
}
