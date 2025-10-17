export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200/60 dark:border-zinc-800/60 py-10">
      <div className="max-w-6xl mx-auto px-6 text-sm text-zinc-500 dark:text-zinc-400">
        <p>© {new Date().getFullYear()} OwlPay — demo MVP for compliant US⇄IN remittances.</p>
      </div>
    </footer>
  );
}
