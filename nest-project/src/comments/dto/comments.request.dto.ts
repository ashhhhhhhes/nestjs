import { PickType } from '@nestjs/swagger';
import { Comments } from '../comments.schema';

export class CommentsRequestDto extends PickType(Comments, [
  'contents',
] as const) {}
