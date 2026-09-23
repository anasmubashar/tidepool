export interface Site {
  address: string;
  title: string;
  author: string;
  html: string;
  links: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Person {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
}

export interface Visit {
  _id?: string;
  personId: string;
  address: string;
  title: string;
  status: number;
  referrer?: string;
  visitedAt: string;
}

export interface SearchResult {
  address: string;
  title: string;
  author: string;
  snippet: string;
  score: number;
  links: string[];
}

export interface HistoryEntry {
  address: string;
  title: string;
  scrollY: number;
  status: number;
  timestamp: number;
}

export type NavigationMethod = 'push' | 'replace' | 'back' | 'forward' | 'jump';
