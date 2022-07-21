import { Cat } from '../../cats/cats.scheme';
import { PickType } from '@nestjs/swagger';

export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}
