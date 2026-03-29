import React from 'react';

export default function Footer() {
  const navItems = ['Docs', 'Contact', 'Demo'];
  const year = new Date().getFullYear();

  return (
    <footer className="w-full px-4 pb-6 pt-3 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 rounded-[2rem] border border-slate-200/90 bg-white/88 px-5 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H22L12 2Z" fill="white" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="text-base font-semibold tracking-[-0.04em] text-slate-950">
              Chronos
            </div>
            <div className="text-xs font-medium text-slate-500">
              Product analytics for modern growth teams
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1.5">
          {navItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors md:px-5 ${
                index === 0
                  ? 'bg-white text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.08)]'
                  : 'text-slate-500 hover:bg-white hover:text-slate-900'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="text-sm font-medium text-slate-500 md:text-right">
          © {year} Chronos
        </div>
      </div>

        <p>© {new Date().getFullYear()} Chariot Agentic. All rights reserved.</p>
    </footer>
  );
}
