import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 8080;

//main app
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port);
  Logger.log(`server running on port-${port} url- http://localhost:${port}`,'Bootstrap');
}
bootstrap();
