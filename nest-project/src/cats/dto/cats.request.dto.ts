import { Cat } from '../cats.scheme';
import { PickType } from '@nestjs/swagger';

export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
