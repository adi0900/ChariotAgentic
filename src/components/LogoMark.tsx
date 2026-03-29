import React from 'react';

type LogoMarkProps = {
  className?: string;
};

export default function LogoMark({className = ''}: LogoMarkProps) {
  return (
    <div
      className={`rounded-[0.9rem] bg-[#ff5a0a] shadow-[0_8px_18px_rgba(255,90,10,0.22)] ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
