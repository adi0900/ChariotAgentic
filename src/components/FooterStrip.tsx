import React from 'react';

export default function FooterStrip() {
  const navItems = ['Docs', 'Contact', 'Demo'];
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-20 -mt-2 w-full px-4 pb-4 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 rounded-full border border-white/12 bg-white/8 px-4 py-3 shadow-[0_12px_35px_rgba(3,12,28,0.22)] backdrop-blur-xl md:px-6">
        <div className="min-w-0 text-sm font-semibold tracking-[-0.04em] text-white/88 md:text-base">
          Chronos
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-white/12 bg-white/8 p-1.5 md:flex">
          {navItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                index === 0
                  ? 'bg-white text-gray-950'
                  : 'text-white/72 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="text-right text-xs font-medium text-white/58 md:text-sm">
          {year} Chronos
        </div>
      </div>
    </footer>
  );
}
