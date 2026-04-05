import React, {useState} from 'react';
import {getFormErrorMessage, submitForm} from '../lib/forms';

export default function DemoPage({onSuccess}: {onSuccess?: (msg?: string) => void}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    platform: '',
    niche: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrorMessage('');
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitForm('demo', formData);
      setFormData({
        fullName: '',
        email: '',
        platform: '',
        niche: '',
        message: '',
      });
      onSuccess?.('Your demo request has been submitted! We will reach out to you shortly to schedule a walkthrough.');
    } catch (error) {
      console.error(error);
      setErrorMessage(getFormErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex w-full flex-1 items-start justify-center overflow-hidden px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10 lg:min-h-0 lg:items-center">
      <div className="relative z-10 mx-auto flex w-full max-w-[22rem] flex-col gap-5 sm:max-w-[38rem] sm:gap-6 md:max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-medium text-white/72 backdrop-blur-xl">
            Demo
          </div>
          <h1 className="text-[2.35rem] font-semibold tracking-[-0.07em] sm:text-[3.4rem] md:text-[4.3rem] text-white">
            Request your walkthrough.
          </h1>
          <p className="mt-4 text-[0.98rem] leading-[1.7] text-white/70 sm:text-[1.05rem] md:text-lg">
            Fill in your details and tell us what kind of content engine you want to build. We will tailor the demo around your workflow.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[1.8rem] border border-white/14 bg-white/8 p-4 shadow-[0_14px_38px_rgba(7,20,43,0.16)] backdrop-blur-xl sm:p-6"
        >
          {errorMessage ? (
            <p className="mb-4 text-sm text-red-200" role="alert">
              {errorMessage}
            </p>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-white">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/54">Name</span>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/40"
                placeholder="Your full name"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-white">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/54">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/40"
                placeholder="you@example.com"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-white">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/54">Platform</span>
              <input
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/40"
                placeholder="Instagram, TikTok, YouTube"
              />
            </label>
            <label className="flex flex-col gap-2 text-white">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/54">Niche</span>
              <input
                name="niche"
                value={formData.niche}
                onChange={handleChange}
                className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/40"
                placeholder="Finance, fitness, fashion..."
              />
            </label>
          </div>

          <label className="mt-3 flex flex-col gap-2 text-white">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/54">What do you want from the demo?</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/40"
              placeholder="Tell us what you are creating, where the bottlenecks are, and what you want to see."
              required
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="liquid-cta mt-4 inline-flex w-full items-center justify-center rounded-[1.1rem] border border-white/14 bg-[#111111] px-6 py-3 text-sm font-medium text-white shadow-[0_12px_40px_rgba(0,0,0,0.34)] sm:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span className="relative z-10 text-white">{isSubmitting ? 'Sending Request...' : 'Request Demo'}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
