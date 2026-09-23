'use client';

import React from 'react';
import { ArrowLeft, Feather, Search, AlertCircle, Compass } from 'lucide-react';

interface NowhereViewProps {
  address: string;
  onGoBack: () => void;
  onPublishHere: (address: string) => void;
  onOpenSearch: () => void;
  onNavigate: (address: string) => void;
}

export function NowhereView({
  address,
  onGoBack,
  onPublishHere,
  onOpenSearch,
  onNavigate,
}: NowhereViewProps) {
  return (
    <div className="w-full flex-1 flex flex-col bg-parchment overflow-y-auto">
      {/* Synthetic Protocol Bar Extension (Matching Figma Frame 1:1578) */}
      <div className="bg-[#f5f3ef] border-b border-border py-2.5 px-6 md:px-12 flex justify-center">
        <div className="w-full max-w-[672px] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-red-100 text-red-800 border border-red-200 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
              DEAD DESTINATION
            </span>
            <span className="font-semibold text-terracotta">{address}</span>
            <span className="text-ink-faint text-[10px]">
              (0 cylinders responding)
            </span>
          </div>

          <div className="flex items-center gap-2 text-ink-subtle text-[11px]">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            <span>MESH STATUS: 404</span>
          </div>
        </div>
      </div>

      {/* Main Postcard Stage */}
      <main className="flex-1 py-10 px-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-[620px] bg-white rounded-lg border border-border shadow-card p-8 md:p-10 flex flex-col items-center text-center relative overflow-hidden">
          {/* Top Decorative Philatelic Postage Stamp (Matching Figma Frame) */}
          <div className="absolute top-6 right-6 border-2 border-dashed border-border-medium rounded p-2 bg-parchment flex flex-col items-center justify-center w-24 h-24 select-none rotate-2 shadow-sm">
            <div className="w-full border border-ink/20 rounded p-1 flex flex-col items-center">
              <span className="font-mono text-[8px] uppercase tracking-widest text-ink-faint">
                GOSSIP MESH
              </span>
              <span className="font-serif font-black text-terracotta text-lg leading-tight">
                404
              </span>
              <span className="font-mono text-[7px] text-ink-subtle uppercase">
                UNREACHABLE
              </span>
            </div>
            <span className="text-[6px] font-mono text-ink-faint mt-1">
              #ALDER-POSTMARK
            </span>
          </div>

          {/* Deliberate Minimal Ink Illustration: Lone Lighthouse in Fog */}
          <div className="my-4">
            <svg
              className="w-32 h-32 text-ink-subtle mx-auto"
              viewBox="0 0 120 120"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Sea horizon & subtle ripples */}
              <line x1="10" y1="95" x2="110" y2="95" strokeDasharray="3 3" />
              <line x1="20" y1="102" x2="100" y2="102" strokeDasharray="2 4" stroke="#ded9ce" />
              <line x1="35" y1="108" x2="85" y2="108" strokeDasharray="1 3" stroke="#eae8e4" />

              {/* Rocky islet */}
              <path d="M38 95 C 44 88, 52 87, 56 87 C 62 87, 70 89, 78 95 Z" fill="#f5f3ef" stroke="#ded9ce" />

              {/* Lighthouse tower */}
              <path d="M50 87 L 53 50 L 63 50 L 66 87 Z" stroke="#5d564e" fill="#fff" />
              <line x1="51.5" y1="68" x2="64.5" y2="68" stroke="#ded9ce" />
              <line x1="52.5" y1="78" x2="65.5" y2="78" stroke="#ded9ce" />

              {/* Lighthouse lantern room */}
              <rect x="52" y="42" width="12" height="8" stroke="#5d564e" fill="#fbf9f5" />
              {/* Dome */}
              <path d="M52 42 Q 58 35 64 42" stroke="#5d564e" fill="#b8502a" />
              <line x1="58" y1="35" x2="58" y2="31" stroke="#5d564e" />

              {/* Silent light beams through fog */}
              <line x1="48" y1="46" x2="15" y2="35" stroke="#ded9ce" strokeDasharray="2 3" />
              <line x1="68" y1="46" x2="105" y2="35" stroke="#ded9ce" strokeDasharray="2 3" />

              {/* Gulls drifting in distance */}
              <path d="M22 25 Q 25 21 28 25 Q 31 21 34 25" stroke="#8c857b" />
              <path d="M78 20 Q 80 17 82 20 Q 84 17 86 20" stroke="#b8b2a5" />
            </svg>
          </div>

          {/* Poetic Headline */}
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-ink mt-2 mb-3">
            You Have Reached Nowhere
          </h1>

          {/* Contemplative Copy */}
          <p className="font-serif text-sm md:text-base text-ink-muted leading-relaxed max-w-[460px] mb-6">
            The gossip mesh traversed 214 peer cylinders across the low-wattage web,
            but found no record responding at{' '}
            <span className="font-mono text-terracotta font-semibold">{address}</span>.
            This plot of hypertext is currently unclaimed and silent.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onPublishHere(address)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-terracotta hover:bg-terracotta-hover text-white text-xs font-sans font-medium transition-colors shadow-sm active:scale-95"
            >
              <Feather className="w-3.5 h-3.5" />
              <span>Claim &amp; Publish Here</span>
            </button>

            <button
              onClick={onGoBack}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-parchment hover:bg-parchment-chip border border-border text-xs font-sans text-ink transition-colors active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Safety</span>
            </button>

            <button
              onClick={onOpenSearch}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-parchment hover:bg-parchment-chip border border-border text-xs font-sans text-ink transition-colors active:scale-95"
            >
              <Search className="w-3.5 h-3.5 text-ink-subtle" />
              <span>Search Mesh</span>
            </button>
          </div>

          {/* Supplementary Minimalist Indie-Web Ring Footer Anchor */}
          <div className="mt-10 pt-6 border-t border-border-light w-full flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-[11px] font-serif italic text-ink-faint">
              <Compass className="w-3 h-3 text-terracotta" />
              <span>Or seek passage to existing stations on the Small Web:</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <button
                onClick={() => onNavigate('tidepool.zz')}
                className="text-terracotta hover:underline"
              >
                tidepool.zz
              </button>
              <span className="text-border-strong">•</span>
              <button
                onClick={() => onNavigate('lichen.zz')}
                className="text-terracotta hover:underline"
              >
                lichen.zz
              </button>
              <span className="text-border-strong">•</span>
              <button
                onClick={() => onNavigate('deep-time.zz')}
                className="text-terracotta hover:underline"
              >
                deep-time.zz
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
