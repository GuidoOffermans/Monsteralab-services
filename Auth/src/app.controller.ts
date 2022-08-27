import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RmqService } from './RabbitMQ/rmq.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('add-queue')
  addToQueue() {
    return this.appService.addMessageToQueue('hello');
  }

  @EventPattern('message_added')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('DATA: ', data.message, context);
    this.rmqService.ack(context);
  }

  @EventPattern()
  async test(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('DATA-2: ', data.message);
    this.rmqService.ack(context);
  }
}
