import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="w-full py-24 flex flex-col items-center justify-center relative z-10"
    >
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-headline">
          Founding Member Pricing
        </h2>
        <p className="text-lg text-body">Locked for life. Seriously.</p>
      </div>

      {/* Toggle */}
      <div className="flex items-center space-x-4 mb-16">
        <span className={`text-sm font-medium ${!isAnnual ? 'text-headline' : 'text-muted'}`}>Monthly</span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className="w-16 h-8 neu-inset rounded-full p-1 flex items-center transition-colors duration-300 relative"
        >
          <div
            className={`w-6 h-6 bg-primary rounded-full shadow-md transform transition-transform duration-300 ${
              isAnnual ? 'translate-x-8' : 'translate-x-0'
            }`}
          ></div>
        </button>
        <span className={`text-sm font-medium ${isAnnual ? 'text-headline' : 'text-muted'}`}>
          Annual <span className="text-secondary ml-1">(Save 20%)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl items-center">
        {/* Free Tier */}
        <div
          ref={(el) => (cardsRef.current[0] = el)}
          className="neu-inset rounded-3xl p-8 flex flex-col h-full opacity-80"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-headline mb-2">Free</h3>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-bold text-headline">$0</span>
              <span className="text-muted">/mo</span>
            </div>
            <p className="text-sm text-body mt-4">For casual creators exploring their niche.</p>
          </div>
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-start space-x-3 text-body">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span>3 Demo Generations per day</span>
            </li>
            <li className="flex items-start space-x-3 text-body">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span>Basic Niche Analysis</span>
            </li>
            <li className="flex items-start space-x-3 text-body">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span>1 Script Preview</span>
            </li>
          </ul>
          <button onClick={scrollToWaitlist} className="neu-raised w-full py-4 rounded-2xl text-headline font-bold hover:text-primary transition-colors">
            Start Free
          </button>
        </div>

        {/* Pro Tier (Elevated) */}
        <div
          ref={(el) => (cardsRef.current[1] = el)}
          className="neu-raised rounded-3xl p-8 flex flex-col h-full transform md:-translate-y-4 shadow-2xl relative overflow-hidden border border-white/20"
        >
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-intelligence opacity-50 blur-sm"></div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl font-bold text-primary">Creator Pro</h3>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full">Recommended</span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-5xl font-bold text-headline">${isAnnual ? '79' : '99'}</span>
              <span className="text-muted">/mo</span>
            </div>
            <p className="text-sm text-body mt-4">The complete AI Content Director for serious growth.</p>
          </div>
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-start space-x-3 text-headline font-medium">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span>Unlimited Generations</span>
            </li>
            <li className="flex items-start space-x-3 text-headline font-medium">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span>Full Scripts & Shot Lists</span>
            </li>
            <li className="flex items-start space-x-3 text-headline font-medium">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span>Trending Audio Suggestions</span>
            </li>
            <li className="flex items-start space-x-3 text-headline font-medium">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span>Competitor Analysis</span>
            </li>
          </ul>
          <button onClick={scrollToWaitlist} className="neu-button-primary w-full py-4 rounded-2xl text-headline font-bold transition-all">
            Join Waitlist for Creator
          </button>
        </div>

        {/* Agency Tier */}
        <div
          ref={(el) => (cardsRef.current[2] = el)}
          className="neu-inset rounded-3xl p-8 flex flex-col h-full opacity-80"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-headline mb-2">Agency</h3>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-bold text-headline">${isAnnual ? '249' : '299'}</span>
              <span className="text-muted">/mo</span>
            </div>
            <p className="text-sm text-body mt-4">Manage multiple clients and brands.</p>
          </div>
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-start space-x-3 text-body">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span>Up to 10 Profiles</span>
            </li>
            <li className="flex items-start space-x-3 text-body">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span>White-label Exports</span>
            </li>
            <li className="flex items-start space-x-3 text-body">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span>API Access</span>
            </li>
          </ul>
          <button onClick={scrollToWaitlist} className="neu-raised w-full py-4 rounded-2xl text-headline font-bold hover:text-primary transition-colors">
            Contact Sales
          </button>
        </div>
      </div>

      <p className="text-center text-sm text-muted mt-12 max-w-md">
        Founding Members who join in the first 90 days get their rate locked permanently.
      </p>
    </section>
  );
}
