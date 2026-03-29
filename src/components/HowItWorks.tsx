import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
  {
    num: '1',
    title: 'Tell Us About You',
    desc: 'Share your interests in 2 sentences. That’s it.',
  },
  {
    num: '2',
    title: 'AI Finds Your Niche',
    desc: 'We analyze your unique angle against 10,000+ creator niches.',
  },
  {
    num: '3',
    title: 'Get Your Next 5 Reels',
    desc: 'Scripts, shot lists, posting times. Everything but the camera.',
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      });

      stepsRef.current.forEach((step, idx) => {
        tl.fromTo(
          step,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
          idx === 0 ? 0 : '+=0.2'
        );

        if (linesRef.current[idx]) {
          tl.fromTo(
            linesRef.current[idx],
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.4, ease: 'power2.inOut' },
            '-=0.2'
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full py-24 flex flex-col items-center justify-center relative z-10"
    >
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-headline">
          How It Works
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl relative">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Card */}
            <div
              ref={(el) => (stepsRef.current[index] = el)}
              className="flex flex-col items-center relative z-10 w-full md:w-1/3 px-4 mb-12 md:mb-0"
            >
              {/* Number Circle */}
              <div className="w-16 h-16 neu-raised rounded-full flex items-center justify-center mb-6 relative">
                <span className="font-heading font-bold text-2xl text-primary">
                  {step.num}
                </span>
                {/* Glow */}
                <div className="absolute inset-0 rounded-full bg-primary/10 blur-md -z-10"></div>
              </div>

              {/* Info Panel */}
              <div className="glass-panel p-6 rounded-3xl text-center w-full h-full flex flex-col items-center justify-center space-y-3">
                <h3 className="text-lg font-bold text-headline">{step.title}</h3>
                <p className="text-sm text-body leading-relaxed">{step.desc}</p>
              </div>
            </div>

            {/* Connecting Line (Desktop only) */}
            {index < steps.length - 1 && (
              <div
                ref={(el) => (linesRef.current[index] = el)}
                className="hidden md:block absolute top-8 h-0.5 bg-muted/30 z-0"
                style={{
                  left: `${(index * 33.33) + 16.66}%`,
                  width: '33.33%',
                }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
