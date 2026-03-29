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
    <section className="relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden px-3 py-4 text-white sm:px-4 md:py-6">
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-5">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-medium text-white/72 backdrop-blur-xl">
            Docs
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.07em] sm:text-5xl md:text-6xl">
            The creator playbook, organized.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
            CHARIOT helps creators move from blank page to publish-ready content with clear systems for ideation, filming, scripting, and posting.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {docCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[1.4rem] border border-white/14 bg-white/8 p-4 shadow-[0_14px_38px_rgba(7,20,43,0.16)] backdrop-blur-xl"
            >
              <h2 className="text-lg font-semibold text-white">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/68">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
