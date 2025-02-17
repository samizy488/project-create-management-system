import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  const port = process.env.PROJECT_PORT
  await app.listen(port, ()=> console.log(`server running on port:${port}`));
}
bootstrap();
