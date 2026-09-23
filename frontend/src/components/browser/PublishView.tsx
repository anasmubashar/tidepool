'use client';

import React, { useState } from 'react';
import { Feather, Eye, Code, ShieldCheck, ArrowRight, X, AlertCircle } from 'lucide-react';
import { Person } from '../../types';
import { publishSite } from '../../lib/api';
import { SandboxedViewport } from './SandboxedViewport';

interface PublishViewProps {
  initialAddress?: string;
  people: Person[];
  activePerson: Person | null;
  onPublished: (address: string) => void;
  onCancel: () => void;
}

const TEMPLATES = {
  essay: {
    title: 'Reflections on the Night Sky',
    address: 'reflections-on-the-night-sky.zz',
    html: `<h1>Reflections on the Night Sky</h1>
<p class="subtitle"><em>An observation from the southern ridge</em></p>

<p>Above the fog bank that settles into the valley at dusk, the sky turns the color of cold tea. The stars do not shine so much as pierce the thin atmosphere like needle holes in heavy parchment.</p>

<blockquote>
  "To read the sky without artificial glare is to remember that we inhabit a cylinder spinning in silence."
</blockquote>

<h2>Observations on the Constellations</h2>
<p>When the high-frequency networks are quieted, one can attend to slower rhythms. The constellation of Cygnus moves across the meridian at three hands per watch.</p>

<p>See also our companion journal at <a href="tidepool.zz">tidepool.zz</a> and the botanical archives at <a href="lichen.zz">lichen.zz</a>.</p>`,
  },
  garden: {
    title: 'Digital Folio & Seeds',
    address: 'folio-seeds.zz',
    html: `<h1>Digital Folio &amp; Seeds</h1>
<p>A modest collection of living hypertext notes and garden trails.</p>

<h2>Living Tendrils</h2>
<ul>
  <li><a href="deep-time.zz">deep-time.zz</a> — Notes on geology and slow memory</li>
  <li><a href="mechanical.zz">mechanical.zz</a> — Wooden clockworks and water wheels</li>
  <li><a href="clockwork.zz">clockwork.zz</a> — Escapements and escapement theory</li>
</ul>

<p>Broadcast via the Alder Basin mesh node.</p>`,
  },
  blank: {
    title: 'Untitled Document',
    address: 'untitled.zz',
    html: `<h1>Untitled Document</h1>
<p>Write your thoughts here in handcrafted HTML...</p>`,
  },
};

export function PublishView({
  initialAddress = '',
  people,
  activePerson,
  onPublished,
  onCancel,
}: PublishViewProps) {
  const [address, setAddress] = useState(
    initialAddress ? (initialAddress.endsWith('.zz') ? initialAddress : `${initialAddress}.zz`) : TEMPLATES.essay.address
  );
  const [title, setTitle] = useState(TEMPLATES.essay.title);
  const [author, setAuthor] = useState(activePerson?.name || (people[0]?.name ?? 'Anonymous'));
  const [html, setHtml] = useState(TEMPLATES.essay.html);
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Extract links count
  const detectedLinks = React.useMemo(() => {
    const matches = html.match(/href=["']([a-zA-Z0-9.-]+\.zz)["']/gi);
    if (!matches) return [];
    return Array.from(new Set(matches.map((m) => m.replace(/href=["']|["']/gi, ''))));
  }, [html]);

  function loadTemplate(key: keyof typeof TEMPLATES) {
    const tpl = TEMPLATES[key];
    setTitle(tpl.title);
    setAddress(tpl.address);
    setHtml(tpl.html);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    let cleanAddr = address.trim().toLowerCase();
    if (!cleanAddr.endsWith('.zz')) {
      cleanAddr = `${cleanAddr}.zz`;
    }

    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)*\.zz$/.test(cleanAddr)) {
      setErrorMsg('Address must contain only lowercase letters, numbers, hyphens, and end in .zz');
      return;
    }

    if (!title.trim()) {
      setErrorMsg('Document title is required');
      return;
    }

    if (!html.trim()) {
      setErrorMsg('Document HTML cannot be empty');
      return;
    }

    setIsSubmitting(true);
    try {
      await publishSite({
        address: cleanAddr,
        title: title.trim(),
        author: author.trim(),
        html: html.trim(),
      });
      onPublished(cleanAddr);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to publish to the Small Web');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-parchment overflow-y-auto">
      {/* Top Scholarly Letterpress Header (Matching Figma Frame 1:578) */}
      <div className="bg-[#f5f3ef] border-b border-border py-6 px-6 md:px-12 flex justify-center">
        <div className="w-full max-w-[840px] flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="bg-[#eae8e4] px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider text-[#5d564e] uppercase font-semibold">
                BROADCAST PROTOCOL
              </span>
              <span className="font-mono text-terracotta text-xs font-semibold">
                small-web://publisher
              </span>
            </div>
            <button
              onClick={onCancel}
              className="text-ink-muted hover:text-ink transition-colors p-1"
              title="Close publisher"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h1 className="font-serif text-3xl font-bold text-ink tracking-tight mt-1">
            Publish to the Small Web
          </h1>

          <p className="font-serif italic text-ink-muted text-sm max-w-[660px] leading-relaxed">
            Hand-carved HTML broadcasted across peer-to-peer gossip cylinders. No trackers.
            No corporate conduits. Strictly contained and preserved.
          </p>

          {/* Quick Templates Bar */}
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border-light text-xs font-sans">
            <span className="text-ink-faint text-[11px]">Templates:</span>
            <button
              type="button"
              onClick={() => loadTemplate('essay')}
              className="px-2 py-0.5 rounded bg-parchment hover:bg-[#eae8e4] border border-border text-ink-subtle text-xs transition-colors"
            >
              Editorial Essay
            </button>
            <button
              type="button"
              onClick={() => loadTemplate('garden')}
              className="px-2 py-0.5 rounded bg-parchment hover:bg-[#eae8e4] border border-border text-ink-subtle text-xs transition-colors"
            >
              Hypertext Garden
            </button>
            <button
              type="button"
              onClick={() => loadTemplate('blank')}
              className="px-2 py-0.5 rounded bg-parchment hover:bg-[#eae8e4] border border-border text-ink-subtle text-xs transition-colors"
            >
              Blank Slate
            </button>
          </div>
        </div>
      </div>

      {/* Main Publishing Form */}
      <main className="flex-1 py-6 px-6 md:px-12 flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-[840px] flex flex-col gap-5">
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-xs px-3.5 py-2.5 rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded border border-border shadow-card">
            {/* Target Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-ink-faint font-semibold">
                TARGET URI (.ZZ)
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="my-site.zz"
                className="font-mono text-xs text-terracotta bg-parchment px-2.5 py-2 rounded border border-border focus:outline-none focus:border-terracotta font-medium"
                required
              />
            </div>

            {/* Document Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-ink-faint font-semibold">
                DOCUMENT TITLE
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Reflections on the Night Sky"
                className="font-serif text-xs text-ink bg-parchment px-2.5 py-2 rounded border border-border focus:outline-none focus:border-terracotta font-semibold"
                required
              />
            </div>

            {/* Author Persona */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-ink-faint font-semibold">
                AUTHOR PERSONA
              </label>
              <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="font-sans text-xs text-ink bg-parchment px-2.5 py-2 rounded border border-border focus:outline-none focus:border-terracotta cursor-pointer"
              >
                {people.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
                <option value="Anonymous Author">Anonymous Author</option>
              </select>
            </div>
          </div>

          {/* Mode Switcher: Code Editor vs Sandboxed Preview */}
          <div className="flex items-center justify-between border-b border-border pb-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode('editor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-sans transition-colors ${
                  viewMode === 'editor'
                    ? 'bg-terracotta text-white font-medium shadow-sm'
                    : 'bg-[#efeeea] text-ink-subtle hover:bg-[#eae8e4]'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>HTML Editor</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-sans transition-colors ${
                  viewMode === 'preview'
                    ? 'bg-terracotta text-white font-medium shadow-sm'
                    : 'bg-[#efeeea] text-ink-subtle hover:bg-[#eae8e4]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Sandboxed Preview</span>
              </button>
            </div>

            {/* Document stats */}
            <div className="flex items-center gap-3 text-[11px] font-mono text-ink-faint">
              <span>{new Blob([html]).size} bytes</span>
              <span>•</span>
              <span>{detectedLinks.length} outbound .zz links</span>
            </div>
          </div>

          {/* Editor or Preview Pane */}
          {viewMode === 'editor' ? (
            <div className="flex flex-col bg-white rounded border border-border shadow-card overflow-hidden">
              <div className="bg-[#f5f3ef] px-3 py-1.5 border-b border-border flex items-center justify-between text-[11px] font-mono text-ink-faint">
                <span>HAND-CARVED HTML SOURCE</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Containment sandbox verified
                </span>
              </div>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                rows={16}
                className="w-full p-4 font-mono text-xs leading-relaxed text-ink bg-transparent focus:outline-none resize-y min-h-[300px]"
                spellCheck={false}
                required
              />
            </div>
          ) : (
            <div className="h-[460px] rounded border border-border overflow-hidden bg-white shadow-card">
              <SandboxedViewport
                html={html}
                title={title || 'Preview'}
                address={address || 'preview.zz'}
                onNavigate={() => {}}
              />
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-ink-subtle">
              <ShieldCheck className="w-4 h-4 text-terracotta" />
              <span>Strict containment sandbox applies upon broadcast.</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded bg-parchment hover:bg-parchment-chip border border-border text-xs font-sans text-ink transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2 rounded bg-terracotta hover:bg-terracotta-hover text-white text-xs font-sans font-medium transition-colors shadow-sm disabled:opacity-50"
              >
                <Feather className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Broadcasting...' : 'Broadcast to Small Web'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
