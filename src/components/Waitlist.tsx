import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, Share2, Instagram, Twitter } from 'lucide-react';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [creatorType, setCreatorType] = useState<'new' | 'existing'>('existing');
  const [igHandle, setIgHandle] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [position, setPosition] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API call
    setTimeout(() => {
      setPosition(Math.floor(Math.random() * 500) + 1200);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section
      id="waitlist"
      ref={containerRef}
      className="w-full py-32 flex flex-col items-center justify-center relative z-10 overflow-hidden"
    >
      {/* Background Gradient Break */}
      <div className="absolute inset-0 bg-intelligence opacity-10 -z-10"></div>
      
      <div className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center">
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-headline leading-tight">
            Be first to get your Next 5 Reels when we launch.
          </h2>
          <p className="text-xl text-body max-w-xl mx-auto">
            Join the waitlist to secure your Founding Member pricing and early access.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col space-y-6">
            
            {/* Creator Type Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setCreatorType('new')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  creatorType === 'new' ? 'neu-inset text-primary' : 'neu-raised text-muted hover:text-headline'
                }`}
              >
                New Creator
              </button>
              <button
                type="button"
                onClick={() => setCreatorType('existing')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  creatorType === 'existing' ? 'neu-inset text-primary' : 'neu-raised text-muted hover:text-headline'
                }`}
              >
                Existing Creator
              </button>
            </div>

            {/* Email Input */}
            <div className="relative flex items-center w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full neu-inset rounded-full py-5 pl-8 pr-36 text-headline placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 neu-button-primary px-8 rounded-full text-headline font-bold flex items-center space-x-2 group"
              >
                <span className="group-hover:text-white transition-colors">Submit</span>
                <ArrowRight className="w-5 h-5 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            </div>

            {/* Optional IG Handle */}
            <div className="w-full">
              <input
                type="text"
                value={igHandle}
                onChange={(e) => setIgHandle(e.target.value)}
                placeholder="Instagram Handle (Optional)"
                className="w-full neu-inset rounded-full py-4 px-8 text-headline placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              />
            </div>
          </form>
        ) : (
          <div className="w-full max-w-xl glass-panel rounded-3xl p-10 flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 rounded-full bg-green-400/20 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-headline">You're on the list!</h3>
              <p className="text-xl text-body">
                You are <span className="font-mono font-bold text-primary">#{position.toLocaleString()}</span> in line.
              </p>
            </div>

            <div className="w-full neu-inset p-6 rounded-2xl space-y-4">
              <p className="text-sm font-bold text-headline uppercase tracking-widest">Move up 5 spots</p>
              <p className="text-sm text-body">Share your unique link to skip the line.</p>
              
              <div className="flex items-center justify-between neu-raised p-3 rounded-xl">
                <span className="font-mono text-xs text-muted truncate px-2">chariotagentic.com/waitlist?ref=CA{position}</span>
                <button className="neu-raised p-2 rounded-lg text-primary hover:text-headline transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex justify-center space-x-4 pt-4">
                <button className="neu-raised p-3 rounded-full text-headline hover:text-[#1DA1F2] transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="neu-raised p-3 rounded-full text-headline hover:text-[#E1306C] transition-colors">
                  <Instagram className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
