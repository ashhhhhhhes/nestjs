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
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

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

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogIn(body);
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
