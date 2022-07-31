import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentsRepository } from '../repositories/comments.repository';
import { CatsRepository } from '../../cats/cats.repository';
import { CommentsRequestDto } from '../dto/comments.request.dto';
import { Comments } from '../comments.schema';
import { Types } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments() {
    return this.commentsRepository.getAllComments();
  }

  async createComment(
    id: string,
    author: Types.ObjectId,
    commentsCreateDto: CommentsRequestDto,
  ) {
    try {
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
        id,
      );

      const { contents } = commentsCreateDto;

      // validateCat._id;
      return await this.commentsRepository.createComment({
        author,
        contents,
        info: targetCat._id,
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async plusLike(id: string) {
    try {
      const comment: Comments = await this.commentsRepository.findById(id);
      comment.likeCount += 1;

      return await comment.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
