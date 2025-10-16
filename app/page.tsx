import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Landing(){
  return (
    <main className="halo">
      <Nav />
      <section className="text-center mt-16">
        <h1 className="leading-tight">
          Cross-border remittance, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-ocean to-mint">beautifully simple</span>
        </h1>
        <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 mt-4">
          Move money from the US to India using GENIUS-compliant stablecoins. No seed phrases. KYC-gated. Built on Ethereum security.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <Link className="btn-primary" href="/start">Launch App</Link>
          <Link className="btn-secondary" href="/whitepaper">Read Whitepaper</Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4 mt-16">
        {[
          ['KYC & Compliance','Only verified users, permissioned flows, jurisdiction rules.'],
          ['On/Off Ramp','US on-ramp via Bridge (Stablecoin.xyz). INR off-ramp via CoinDCX.'],
          ['Paymaster UX','Account abstraction—no gas UX. USDC-as-gas concept.'],
        ].map(([t,d])=>(
          <div key={t} className="card">
            <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-ocean">{t}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">{d}</p>
          </div>
        ))}
      </section>

      <section className="card mt-12">
        <h2 className="text-center bg-clip-text text-transparent bg-gradient-to-r from-mint to-sunset">MVP Scope</h2>
        <ul className="list-disc text-zinc-700 dark:text-zinc-300 mt-3 ml-6">
          <li>Phone sign-up, OTP, PIN</li>
          <li>Dashboard with Send/Receive</li>
          <li>KYC flow with status</li>
          <li>Mock “send via SMS” preview</li>
        </ul>
        <p className="text-zinc-500 text-sm mt-3">This demo is front-end only. Replace mocks when integrating vendors.</p>
      </section>

      <Footer />
    </main>
  )
}
