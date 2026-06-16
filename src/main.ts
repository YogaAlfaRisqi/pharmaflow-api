import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  // Security

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // ← otomatis konversi tipe data
      },
    }),
  );

  // Do Swagger Documentation later

  logger.log(`🚀 Server     : http://localhost:${port}`);
  logger.log(`📡 API        : http://localhost:${port}/api/v1`);
  logger.log(`🌍 Environment: ${process.env.NODE_ENV ?? 'development'}`);
}

bootstrap()
  .then(() => {
    console.log('Application started');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
