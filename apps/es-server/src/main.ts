/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ConfigService } from "@nestjs/config";
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = +configService.get<number>("PORT");

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  await app.listen(PORT);

  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}/${globalPrefix}`
  );
}

bootstrap();
