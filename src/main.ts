import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './log/exceptions-filter';
import { LoggingInterceptor } from './log/logging.Interceptor';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new ExceptionsFilter())

  
  await app.listen(3000);
}
bootstrap();
