import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['error', 'warn'],
  });

  app.enableCors({
  
    origin: [ 'http://localhost:3000'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  });

  const port = process.env.PORT || 8000;

  await app.listen(port);
  console.log(`Backend runs on port ${port}`);
}
bootstrap();
