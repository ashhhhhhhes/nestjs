import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './cats.scheme';
import { CatsRepository } from './cats.repository';
import { AuthModule } from '../auth/auth.module';
import { Comments, CommentsSchema } from '../comments/comments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Comments.name, schema: CommentsSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
