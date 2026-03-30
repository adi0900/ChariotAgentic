import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export default function Hero({ onSuccess }: { onSuccess?: (msg?: string) => void }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/xlgojzjw', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _subject: "New Home Page Signup",
          form_source: "homepage_hero",
          email: email
        })
      });

      if (response.ok) {
        setEmail('');
        onSuccess?.("Thanks for signing up! We've added you to our early access list.");
      } else {
        alert("Oops! There was a problem with your submission.");
      }
    } catch (error) {
      console.error(error);
      alert("Oops! There was a problem with your submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden px-3 pt-6 pb-1 text-center text-white sm:px-4 sm:pt-8 md:pt-10">
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        <div className="mb-3 max-w-[20rem] rounded-full border border-white/55 bg-white/92 px-3 py-1.5 text-[10px] font-medium text-slate-900 shadow-[0_10px_30px_rgba(8,20,43,0.14)] backdrop-blur-xl sm:mb-4 sm:max-w-full sm:px-4 sm:py-2 sm:text-xs md:mb-5 md:text-sm">
          <span className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <img
              src="/Dk48x2J-_400x400.jpg"
              alt="Launch creator"
              className="h-5 w-5 rounded-full object-cover sm:h-6 sm:w-6"
            />
            <span className="whitespace-nowrap">4 Mill+ Impressions in last 3 Months</span>
            <span className="text-slate-300">|</span>
            <span className="whitespace-nowrap font-semibold text-blue-600">Launch Soon</span>
          </span>
        </div>

        <h1 className="max-w-[11ch] text-[2.55rem] font-semibold leading-[0.9] tracking-[-0.08em] text-white sm:max-w-5xl sm:text-5xl md:text-6xl lg:text-[4.9rem]">
          <span className="sm:hidden">
            Content strategy built for creators who ship, not scroll.
          </span>
          <span className="hidden sm:inline">
            Content strategy built for
            <br />
            creators who ship, not scroll.
          </span>
        </h1>

        <p className="mt-3 max-w-[21rem] px-1 text-[0.95rem] leading-relaxed text-white/74 sm:mt-4 sm:max-w-4xl sm:px-2 sm:text-base md:mt-5 md:px-0 md:text-[1.2rem] lg:text-[1.35rem]">
          From niche discovery to shot-by-shot filming guides, get the AI Content Director that turns your expertise into a daily content engine: scripts, trends, and posting times included.
        </p>

        <div className="hero-form-shell mt-4 w-full max-w-md rounded-[1.25rem] p-1.5 shadow-[0_20px_60px_rgba(8,20,43,0.22)] sm:mt-5 sm:max-w-3xl sm:rounded-[1.75rem] sm:p-2 md:mt-6 md:rounded-[2rem]">
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:justify-center sm:gap-3"
          >
            <label className="hero-input-shell flex h-12 flex-1 items-center gap-2.5 rounded-[1.1rem] px-4 text-left sm:h-13 sm:gap-3 sm:rounded-[1.25rem] sm:px-5 md:h-14 md:rounded-[1.35rem]">
              <Mail className="h-4 w-4 text-white/70 sm:h-5 sm:w-5" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
                required
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50 sm:text-base md:text-lg"
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="liquid-cta h-12 rounded-[1.1rem] border border-white/14 bg-[#111111] px-6 text-sm font-medium text-white shadow-[0_12px_40px_rgba(0,0,0,0.34)] transition-transform hover:-translate-y-0.5 sm:h-13 sm:rounded-[1.25rem] sm:px-7 sm:text-base md:h-14 md:rounded-[1.35rem] md:px-10 md:text-lg cursor-pointer"
            >
              <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Submit'}</span>
            </button>
          </form>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 px-2 text-[10px] font-medium text-white/62 sm:mt-4 sm:text-xs md:text-sm">
          <span className="flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1.5 backdrop-blur-lg">
            <span>Powered by</span>
            <img
              src="/yH6hwRSZ_400x400.png"
              alt="Mem0"
              className="h-4 w-4 rounded-full object-cover sm:h-5 sm:w-5"
            />
            <span>Mem0 YC S24</span>
          </span>
        </div>
      </div>
    </section>
  );
}
