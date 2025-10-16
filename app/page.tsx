import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Landing(){
  return (
    <main className="halo">
      <Nav />

      {/* HERO */}
      <section className="text-center mt-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-300">
          US ↔ India • GENIUS-compliant stablecoins • KYC-gated
        </div>
        <h1 className="leading-tight mt-5">
          Cross-border remittance,
          {' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-ocean to-mint">
            fast, compliant & elegant
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 mt-4">
          Move money between the US and India using compliant stablecoins. Account-abstraction UX—no gas nags.
          Permissioned flows with jurisdiction rules and rigorous KYC/AML.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <Link className="btn-primary" href="/launch">Launch App</Link>
          <Link className="btn-secondary" href="/whitepaper">Read Whitepaper</Link>
        </div>
      </section>

      {/* PILLARS / CONCEPT */}
      <section className="grid md:grid-cols-3 gap-4 mt-16">
        <div className="card">
          <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-ocean">KYC’d & Fully compliant</h2>
          <ul className="list-disc ml-5 mt-3 space-y-1 text-zinc-600 dark:text-zinc-400">
            <li>Only verified users</li>
            <li>Permissioned flows</li>
            <li>Jurisdiction rules</li>
            <li>FIU compliant</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-ocean">On/Off Ramp</h2>
          <ul className="list-disc ml-5 mt-3 space-y-1 text-zinc-600 dark:text-zinc-400">
            <li>US fiat → stablecoins (on-ramp)</li>
            <li>GENIUS-compliant assets only</li>
            <li>INR off-ramp to bank (KYC)</li>
            <li>Bank settlement rails</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-ocean">Paymaster UX</h2>
          <ul className="list-disc ml-5 mt-3 space-y-1 text-zinc-600 dark:text-zinc-400">
            <li>Account abstraction</li>
            <li>No gas at checkout</li>
            <li>USDC-as-gas model</li>
            <li>Mobile-first design</li>
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-16">
        <h2 className="text-center text-2xl font-semibold">How it works</h2>
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          {[
            ['1. Onboard', 'Phone number → OTP → PIN. India/US only.'],
            ['2. Verify', 'Upload ID & proof of address. Auto scan & approve (demo).'],
            ['3. Load', 'Link bank. Deposit USD (demo balance).'],
            ['4. Send', 'Enter recipient mobile or pick a contact. They get SMS/WhatsApp.']
          ].map(([t,d])=>(
            <div key={t} className="card">
              <div className="text-lg font-semibold">{t}</div>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SAFETY & LIMITS */}
      <section className="card mt-12">
        <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-mint to-sunset">Safety & Limits</h2>
        <ul className="list-disc ml-5 mt-3 text-zinc-700 dark:text-zinc-300 space-y-1">
          <li>First transfer limited to <b>$5</b> to prevent mistakes; after that up to <b>$10,000/day</b>.</li>
          <li>Chain settlements are irreversible—recipient numbers are validated and confirmed.</li>
          <li>Privacy by design; transaction masking roadmap with TEEs/MPC/zkTLS.</li>
        </ul>
      </section>

      {/* ROADMAP */}
      <section className="grid md:grid-cols-3 gap-4 mt-12">
        <div className="card">
          <h3 className="font-semibold">Phase 1 · Payments</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">US→IN corridor, stablecoin rails, KYC-gated wallet.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold">Phase 2 · Cards</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">Virtual/physical cards for merchant payments.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold">Phase 3 · Yield & More</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">Capital-protected yield instruments & savings.</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center my-14">
        <Link className="btn-primary" href="/launch">Launch the demo</Link>
      </section>

      <Footer />
    </main>
  )
}
