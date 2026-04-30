import React, {useEffect, useMemo, useState} from 'react';
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Clapperboard,
  Clock3,
  Flame,
  Gauge,
  Lightbulb,
  Loader2,
  Megaphone,
  Play,
  Radar,
  Search,
  Send,
  Sparkles,
  Target,
  Wand2,
} from 'lucide-react';
import LogoMark from '../components/LogoMark';

type DashboardRoute = 'connect' | 'niches' | 'content' | 'scheduler' | 'analytics';
type PatternState = 'idle' | 'running' | 'done';
type CreationState = 'idle' | 'running' | 'done';
type PublishState = 'idle' | 'publishing' | 'done';
type Market = string;
type CompetitorAccounts = Record<string, string>;

type Niche = {
  name: string;
  score: number;
  lift: string;
  saturation: string;
  audience: string;
  signal: string;
};

type Idea = {
  title: string;
  format: string;
  hook: string;
  score: number;
};

const niches: Niche[] = [
  {
    name: 'Creator OS Tutorials',
    score: 94,
    lift: '+31%',
    saturation: 'Medium',
    audience: 'solo creators and founder-led brands',
    signal: 'High save rate on repeatable workflow breakdowns.',
  },
  {
    name: 'AI Content Directors',
    score: 91,
    lift: '+27%',
    saturation: 'Low',
    audience: 'creators testing agentic production systems',
    signal: 'Fast comment growth around prompts, agents, and content briefs.',
  },
  {
    name: 'Founder Filming Systems',
    score: 88,
    lift: '+23%',
    saturation: 'Medium',
    audience: 'operators who need simple video systems',
    signal: 'Strong retention when filming steps are shown visually.',
  },
  {
    name: 'Short-Form Analytics Loops',
    score: 84,
    lift: '+18%',
    saturation: 'Low',
    audience: 'data-minded creators improving weekly output',
    signal: 'Weak competition but frequent saves on teardown posts.',
  },
  {
    name: 'Repurposing Engines',
    score: 79,
    lift: '+12%',
    saturation: 'High',
    audience: 'newsletter and podcast creators',
    signal: 'Stable search demand, slower social velocity.',
  },
];

const ideas: Idea[] = [
  {
    title: 'The 15-minute creator operating system',
    format: 'Reel breakdown',
    hook: 'Most creators do content backward. Here is the system.',
    score: 96,
  },
  {
    title: '3 AI workflows creators should stop doing manually',
    format: 'Fast list',
    hook: 'If you still do these by hand, your content engine is leaking hours.',
    score: 93,
  },
  {
    title: 'Turn one customer call into five posts',
    format: 'Screen + talking head',
    hook: 'Your best content is already sitting inside sales calls.',
    score: 89,
  },
  {
    title: 'Steal this weekly analytics loop',
    format: 'Whiteboard walkthrough',
    hook: 'Do this every Friday and your next week gets easier.',
    score: 86,
  },
  {
    title: 'How to film when you have no time',
    format: 'Shot list demo',
    hook: 'You do not need more ideas. You need a filming queue.',
    score: 82,
  },
];

const hookBars = [
  {label: 'Contrarian', value: 92},
  {label: 'Workflow', value: 86},
  {label: 'Mistake', value: 78},
  {label: 'Proof', value: 72},
  {label: 'Question', value: 61},
];

const routeLabels: Record<DashboardRoute, string> = {
  connect: 'Connect',
  niches: 'Niches',
  content: 'Content',
  scheduler: 'Scheduler',
  analytics: 'Analytics',
};

const socialAccounts = [
  {name: 'X', handle: '@creator_ops', signal: 'Threads, saves, replies'},
  {name: 'YouTube', handle: 'Chariot Studio', signal: 'Shorts retention, comments'},
  {name: 'Instagram', handle: '@chariot.creator', signal: 'Reels reach, saves'},
  {name: 'TikTok', handle: '@chariot.ai', signal: 'Watch time, shares'},
];

const marketPresets = ['Creator Economy', 'B2B SaaS', 'Fitness & Wellness', 'Finance', 'Local Business'];

function readRoute(): DashboardRoute {
  const segment = window.location.pathname.split('/').filter(Boolean)[1];
  if (segment === 'niches' || segment === 'content' || segment === 'scheduler' || segment === 'analytics') return segment;
  return 'connect';
}

function goTo(route: DashboardRoute) {
  window.history.pushState(null, '', `/dashboard/${route}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function scoreClass(score: number) {
  if (score >= 90) return 'border-emerald-300/35 bg-emerald-300/12 text-emerald-100';
  if (score >= 84) return 'border-sky-300/35 bg-sky-300/12 text-sky-100';
  return 'border-white/16 bg-white/8 text-white/64';
}

function WorkflowHeader({route}: {route: DashboardRoute}) {
  const routes: DashboardRoute[] = ['connect', 'niches', 'content', 'scheduler', 'analytics'];

  return (
    <header className="rounded-[1.45rem] border border-white/18 bg-white/12 p-3 shadow-[0_14px_38px_rgba(7,20,43,0.16)] backdrop-blur-xl md:rounded-[1.75rem] md:p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark className="h-10 w-10" />
          <div>
            <div className="text-sm font-semibold tracking-[-0.04em] text-white">CHARIOT</div>
            <div className="text-xs font-medium text-white/56">Agentic content workflow</div>
          </div>
        </div>

        <nav className="grid gap-2 sm:grid-cols-5 lg:w-[42rem]">
          {routes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => goTo(item)}
              className={`rounded-full border px-3 py-2 text-xs font-medium transition-colors ${
                route === item
                  ? 'border-white/70 bg-white text-slate-950'
                  : 'border-white/14 bg-white/8 text-white/64 hover:bg-white/12 hover:text-white'
              }`}
            >
              {routeLabels[item]}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Panel({children, className = ''}: {children: React.ReactNode; className?: string}) {
  return (
    <section className={`rounded-[1.4rem] border border-white/16 bg-white/10 p-4 shadow-[0_18px_50px_rgba(7,20,43,0.14)] backdrop-blur-xl sm:p-5 ${className}`}>
      {children}
    </section>
  );
}

function ConnectView({
  connectedAccounts,
  competitorAccounts,
  targetMarket,
  onToggleAccount,
  onCompetitorChange,
  onMarketSelect,
}: {
  connectedAccounts: string[];
  competitorAccounts: CompetitorAccounts;
  targetMarket: Market;
  onToggleAccount: (account: string) => void;
  onCompetitorChange: (account: string, competitor: string) => void;
  onMarketSelect: (market: Market) => void;
}) {
  const cleanTargetMarket = targetMarket.trim();
  const canContinue = connectedAccounts.length > 0 && Boolean(cleanTargetMarket);
  const competitorCount = Object.values(competitorAccounts).filter(Boolean).length;

  return (
    <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
      <Panel>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/12 px-3 py-1.5 text-xs font-medium text-sky-100">
          <Sparkles className="h-3.5 w-3.5" />
          Account setup
        </div>
        <h1 className="text-[2.25rem] font-semibold leading-[0.95] tracking-[-0.07em] sm:text-[3.2rem] md:text-[3.8rem]">
          Connect channels before the scraper runs.
        </h1>
        <p className="mt-4 text-sm leading-6 text-white/64 sm:text-base">
          Chariot uses connected social signals and your target market to rank niches before the Apify scraper and cluster agent load the next screen.
        </p>

        <div className="mt-6 rounded-[1rem] border border-white/12 bg-slate-950/14 p-4">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Connected sources</span>
            <span className="text-sky-100">{connectedAccounts.length}/4</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-200 to-emerald-200 transition-all duration-300"
              style={{width: `${(connectedAccounts.length / socialAccounts.length) * 100}%`}}
            />
          </div>
        </div>

        <div className="mt-3 rounded-[1rem] border border-white/12 bg-white/8 p-4">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Competitor scans</span>
            <span className="text-sky-100">{competitorCount}</span>
          </div>
          <p className="mt-2 text-xs leading-5 text-white/54">
            Add competitor handles per channel to compare hooks, posting cadence, and audience response before niche ranking.
          </p>
        </div>
      </Panel>

      <div className="grid gap-4">
        <Panel>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold tracking-[-0.03em]">Social accounts</h2>
              <p className="mt-1 text-xs text-white/52">Choose the accounts Chariot can inspect for audience and content signals.</p>
            </div>
            <CheckCircle2 className="h-5 w-5 text-emerald-100" />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {socialAccounts.map((account) => {
              const isConnected = connectedAccounts.includes(account.name);
              const competitor = competitorAccounts[account.name] ?? '';
              return (
                <article
                  key={account.name}
                  className={`rounded-[1.05rem] border p-4 text-left transition-colors ${
                    isConnected
                      ? 'border-emerald-300/35 bg-emerald-300/12'
                      : 'border-white/12 bg-white/8 hover:bg-white/12'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-white text-sm font-bold text-slate-950">
                      {account.name === 'YouTube' ? 'YT' : account.name === 'Instagram' ? 'IG' : account.name === 'TikTok' ? 'TT' : 'X'}
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleAccount(account.name)}
                      className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold transition-colors ${
                        isConnected
                          ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100'
                          : 'border-white/14 bg-white/8 text-white/62 hover:bg-white/12 hover:text-white'
                      }`}
                    >
                      {isConnected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold">{account.name}</h3>
                  <p className="mt-1 text-xs font-medium text-white/52">{account.handle}</p>
                  <p className="mt-3 text-xs leading-5 text-white/58">{account.signal}</p>

                  {isConnected ? (
                    <div className="mt-4 rounded-[0.9rem] border border-white/12 bg-slate-950/14 p-3">
                      <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/46">
                        Competitor analysis
                      </label>
                      <div className="mt-2 flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2">
                        <Search className="h-4 w-4 shrink-0 text-white/46" />
                        <input
                          value={competitor}
                          onChange={(event) => onCompetitorChange(account.name, event.target.value)}
                          placeholder={
                            account.name === 'YouTube'
                              ? '@channel or channel URL'
                              : account.name === 'Instagram'
                                ? '@competitor'
                                : account.name === 'TikTok'
                                  ? '@competitor'
                                  : '@competitor'
                          }
                          className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/38"
                        />
                        <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-semibold ${
                          competitor ? 'border-sky-300/30 text-sky-100' : 'border-white/12 text-white/38'
                        }`}>
                          {competitor ? 'Queued' : 'Search'}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </Panel>

        <Panel>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold tracking-[-0.03em]">Target market</h2>
              <p className="mt-1 text-xs text-white/52">Pick a preset or write the exact audience you want the niche engine to optimize for.</p>
            </div>
            <Target className="h-5 w-5 text-sky-100" />
          </div>

          <div className="grid gap-2 sm:grid-cols-5">
            {marketPresets.map((market) => (
              <button
                key={market}
                type="button"
                onClick={() => onMarketSelect(market)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                  targetMarket === market
                    ? 'border-white/70 bg-white text-slate-950'
                    : 'border-white/14 bg-white/8 text-white/64 hover:bg-white/12 hover:text-white'
                }`}
              >
                {market}
              </button>
            ))}
          </div>

          <label className="mt-4 block rounded-[1rem] border border-white/12 bg-slate-950/14 p-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/46">
              Your target market
            </span>
            <input
              value={targetMarket}
              onChange={(event) => onMarketSelect(event.target.value)}
              placeholder="Example: AI automation agencies selling to dentists"
              className="mt-2 w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/36"
            />
          </label>

          <button
            type="button"
            onClick={() => goTo('niches')}
            disabled={!canContinue}
            className="liquid-cta mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/14 bg-slate-950/92 px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-55"
          >
            <span className="relative z-10">Run Apify scraper</span>
            <ArrowRight className="relative z-10 h-4 w-4" />
          </button>
        </Panel>
      </div>
    </div>
  );
}

function NichesView({
  selectedNiche,
  targetMarket,
  competitorCount,
  onSelect,
}: {
  selectedNiche: Niche | null;
  targetMarket: Market;
  competitorCount: number;
  onSelect: (niche: Niche) => void;
}) {
  const [expanded, setExpanded] = useState(niches[0].name);
  const marketLabel = targetMarket.trim() || 'your target market';

  return (
    <div className="grid gap-4">
      <Panel>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/12 px-3 py-1.5 text-xs font-medium text-emerald-100">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Apify scraper complete
            </div>
            <h1 className="max-w-3xl text-[2.25rem] font-semibold leading-[0.95] tracking-[-0.07em] sm:text-[3.2rem] md:text-[4rem]">
              Choose the niche with the strongest signal.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/64 sm:text-base">
              Five ranked cards are loaded from the simulated scraper, competitor analysis, and cluster agents for {marketLabel}. Hover or click a card to expand the rationale, then select one to continue.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 lg:min-w-[22rem]">
            {[
              ['Posts scanned', '248'],
              ['Competitors', String(competitorCount)],
              ['Avg lift', '+22%'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1rem] border border-white/12 bg-white/8 p-3">
                <div className="text-2xl font-semibold tracking-[-0.04em]">{value}</div>
                <div className="mt-1 text-[10px] font-medium text-white/48">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid gap-3 lg:grid-cols-5">
        {niches.map((niche) => {
          const isExpanded = expanded === niche.name || selectedNiche?.name === niche.name;
          return (
            <article
              key={niche.name}
              onMouseEnter={() => setExpanded(niche.name)}
              onClick={() => setExpanded(niche.name)}
              className={`cursor-pointer rounded-[1.2rem] border p-4 transition-all duration-300 ${
                isExpanded
                  ? 'border-white/35 bg-white/16 shadow-[0_18px_44px_rgba(7,20,43,0.18)] lg:col-span-2'
                  : 'border-white/14 bg-white/8 hover:bg-white/12'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <Radar className="h-5 w-5 shrink-0 text-sky-100" />
                <span className={`rounded-full border px-2 py-1 text-xs font-semibold ${scoreClass(niche.score)}`}>
                  {niche.score}
                </span>
              </div>
              <h2 className="mt-5 text-lg font-semibold leading-6 tracking-[-0.04em]">{niche.name}</h2>
              <p className="mt-2 text-xs font-medium text-white/50">{niche.lift} velocity, {niche.saturation} saturation</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-white/80" style={{width: `${niche.score}%`}} />
              </div>

              {isExpanded ? (
                <div className="mt-5 space-y-4">
                  <p className="text-sm leading-6 text-white/66">{niche.signal}</p>
                  <div className="rounded-[0.9rem] border border-white/12 bg-slate-950/14 p-3 text-xs leading-5 text-white/58">
                    Audience: {niche.audience}
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelect(niche);
                    }}
                    className="liquid-cta inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/14 bg-slate-950/92 px-4 py-3 text-sm font-medium text-white"
                  >
                    <span className="relative z-10">Select</span>
                    <ArrowRight className="relative z-10 h-4 w-4" />
                  </button>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function ContentView({
  selectedNiche,
  selectedIdea,
  onIdeaSelect,
}: {
  selectedNiche: Niche | null;
  selectedIdea: Idea | null;
  onIdeaSelect: (idea: Idea) => void;
}) {
  const [patternState, setPatternState] = useState<PatternState>('idle');
  const [creationState, setCreationState] = useState<CreationState>('idle');

  const runPattern = () => {
    setPatternState('running');
    window.setTimeout(() => setPatternState('done'), 1200);
  };

  const runCreation = () => {
    setCreationState('running');
    window.setTimeout(() => setCreationState('done'), 1300);
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <Panel>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/66">
          <Target className="h-3.5 w-3.5 text-sky-100" />
          {selectedNiche?.name ?? 'No niche selected'}
        </div>
        <h1 className="text-[2.2rem] font-semibold leading-[0.95] tracking-[-0.07em] sm:text-[3.1rem]">
          Pattern, creation, then direction.
        </h1>
        <p className="mt-4 text-sm leading-6 text-white/64">
          Run the pattern agent first. Once it has the hooks and formats, creation unlocks five content ideas.
        </p>

        <div className="mt-6 grid gap-3">
          <button
            type="button"
            onClick={runPattern}
            disabled={patternState === 'running'}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {patternState === 'running' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
            {patternState === 'running' ? 'Pattern Agent running...' : 'Run Pattern Agent'}
          </button>

          {patternState === 'done' ? (
            <div className="rounded-[1rem] border border-emerald-300/25 bg-emerald-300/12 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-100">
                <CheckCircle2 className="h-4 w-4" />
                Pattern loaded
              </div>
              <div className="mt-4 grid gap-2">
                {[
                  'Open with a contrarian mistake.',
                  'Show the system visually before explaining.',
                  'End with a save-worthy checklist.',
                ].map((item) => (
                  <div key={item} className="rounded-[0.8rem] border border-white/12 bg-white/8 px-3 py-2 text-xs text-white/68">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {patternState === 'done' ? (
            <button
              type="button"
              onClick={runCreation}
              disabled={creationState === 'running'}
              className="liquid-cta inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-slate-950/92 px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {creationState === 'running' ? (
                <Loader2 className="relative z-10 h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="relative z-10 h-4 w-4" />
              )}
              <span className="relative z-10">{creationState === 'running' ? 'Creation Agent running...' : 'Run Creation Agent'}</span>
            </button>
          ) : null}
        </div>
      </Panel>

      <div className="grid gap-4">
        {creationState === 'done' ? (
          <Panel>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold tracking-[-0.03em]">Idea cards</h2>
                <p className="mt-1 text-xs text-white/52">Click one to generate the direction brief.</p>
              </div>
              <Sparkles className="h-5 w-5 text-sky-100" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {ideas.map((idea) => (
                <button
                  key={idea.title}
                  type="button"
                  onClick={() => onIdeaSelect(idea)}
                  className={`rounded-[1rem] border p-4 text-left transition-colors ${
                    selectedIdea?.title === idea.title
                      ? 'border-white/40 bg-white/18'
                      : 'border-white/12 bg-white/8 hover:bg-white/12'
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full border border-white/14 bg-white/8 px-2 py-1 text-[10px] font-medium text-white/58">
                      {idea.format}
                    </span>
                    <span className="text-sm font-semibold text-emerald-100">{idea.score}</span>
                  </div>
                  <h3 className="text-sm font-semibold leading-5">{idea.title}</h3>
                  <p className="mt-3 text-xs leading-5 text-white/56">{idea.hook}</p>
                </button>
              ))}
            </div>
          </Panel>
        ) : null}

        {selectedIdea ? (
          <Panel>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold tracking-[-0.03em]">Direction brief</h2>
                <p className="mt-1 text-xs text-white/52">{selectedIdea.title}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => goTo('scheduler')}
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white px-4 py-2 text-xs font-semibold text-slate-950"
                >
                  <CalendarClock className="h-4 w-4" />
                  Schedule Reel
                </button>
                <button
                  type="button"
                  onClick={() => goTo('scheduler')}
                  className="liquid-cta inline-flex items-center gap-2 rounded-full border border-white/14 bg-slate-950/92 px-4 py-2 text-xs font-medium text-white"
                >
                  <Clapperboard className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">Schedule Short</span>
                </button>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <BriefCard title="Shot list" icon={Clapperboard} items={['Face camera cold open', 'Screen recording of system board', 'Close-up checklist payoff']} />
              <BriefCard title="Lighting" icon={Flame} items={['Soft key light at 45 degrees', 'Cool practical in background', 'Avoid backlit monitor glare']} />
              <BriefCard title="Pacing guide" icon={Gauge} items={['0-2s pattern interrupt', '3-18s three proof steps', '19-27s checklist CTA']} />
            </div>
          </Panel>
        ) : null}
      </div>
    </div>
  );
}

function BriefCard({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: React.ComponentType<{className?: string}>;
  items: string[];
}) {
  return (
    <div className="rounded-[1rem] border border-white/12 bg-white/8 p-4">
      <Icon className="mb-4 h-5 w-5 text-sky-100" />
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div key={item} className="text-xs leading-5 text-white/58">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function SchedulerView({selectedIdea}: {selectedIdea: Idea | null}) {
  const [publishState, setPublishState] = useState<PublishState>('publishing');

  useEffect(() => {
    setPublishState('publishing');
    const timer = window.setTimeout(() => setPublishState('done'), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const reach = 12800;
  const views = 43600;
  const engagement = 8.7;
  const isSignalPost = views > 40000;

  return (
    <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
      <Panel>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/12 px-3 py-1.5 text-xs font-medium text-sky-100">
          <Send className="h-3.5 w-3.5" />
          Scheduler
        </div>
        <h1 className="text-[2.2rem] font-semibold leading-[0.95] tracking-[-0.07em] sm:text-[3.1rem]">
          Simulated publish is running.
        </h1>
        <p className="mt-4 text-sm leading-6 text-white/64">
          {selectedIdea?.title ?? 'Selected content'} is being queued, uploaded, and checked against the feedback loop.
        </p>
      </Panel>

      <Panel>
        {publishState === 'publishing' ? (
          <div className="flex min-h-72 flex-col items-center justify-center text-center">
            <Loader2 className="h-10 w-10 animate-spin text-sky-100" />
            <h2 className="mt-5 text-xl font-semibold tracking-[-0.04em]">Publishing to queue...</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-white/58">
              Execution agent is simulating upload, caption, timing, and initial feedback collection.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.04em]">Publish complete</h2>
                <p className="mt-1 text-sm text-white/54">Initial feedback has been collected.</p>
              </div>
              {isSignalPost ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/12 px-3 py-2 text-xs font-semibold text-emerald-100">
                  <Flame className="h-4 w-4" />
                  Signal post, &gt;2x baseline
                </span>
              ) : null}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['Reach', reach.toLocaleString()],
                ['Views', views.toLocaleString()],
                ['Engagement', `${engagement}%`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1rem] border border-white/12 bg-white/8 p-4">
                  <div className="text-2xl font-semibold tracking-[-0.04em]">{value}</div>
                  <div className="mt-1 text-xs font-medium text-white/48">{label}</div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo('analytics')}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Open Analytics
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </Panel>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <Panel>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-[2.2rem] font-semibold leading-[0.95] tracking-[-0.07em] sm:text-[3rem]">
              Analytics feedback loop.
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/64">
              Hook performance, weak signals, and digest notes are ready for the next content cycle.
            </p>
          </div>
          <BarChart3 className="hidden h-8 w-8 text-sky-100 sm:block" />
        </div>

        <div className="space-y-3">
          {hookBars.map((bar) => (
            <div key={bar.label} className="rounded-[1rem] border border-white/12 bg-white/8 p-3">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">{bar.label}</span>
                <span className="text-white/58">{bar.value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-sky-200 to-emerald-200" style={{width: `${bar.value}%`}} />
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-4">
        <Panel>
          <div className="mb-4 flex items-center gap-2">
            <Target className="h-4 w-4 text-sky-100" />
            <h2 className="text-base font-semibold tracking-[-0.03em]">Weak signals</h2>
          </div>
          <div className="space-y-3">
            {[
              'Question-led hooks lost viewers before second three.',
              'High detail captions drove saves but lowered shares.',
              'Late CTA underperformed against mid-video save cue.',
            ].map((signal) => (
              <div key={signal} className="rounded-[0.9rem] border border-white/12 bg-white/8 p-3 text-sm leading-6 text-white/62">
                {signal}
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold tracking-[-0.03em]">Weekly digest</h2>
              <p className="mt-1 text-xs text-white/52">Ready for the next agent run.</p>
            </div>
            <ChevronDown className="h-4 w-4 text-white/50" />
          </div>
          <div className="rounded-[1rem] border border-white/12 bg-slate-950/14 p-4 text-sm leading-6 text-white/66">
            Double down on contrarian workflow content, keep the visual system board in the first five seconds, and test shorter CTAs on the next three posts.
          </div>
        </Panel>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [route, setRoute] = useState<DashboardRoute>(readRoute);
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>(['X']);
  const [competitorAccounts, setCompetitorAccounts] = useState<CompetitorAccounts>({});
  const [targetMarket, setTargetMarket] = useState<Market>('Creator Economy');
  const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  useEffect(() => {
    const updateRoute = () => setRoute(readRoute());
    window.addEventListener('popstate', updateRoute);
    return () => window.removeEventListener('popstate', updateRoute);
  }, []);

  const content = useMemo(() => {
    if (route === 'connect') {
      return (
        <ConnectView
          connectedAccounts={connectedAccounts}
          competitorAccounts={competitorAccounts}
          targetMarket={targetMarket}
          onToggleAccount={(account) => {
            setConnectedAccounts((current) => {
              if (!current.includes(account)) return [...current, account];

              setCompetitorAccounts((competitors) => {
                const next = {...competitors};
                delete next[account];
                return next;
              });
              return current.filter((item) => item !== account);
            });
          }}
          onCompetitorChange={(account, competitor) => {
            setCompetitorAccounts((current) => ({...current, [account]: competitor}));
          }}
          onMarketSelect={setTargetMarket}
        />
      );
    }

    if (route === 'content') {
      return (
        <ContentView
          selectedNiche={selectedNiche}
          selectedIdea={selectedIdea}
          onIdeaSelect={setSelectedIdea}
        />
      );
    }

    if (route === 'scheduler') return <SchedulerView selectedIdea={selectedIdea} />;
    if (route === 'analytics') return <AnalyticsView />;

    return (
      <NichesView
        selectedNiche={selectedNiche}
        targetMarket={targetMarket}
        competitorCount={Object.values(competitorAccounts).filter(Boolean).length}
        onSelect={(niche) => {
          setSelectedNiche(niche);
          goTo('content');
        }}
      />
    );
  }, [competitorAccounts, connectedAccounts, route, selectedIdea, selectedNiche, targetMarket]);

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col px-3 pb-5 pt-3 text-white sm:px-5 sm:pb-6 sm:pt-4 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4">
        <WorkflowHeader route={route} />
        {content}
      </div>
    </section>
  );
}
