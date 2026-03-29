import React from 'react';

const contactItems = [
  {label: 'Email', value: 'hello@chariotagentic.com'},
  {label: 'X', value: '@CAgentic'},
  {label: 'Response window', value: 'Within 24 hours'},
];

export default function ContactPage() {
  return (
    <section className="relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden px-3 py-4 text-white sm:px-4 md:py-6">
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-5">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-medium text-white/72 backdrop-blur-xl">
            Contact
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.07em] sm:text-5xl md:text-6xl">
            Reach the CHARIOT team.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
            Questions about the product, launch access, partnerships, or creator workflows. Send a message and we will point you to the right next step.
          </p>
        </div>

        <div className="rounded-[1.6rem] border border-white/14 bg-white/8 p-4 shadow-[0_14px_38px_rgba(7,20,43,0.16)] backdrop-blur-xl sm:p-5">
          <div className="grid gap-3 sm:grid-cols-3 mb-6">
            {contactItems.map((item) => (
              <div key={item.label} className="rounded-[1.2rem] border border-white/12 bg-white/8 p-4">
                <div className="text-xs font-medium uppercase tracking-[0.08em] text-white/48">{item.label}</div>
                <div className="mt-2 text-sm font-medium text-white sm:text-base">{item.value}</div>
              </div>
            ))}
          </div>

          <form 
            action="https://formspree.io/f/xlgojzjw" 
            method="POST"
            className="flex flex-col gap-4 border-t border-white/12 pt-6"
          >
            {/* Submission Tracking */}
            <input type="hidden" name="_subject" value="New Contact Inquiry" />
            <input type="hidden" name="form-source" value="contact" />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/54">Name</span>
                <input 
                  name="name"
                  className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40" 
                  placeholder="Your name" 
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
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/54">Message</span>
              <textarea 
                name="message"
                rows={4}
                className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40" 
                placeholder="How can we help you?" 
                required
              />
            </label>
            <button
              type="submit"
              className="liquid-cta mt-2 inline-flex w-full items-center justify-center rounded-[1.1rem] border border-white/14 bg-[#111111] px-6 py-3 text-sm font-medium text-white shadow-[0_12px_40px_rgba(0,0,0,0.34)] sm:text-base cursor-pointer"
            >
              <span className="relative z-10">Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
