import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { SuccessInterceptor } from '../common/interceptors/successinterceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiProperty({
    example: 'someemail@naver.com',
    description: 'email',
    required: true,
  })
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyCatDto,
  })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @Post('login')
  logIn() {
    return 'login';
  }

  @ApiProperty({
    example: 'someemail@naver.com',
    description: 'email',
    required: true,
  })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiProperty({
    example: 'someemail@naver.com',
    description: 'email',
    required: true,
  })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
