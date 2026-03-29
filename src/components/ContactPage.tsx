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
          <div className="grid gap-3 sm:grid-cols-3">
            {contactItems.map((item) => (
              <div key={item.label} className="rounded-[1.2rem] border border-white/12 bg-white/8 p-4">
                <div className="text-xs font-medium uppercase tracking-[0.08em] text-white/48">{item.label}</div>
                <div className="mt-2 text-sm font-medium text-white sm:text-base">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
