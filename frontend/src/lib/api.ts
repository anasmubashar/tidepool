import { Person, SearchResult, Site, Visit } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function fetchSite(address: string): Promise<Site | null> {
  const clean = address.toLowerCase().trim();
  try {
    const res = await fetch(`${API_BASE}/sites/${encodeURIComponent(clean)}`, {
      cache: 'no-store',
    });
    if (res.status === 404) {
      return null;
    }
    if (!res.ok) {
      throw new Error(`Failed to fetch site: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('API fetchSite error:', error);
    return null;
  }
}

export async function fetchAllSites(): Promise<Site[]> {
  try {
    const res = await fetch(`${API_BASE}/sites`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('API fetchAllSites error:', error);
    return [];
  }
}

export async function publishSite(data: {
  address: string;
  title: string;
  author: string;
  html: string;
}): Promise<Site> {
  const res = await fetch(`${API_BASE}/sites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to publish site: ${res.status}`);
  }
  return await res.json();
}

export async function fetchPeople(): Promise<Person[]> {
  try {
    const res = await fetch(`${API_BASE}/people`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('API fetchPeople error:', error);
    return [];
  }
}

export async function fetchVisits(personId?: string): Promise<Visit[]> {
  try {
    const url = personId
      ? `${API_BASE}/visits?personId=${encodeURIComponent(personId)}`
      : `${API_BASE}/visits`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('API fetchVisits error:', error);
    return [];
  }
}

export async function recordVisit(data: {
  personId: string;
  address: string;
  title: string;
  status: number;
  referrer?: string;
}): Promise<Visit | null> {
  try {
    const res = await fetch(`${API_BASE}/visits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('API recordVisit error:', error);
    return null;
  }
}

export async function searchSites(
  query: string
): Promise<{ query: string; total: number; results: SearchResult[] }> {
  try {
    const res = await fetch(
      `${API_BASE}/search?q=${encodeURIComponent(query)}`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
      return { query, total: 0, results: [] };
    }
    const data = await res.json();
    if (Array.isArray(data)) {
      return { query, total: data.length, results: data };
    }
    return {
      query: data.query || query,
      total: data.total ?? (data.results ? data.results.length : 0),
      results: data.results || [],
    };
  } catch (error) {
    console.error('API searchSites error:', error);
    return { query, total: 0, results: [] };
  }
}
