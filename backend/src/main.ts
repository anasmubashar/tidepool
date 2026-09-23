import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`\n🌊 Tidepool Backend running on http://localhost:${port}`);
  console.log(`   Endpoints: /sites  /people  /visits  /search`);
  console.log(`   Seed:      npm run seed\n`);
}

bootstrap();
