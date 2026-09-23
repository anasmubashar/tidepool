'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useBrowserNavigation } from '../hooks/useBrowserNavigation';
import { BrowserChrome } from '../components/browser/BrowserChrome';
import { SandboxedViewport } from '../components/browser/SandboxedViewport';
import { SearchView } from '../components/browser/SearchView';
import { PublishView } from '../components/browser/PublishView';
import { NowhereView } from '../components/browser/NowhereView';
import { HistoryDrawer } from '../components/browser/HistoryDrawer';
import { Person, Site } from '../types';
import { fetchPeople, fetchSite, recordVisit } from '../lib/api';

export default function SmallWebBrowserPage() {
  const {
    entries,
    currentIndex,
    currentEntry,
    canGoBack,
    canGoForward,
    navigate,
    goBack,
    goForward,
    recordScrollPosition,
    updateCurrentTitle,
    updateCurrentStatus,
  } = useBrowserNavigation({
    initialAddress: 'tidepool.zz',
    initialTitle: 'Tidepool — The Small Web',
  });

  const [people, setPeople] = useState<Person[]>([]);
  const [activePerson, setActivePerson] = useState<Person | null>(null);
  const [currentSite, setCurrentSite] = useState<Site | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [publishAddressPrefill, setPublishAddressPrefill] = useState<string>('');

  const previousAddressRef = useRef<string | null>(null);

  // Load available personas
  useEffect(() => {
    async function initPeople() {
      const data = await fetchPeople();
      if (data && data.length > 0) {
        setPeople(data);
        // Default to Elena Rostova or first persona
        const elena = data.find((p) => p.name.includes('Elena'));
        setActivePerson(elena || data[0]);
      }
    }
    initPeople();
  }, []);

  const currentAddress = currentEntry?.address || 'tidepool.zz';

  // Determine view mode
  const isSearchView =
    currentAddress === 'search.zz' || currentAddress.startsWith('search.zz?');
  const searchQuery = isSearchView
    ? new URLSearchParams(currentAddress.split('?')[1] || '').get('q') || ''
    : '';

  // Load site or handle special views whenever address changes
  useEffect(() => {
    let isCancelled = false;

    async function loadAddress() {
      setIsLoading(true);

      // Check if Search Canvas view
      if (isSearchView) {
        updateCurrentTitle('Search The Small Web');
        updateCurrentStatus(200);
        setCurrentSite(null);
        setIsLoading(false);
        return;
      }

      // Check if Publisher view
      if (currentAddress === 'publish.zz') {
        setIsPublishing(true);
        updateCurrentTitle('Publish to the Small Web');
        updateCurrentStatus(200);
        setCurrentSite(null);
        setIsLoading(false);
        return;
      }

      // Fetch site from backend
      try {
        const site = await fetchSite(currentAddress);
        if (isCancelled) return;

        if (site) {
          setCurrentSite(site);
          updateCurrentTitle(site.title);
          updateCurrentStatus(200);

          // Record visit in background if persona is active
          if (activePerson) {
            recordVisit({
              personId: activePerson.id,
              address: currentAddress,
              title: site.title,
              status: 200,
              referrer: previousAddressRef.current || undefined,
            });
          }
        } else {
          // 404 Nowhere
          setCurrentSite(null);
          updateCurrentTitle(`Nowhere (${currentAddress})`);
          updateCurrentStatus(404);

          if (activePerson) {
            recordVisit({
              personId: activePerson.id,
              address: currentAddress,
              title: `Nowhere (${currentAddress})`,
              status: 404,
              referrer: previousAddressRef.current || undefined,
            });
          }
        }
      } catch (err) {
        if (!isCancelled) {
          setCurrentSite(null);
          updateCurrentTitle(`Nowhere (${currentAddress})`);
          updateCurrentStatus(404);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
          previousAddressRef.current = currentAddress;
        }
      }
    }

    loadAddress();

    return () => {
      isCancelled = true;
    };
  }, [currentAddress, isSearchView, activePerson, updateCurrentTitle, updateCurrentStatus]);

  // Handle navigation from inside viewport links (e.g. <a href="clockwork.zz">)
  const handleNavigate = useCallback(
    (targetAddress: string) => {
      setIsPublishing(false);
      navigate(targetAddress);
    },
    [navigate]
  );

  // Handle reload
  const handleReload = useCallback(() => {
    setIsLoading(true);
    fetchSite(currentAddress)
      .then((site) => {
        if (site) {
          setCurrentSite(site);
          updateCurrentStatus(200);
        } else {
          setCurrentSite(null);
          updateCurrentStatus(404);
        }
      })
      .finally(() => setIsLoading(false));
  }, [currentAddress, updateCurrentStatus]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // If typing in input/textarea, ignore
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.altKey && e.key === 'ArrowLeft' && canGoBack) {
        e.preventDefault();
        goBack();
      } else if (e.altKey && e.key === 'ArrowRight' && canGoForward) {
        e.preventDefault();
        goForward();
      } else if (e.key === 'Escape') {
        setIsHistoryOpen(false);
        setIsPublishing(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGoBack, canGoForward, goBack, goForward]);

  return (
    <div className="flex flex-col h-screen w-screen bg-parchment text-ink overflow-hidden">
      {/* Top Browser Chrome */}
      <BrowserChrome
        currentAddress={isPublishing ? 'publish.zz' : currentAddress}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        isLoading={isLoading}
        status={currentEntry?.status ?? 200}
        people={people}
        activePerson={activePerson}
        onNavigate={handleNavigate}
        onGoBack={() => {
          setIsPublishing(false);
          goBack();
        }}
        onGoForward={() => {
          setIsPublishing(false);
          goForward();
        }}
        onReload={handleReload}
        onHome={() => handleNavigate('tidepool.zz')}
        onOpenSearch={() => handleNavigate('search.zz')}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenPublish={() => {
          setPublishAddressPrefill('');
          setIsPublishing(true);
        }}
        onSelectPerson={(person) => setActivePerson(person)}
      />

      {/* Main Viewport Stage */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-parchment">
        {/* Loading shimmer indicator */}
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-border-light z-30 overflow-hidden">
            <div className="h-full bg-terracotta w-1/3 animate-pulse" />
          </div>
        )}

        {isPublishing ? (
          <PublishView
            initialAddress={publishAddressPrefill}
            people={people}
            activePerson={activePerson}
            onPublished={(publishedAddress) => {
              setIsPublishing(false);
              handleNavigate(publishedAddress);
            }}
            onCancel={() => setIsPublishing(false)}
          />
        ) : isSearchView ? (
          <SearchView
            initialQuery={searchQuery}
            onNavigate={handleNavigate}
          />
        ) : currentSite ? (
          <SandboxedViewport
            html={currentSite.html}
            title={currentSite.title}
            address={currentSite.address}
            savedScrollY={currentEntry?.scrollY ?? 0}
            onNavigate={handleNavigate}
            onScrollChange={(scrollY) => recordScrollPosition(scrollY)}
          />
        ) : (
          <NowhereView
            address={currentAddress}
            onGoBack={goBack}
            onPublishHere={(addr) => {
              setPublishAddressPrefill(addr);
              setIsPublishing(true);
            }}
            onOpenSearch={() => handleNavigate('search.zz')}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Per-Person Browsing History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        activePerson={activePerson}
        people={people}
        onClose={() => setIsHistoryOpen(false)}
        onNavigate={handleNavigate}
        onSelectPerson={(person) => setActivePerson(person)}
      />
    </div>
  );
}
