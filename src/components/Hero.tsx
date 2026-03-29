import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-48 pb-20 px-4 flex flex-col items-center text-center bg-white w-full">
      {/* Badge */}
      <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-500 rounded-full p-1 pr-3 mb-8 cursor-pointer hover:bg-blue-100 transition-colors">
        <span className="bg-blue-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">NEW</span>
        <span className="text-sm font-medium flex items-center">
          We hit $1k MRR <ChevronRight className="w-4 h-4 ml-1 opacity-50" />
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 max-w-4xl mx-auto leading-[1.1] mb-6">
        Revenue-first<br />web analytics
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
        See every visitor in realtime and witness the moment<br />they become a customer.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-24">
        <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-8 py-3.5 rounded-full font-medium transition-colors w-full sm:w-auto shadow-lg shadow-violet-500/20">
          Start 14 day free trial
        </button>
        <button className="bg-gray-50 hover:bg-gray-100 text-gray-900 px-8 py-3.5 rounded-full font-medium transition-colors w-full sm:w-auto border border-gray-100">
          See demo
        </button>
      </div>

      {/* Logos */}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-40 grayscale">
        <div className="flex items-center space-x-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
          </svg>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full border-4 border-gray-900 border-dotted"></div>
        </div>
        <div className="flex items-center space-x-2 font-bold text-xl tracking-tight">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-1">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          Temple
        </div>
        <div className="flex items-center space-x-2 font-bold text-xl tracking-tight">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-1">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12L12 8L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          inbound
        </div>
        <div className="flex items-center space-x-2 font-bold text-xl">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
        </div>
        <div className="flex items-center space-x-2 font-bold text-xl tracking-tight">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-1">
            <path d="M2 12L12 2L22 12L12 22L2 12Z" />
          </svg>
          Buildkite
        </div>
      </div>
    </section>
  );
}
