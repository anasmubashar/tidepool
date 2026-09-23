import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Site, SiteDocument } from '../sites/schemas/site.schema';

export interface SearchResult {
  address: string;
  title: string;
  author: string;
  snippet: string;
  score: number;
}

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Site.name)
    private readonly siteModel: Model<SiteDocument>,
  ) {}

  cleanHtmlToText(html: string): string {
    return html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim();
  }

  extractSnippet(text: string, query: string, maxLength = 220): string {
    if (!text) return '';
    const words = query
      .split(/\s+/)
      .map((w) => w.trim().toLowerCase())
      .filter((w) => w.length > 1);

    if (words.length === 0) {
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    const lowerText = text.toLowerCase();
    let bestIndex = -1;

    for (const word of words) {
      const idx = lowerText.indexOf(word);
      if (idx !== -1 && (bestIndex === -1 || idx < bestIndex)) {
        bestIndex = idx;
      }
    }

    if (bestIndex === -1) {
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    const start = Math.max(0, bestIndex - 70);
    const end = Math.min(text.length, bestIndex + maxLength - 70);

    let snippet = text.substring(start, end).trim();
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';

    return snippet;
  }

  async search(rawQuery: string): Promise<SearchResult[]> {
    const query = rawQuery ? rawQuery.trim() : '';
    if (!query) {
      return [];
    }

    // Try MongoDB Text Search first
    let results: any[] = [];
    try {
      results = await this.siteModel
        .find(
          { $text: { $search: query } },
          { score: { $meta: 'textScore' } },
        )
        .sort({ score: { $meta: 'textScore' } })
        .limit(20)
        .exec();
    } catch (e) {
      // If text index not ready or query syntax issue, fallback to regex
      results = [];
    }

    // If text search returned empty (e.g. single prefix or partial word), regex fallback
    if (results.length === 0) {
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'i');
      results = await this.siteModel
        .find({
          $or: [
            { title: regex },
            { address: regex },
            { author: regex },
            { html: regex },
          ],
        })
        .limit(20)
        .exec();
    }

    return results.map((site) => {
      const plainText = this.cleanHtmlToText(site.html);
      const snippet = this.extractSnippet(plainText, query);
      const score = (site as any)._doc?.score ?? 1;

      return {
        address: site.address,
        title: site.title,
        author: site.author,
        snippet,
        score,
      };
    });
  }
}
