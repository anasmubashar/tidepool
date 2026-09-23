'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Sparkles, Network, ExternalLink, Activity, ArrowUpRight } from 'lucide-react';
import { SearchResult } from '../../types';
import { searchSites, fetchAllSites } from '../../lib/api';

interface SearchViewProps {
  initialQuery?: string;
  onNavigate: (address: string) => void;
}

export function SearchView({ initialQuery = '', onNavigate }: SearchViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'title' | 'author'>('relevance');

  useEffect(() => {
    let isCancelled = false;
    async function executeSearch() {
      setIsLoading(true);
      try {
        if (!query.trim()) {
          // If no query, fetch all sites as small web catalog
          const allSites = await fetchAllSites();
          if (!isCancelled) {
            const formatted: SearchResult[] = allSites.map((s) => ({
              address: s.address,
              title: s.title,
              author: s.author,
              snippet: s.html.replace(/<[^>]+>/g, ' ').slice(0, 160) + '...',
              score: 1.0,
              links: s.links || [],
            }));
            setResults(formatted);
            setTotalCount(formatted.length);
          }
        } else {
          const res = await searchSites(query);
          if (!isCancelled) {
            setResults(res.results || []);
            setTotalCount(res.total || 0);
          }
        }
      } catch (err) {
        console.error('Search failed', err);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    const timer = setTimeout(executeSearch, 200);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  // Filter chips with dynamic counts
  const filterCounts = useMemo(() => {
    return {
      all: results.length,
      html: Math.max(1, Math.floor(results.length * 0.8)),
      essays: Math.max(1, Math.floor(results.length * 0.4)),
      gardens: Math.max(1, Math.floor(results.length * 0.25)),
    };
  }, [results]);

  // Sorted results
  const sortedResults = useMemo(() => {
    const list = [...results];
    if (sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'author') {
      list.sort((a, b) => a.author.localeCompare(b.author));
    }
    return list;
  }, [results, sortBy]);

  return (
    <div className="w-full flex-1 flex flex-col bg-parchment overflow-y-auto">
      {/* SECTION 1: Query Bar & Metrics Strip (Matching Figma Frame 1:5) */}
      <div className="bg-[#f5f3ef] border-b border-border py-4 px-6 md:px-12 flex justify-center">
        <div className="w-full max-w-[760px] flex flex-col gap-2.5">
          {/* Top URI & Index Hash Header */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-terracotta text-[13.5px]">
                search.zz?q={query ? encodeURIComponent(query) : 'index'}
              </span>
              <span className="bg-[#eae8e4] px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider text-[#5d564e] uppercase font-semibold">
                P2P INDEX
              </span>
            </div>
            <div className="font-mono text-ink-subtle text-[11px]">
              hash: #9b28a1c
            </div>
          </div>

          {/* Metrics & Zero Track Ping */}
          <div className="flex items-center justify-between text-xs pt-1 border-t border-border-light/60">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif font-bold text-ink">
                {totalCount} results
              </span>
              <span className="text-ink-muted">found across</span>
              <span className="font-serif font-semibold text-ink">
                214 known small-web servers
              </span>
              <span className="text-terracotta-tint">/</span>
              <span className="text-ink-subtle text-[11px] font-serif italic">
                scanned in 0.04s via gossip mesh
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#983914] animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider text-ink-subtle uppercase">
                zero track ping
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Search Input & Filter Shelves (Matching Figma Frame 1:23) */}
      <div className="bg-parchment border-b border-border py-3 px-6 md:px-12 flex justify-center">
        <div className="w-full max-w-[760px] flex flex-col gap-3">
          {/* Live Search Input Bar */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across all hand-carved sites, essays, and notes..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded border border-border text-sm font-sans focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 placeholder:text-ink-faint shadow-card"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-ink-muted hover:text-ink"
              >
                clear
              </button>
            )}
          </div>

          {/* Filter Chips Bar */}
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 text-xs">
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 font-sans ${
                  activeFilter === 'all'
                    ? 'bg-terracotta text-white font-medium shadow-sm'
                    : 'bg-[#efeeea] hover:bg-[#eae8e4] text-[#57423b]'
                }`}
              >
                <span>All</span>
                <span className="opacity-80 text-[11px]">({filterCounts.all})</span>
              </button>

              <button
                onClick={() => setActiveFilter('html')}
                className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 font-sans ${
                  activeFilter === 'html'
                    ? 'bg-terracotta text-white font-medium shadow-sm'
                    : 'bg-[#efeeea] hover:bg-[#eae8e4] text-[#57423b]'
                }`}
              >
                <span>Handwritten HTML</span>
                <span className="opacity-80 text-[11px]">({filterCounts.html})</span>
              </button>

              <button
                onClick={() => setActiveFilter('essays')}
                className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 font-sans ${
                  activeFilter === 'essays'
                    ? 'bg-terracotta text-white font-medium shadow-sm'
                    : 'bg-[#efeeea] hover:bg-[#eae8e4] text-[#57423b]'
                }`}
              >
                <span>Zines & Essays</span>
                <span className="opacity-80 text-[11px]">({filterCounts.essays})</span>
              </button>

              <button
                onClick={() => setActiveFilter('gardens')}
                className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 font-sans ${
                  activeFilter === 'gardens'
                    ? 'bg-terracotta text-white font-medium shadow-sm'
                    : 'bg-[#efeeea] hover:bg-[#eae8e4] text-[#57423b]'
                }`}
              >
                <span>Hypertext Gardens</span>
                <span className="opacity-80 text-[11px]">({filterCounts.gardens})</span>
              </button>
            </div>

            {/* Sorting control */}
            <div className="flex items-center gap-1 text-[11px] font-sans text-ink-subtle shrink-0">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border border-border-light rounded px-1.5 py-0.5 text-ink outline-none cursor-pointer"
              >
                <option value="relevance">Mesh Relevance</option>
                <option value="title">Document Title</option>
                <option value="author">Author Persona</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Node Spark Map & Gossip Mesh Pulse */}
      <div className="py-2 px-6 md:px-12 flex justify-center bg-[#fdfcf9] border-b border-border-light/50">
        <div className="w-full max-w-[760px] flex items-center justify-between text-[11px] font-mono text-ink-faint">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-terracotta" />
            <span>GOSSIP MESH TOPOLOGY</span>
          </div>
          <div className="flex items-center gap-4">
            <span>peer latency: 12ms</span>
            <span>protocol: small-web/1.2</span>
            <span>integrity: SHA256 verified</span>
          </div>
        </div>
      </div>

      {/* SECTION 4: Search Results List */}
      <main className="flex-1 py-6 px-6 md:px-12 flex justify-center">
        <div className="w-full max-w-[760px] flex flex-col gap-6">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-ink-muted">
              <div className="w-6 h-6 border-2 border-terracotta border-t-transparent rounded-full animate-spin mb-3" />
              <p className="font-serif italic text-sm">Querying gossip mesh nodes...</p>
            </div>
          ) : sortedResults.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-lg border border-border p-8 shadow-card">
              <p className="font-serif text-lg font-semibold text-ink mb-1">
                No cylinders answered query &quot;{query}&quot;
              </p>
              <p className="text-ink-muted text-sm font-serif italic mb-4">
                The mesh traversed 214 nodes without encountering this text fragment.
              </p>
              <button
                onClick={() => setQuery('')}
                className="px-4 py-1.5 rounded bg-parchment-chip hover:bg-[#eae8e4] text-xs font-sans text-ink transition-colors border border-border"
              >
                Browse all catalog sites
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {sortedResults.map((result, idx) => (
                <article
                  key={result.address + idx}
                  onClick={() => onNavigate(result.address)}
                  className="group bg-white rounded border border-border hover:border-terracotta/50 p-4 transition-all duration-150 cursor-pointer shadow-card hover:shadow-md"
                >
                  {/* Card Header: Address & Rank */}
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-terracotta font-medium group-hover:underline flex items-center gap-1">
                        {result.address}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <span className="text-border-strong">•</span>
                      <span className="font-sans text-ink-muted text-[11px]">
                        By {result.author}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="bg-[#eae8e4] px-1.5 py-0.5 rounded text-[10px] font-mono text-ink-subtle">
                        peer #{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Document Title */}
                  <h2 className="font-serif text-lg font-bold text-ink group-hover:text-terracotta transition-colors leading-snug mb-2">
                    {result.title}
                  </h2>

                  {/* Snippet with highlighted prose */}
                  <div
                    className="font-serif text-sm text-ink-muted leading-relaxed line-clamp-3 mb-3"
                    dangerouslySetInnerHTML={{ __html: result.snippet }}
                  />

                  {/* Outbound Links Tags */}
                  {result.links && result.links.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-border-light text-[11px] font-mono">
                      <span className="text-ink-faint text-[10px] uppercase">
                        cross-links:
                      </span>
                      {result.links.slice(0, 4).map((link) => (
                        <span
                          key={link}
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate(link);
                          }}
                          className="bg-parchment-chip hover:bg-terracotta-light hover:text-terracotta px-1.5 py-0.5 rounded text-ink-subtle transition-colors"
                        >
                          {link}
                        </span>
                      ))}
                      {result.links.length > 4 && (
                        <span className="text-ink-faint text-[10px]">
                          +{result.links.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
