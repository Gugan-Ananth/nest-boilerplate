import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonConfig } from './common/loggers/winston.config';
import { GlobalExceptionFilter } from './common/filters/global_exception/global_exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: winstonConfig});
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
