import { Module } from '@nestjs/common';
import { CommentsService } from './service/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsSchema } from './comments.schema';
import { CommentsRepository } from './repositories/comments.repository';
import { CatsModule } from '../cats/cats.module';

@Module({
  imports: [
    // 스키마 의존성 주입.
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
    ]),

    // CatsRepository 사용을 위해 CatsModule을 추가.
    CatsModule,
  ],
  providers: [CommentsService, CommentsRepository],
  controllers: [CommentsController],
})
export class CommentsModule {}
