import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function WP(){
  return (
    <main className="halo">
      <Nav />
      <article className="max-w-3xl mx-auto mt-10 card space-y-5">
        <h1 className="text-3xl font-bold">Building a Decentralised Bank Using Ethereum Security</h1>

        <section>
          <h2>Abstract</h2>
          <p>
            This whitepaper proposes the development of a decentralised bank with a Layer-2 rollup (AVS) on EigenLayer.
            The initial focus is to build a use case for facilitating cross-border payments by creating a stableswap
            Automated Market Maker using stablecoins or Central Bank Digital Currencies (CBDCs). Over time, as
            utilisation improves, the L2 network will expand to include additional financial services such as lending,
            borrowing, investment, and savings instruments using stablecoins alone. By leveraging Ethereum&apos;s security
            through EigenLayer&apos;s restaking mechanism, the proposed system ensures high security, scalability, and regulatory compliance.
          </p>
        </section>

        <section>
          <h2>Introduction</h2>
          <p>
            The existing financial systems for cross-border payments are plagued by inefficiencies, high costs, and
            regulatory challenges. Today cross-border payment transactions include fees about ~3–6% of overall transaction value.
            Traditional banking systems involve multiple parties and aged messaging protocols with long settlement times.
          </p>
          <p>
            Decentralised finance (DeFi) and distributed ledger technologies (DLTs) present opportunities to overcome
            these challenges. This paper outlines a solution for a decentralised bank using EigenLayer’s AVS framework
            to leverage Ethereum&apos;s robust security.
          </p>
          <p className="text-sm text-zinc-500">Source: <a className="link" href="https://uniswap.org/OnchainFX.pdf">https://uniswap.org/OnchainFX.pdf</a></p>
        </section>

        <section>
          <h2>System Overview</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>Stableswap AMM:</strong> efficient trading of stablecoins/CBDCs with deep liquidity and minimal slippage for cross-border transfers.</li>
            <li><strong>Permissioned Network &amp; KYC Compliance:</strong> only licensed financial institutions, stablecoin issuers, and KYC-compliant entities may participate to ensure compliance and integrity.</li>
            <li><strong>On-/Off-Ramp:</strong> integration with licensed providers (e.g., Bridge or MoonPay) for fiat↔stablecoins.</li>
            <li><strong>Gas Fee Management:</strong> Paymaster converts ETH→USDC (or other stablecoins) to simplify UX.</li>
            <li><strong>Expansion:</strong> gradual addition of lending, borrowing, investment and savings.</li>
            <li><strong>Digital Wallet with KYC/AML:</strong> Google-Pay-like UX (mobile OTP / social auth) via providers such as Privy/Web3Auth (seedless, account abstraction).</li>
            <li><strong>Transaction Masking:</strong> privacy via TEEs with MPC or zkTLS (roadmap).</li>
            <li className="text-sm"><strong>Unresolved issues for full-scale banking in DeFi:</strong> see <a className="link" href="https://x.com/navin346/status/1928002404445999366">this thread</a>.</li>
          </ul>
        </section>

        <section>
          <h2>Key Components</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>EigenLayer AVS:</strong> ETH restaking extends Ethereum’s crypto-economic security to the rollup.</li>
            <li><strong>Stableswap AMM:</strong> efficient currency exchange with minimal slippage.</li>
            <li><strong>Permissioned KYC/AML:</strong> regulatory compliance via identity-gated access.</li>
            <li><strong>On-/Off-Ramp:</strong> smooth conversions between fiat and stablecoins.</li>
            <li><strong>Paymaster:</strong> handles gas to improve UX.</li>
          </ul>
        </section>

        <section>
          <h2>Implementation</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>Rollup Design &amp; Deployment:</strong> contracts for permissioning, KYC, AMM operations, and Paymaster.</li>
            <li><strong>Liquidity Provisioning:</strong> licensed institutions/stablecoin issuers participate.</li>
            <li><strong>Regulatory Compliance:</strong> strict KYC/AML with continuous monitoring.</li>
            <li><strong>On/Off-Ramp Integrations:</strong> Bridge (Stablecoin.xyz) for on-ramp; CoinDCX for INR off-ramp.</li>
            <li><strong>Protocol Expansion:</strong> lending/borrowing/savings over time.</li>
          </ul>
        </section>

        <section>
          <h2>Advantages</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>Security:</strong> Ethereum + EigenLayer restaking.</li>
            <li><strong>Cost Efficiency:</strong> stableswap + L2 throughput.</li>
            <li><strong>Regulatory Compliance:</strong> permissioned access with KYC/AML.</li>
            <li><strong>Scalability:</strong> high-volume processing without congestion.</li>
            <li><strong>User-Friendly:</strong> Paymaster hides gas; mobile-first onboarding.</li>
          </ul>
        </section>

        <section>
          <h2>Conclusion</h2>
          <p>
            The proposed decentralised bank utilising EigenLayer’s AVS provides a secure, scalable, and cost-efficient
            solution for cross-border transfers and a global payment network (using CBDCs or stablecoins). By starting
            with a stableswap AMM and expanding to additional instruments, we aim to deliver regulatory compliance,
            enhanced security, and optimal trading conditions—leveraging DeFi and Ethereum’s security to modernise
            global payments and financial services.
          </p>
        </section>

        <section>
          <h2>References</h2>
          <ul className="list-disc ml-5">
            <li><a className="link" href="https://uniswap.org/OnchainFX.pdf">https://uniswap.org/OnchainFX.pdf</a></li>
            <li><a className="link" href="https://docs.eigenlayer.xyz/assets/files/EigenLayer_WhitePaper-88c47923ca0319870c611decd6e562ad.pdf">EigenLayer Whitepaper (PDF)</a></li>
            <li><a className="link" href="https://arxiv.org/html/2312.16193v1">https://arxiv.org/html/2312.16193v1</a></li>
          </ul>
        </section>
      </article>
      <Footer />
    </main>
  )
}
