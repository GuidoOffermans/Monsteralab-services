import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqService } from './RabbitMQ/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('cats'));

  await app.startAllMicroservices();
  await app.listen(3001);
}

bootstrap();
