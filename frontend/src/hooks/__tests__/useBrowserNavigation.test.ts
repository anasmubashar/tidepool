import { renderHook, act } from '@testing-library/react';
import {
  useBrowserNavigation,
  normalizeAddress,
} from '../useBrowserNavigation';

describe('normalizeAddress', () => {
  it('strips small-web:// and https?:// protocols', () => {
    expect(normalizeAddress('small-web://tidepool.zz')).toBe('tidepool.zz');
    expect(normalizeAddress('https://deep-time.zz')).toBe('deep-time.zz');
    expect(normalizeAddress('http://mechanical.zz')).toBe('mechanical.zz');
  });

  it('normalizes case, slashes, and whitespace', () => {
    expect(normalizeAddress('  /Clockwork.ZZ/ ')).toBe('clockwork.zz');
    expect(normalizeAddress('SEARCH.ZZ?q=hypertext')).toBe('search.zz?q=hypertext');
  });
});

describe('useBrowserNavigation', () => {
  it('initializes with default entry', () => {
    const { result } = renderHook(() =>
      useBrowserNavigation({ initialAddress: 'tidepool.zz', initialTitle: 'Tidepool' })
    );

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.entries).toHaveLength(1);
    expect(result.current.currentEntry?.address).toBe('tidepool.zz');
    expect(result.current.canGoBack).toBe(false);
    expect(result.current.canGoForward).toBe(false);
  });

  it('navigates through a trail and updates back/forward flags', () => {
    const { result } = renderHook(() =>
      useBrowserNavigation({ initialAddress: 'tidepool.zz' })
    );

    act(() => {
      result.current.navigate('deep-time.zz', { title: 'Deep Time' });
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.entries).toHaveLength(2);
    expect(result.current.currentEntry?.address).toBe('deep-time.zz');
    expect(result.current.canGoBack).toBe(true);
    expect(result.current.canGoForward).toBe(false);

    act(() => {
      result.current.navigate('mechanical.zz', { title: 'Mechanical' });
    });

    expect(result.current.currentIndex).toBe(2);
    expect(result.current.entries).toHaveLength(3);
    expect(result.current.canGoBack).toBe(true);
    expect(result.current.canGoForward).toBe(false);

    // Go back
    act(() => {
      result.current.goBack();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.currentEntry?.address).toBe('deep-time.zz');
    expect(result.current.canGoBack).toBe(true);
    expect(result.current.canGoForward).toBe(true);

    // Go back to root
    act(() => {
      result.current.goBack();
    });

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.currentEntry?.address).toBe('tidepool.zz');
    expect(result.current.canGoBack).toBe(false);
    expect(result.current.canGoForward).toBe(true);

    // Go forward
    act(() => {
      result.current.goForward();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.currentEntry?.address).toBe('deep-time.zz');
  });

  it('truncates forward history when navigating from a back position', () => {
    const { result } = renderHook(() =>
      useBrowserNavigation({ initialAddress: 'site-a.zz' })
    );

    // Navigate: A -> B -> C
    act(() => {
      result.current.navigate('site-b.zz');
    });
    act(() => {
      result.current.navigate('site-c.zz');
    });

    expect(result.current.entries).toHaveLength(3);
    expect(result.current.currentIndex).toBe(2);

    // Step back to B
    act(() => {
      result.current.goBack();
    });
    expect(result.current.currentIndex).toBe(1);
    expect(result.current.currentEntry?.address).toBe('site-b.zz');
    expect(result.current.canGoForward).toBe(true);

    // Branch from B to D: C should be truncated!
    act(() => {
      result.current.navigate('site-d.zz');
    });

    expect(result.current.entries).toHaveLength(3);
    expect(result.current.entries.map((e) => e.address)).toEqual([
      'site-a.zz',
      'site-b.zz',
      'site-d.zz',
    ]);
    expect(result.current.currentIndex).toBe(2);
    expect(result.current.canGoForward).toBe(false);
    expect(result.current.canGoBack).toBe(true);
  });

  it('records and preserves scroll positions across back and forward navigation', () => {
    const { result } = renderHook(() =>
      useBrowserNavigation({ initialAddress: 'site-a.zz' })
    );

    // User scrolls on site-a
    act(() => {
      result.current.recordScrollPosition(520);
    });

    expect(result.current.entries[0].scrollY).toBe(520);

    // User navigates to site-b
    act(() => {
      result.current.navigate('site-b.zz', { currentScrollY: 520 });
    });

    expect(result.current.entries[0].scrollY).toBe(520);
    expect(result.current.entries[1].scrollY).toBe(0);

    // User scrolls on site-b
    act(() => {
      result.current.recordScrollPosition(880);
    });

    // Go back to site-a: site-a still has scrollY: 520, site-b has scrollY: 880
    act(() => {
      result.current.goBack(880);
    });

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.entries[0].scrollY).toBe(520);
    expect(result.current.entries[1].scrollY).toBe(880);
  });

  it('supports direct jumpTo index', () => {
    const { result } = renderHook(() =>
      useBrowserNavigation({ initialAddress: 'one.zz' })
    );

    act(() => {
      result.current.navigate('two.zz');
    });
    act(() => {
      result.current.navigate('three.zz');
    });

    expect(result.current.currentIndex).toBe(2);

    act(() => {
      result.current.jumpTo(0);
    });

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.currentEntry?.address).toBe('one.zz');
    // Does not truncate when jumping
    expect(result.current.entries).toHaveLength(3);
  });
});
