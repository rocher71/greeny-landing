export default function Footer() {
  return (
    <footer className="bg-[#1A3C34] px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪴</span>
            <span className="text-xl font-black text-[#52B788]">greeny</span>
          </div>

          {/* SNS */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/greeny.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              Instagram
            </a>
            <a
              href="https://threads.net/@greeny.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              Threads
            </a>
            <a
              href="https://x.com/greeny_app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              X (Twitter)
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          © 2025 Greeny. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
