'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Search,
  History,
  Feather,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  User,
} from 'lucide-react';
import { Person } from '../../types';

interface BrowserChromeProps {
  currentAddress: string;
  canGoBack: boolean;
  canGoForward: boolean;
  isLoading: boolean;
  status: number; // 200, 404, etc.
  people: Person[];
  activePerson: Person | null;
  onNavigate: (address: string) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onReload: () => void;
  onHome: () => void;
  onOpenSearch: () => void;
  onOpenHistory: () => void;
  onOpenPublish: () => void;
  onSelectPerson: (person: Person) => void;
}

export function BrowserChrome({
  currentAddress,
  canGoBack,
  canGoForward,
  isLoading,
  status,
  people,
  activePerson,
  onNavigate,
  onGoBack,
  onGoForward,
  onReload,
  onHome,
  onOpenSearch,
  onOpenHistory,
  onOpenPublish,
  onSelectPerson,
}: BrowserChromeProps) {
  const [addressInput, setAddressInput] = useState(currentAddress);
  const [personMenuOpen, setPersonMenuOpen] = useState(false);

  // Sync addressInput when currentAddress changes from external navigation
  useEffect(() => {
    setAddressInput(currentAddress);
  }, [currentAddress]);

  function handleAddressSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (addressInput.trim()) {
      onNavigate(addressInput.trim());
    }
  }

  return (
    <header className="w-full bg-[#f5f3ef] border-b border-border text-ink select-none sticky top-0 z-40 transition-colors">
      {/* Top window stripe / Title & Protocol strip */}
      <div className="h-8 px-4 flex items-center justify-between border-b border-border/60 text-[11px] font-sans text-ink-subtle">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b8502a]/70 hover:bg-[#b8502a] transition-colors inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#d3dbd8] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#d3dbd8] inline-block" />
          </div>
          <span className="font-serif italic font-medium tracking-wide text-ink text-xs">
            Tidepool Browser
          </span>
          <span className="text-border-strong">•</span>
          <span className="font-mono text-[10px] text-ink-faint">
            p2p-mesh: connected (214 cylinders)
          </span>
        </div>

        {/* Person Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setPersonMenuOpen(!personMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-parchment hover:bg-parchment-chip transition-colors border border-border text-ink text-xs font-sans"
            title="Switch browsing person"
            aria-expanded={personMenuOpen}
          >
            <div className="w-4 h-4 rounded-full bg-terracotta text-white flex items-center justify-center text-[9px] font-bold">
              {activePerson?.name ? activePerson.name[0] : 'U'}
            </div>
            <span className="font-medium text-ink-subtle">Browsing as:</span>
            <span className="font-semibold text-ink">
              {activePerson ? activePerson.name : 'Select Persona'}
            </span>
            <ChevronDown className="w-3 h-3 text-ink-muted ml-0.5" />
          </button>

          {personMenuOpen && (
            <div className="absolute right-0 mt-1 w-64 bg-card rounded-md shadow-dropdown border border-border py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
              <div className="px-3 py-1.5 border-b border-border-light text-[10px] uppercase font-mono tracking-wider text-ink-faint">
                Select Active Persona
              </div>
              {people.map((person) => {
                const isSelected = activePerson?.id === person.id;
                return (
                  <button
                    key={person.id}
                    onClick={() => {
                      onSelectPerson(person);
                      setPersonMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-parchment transition-colors ${
                      isSelected ? 'bg-terracotta-light/60 font-medium' : ''
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-terracotta/20 text-terracotta font-serif font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {person.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-ink font-sans flex items-center justify-between">
                        <span>{person.name}</span>
                        {isSelected && (
                          <span className="text-[10px] text-terracotta font-mono">active</span>
                        )}
                      </div>
                      <div className="text-[11px] text-ink-muted truncate font-serif italic">
                        {person.bio}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Omnibar & Navigation Controls Bar */}
      <div className="px-4 py-2 flex items-center gap-2">
        {/* Navigation Action Buttons: Back, Forward, Reload, Home */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onGoBack}
            disabled={!canGoBack}
            className={`p-1.5 rounded transition-colors ${
              canGoBack
                ? 'hover:bg-parchment-chip text-ink active:scale-95'
                : 'text-ink-faint/40 cursor-not-allowed'
            }`}
            title="Go back (Alt+Left)"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={onGoForward}
            disabled={!canGoForward}
            className={`p-1.5 rounded transition-colors ${
              canGoForward
                ? 'hover:bg-parchment-chip text-ink active:scale-95'
                : 'text-ink-faint/40 cursor-not-allowed'
            }`}
            title="Go forward (Alt+Right)"
            aria-label="Forward"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onReload}
            className={`p-1.5 rounded hover:bg-parchment-chip text-ink active:scale-95 transition-transform ${
              isLoading ? 'animate-spin text-terracotta' : ''
            }`}
            title="Reload site"
            aria-label="Reload"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={onHome}
            className="p-1.5 rounded hover:bg-parchment-chip text-ink active:scale-95 transition-colors"
            title="Home (tidepool.zz)"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Omnibar / Address Form */}
        <form
          onSubmit={handleAddressSubmit}
          className="flex-1 flex items-center bg-parchment rounded border border-border shadow-letterpress focus-within:border-terracotta focus-within:ring-1 focus-within:ring-terracotta/30 transition-all h-9 px-2 gap-2"
        >
          {/* Protocol Badge */}
          <div className="bg-[#eae8e4] px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold text-ink-subtle uppercase shrink-0">
            P2P://
          </div>

          {/* Address input */}
          <input
            type="text"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            placeholder="Type a .zz address or search..."
            className="w-full bg-transparent font-mono text-xs text-ink outline-none tracking-tight placeholder:text-ink-faint"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
          />

          {/* Status Badge */}
          <div className="shrink-0 flex items-center gap-1.5 pr-1">
            {status === 404 ? (
              <span className="flex items-center gap-1 text-[11px] font-mono text-terracotta font-medium bg-terracotta-light px-1.5 py-0.5 rounded">
                <AlertCircle className="w-3 h-3" />
                404 Nowhere
              </span>
            ) : status === 200 ? (
              <span className="flex items-center gap-1 text-[10px] font-mono text-ink-subtle bg-parchment-chip px-1.5 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                200 OK
              </span>
            ) : null}
          </div>
        </form>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-parchment hover:bg-parchment-chip border border-border text-xs font-sans text-ink transition-colors active:scale-95"
            title="Search the Small Web (search.zz)"
          >
            <Search className="w-3.5 h-3.5 text-terracotta" />
            <span className="hidden sm:inline">Search</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-parchment hover:bg-parchment-chip border border-border text-xs font-sans text-ink transition-colors active:scale-95"
            title="Browse person history"
          >
            <History className="w-3.5 h-3.5 text-ink-subtle" />
            <span className="hidden sm:inline">History</span>
          </button>

          <button
            onClick={onOpenPublish}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-terracotta hover:bg-terracotta-hover text-white text-xs font-sans font-medium transition-colors shadow-sm active:scale-95"
            title="Publish new handcrafted site"
          >
            <Feather className="w-3.5 h-3.5" />
            <span>Publish</span>
          </button>
        </div>
      </div>
    </header>
  );
}
