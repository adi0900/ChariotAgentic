import React from 'react';

export default function Navbar() {
  return (
    <header className="w-full absolute top-0 left-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2 text-gray-900 font-bold text-xl tracking-tight cursor-pointer">
        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 22H22L12 2Z" fill="white"/>
          </svg>
        </div>
        <span>Chronos</span>
      </div>

      {/* Links */}
      <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-500">
        <a href="#" className="hover:text-gray-900 transition-colors">Features</a>
        <a href="#" className="hover:text-gray-900 transition-colors">Pricing</a>
        <a href="#" className="hover:text-gray-900 transition-colors">Testimonials</a>
        <a href="#" className="hover:text-gray-900 transition-colors">FAQs</a>
        <a href="#" className="hover:text-gray-900 transition-colors">Resources</a>
      </nav>

      {/* Auth */}
      <div className="flex items-center space-x-3">
        <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900 px-5 py-2.5 rounded-full bg-gray-100/80 hover:bg-gray-200/80 transition-colors">
          Login
        </a>
        <a href="#" className="bg-[#0A0A0A] hover:bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full shadow-sm transition-all border border-gray-800">
          Register
        </a>
      </div>
    </header>
  );
}
