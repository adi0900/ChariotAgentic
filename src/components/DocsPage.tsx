import React from 'react';

const docCards = [
  {
    title: 'Idea Engine',
    description: 'Generate fresh hooks, angles, and series ideas based on your niche before you open the camera.',
  },
  {
    title: 'Filming Workflow',
    description: 'Turn each reel idea into shot-by-shot guidance, pacing cues, and clear talking points.',
  },
  {
    title: 'Publishing Guidance',
    description: 'Get timing, trend, and posting recommendations so the content does not stall after editing.',
  },
];

export default function DocsPage() {
  return (
    <section className="relative flex w-full flex-1 items-start justify-center overflow-hidden px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10 lg:min-h-0 lg:items-center">
      <div className="relative z-10 mx-auto flex w-full max-w-[22rem] flex-col gap-5 sm:max-w-[38rem] sm:gap-6 md:max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-medium text-white/72 backdrop-blur-xl">
            Docs
          </div>
          <h1 className="text-[2.35rem] font-semibold tracking-[-0.07em] sm:text-[3.4rem] md:text-[4.3rem]">
            The creator playbook, organized.
          </h1>
          <p className="mt-4 text-[0.98rem] leading-[1.7] text-white/70 sm:text-[1.05rem] md:text-lg">
            CHARIOT helps creators move from blank page to publish-ready content with clear systems for ideation, filming, scripting, and posting.
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
          {docCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[1.45rem] border border-white/14 bg-white/8 p-5 shadow-[0_14px_38px_rgba(7,20,43,0.16)] backdrop-blur-xl sm:p-6"
            >
              <h2 className="text-lg font-semibold text-white sm:text-[1.2rem]">{card.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/68 sm:text-[0.98rem]">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
