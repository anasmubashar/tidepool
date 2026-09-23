'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

interface SandboxedViewportProps {
  html: string;
  title: string;
  address: string;
  savedScrollY?: number;
  onNavigate: (address: string) => void;
  onScrollChange?: (scrollY: number) => void;
}

export function SandboxedViewport({
  html,
  title,
  address,
  savedScrollY = 0,
  onNavigate,
  onScrollChange,
}: SandboxedViewportProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scrollRef = useRef(savedScrollY);
  scrollRef.current = savedScrollY;

  // Build sandboxed HTML document with injected communication bridge & base styles
  const sandboxedSrcDoc = useMemo(() => {
    // If the HTML already has <html> or <body> tags, inject bridge into <head> or at start
    const bridgeScript = `
      <script>
        (function() {
          // Intercept all internal anchor clicks
          document.addEventListener('click', function(e) {
            var target = e.target;
            while (target && target.tagName !== 'A') {
              target = target.parentElement;
            }
            if (target && target.tagName === 'A') {
              var href = target.getAttribute('href');
              if (href) {
                e.preventDefault();
                window.parent.postMessage({ type: 'SMALL_WEB_NAVIGATE', address: href }, '*');
              }
            }
          }, true);

          // Track scroll events and relay to parent
          var scrollDebounce = null;
          window.addEventListener('scroll', function() {
            if (scrollDebounce) clearTimeout(scrollDebounce);
            scrollDebounce = setTimeout(function() {
              window.parent.postMessage({ type: 'SMALL_WEB_SCROLL', scrollY: window.scrollY }, '*');
            }, 80);
          }, { passive: true });

          // Listen for scroll restore requests from parent
          window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'SMALL_WEB_RESTORE_SCROLL') {
              var targetY = Number(event.data.scrollY) || 0;
              window.scrollTo(0, targetY);
            }
          });

          // Inform parent when DOM is ready
          function signalReady() {
            window.parent.postMessage({ type: 'SMALL_WEB_READY' }, '*');
          }
          if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(signalReady, 20);
          } else {
            window.addEventListener('DOMContentLoaded', signalReady);
            window.addEventListener('load', signalReady);
          }
        })();
      </script>
    `;

    const baseCss = `
      <style>
        :root {
          color-scheme: light;
        }
        body {
          margin: 0;
          padding: 2.5rem 2rem 5rem 2rem;
          font-family: 'Liberation Serif', Georgia, 'Times New Roman', serif;
          font-size: 1.125rem;
          line-height: 1.75;
          color: #1b1c1a;
          background-color: #fbf9f5;
          max-width: 760px;
          margin-left: auto;
          margin-right: auto;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Liberation Serif', Georgia, serif;
          font-weight: 600;
          color: #1b1c1a;
          line-height: 1.25;
          margin-top: 2em;
          margin-bottom: 0.5em;
        }
        h1 {
          font-size: 2.25rem;
          letter-spacing: -0.015em;
        }
        h2 {
          font-size: 1.6rem;
          border-bottom: 1px solid #ded9ce;
          padding-bottom: 0.4em;
        }
        p {
          margin-top: 1em;
          margin-bottom: 1em;
        }
        a {
          color: #b8502a;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
          transition: color 0.15s ease;
        }
        a:hover {
          color: #983914;
        }
        blockquote {
          margin: 1.5em 0;
          padding: 0.75em 1.25em;
          border-left: 3px solid #b8502a;
          background: #f5f3ef;
          color: #5d564e;
          font-style: italic;
        }
        code, pre {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9em;
          background: #efeeea;
          border-radius: 3px;
        }
        code {
          padding: 0.15em 0.35em;
        }
        pre {
          padding: 1em;
          overflow-x: auto;
          line-height: 1.5;
        }
        hr {
          border: 0;
          border-top: 1px solid #ded9ce;
          margin: 2.5em 0;
        }
        img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
        }
      </style>
    `;

    // If html already contains complete document structure
    if (html.includes('<html') || html.includes('<body')) {
      if (html.includes('<head>')) {
        return html.replace('<head>', `<head>${baseCss}${bridgeScript}`);
      }
      return `${baseCss}${bridgeScript}${html}`;
    }

    // Wrap bare HTML fragment
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  ${baseCss}
  ${bridgeScript}
</head>
<body>
  ${html}
</body>
</html>`;
  }, [html, title]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // Validate that message is from our iframe
      if (event.source !== iframeRef.current?.contentWindow) return;

      const data = event.data;
      if (!data || typeof data !== 'object') return;

      if (data.type === 'SMALL_WEB_NAVIGATE' && data.address) {
        onNavigate(data.address);
      } else if (data.type === 'SMALL_WEB_SCROLL' && typeof data.scrollY === 'number') {
        onScrollChange?.(data.scrollY);
      } else if (data.type === 'SMALL_WEB_READY') {
        // Restore scroll position
        const targetY = scrollRef.current;
        if (targetY > 0 && iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            { type: 'SMALL_WEB_RESTORE_SCROLL', scrollY: targetY },
            '*'
          );
        }
      }
    }

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onNavigate, onScrollChange]);

  return (
    <div className="relative w-full h-full flex flex-col bg-parchment overflow-hidden">
      {/* Strict Sandboxed Iframe:
          sandbox="allow-scripts" ensures scripts can run (for basic animations/math)
          while strictly omitting "allow-same-origin" (prevents parent DOM access, cookie theft)
          and strictly omitting "allow-top-navigation" (prevents hijacking top window).
      */}
      <iframe
        ref={iframeRef}
        srcDoc={sandboxedSrcDoc}
        title={title}
        sandbox="allow-scripts"
        className="w-full h-full border-none flex-1 bg-parchment"
        tabIndex={0}
      />

      {/* Security sandbox telemetry footer indicator */}
      <div className="h-7 border-t border-border-light bg-parchment-dark/80 px-4 flex items-center justify-between text-[11px] font-sans text-ink-subtle select-none">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
          <span className="font-medium tracking-wide">SANDBOX ACTIVE</span>
          <span className="text-border-strong">•</span>
          <span>Zero Telemetry</span>
          <span className="text-border-strong">•</span>
          <span>Strict DOM Isolation</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-3 h-3 text-ink-faint" />
          <span className="font-mono text-[10px] text-ink-muted">
            origin: small-web://{address}
          </span>
        </div>
      </div>
    </div>
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
