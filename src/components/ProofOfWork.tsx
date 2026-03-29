import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const cards = [
  {
    niche: 'Real Estate',
    title: 'The "Hidden Costs" Hook',
    hook: '"Everyone tells you to buy a house, but nobody mentions..."',
    score: 87,
  },
  {
    niche: 'Fitness',
    title: 'The "Anti-Diet" Myth',
    hook: '"Stop tracking macros. Do this 5-minute habit instead..."',
    score: 92,
  },
  {
    niche: 'Tech',
    title: 'The "AI Replacement" Fear',
    hook: '"If you use ChatGPT like a search engine, you\'re doing it wrong..."',
    score: 95,
  },
];

export default function ProofOfWork() {
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
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full py-20 flex flex-col items-center justify-center relative z-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-16">
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="neu-raised rounded-3xl p-6 flex flex-col space-y-4 group relative overflow-hidden transition-all duration-300 hover:-translate-y-2"
          >
            {/* Niche Tag */}
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                {card.niche}
              </span>
              <div className="glass-panel px-3 py-1 rounded-full flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <span className="font-mono text-[10px] font-medium text-headline">
                  Score: {card.score}
                </span>
              </div>
            </div>

            {/* Title & Hook */}
            <div className="space-y-2 flex-grow">
              <h3 className="text-xl font-bold text-headline leading-tight">
                {card.title}
              </h3>
              <p className="text-sm text-body italic leading-relaxed">
                {card.hook}
              </p>
            </div>

            {/* Score Bar */}
            <div className="w-full h-1.5 bg-recessed rounded-full overflow-hidden mt-4">
              <div
                className="h-full bg-intelligence rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${card.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Bar */}
      <div className="flex flex-col items-center space-y-4 opacity-60">
        <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
          Built With
        </span>
        <div className="flex items-center space-x-8 md:space-x-12 grayscale">
          {/* Placeholder logos - using text for simplicity, ideally SVGs */}
          <span className="font-heading font-bold text-lg text-headline">Mem0</span>
          <span className="font-heading font-bold text-lg text-headline">Anthropic</span>
          <span className="font-heading font-bold text-lg text-headline">Vercel</span>
        </div>
      </div>
    </section>
  );
}
