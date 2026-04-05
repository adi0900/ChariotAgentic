import React, {useEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';
import {ArrowRight} from 'lucide-react';
import {getFormErrorMessage, submitForm} from '../lib/forms';

export default function Waitlist({onSuccess}: {onSuccess?: (msg?: string) => void}) {
  const [email, setEmail] = useState('');
  const [creatorType, setCreatorType] = useState<'new' | 'existing'>('existing');
  const [igHandle, setIgHandle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {y: 50, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitForm('waitlist', {
        email,
        creatorType,
        igHandle,
      });
      setEmail('');
      setIgHandle('');
      onSuccess?.("You've been added to the waitlist! We'll notify you as soon as we're ready to launch.");
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage(getFormErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="waitlist"
      ref={containerRef}
      className="w-full py-32 flex flex-col items-center justify-center relative z-10 overflow-hidden"
    >
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

        <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col space-y-6">
          {errorMessage ? (
            <p className="text-sm text-red-200" role="alert">
              {errorMessage}
            </p>
          ) : null}

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

          <div className="relative flex items-center w-full">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage('');
              }}
              placeholder="Enter your email address"
              className="w-full neu-inset rounded-full py-5 pl-8 pr-36 text-headline placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 text-lg"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute right-2 top-2 bottom-2 neu-button-primary px-8 rounded-full text-headline font-bold flex items-center space-x-2 group disabled:opacity-50"
            >
              <span className="group-hover:text-white transition-colors">{isSubmitting ? 'Sending...' : 'Submit'}</span>
              {!isSubmitting ? (
                <ArrowRight className="w-5 h-5 group-hover:text-white group-hover:translate-x-1 transition-all" />
              ) : null}
            </button>
          </div>

          <div className="w-full">
            <input
              type="text"
              value={igHandle}
              onChange={(e) => {
                setIgHandle(e.target.value);
                setErrorMessage('');
              }}
              placeholder="Instagram Handle (Optional)"
              className="w-full neu-inset rounded-full py-4 px-8 text-headline placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
