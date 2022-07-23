import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  // * express 어플리케이션이라는 것을 명시 해줘야 express 에서 제공하는 기능을 사용 할 수 있음. <Generic>
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  // * 스웨거 보안 설정
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  // * static assets 경로 생성. (express 에서 제공하는 미들웨어임)
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media', // * uploads/some_file.exe => /media/some_file.exe (에셋 폴더명이 아닌 prefix에 지정된 명칭으로 url 접근가능)
  });

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
