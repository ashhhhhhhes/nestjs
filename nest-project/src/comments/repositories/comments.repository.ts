import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from '../comments.schema';
import { CommentsCreateDto } from '../dto/comments.create.dto';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
  ) {}

  async getAllComments() {
    try {
      return await this.commentsModel.find();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async createComment(comment: CommentsCreateDto): Promise<Comments> {
    try {
      return await this.commentsModel.create({
        ...comment,
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findById(id: string) {
    return this.commentsModel.findById(id);
  }
}
