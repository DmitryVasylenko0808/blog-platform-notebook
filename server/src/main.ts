import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("api");
  app.useStaticAssets(join(__dirname, "..", "uploads/avatars"), {
    prefix: "/avatars"
  });
  app.useStaticAssets(join(__dirname, "..", "uploads/posts"), {
    prefix: "/posts"
  });
  app.useStaticAssets(join(__dirname, "..", "uploads/none"), {
    prefix: "/none"
  });
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
