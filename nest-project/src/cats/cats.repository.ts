import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.scheme';
import { Model } from 'mongoose';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll(): Promise<Array<Cat>> {
    return this.catModel.find();
  }

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

  async findCatByEmail(email: any): Promise<Cat | null> {
    return this.catModel.findOne({ email });
  }

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    return this.catModel.findById(catId).select('-password');
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat: Cat = await this.catModel.findById(id);

    cat.imgUrl = `http://localhost:8000/media/${fileName}`;

    const newCat = await cat.save();

    return newCat.readOnlyData;
  }
}
