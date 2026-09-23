import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Site, SiteDocument } from './schemas/site.schema';
import { CreateSiteDto } from './dto/create-site.dto';

@Injectable()
export class SitesService {
  constructor(
    @InjectModel(Site.name)
    private readonly siteModel: Model<SiteDocument>,
  ) {}

  normalizeAddress(rawAddress: string): string {
    let clean = rawAddress.trim().toLowerCase();
    clean = clean.replace(/^(https?:\/\/|quiet:\/\/|zz:\/\/)/i, '');
    clean = clean.replace(/\/+$/, '');
    if (!clean.includes('.') && clean.length > 0) {
      clean = `${clean}.zz`;
    }
    return clean;
  }

  extractLinks(html: string): string[] {
    const links = new Set<string>();
    const hrefRegex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']+)["']/gi;
    let match: RegExpExecArray | null;
    while ((match = hrefRegex.exec(html)) !== null) {
      const href = match[1].trim();
      if (
        href &&
        !href.startsWith('#') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('javascript:')
      ) {
        links.add(this.normalizeAddress(href));
      }
    }
    return Array.from(links);
  }

  extractSummary(html: string): string {
    const text = html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (text.length <= 180) return text;
    return text.substring(0, 180).trim() + '...';
  }

  async findByAddress(rawAddress: string): Promise<SiteDocument> {
    const address = this.normalizeAddress(rawAddress);
    const site = await this.siteModel.findOne({ address }).exec();
    if (!site) {
      throw new NotFoundException(`Site not found at address: ${address}`);
    }
    return site;
  }

  async createOrUpdate(dto: CreateSiteDto): Promise<SiteDocument> {
    const address = this.normalizeAddress(dto.address);
    const links = this.extractLinks(dto.html);
    const summary = dto.summary?.trim() || this.extractSummary(dto.html);

    const site = await this.siteModel
      .findOneAndUpdate(
        { address },
        {
          $set: {
            address,
            title: dto.title.trim(),
            author: dto.author.trim(),
            html: dto.html,
            links,
            summary,
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      )
      .exec();

    return site;
  }

  async findAll(): Promise<SiteDocument[]> {
    return this.siteModel.find().sort({ createdAt: -1 }).exec();
  }

  async count(): Promise<number> {
    return this.siteModel.countDocuments().exec();
  }
}
