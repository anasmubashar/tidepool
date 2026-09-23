# The Small Web

**Tidepool** — A curated small-web browser and federated mesh index.

## What it is

A full-stack application: a **NestJS + MongoDB backend** hosting a Small Web of handwritten HTML pages, and a **Next.js browser frontend** that lets you navigate them like a real browser — with back/forward history, scroll restoration, sandboxed page rendering, full-text search, per-person browsing history, and an HTML publisher.

## Screens (from Figma)

1. **Search** — Editorial search canvas, filter chips, result snippets
2. **Publish** — HTML editor, broadcast scope, craft manifesto
3. **Reader** — Page viewport with provenance sidebar and ring navigation
4. **History** — Chronological logbook with per-person browsing trail
5. **404 Nowhere** — Gentle empty-address page with "Plant this address" CTA

## Getting started

```bash
# Install all dependencies
npm install         # root (installs concurrently)
npm install --prefix backend
npm install --prefix frontend

# Run backend + frontend together
npm run dev

# Seed the database with 10 sites, 5 people, 1hr of browsing history
npm run seed

# Run backend tests
npm run test
```

## Architecture

```
tidepool/
├── backend/         NestJS API (port 4000)
│   └── src/
│       ├── database/    MongoDB connection (auto-fallback to in-memory)
│       ├── sites/       Site CRUD + full-text search index
│       ├── people/      People (5 browsing personas)
│       ├── visits/      Visit recording + per-person history
│       ├── search/      Full-text search with snippet extraction
│       └── seed/        Deterministic seed (10 sites, 5 people, 26 visits)
└── frontend/        Next.js browser UI (port 3000)
    └── src/
        ├── app/         Next.js App Router pages
        ├── components/  Browser chrome, viewport, modals
        └── hooks/       Navigation state machine
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/sites` | List all sites |
| `GET` | `/sites/:address` | Get site by address |
| `POST` | `/sites` | Create or update a site |
| `GET` | `/people` | List all people |
| `GET` | `/people/:id` | Get person by ID |
| `POST` | `/visits` | Record a visit |
| `GET` | `/visits/person/:personId` | Get person's browsing history |
| `GET` | `/search?q=...` | Full-text search with snippets |

## Design

UI follows the Tidepool Figma design — warm parchment palette (`#fbf9f5`), terracotta accent (`#b8502a`), Liberation Serif typography, hairline editorial grid.
