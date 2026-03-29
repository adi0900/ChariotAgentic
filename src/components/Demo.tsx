import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles, ChevronDown, ChevronUp, PlayCircle, Clock, Hash, Camera } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const presets = [
  { label: 'Tech + Fitness', icon: '💻💪', text: 'I am a software engineer who recently got into powerlifting and wants to share my journey balancing a desk job with heavy training.' },
  { label: 'Real Estate + Travel', icon: '🏠✈️', text: 'I sell luxury real estate in Miami but spend half the year traveling. I want to show the lifestyle behind the deals.' },
  { label: 'Student + Finance', icon: '📚💰', text: 'I am a college student majoring in finance, trying to graduate debt-free by side-hustling and investing my student loans.' },
  { label: 'Designer + Cooking', icon: '🎨🍳', text: 'I am a UI/UX designer who loves making aesthetically pleasing, complex recipes on the weekends.' },
];

const SYSTEM_PROMPT = `
You are an expert AI Content Director for social media creators (Instagram Reels/TikTok).
Analyze the user's profile and output a JSON response with exactly this structure:
{
  "niche": "The specific, unique niche you recommend (e.g., 'Aesthetic Desk-Job Powerlifting')",
  "reasoning": "Why this works for them (2-3 sentences max)",
  "opportunityScore": 85, // 0-100
  "reels": [
    {
      "number": 1,
      "title": "Catchy Title",
      "hook": "The exact first sentence to say",
      "type": "Safe" | "Trendy" | "Personal",
      "trendScore": 90, // 0-100
      "script": {
        "hook": "0-3s: The hook script",
        "body": "3-25s: The main body script",
        "cta": "25-30s: The call to action"
      },
      "shotList": [
        { "time": "0-3s", "visual": "Close up of face" },
        { "time": "3-15s", "visual": "B-roll of typing" }
      ],
      "audio": "Trending audio suggestion",
      "bestTime": "Best time to post",
      "hashtags": "#tag1 #tag2",
      "tips": ["Tip 1", "Tip 2"]
    }
    // Exactly 5 reels total. Only reel 1 needs the full script/shotList/audio/etc. Reels 2-5 can have empty strings/arrays for those detailed fields.
  ]
}
Return ONLY valid JSON. No markdown formatting, no backticks.
`;

export default function Demo() {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [expandedReel, setExpandedReel] = useState<number | null>(null);
  const [loadingText, setLoadingText] = useState('Analyzing your profile...');
  
  const outputRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      const texts = ['Analyzing your profile...', 'Finding your niche...', 'Generating your roadmap...'];
      let i = 0;
      interval = setInterval(() => {
        i = (i + 1) % texts.length;
        setLoadingText(texts[i]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async () => {
    if (!input.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setResult(null);
    setExpandedReel(null);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: input,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: 'application/json',
          temperature: 0.7,
        }
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        setResult(parsed);
        
        // Animate output in
        setTimeout(() => {
          if (outputRef.current) {
            gsap.fromTo(outputRef.current, 
              { y: 50, opacity: 0 }, 
              { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            );
          }
        }, 100);
      }
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Failed to generate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="demo" className="w-full py-24 flex flex-col items-center justify-center relative z-10">
      <div className="w-full max-w-4xl flex flex-col items-center space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-headline relative inline-block">
            Experience It
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-intelligence rounded-full opacity-50 blur-sm"></div>
          </h2>
          <p className="text-lg text-body max-w-xl mx-auto">
            Tell us about yourself in 2–3 sentences. We'll build your entire content strategy.
          </p>
        </div>

        {/* Input Area */}
        <div className="w-full neu-raised rounded-3xl p-8 flex flex-col space-y-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="I’m a 28-year-old CA who loves travel photography and has strong opinions about personal finance."
            className="w-full h-32 neu-inset rounded-2xl p-6 text-headline placeholder-muted resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 text-lg"
          />
          
          {/* Presets */}
          <div className="flex flex-wrap gap-3">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setInput(preset.text)}
                className="neu-raised px-4 py-2 rounded-full text-sm font-medium text-body hover:text-primary transition-colors flex items-center space-x-2"
              >
                <span>{preset.icon}</span>
                <span>{preset.label}</span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            ref={buttonRef}
            onClick={handleGenerate}
            disabled={isGenerating || !input.trim()}
            className={`neu-button-primary w-full py-5 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 ${
              isGenerating ? 'opacity-80 cursor-not-allowed' : 'hover:-translate-y-1'
            }`}
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-6 h-6 animate-spin text-primary" />
                <span className="text-headline">{loadingText}</span>
              </>
            ) : (
              <>
                <span className="text-headline group-hover:text-white">Show Me My Reels</span>
                <ArrowRight className="w-6 h-6 text-headline group-hover:text-white group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Output Area */}
        {result && (
          <div ref={outputRef} className="w-full glass-panel rounded-3xl p-8 flex flex-col space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 border-2 border-transparent rounded-3xl" style={{ background: 'linear-gradient(135deg, #6C63FF, #3B82F6, #06B6D4) border-box', WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
            
            {/* Niche & Reasoning */}
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-headline">Recommended Niche</h3>
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-sm font-bold text-muted uppercase">Opportunity</span>
                  <div className="w-32 h-2 bg-recessed rounded-full overflow-hidden">
                    <div className="h-full bg-intelligence rounded-full" style={{ width: `${result.opportunityScore}%` }}></div>
                  </div>
                  <span className="font-mono font-bold text-primary">{result.opportunityScore}</span>
                </div>
              </div>
              <div className="neu-inset p-6 rounded-2xl">
                <p className="text-xl font-bold text-primary mb-2">{result.niche}</p>
                <p className="text-body leading-relaxed">{result.reasoning}</p>
              </div>
            </div>

            {/* Reels List */}
            <div className="space-y-4 relative z-10">
              <h3 className="text-xl font-bold text-headline mb-4">Your Next 5 Reels</h3>
              {result.reels.map((reel: any, idx: number) => (
                <div key={idx} className="neu-raised rounded-2xl overflow-hidden transition-all duration-300">
                  {/* Reel Header (Clickable) */}
                  <div 
                    onClick={() => setExpandedReel(expandedReel === idx ? null : idx)}
                    className="p-6 flex items-center justify-between cursor-pointer hover:bg-white/5"
                  >
                    <div className="flex items-center space-x-6">
                      <span className="font-mono text-3xl font-bold text-muted/30">0{reel.number}</span>
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-headline">{reel.title}</h4>
                        <p className="text-sm text-body italic line-clamp-1">{reel.hook}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="hidden md:flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        <span className="font-mono text-xs font-bold uppercase text-muted">{reel.type}</span>
                      </div>
                      <div className="hidden md:flex items-center space-x-3">
                        <div className="w-24 h-1.5 bg-recessed rounded-full overflow-hidden">
                          <div className="h-full bg-intelligence rounded-full" style={{ width: `${reel.trendScore}%` }}></div>
                        </div>
                        <span className="font-mono text-xs font-bold text-headline">{reel.trendScore}</span>
                      </div>
                      {expandedReel === idx ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-muted" />}
                    </div>
                  </div>

                  {/* Expanded Content (Only for Reel 1 or if data exists) */}
                  {expandedReel === idx && reel.script && reel.script.hook && (
                    <div className="p-6 pt-0 border-t border-white/10 bg-white/5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        
                        {/* Script */}
                        <div className="space-y-4">
                          <h5 className="font-mono text-sm font-bold uppercase text-primary flex items-center"><PlayCircle className="w-4 h-4 mr-2" /> The Script</h5>
                          <div className="space-y-3 neu-inset p-4 rounded-xl text-sm">
                            <p><span className="font-mono font-bold text-headline">0-3s (Hook):</span> <span className="text-body">{reel.script.hook}</span></p>
                            <p><span className="font-mono font-bold text-headline">3-25s (Body):</span> <span className="text-body">{reel.script.body}</span></p>
                            <p><span className="font-mono font-bold text-headline">25-30s (CTA):</span> <span className="text-body">{reel.script.cta}</span></p>
                          </div>
                        </div>

                        {/* Shot List */}
                        <div className="space-y-4">
                          <h5 className="font-mono text-sm font-bold uppercase text-primary flex items-center"><Camera className="w-4 h-4 mr-2" /> Shot List</h5>
                          <div className="space-y-2 neu-inset p-4 rounded-xl text-sm">
                            {reel.shotList.map((shot: any, sIdx: number) => (
                              <div key={sIdx} className="flex space-x-3 border-b border-white/10 last:border-0 pb-2 last:pb-0">
                                <span className="font-mono font-bold text-headline whitespace-nowrap">{shot.time}</span>
                                <span className="text-body">{shot.visual}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Meta */}
                        <div className="space-y-4 md:col-span-2">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="neu-inset p-4 rounded-xl flex items-center space-x-3">
                              <Clock className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-mono text-xs font-bold uppercase text-muted">Best Time</p>
                                <p className="text-sm font-medium text-headline">{reel.bestTime}</p>
                              </div>
                            </div>
                            <div className="neu-inset p-4 rounded-xl flex items-center space-x-3 md:col-span-2">
                              <Hash className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-mono text-xs font-bold uppercase text-muted">Hashtags</p>
                                <p className="text-sm font-medium text-headline">{reel.hashtags}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                  {expandedReel === idx && (!reel.script || !reel.script.hook) && (
                     <div className="p-6 pt-0 border-t border-white/10 bg-white/5 flex flex-col items-center justify-center py-8 space-y-4">
                        <p className="text-body text-center">Full script and shot list available in the full product.</p>
                        <button onClick={scrollToWaitlist} className="neu-raised px-6 py-2 rounded-full text-sm font-bold text-primary hover:text-headline transition-colors">Join Waitlist to Unlock</button>
                     </div>
                  )}
                </div>
              ))}
            </div>

            {/* Post-Output CTA */}
            <div className="pt-8 flex flex-col items-center space-y-4 relative z-10">
              <p className="text-lg font-medium text-headline">Want this every day?</p>
              <button onClick={scrollToWaitlist} className="neu-raised bg-secondary/10 px-8 py-4 rounded-2xl text-lg font-bold text-secondary hover:bg-secondary hover:text-white transition-all duration-300">
                Join the Waitlist
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
