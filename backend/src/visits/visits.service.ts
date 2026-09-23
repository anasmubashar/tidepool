import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit, VisitDocument } from './schemas/visit.schema';
import { RecordVisitDto } from './dto/record-visit.dto';

@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(Visit.name)
    private readonly visitModel: Model<VisitDocument>,
  ) {}

  async recordVisit(dto: RecordVisitDto): Promise<VisitDocument> {
    const visitedAt = dto.visitedAt ? new Date(dto.visitedAt) : new Date();
    const visit = new this.visitModel({
      personId: dto.personId.toLowerCase().trim(),
      address: dto.address.toLowerCase().trim(),
      title: dto.title.trim(),
      status: dto.status ?? 200,
      referrer: dto.referrer?.trim() || 'typed',
      visitedAt,
    });
    return visit.save();
  }

  async getHistoryByPerson(
    personId: string,
    limit = 100,
    search?: string,
  ): Promise<VisitDocument[]> {
    const query: any = { personId: personId.toLowerCase().trim() };

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ address: regex }, { title: regex }];
    }

    return this.visitModel
      .find(query)
      .sort({ visitedAt: -1 })
      .limit(limit)
      .exec();
  }

  async clearHistory(personId: string): Promise<void> {
    await this.visitModel.deleteMany({ personId: personId.toLowerCase().trim() }).exec();
  }

  async count(): Promise<number> {
    return this.visitModel.countDocuments().exec();
  }
}
