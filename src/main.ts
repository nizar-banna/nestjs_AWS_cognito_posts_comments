import { BaseExceptionFilter, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);

  app.useGlobalFilters(new BaseExceptionFilter());
  app.getUrl().then((res) => {
    console.log(`server running on ${res}`);
  });
}
bootstrap();
