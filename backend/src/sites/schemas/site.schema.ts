import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SiteDocument = Site & Document;

@Schema({ timestamps: true })
export class Site {
  @Prop({ required: true, unique: true, index: true, lowercase: true, trim: true })
  address: string;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  author: string;

  @Prop({ required: true })
  html: string;

  @Prop({ type: [String], default: [] })
  links: string[];

  @Prop({ trim: true, default: '' })
  summary?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const SiteSchema = SchemaFactory.createForClass(Site);

// Full-text search index across title, html body, author, and address
SiteSchema.index(
  {
    title: 'text',
    html: 'text',
    author: 'text',
    address: 'text',
    summary: 'text',
  },
  {
    weights: {
      title: 10,
      address: 8,
      author: 5,
      html: 3,
      summary: 4,
    },
    name: 'SiteTextSearchIndex',
  },
);
