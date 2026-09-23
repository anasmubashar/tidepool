import { SearchService } from './search.service';

const mockSiteModel = {
  find: jest.fn().mockReturnThis(),
  exec: jest.fn(),
};

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new SearchService(mockSiteModel as any);
  });

  describe('cleanHtmlToText', () => {
    it('strips HTML tags', () => {
      const result = service.cleanHtmlToText('<h1>Hello</h1><p>World</p>');
      expect(result).not.toContain('<h1>');
      expect(result).toContain('Hello');
      expect(result).toContain('World');
    });

    it('strips script and style blocks', () => {
      const html = `<style>.a{color:red}</style><script>alert(1)</script><p>Content</p>`;
      const result = service.cleanHtmlToText(html);
      expect(result).not.toContain('color:red');
      expect(result).not.toContain('alert');
      expect(result).toContain('Content');
    });

    it('decodes basic HTML entities', () => {
      const html = `<p>Tom &amp; Jerry &lt;3</p>`;
      const result = service.cleanHtmlToText(html);
      expect(result).toContain('Tom & Jerry');
    });
  });

  describe('extractSnippet', () => {
    const text = 'The quick brown fox jumped over the lazy dog. The fox was very quick and quiet.';

    it('returns a snippet centered around the query word', () => {
      const snippet = service.extractSnippet(text, 'fox');
      expect(snippet.toLowerCase()).toContain('fox');
    });

    it('returns truncated text for no match', () => {
      const snippet = service.extractSnippet(text, 'zzz');
      // Falls back to truncated text
      expect(snippet.length).toBeGreaterThan(0);
    });

    it('respects maxLength', () => {
      const long = 'a '.repeat(500);
      const snippet = service.extractSnippet(long, 'a', 100);
      // 100 chars + possible '...' = <=104
      expect(snippet.length).toBeLessThanOrEqual(104);
    });
  });

  describe('search', () => {
    it('returns empty array for empty query', async () => {
      const results = await service.search('');
      expect(results).toEqual([]);
    });
  });
});
