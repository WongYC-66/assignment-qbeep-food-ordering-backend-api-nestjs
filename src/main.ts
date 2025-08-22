import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger); global middleware
  // await app.listen(process.env.PORT ?? 3000);

  const config = new DocumentBuilder()
    .setTitle('Food Ordering App (API) - Demo - for QBEEP only')
    .setDescription('The API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
