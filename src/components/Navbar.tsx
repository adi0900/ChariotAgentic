import React from 'react';
import LogoMark from './LogoMark';

type NavbarProps = {
  activeItem: 'Home' | 'Docs' | 'Contact' | 'Demo';
  onNavigate: (page: 'home' | 'docs' | 'contact' | 'demo') => void;
};

const navItems = [
  {label: 'Home', page: 'home'},
  {label: 'Docs', page: 'docs'},
  {label: 'Contact', page: 'contact'},
  {label: 'Demo', page: 'demo'},
] as const;

export default function Navbar({activeItem, onNavigate}: NavbarProps) {
  const activeIndex = navItems.findIndex((item) => item.label === activeItem);

  return (
    <header className="relative z-20 w-full px-3 pt-3 pb-3 sm:px-5 sm:pt-4 sm:pb-4 md:px-8">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-[auto_1fr_auto] items-center gap-2 rounded-[1.45rem] border border-white/18 bg-white/12 px-2.5 py-2.5 shadow-[0_14px_38px_rgba(7,20,43,0.16)] backdrop-blur-xl sm:gap-3 sm:px-4 sm:py-3.5 md:grid-cols-[1fr_auto_1fr] md:rounded-[1.75rem] md:px-5 md:py-3">
        <div className="flex items-center gap-2.5 md:justify-self-start">
          <LogoMark className="h-8 w-8 sm:h-9 sm:w-9" />
          <div className="hidden text-sm font-semibold tracking-[-0.04em] text-white min-[360px]:block sm:text-[1rem]">
            CHARIOT
          </div>
        </div>

        <nav className="relative grid w-full grid-cols-4 rounded-full border border-white/16 bg-white/10 p-1 md:w-[26rem] md:justify-self-center">
          <div
            className="pointer-events-none absolute inset-y-1 left-1 rounded-full bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: 'calc((100% - 0.5rem) / 4)',
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.page)}
              className={`relative z-10 min-w-0 rounded-full px-1 py-2 text-center text-[9px] font-medium transition-colors duration-300 min-[360px]:text-[10px] sm:px-2 sm:py-2.5 sm:text-[13px] md:px-4 md:text-sm ${
                activeItem === item.label
                  ? 'text-slate-950'
                  : 'text-white/76 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex justify-end md:justify-self-end">
          <a
            href="https://x.com/CAgentic"
            target="_blank"
            rel="noreferrer"
            className="liquid-cta inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-white/14 bg-slate-950/92 px-3 text-[11px] font-medium text-white shadow-[0_12px_30px_rgba(15,23,42,0.2)] sm:h-10 sm:min-w-10 sm:px-4 sm:text-sm md:hidden"
          >
            <span className="relative z-10">X</span>
          </a>
          <a
            href="https://x.com/CAgentic"
            target="_blank"
            rel="noreferrer"
            className="liquid-cta hidden items-center justify-center rounded-full border border-white/18 bg-slate-950/92 px-5 py-2 text-sm font-medium text-white shadow-[0_12px_30px_rgba(15,23,42,0.2)] md:inline-flex"
          >
            <span className="relative z-10">X</span>
          </a>
        </div>
      </div>
    </header>
  );
}
