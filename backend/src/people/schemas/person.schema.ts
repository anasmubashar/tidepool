import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PersonDocument = Person & Document;

@Schema({ timestamps: true })
export class Person {
  @Prop({ required: true, unique: true, index: true, lowercase: true, trim: true })
  id: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true, default: '' })
  bio: string;

  @Prop({ trim: true, default: '' })
  avatarColor?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
