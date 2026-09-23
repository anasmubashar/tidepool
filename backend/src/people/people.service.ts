import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person, PersonDocument } from './schemas/person.schema';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(Person.name)
    private readonly personModel: Model<PersonDocument>,
  ) {}

  async findAll(): Promise<PersonDocument[]> {
    return this.personModel.find().sort({ name: 1 }).exec();
  }

  async findById(id: string): Promise<PersonDocument> {
    const person = await this.personModel.findOne({ id: id.toLowerCase().trim() }).exec();
    if (!person) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }
    return person;
  }

  async upsert(data: { id: string; name: string; bio?: string; avatarColor?: string }): Promise<PersonDocument> {
    return this.personModel
      .findOneAndUpdate(
        { id: data.id.toLowerCase().trim() },
        { $set: data },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      )
      .exec();
  }

  async count(): Promise<number> {
    return this.personModel.countDocuments().exec();
  }
}
