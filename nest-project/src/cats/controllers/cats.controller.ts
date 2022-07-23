import { CatsService } from '../cats.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../common/exceptions/http-exception.filter';
import { SuccessInterceptor } from '../../common/interceptors/successinterceptor';
import { CatRequestDto } from '../dto/cats.request.dto';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { AuthService } from '../../auth/auth.service';
import { LoginRequestDto } from '../../auth/dto/login.request.dto';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { Cat } from '../cats.scheme';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../common/utils/multer.options';

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
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat.readOnlyData;
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
  @UseGuards(JwtAuthGuard) // JWT Decoding 위한 데코레이터
  @Post('upload')
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    return this.catsService.uploadImg(cat, files);
  }
}
