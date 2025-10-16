import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
export default function WP(){
  return (
    <main className="halo">
      <Nav />
      <article className="max-w-3xl mx-auto mt-10 card space-y-4">
        <h2>Whitepaper</h2>
        <p><strong>Abstract</strong> — This whitepaper proposes the development of a decentralised bank with a L2 rollup (AVS) on EigenLayer. Initial focus is cross‑border payments via a stableswap AMM using stablecoins or CBDCs. Over time, expand to lending/borrowing/savings using stablecoins. Leverage Ethereum security via restaking for security, scalability, and compliance.</p>
        <p><strong>System Overview</strong> — Stableswap AMM; permissioned network with KYC; US on‑ramp via Bridge (Stablecoin.xyz); INR off‑ramp via CoinDCX; Paymaster UX; wallet UX via Privy/Web3Auth; privacy roadmap with TEEs/MPC/zkTLS.</p>
        <p><strong>Implementation & Advantages</strong> — Contracts handle permissioning/KYC/AMM/Paymaster; liquidity from licensed institutions; strict KYC/AML; phased feature growth. Benefits: security, lower cost, compliance, scale, and simple UX.</p>
        <p><strong>References</strong>: Uniswap Onchain Finance; EigenLayer whitepaper; zkTLS overview.</p>
      </article>
      <Footer />
    </main>
  )
}
