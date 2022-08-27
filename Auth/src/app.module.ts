import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RmqModule } from './RabbitMQ/rmq.module';

@Module({
  imports: [
    RmqModule.register({
      name: 'cats',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
