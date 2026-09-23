import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VisitDocument = Visit & Document;

@Schema({ timestamps: true })
export class Visit {
  @Prop({ required: true, index: true, lowercase: true, trim: true })
  personId: string;

  @Prop({ required: true, index: true, lowercase: true, trim: true })
  address: string;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, default: 200 })
  status: number; // 200 (Found) or 404 (Nowhere)

  @Prop({ trim: true, default: 'typed' })
  referrer: string; // 'typed', 'link:from.zz', 'search:query', 'history'

  @Prop({ required: true, default: Date.now, index: true })
  visitedAt: Date;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);

// Compound index for querying a person's history ordered by time
VisitSchema.index({ personId: 1, visitedAt: -1 });
