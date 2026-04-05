import React from 'react';
import LogoMark from './LogoMark';

export default function FooterBar() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full px-3 pb-4 pt-2 sm:px-5 sm:pb-5 md:px-8">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-[1.35rem] border border-white/18 bg-white/10 px-3.5 py-3 shadow-[0_12px_30px_rgba(7,20,43,0.14)] backdrop-blur-xl sm:gap-4 sm:px-4 sm:py-3.5 md:rounded-[1.4rem] md:px-5 md:py-3">
        <div className="flex items-center gap-3">
          <LogoMark className="h-7 w-7 rounded-[0.65rem] sm:h-8 sm:w-8 sm:rounded-[0.7rem]" />
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-[-0.04em] text-white md:text-base">
              CHARIOT
            </div>
            <div className="hidden max-w-[16rem] text-[10px] font-medium leading-snug text-white/60 sm:block sm:max-w-none sm:text-[11px]">
              Stop guessing what to post. Get viral reel ideas in seconds.
            </div>
          </div>
        </div>

        <div className="shrink-0 text-[8px] font-medium uppercase tracking-[0.08em] text-white/56 min-[360px]:text-[9px] sm:text-xs md:text-sm">
          Copyright {year} CHARIOT
        </div>
      </div>
    </footer>
  );
}
