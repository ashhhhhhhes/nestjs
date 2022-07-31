import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from '../service/comments.service';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsRequestDto } from '../dto/comments.request.dto';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { Cat } from '../../cats/cats.scheme';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '모든 고양이 프로필에 적힌 댓글 가져오기',
  })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({
    summary: '특정 고양이 프로필에 댓글 남기기',
  })
  @Post(':id')
  @UseGuards(JwtAuthGuard) // JWT Decoding 위한 데코레이터
  async createComment(
    @Param('id') id: string,
    @Body() commentsRequestDto: CommentsRequestDto,
    @CurrentUser() cat: Cat,
  ) {
    return this.commentsService.createComment(id, cat._id, commentsRequestDto);
  }

  @ApiOperation({
    summary: '댓글에 좋아요 수 남기가',
  })
  @Patch('like/:id')
  async plusLike(@Param('id') id: string) {
    return this.commentsService.plusLike(id);
  }
}
