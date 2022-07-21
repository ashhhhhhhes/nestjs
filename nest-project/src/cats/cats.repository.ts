import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.scheme';
import { Model } from 'mongoose';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    try {
      // * boolean 으로 타입 지정하도록 결과 !! 처리
      return !!(await this.catModel.exists({ email }));
    } catch (e) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: {
    password: string;
    name: string;
    email: any;
  }): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
