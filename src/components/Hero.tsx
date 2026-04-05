import React, {useState} from 'react';
import {Mail} from 'lucide-react';
import {getFormErrorMessage, submitForm} from '../lib/forms';

export default function Hero({onSuccess}: {onSuccess?: (msg?: string) => void}) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitForm('hero', {email});
      setEmail('');
      onSuccess?.("Thanks for signing up! We've added you to our early access list.");
    } catch (error) {
      console.error(error);
      setErrorMessage(getFormErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex w-full flex-1 items-start justify-center overflow-hidden px-4 pt-4 pb-6 text-center text-white sm:px-6 sm:pt-8 sm:pb-8 md:px-8 md:pt-10 lg:min-h-0 lg:items-center lg:pb-3">
      <div className="relative z-10 mx-auto flex w-full max-w-[22rem] flex-col items-center sm:max-w-[34rem] md:max-w-[44rem] lg:max-w-5xl">
        <div className="mb-5 max-w-full rounded-full border border-white/55 bg-white/92 px-3 py-1.5 text-[10px] font-medium text-slate-900 shadow-[0_10px_30px_rgba(8,20,43,0.14)] backdrop-blur-xl sm:mb-5 sm:px-4 sm:py-2 sm:text-xs md:mb-6 md:text-sm">
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

        <h1 className="max-w-[12ch] text-[clamp(2.55rem,11vw,3.5rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-white sm:max-w-[11.5ch] sm:text-[4.1rem] md:max-w-[13ch] md:text-[4.75rem] lg:max-w-5xl lg:text-[4.9rem]">
          <span className="lg:hidden">
            Content strategy built for creators who ship, not scroll.
          </span>
          <span className="hidden lg:inline">
            Content strategy built for
            <br />
            creators who ship, not scroll.
          </span>
        </h1>

        <p className="mt-4 max-w-[20rem] px-1 text-[1rem] leading-[1.65] text-white/74 sm:mt-5 sm:max-w-[31rem] sm:text-[1.075rem] md:max-w-[38rem] md:px-0 md:text-[1.22rem] lg:max-w-4xl lg:text-[1.35rem]">
          From niche discovery to shot-by-shot filming guides, get the AI Content Director that turns your expertise into a daily content engine: scripts, trends, and posting times included.
        </p>

        <div className="hero-form-shell mt-6 w-full rounded-[1.45rem] p-2 shadow-[0_20px_60px_rgba(8,20,43,0.22)] sm:mt-7 sm:max-w-2xl sm:rounded-[1.7rem] sm:p-2.5 md:max-w-3xl md:rounded-[1.9rem]">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 sm:gap-3"
          >
            <label className="hero-input-shell flex h-[3.2rem] min-w-0 flex-1 items-center gap-2.5 rounded-[1.15rem] px-4 text-left sm:h-[3.4rem] sm:gap-3 sm:rounded-[1.3rem] sm:px-5 md:h-14 md:rounded-[1.35rem]">
              <Mail className="h-4 w-4 shrink-0 text-white/70 sm:h-5 sm:w-5" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="example@domain.com"
                required
                className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/50 sm:text-base md:text-lg"
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="liquid-cta h-[3.2rem] shrink-0 rounded-[1.15rem] border border-white/14 bg-[#111111] px-5 text-sm font-medium text-white shadow-[0_12px_40px_rgba(0,0,0,0.34)] transition-transform hover:-translate-y-0.5 sm:h-[3.4rem] sm:min-w-[9.75rem] sm:rounded-[1.3rem] sm:px-7 sm:text-base md:h-14 md:min-w-[11rem] md:rounded-[1.35rem] md:px-10 md:text-lg cursor-pointer"
            >
              <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Submit'}</span>
            </button>
          </form>
          {errorMessage ? (
            <p className="px-2 pt-3 text-left text-sm text-red-200" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 px-2 text-[10px] font-medium text-white/62 sm:mt-5 md:text-sm">
          <span className="flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3.5 py-2 backdrop-blur-lg">
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
