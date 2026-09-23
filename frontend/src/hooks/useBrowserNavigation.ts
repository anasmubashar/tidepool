import { useState, useCallback, useRef } from 'react';
import { HistoryEntry } from '../types';

export function normalizeAddress(raw: string): string {
  let addr = raw.trim().toLowerCase();
  // Strip protocol prefixes
  addr = addr.replace(/^(small-web:\/\/|https?:\/\/)/i, '');
  // Strip leading/trailing slashes
  addr = addr.replace(/^\/+|\/+$/g, '');
  return addr;
}

export interface UseBrowserNavigationOptions {
  initialAddress?: string;
  initialTitle?: string;
}

export function useBrowserNavigation({
  initialAddress = 'tidepool.zz',
  initialTitle = 'Tidepool',
}: UseBrowserNavigationOptions = {}) {
  const [entries, setEntries] = useState<HistoryEntry[]>([
    {
      address: normalizeAddress(initialAddress),
      title: initialTitle,
      scrollY: 0,
      status: 200,
      timestamp: Date.now(),
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Keep a ref to entries and currentIndex for sync operations
  const entriesRef = useRef(entries);
  entriesRef.current = entries;
  const indexRef = useRef(currentIndex);
  indexRef.current = currentIndex;

  const currentEntry: HistoryEntry | undefined = entries[currentIndex];
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < entries.length - 1;

  /**
   * Save the current scroll position for the active entry
   */
  const recordScrollPosition = useCallback((scrollY: number) => {
    setEntries((prev) => {
      const idx = indexRef.current;
      if (!prev[idx] || prev[idx].scrollY === scrollY) return prev;
      const updated = [...prev];
      updated[idx] = { ...updated[idx], scrollY };
      return updated;
    });
  }, []);

  /**
   * Navigate to a new address.
   * If replacing, updates the current entry.
   * If pushing (default), TRUNCATES any forward entries and pushes the new entry.
   */
  const navigate = useCallback(
    (
      rawAddress: string,
      options?: {
        title?: string;
        status?: number;
        replace?: boolean;
        currentScrollY?: number;
      }
    ) => {
      const address = normalizeAddress(rawAddress);
      if (!address) return;

      const title = options?.title || address;
      const status = options?.status ?? 200;

      setEntries((prev) => {
        const curIdx = indexRef.current;

        // If replacing current entry
        if (options?.replace) {
          const updated = [...prev];
          updated[curIdx] = {
            ...updated[curIdx],
            address,
            title,
            status,
            timestamp: Date.now(),
          };
          return updated;
        }

        // Save scroll position on current entry before moving away
        const truncated = prev.slice(0, curIdx + 1);
        if (options?.currentScrollY !== undefined && truncated[curIdx]) {
          truncated[curIdx] = {
            ...truncated[curIdx],
            scrollY: options.currentScrollY,
          };
        }

        const newEntry: HistoryEntry = {
          address,
          title,
          scrollY: 0,
          status,
          timestamp: Date.now(),
        };

        const newEntries = [...truncated, newEntry];
        setCurrentIndex(newEntries.length - 1);
        return newEntries;
      });
    },
    []
  );

  /**
   * Go back in history without modifying the stack, returning target entry
   */
  const goBack = useCallback(
    (currentScrollY?: number): HistoryEntry | null => {
      const curIdx = indexRef.current;
      if (curIdx <= 0) return null;

      // Save scroll position for currently leaving page
      if (currentScrollY !== undefined) {
        recordScrollPosition(currentScrollY);
      }

      const targetIdx = curIdx - 1;
      setCurrentIndex(targetIdx);
      return entriesRef.current[targetIdx] ?? null;
    },
    [recordScrollPosition]
  );

  /**
   * Go forward in history without modifying the stack, returning target entry
   */
  const goForward = useCallback(
    (currentScrollY?: number): HistoryEntry | null => {
      const curIdx = indexRef.current;
      if (curIdx >= entriesRef.current.length - 1) return null;

      // Save scroll position for currently leaving page
      if (currentScrollY !== undefined) {
        recordScrollPosition(currentScrollY);
      }

      const targetIdx = curIdx + 1;
      setCurrentIndex(targetIdx);
      return entriesRef.current[targetIdx] ?? null;
    },
    [recordScrollPosition]
  );

  /**
   * Jump to a specific index in the session history stack
   */
  const jumpTo = useCallback(
    (index: number, currentScrollY?: number): HistoryEntry | null => {
      if (index < 0 || index >= entriesRef.current.length) return null;

      if (currentScrollY !== undefined) {
        recordScrollPosition(currentScrollY);
      }

      setCurrentIndex(index);
      return entriesRef.current[index] ?? null;
    },
    [recordScrollPosition]
  );

  /**
   * Update the title of the current entry (e.g. after site document loads)
   */
  const updateCurrentTitle = useCallback((title: string) => {
    setEntries((prev) => {
      const idx = indexRef.current;
      if (!prev[idx] || prev[idx].title === title) return prev;
      const updated = [...prev];
      updated[idx] = { ...updated[idx], title };
      return updated;
    });
  }, []);

  /**
   * Update the status (200/404) of the current entry
   */
  const updateCurrentStatus = useCallback((status: number) => {
    setEntries((prev) => {
      const idx = indexRef.current;
      if (!prev[idx] || prev[idx].status === status) return prev;
      const updated = [...prev];
      updated[idx] = { ...updated[idx], status };
      return updated;
    });
  }, []);

  return {
    entries,
    currentIndex,
    currentEntry,
    canGoBack,
    canGoForward,
    navigate,
    goBack,
    goForward,
    jumpTo,
    recordScrollPosition,
    updateCurrentTitle,
    updateCurrentStatus,
  };
}
