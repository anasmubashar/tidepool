import { SitesService } from '../sites/sites.service';

// Minimal stub for SitesService (no DB needed for unit tests)
const mockSiteModel = {
  findOne: jest.fn().mockReturnThis(),
  findOneAndUpdate: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  countDocuments: jest.fn().mockReturnThis(),
  exec: jest.fn(),
};

describe('SitesService', () => {
  let service: SitesService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new SitesService(mockSiteModel as any);
  });

  describe('normalizeAddress', () => {
    it('lowercases and trims address', () => {
      expect(service.normalizeAddress('  TIDEPOOL.ZZ  ')).toBe('tidepool.zz');
    });
    it('strips https:// prefix', () => {
      expect(service.normalizeAddress('https://alder.zz')).toBe('alder.zz');
    });
    it('strips quiet:// prefix', () => {
      expect(service.normalizeAddress('quiet://mechanica.zz')).toBe('mechanica.zz');
    });
    it('appends .zz to bare domain-like names', () => {
      expect(service.normalizeAddress('tidepool')).toBe('tidepool.zz');
    });
    it('preserves paths after normalization', () => {
      expect(service.normalizeAddress('alder.zz/essays/tending-digital-gardens')).toBe(
        'alder.zz/essays/tending-digital-gardens',
      );
    });
  });

  describe('extractLinks', () => {
    it('extracts hrefs from anchor tags', () => {
      const html = `<a href="alder.zz">alder</a> <a href="botanyx.zz">botany</a>`;
      expect(service.extractLinks(html)).toContain('alder.zz');
      expect(service.extractLinks(html)).toContain('botanyx.zz');
    });

    it('excludes fragment-only links', () => {
      const html = `<a href="#section">section</a>`;
      expect(service.extractLinks(html)).toHaveLength(0);
    });

    it('excludes mailto links', () => {
      const html = `<a href="mailto:test@example.com">email</a>`;
      expect(service.extractLinks(html)).toHaveLength(0);
    });

    it('deduplicates repeated links', () => {
      const html = `<a href="tidepool.zz">1</a><a href="tidepool.zz">2</a>`;
      expect(service.extractLinks(html)).toHaveLength(1);
    });
  });

  describe('extractSummary', () => {
    it('strips HTML tags from summary', () => {
      const html = `<h1>Title</h1><p>Body text here.</p>`;
      const summary = service.extractSummary(html);
      expect(summary).not.toContain('<h1>');
      expect(summary).toContain('Title');
      expect(summary).toContain('Body text here.');
    });

    it('truncates long content to 180 chars', () => {
      const longText = 'A'.repeat(300);
      const html = `<p>${longText}</p>`;
      const summary = service.extractSummary(html);
      expect(summary.length).toBeLessThanOrEqual(184); // 180 + '...'
    });
  });
});
