// IMPORTANT: this needs to be imported first
import { otelSDK } from './tracing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { writeFileSync } from 'fs';

function setUpSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  writeFileSync('api.json', JSON.stringify(document));

  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  // IMPORTANT: the OpenTelemetry SDK needs to start before the Nest app
  otelSDK.start();

  const app = await NestFactory.create(AppModule);

  setUpSwagger(app);

  await app.listen(3001);
}

bootstrap();
