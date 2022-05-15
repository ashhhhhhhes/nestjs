import { SuccessInterceptor } from './../common/interceptors/successinterceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  @Get()
  getAllCats() {
    return { cats: 'get all cats' };
  }

  @Get('/:id')
  getCat(@Param('id', ParseIntPipe) param: number) {
    console.log(param);
    return 'id';
  }
}
