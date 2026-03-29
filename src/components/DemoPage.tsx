import React from 'react';

export default function DemoPage() {
  return (
    <section className="relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden px-3 py-4 text-white sm:px-4 md:py-6">
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-5">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-medium text-white/72 backdrop-blur-xl">
            Demo
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.07em] sm:text-5xl md:text-6xl">
            Request your walkthrough.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
            Fill in your details and tell us what kind of content engine you want to build. We will tailor the demo around your workflow.
          </p>
        </div>

        <form 
          action="https://formspree.io/f/xlgojzjw" 
          method="POST"
          className="rounded-[1.8rem] border border-white/14 bg-white/8 p-4 shadow-[0_14px_38px_rgba(7,20,43,0.16)] backdrop-blur-xl sm:p-5"
        >
          {/* Submission Tracking */}
          <input type="hidden" name="_subject" value="New Demo Walkthrough Request" />
          <input type="hidden" name="form-source" value="demo" />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/54">Name</span>
              <input 
                name="full-name"
                className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40" 
                placeholder="Your full name" 
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/54">Email</span>
              <input 
                type="email"
                name="email"
                className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40" 
                placeholder="you@example.com" 
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/54">Platform</span>
              <input 
                name="platform"
                className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40" 
                placeholder="Instagram, TikTok, YouTube" 
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/54">Niche</span>
              <input 
                name="niche"
                className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40" 
                placeholder="Finance, fitness, fashion..." 
              />
            </label>
          </div>

          <label className="mt-3 flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/54">What do you want from the demo?</span>
            <textarea
              name="message"
              rows={4}
              className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
              placeholder="Tell us what you are creating, where the bottlenecks are, and what you want to see."
            />
          </label>

          <button
            type="submit"
            className="liquid-cta mt-4 inline-flex w-full items-center justify-center rounded-[1.1rem] border border-white/14 bg-[#111111] px-6 py-3 text-sm font-medium text-white shadow-[0_12px_40px_rgba(0,0,0,0.34)] sm:text-base cursor-pointer"
          >
            <span className="relative z-10">Request Demo</span>
          </button>
        </form>
      </div>
    </section>
  );
}
