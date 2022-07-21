import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.scheme';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '32444',
    description: 'id',
  })
  id: string;
}
