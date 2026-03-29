import React from 'react';
import { Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 md:px-12 flex flex-col items-center justify-center relative z-10 border-t border-white/10 mt-24">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <span className="text-2xl font-bold text-headline tracking-tighter">
            Chariot Agentic
          </span>
          <p className="text-sm text-muted">
            The AI Content Director for Creators.
          </p>
        </div>

        {/* Links */}
        <div className="flex space-x-8 text-sm font-medium text-body">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>

        {/* Socials */}
        <div className="flex space-x-4">
          <a href="#" className="w-10 h-10 neu-raised rounded-full flex items-center justify-center text-muted hover:text-headline transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 neu-raised rounded-full flex items-center justify-center text-muted hover:text-headline transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 neu-raised rounded-full flex items-center justify-center text-muted hover:text-headline transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 neu-raised rounded-full flex items-center justify-center text-muted hover:text-headline transition-colors">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-muted">
        <p>© {new Date().getFullYear()} Chariot Agentic. All rights reserved.</p>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <span>Powered by</span>
          <span className="font-bold text-headline">Anthropic Claude</span>
        </div>
      </div>
    </footer>
  );
}
