'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { History, X, Search, Clock, ArrowUpRight, User, AlertCircle, Compass } from 'lucide-react';
import { Person, Visit } from '../../types';
import { fetchVisits } from '../../lib/api';

interface HistoryDrawerProps {
  isOpen: boolean;
  activePerson: Person | null;
  people: Person[];
  onClose: () => void;
  onNavigate: (address: string) => void;
  onSelectPerson: (person: Person) => void;
}

export function HistoryDrawer({
  isOpen,
  activePerson,
  people,
  onClose,
  onNavigate,
  onSelectPerson,
}: HistoryDrawerProps) {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedPersonId, setSelectedPersonId] = useState<string>(activePerson?.id || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activePerson) {
      setSelectedPersonId(activePerson.id);
    }
  }, [activePerson]);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    async function loadVisits() {
      setIsLoading(true);
      try {
        const data = await fetchVisits(selectedPersonId || undefined);
        if (isMounted) {
          setVisits(data);
        }
      } catch (err) {
        console.error('Failed to load visits', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadVisits();
    return () => {
      isMounted = false;
    };
  }, [isOpen, selectedPersonId]);

  const filteredVisits = useMemo(() => {
    if (!filterQuery.trim()) return visits;
    const q = filterQuery.toLowerCase();
    return visits.filter(
      (v) =>
        v.address.toLowerCase().includes(q) ||
        (v.title && v.title.toLowerCase().includes(q))
    );
  }, [visits, filterQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-[1px] animate-in fade-in duration-150">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over panel */}
      <aside className="relative w-full max-w-md h-full bg-[#fbf9f5] border-l border-border shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 bg-[#f5f3ef] border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-terracotta" />
            <h2 className="font-serif font-bold text-ink text-base">
              Browsing History
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-parchment text-ink-muted hover:text-ink transition-colors"
            title="Close history"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Persona Filter Bar */}
        <div className="p-3 border-b border-border-light bg-[#fdfcf9] flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-wider">
              PERSONA TIMELINE
            </span>
            <span className="font-serif italic text-ink-muted text-[11px]">
              {filteredVisits.length} visits recorded
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedPersonId('')}
              className={`px-2.5 py-1 rounded text-xs transition-colors shrink-0 font-sans ${
                !selectedPersonId
                  ? 'bg-terracotta text-white font-medium shadow-sm'
                  : 'bg-[#efeeea] hover:bg-[#eae8e4] text-[#57423b]'
              }`}
            >
              All Mesh
            </button>
            {people.map((p) => {
              const isSelected = selectedPersonId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPersonId(p.id);
                    onSelectPerson(p);
                  }}
                  className={`px-2.5 py-1 rounded text-xs transition-colors shrink-0 font-sans flex items-center gap-1 ${
                    isSelected
                      ? 'bg-terracotta text-white font-medium shadow-sm'
                      : 'bg-[#efeeea] hover:bg-[#eae8e4] text-[#57423b]'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-white/30 flex items-center justify-center text-[9px] font-bold">
                    {p.name[0]}
                  </span>
                  <span>{p.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Quick search input */}
          <div className="relative mt-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-faint" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter visits by address or title..."
              className="w-full pl-8 pr-3 py-1.5 bg-white rounded border border-border text-xs font-sans focus:outline-none focus:border-terracotta"
            />
          </div>
        </div>

        {/* Visits Timeline List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-ink-muted">
              <div className="w-5 h-5 border-2 border-terracotta border-t-transparent rounded-full animate-spin mb-2" />
              <p className="font-serif italic text-xs">Retrieving trail log...</p>
            </div>
          ) : filteredVisits.length === 0 ? (
            <div className="py-12 text-center text-ink-muted">
              <Compass className="w-8 h-8 text-ink-faint/60 mx-auto mb-2" />
              <p className="font-serif italic text-sm">No recorded visits found.</p>
              <p className="text-xs font-sans text-ink-faint mt-1">
                Explore the Small Web to lay down your trail.
              </p>
            </div>
          ) : (
            filteredVisits.map((visit, index) => {
              const is404 = visit.status === 404;
              return (
                <div
                  key={visit._id || `${visit.address}-${visit.visitedAt}-${index}`}
                  onClick={() => {
                    onNavigate(visit.address);
                    onClose();
                  }}
                  className="group bg-white rounded border border-border hover:border-terracotta/50 p-3 transition-all cursor-pointer shadow-card hover:shadow-md"
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono text-terracotta font-medium group-hover:underline flex items-center gap-1">
                      {visit.address}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="font-mono text-ink-faint text-[10px] flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {formatTime(visit.visitedAt)}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xs text-ink group-hover:text-terracotta transition-colors line-clamp-1 mb-1">
                    {visit.title || visit.address}
                  </h3>

                  <div className="flex items-center justify-between text-[10px] font-mono text-ink-faint pt-1 border-t border-border-light">
                    <span className="truncate max-w-[180px]">
                      {visit.referrer ? `via ${visit.referrer}` : 'direct navigation'}
                    </span>
                    {is404 ? (
                      <span className="text-terracotta font-medium flex items-center gap-0.5">
                        <AlertCircle className="w-2.5 h-2.5" />
                        404 Nowhere
                      </span>
                    ) : (
                      <span className="text-emerald-700">200 OK</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-[#f5f3ef] border-t border-border flex items-center justify-between text-[11px] font-mono text-ink-muted">
          <span>JUMPABLE SESSION LOG</span>
          <span>Click any entry to jump</span>
        </div>
      </aside>
    </div>
  );
}

function formatTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return 'recently';
  }
}
