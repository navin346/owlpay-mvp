import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const WHITEPAPER_ID = '1d3l8iii_k2HyNjrBYLNrYmegPuCwZoheyKMR9tPOGyc'

export default function WP() {
  return (
    <main className="halo min-h-screen bg-slate-50 text-slate-900 dark:bg-[#050509] dark:text-white">
      <Nav />
      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-6 pb-16 pt-10">
        <header className="space-y-4 text-center">
          <h2 className="text-3xl font-semibold">OwlPay Whitepaper</h2>
          <p className="mx-auto max-w-3xl text-base text-slate-600 dark:text-white/70">
            Explore the complete cross-border banking thesis covering compliance architecture, on/off-ramp integrations,
            product roadmap, and settlement mechanics for the US ⇄ India corridor.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href={`https://docs.google.com/document/d/${WHITEPAPER_ID}/export?format=pdf`}
              className="rounded-full bg-gradient-to-r from-brand-500 via-ocean to-mint px-6 py-3 font-semibold text-white shadow-[0_18px_40px_-20px_rgba(59,130,246,0.6)]"
              target="_blank"
              rel="noreferrer"
            >
              Download PDF
            </a>
            <a
              href={`https://docs.google.com/document/d/${WHITEPAPER_ID}/preview`}
              className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-white dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Docs
            </a>
          </div>
        </header>
        <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl dark:border-white/10">
          <iframe
            title="OwlPay whitepaper"
            src={`https://docs.google.com/document/d/${WHITEPAPER_ID}/preview`}
            className="h-[960px] w-full"
            allow="autoplay"
          />
        </div>
        <article className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 text-sm leading-relaxed shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-white/80">
          <h3 className="text-lg font-semibold">Executive summary</h3>
          <p>
            OwlPay assembles a permissioned stablecoin stack that unlocks compliant, instant transfers between the United States
            and India. The platform combines a stableswap AMM, FIU-grade KYC, and card + bank ramps to bridge USDC into INR while
            maintaining full auditability.
          </p>
          <p>
            The MVP demonstrates phased onboarding with OTP capture, biometric-ready KYC loops, and guarded send limits. Once a
            recipient completes KYC, limits escalate to $10k per transfer while maintaining gasless execution through a paymaster
            model. On the receiving side, OwlPay issues INR claim links and QR flows integrated with leading Indian banks and UPI.
          </p>
          <p>
            Long term, OwlPay extends into lending, treasury, and savings products leveraging EigenLayer security and privacy
            preserving compute. Download the PDF for complete protocol diagrams, compliance matrices, and integration playbooks.
          </p>
        </article>
      </section>
      <Footer />
    </main>
  )
}
