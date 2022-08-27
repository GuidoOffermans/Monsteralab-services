import { Injectable } from '@nestjs/common';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

const user = 'guest';
const password = 'guest';
const host = 'localhost:5672';
const queueName = 'cats_queue';
const url = `amqp://${user}:${password}@${host}`;

@Injectable()
export class RmqService {
  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [url],
        queue: queueName,
        noAck,
        persistent: true,
        queueOptions: {
          durable: false,
        },
      },
    };
  }

  public ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
