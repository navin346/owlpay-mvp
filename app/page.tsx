      {/* Feature cards with bullets */}
      <section className="grid md:grid-cols-3 gap-4 mt-16">
        {/* Card 1 */}
        <div className="card">
          <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-ocean">
            KYC’d & Fully compliant
          </h2>
          <ul className="list-disc ml-5 mt-3 space-y-1 text-zinc-600 dark:text-zinc-400">
            <li>Only verified users</li>
            <li>Permissioned flows</li>
            <li>Jurisdiction rules</li>
            <li>FIU compliant</li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="card">
          <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-ocean">
            On/Off Ramp
          </h2>
          <ul className="list-disc ml-5 mt-3 space-y-1 text-zinc-600 dark:text-zinc-400">
            <li>US on-ramp via Bridge (Stablecoin.xyz)</li>
            <li>GENIUS-compliant stablecoins only</li>
            <li>INR off-ramp via CoinDCX (KYC)</li>
            <li>Bank transfer settlement</li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="card">
          <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-ocean">
            Paymaster UX
          </h2>
          <ul className="list-disc ml-5 mt-3 space-y-1 text-zinc-600 dark:text-zinc-400">
            <li>Account abstraction</li>
            <li>No gas at checkout</li>
            <li>USDC-as-gas model</li>
            <li>Mobile-first flows</li>
          </ul>
        </div>
      </section>
