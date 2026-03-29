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
    <header className="relative z-20 w-full px-3 pt-3 pb-1 sm:px-4 md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 rounded-[1.2rem] border border-white/18 bg-white/12 px-3 py-2.5 shadow-[0_14px_38px_rgba(7,20,43,0.16)] backdrop-blur-xl sm:gap-3 sm:px-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:rounded-[1.6rem] md:px-5 md:py-3">
        <div className="flex items-center justify-between gap-3 md:justify-self-start">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <LogoMark className="h-8 w-8 sm:h-9 sm:w-9" />
            <div className="text-sm font-semibold tracking-[-0.04em] text-white sm:text-base">
              CHARIOT
            </div>
          </div>
          <a
            href="https://x.com/CAgentic"
            target="_blank"
            rel="noreferrer"
            className="liquid-cta inline-flex items-center justify-center rounded-full border border-white/14 bg-slate-950/92 px-3.5 py-1.5 text-[11px] font-medium text-white shadow-[0_12px_30px_rgba(15,23,42,0.2)] sm:px-5 sm:py-2 sm:text-sm md:hidden"
          >
            <span className="relative z-10">X</span>
          </a>
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
              className={`relative z-10 rounded-full px-2 py-1.5 text-center text-[11px] font-medium transition-colors duration-300 sm:text-sm md:px-4 ${
                activeItem === item.label
                  ? 'text-slate-950'
                  : 'text-white/76 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center justify-end md:flex md:justify-self-end">
          <a
            href="https://x.com/CAgentic"
            target="_blank"
            rel="noreferrer"
            className="liquid-cta inline-flex items-center justify-center rounded-full border border-white/18 bg-slate-950/92 px-5 py-2 text-sm font-medium text-white shadow-[0_12px_30px_rgba(15,23,42,0.2)]"
          >
            <span className="relative z-10">X</span>
          </a>
        </div>
      </div>
    </header>
  );
}
