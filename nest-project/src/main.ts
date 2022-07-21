import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // * cors 설정
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT);
}

bootstrap();
