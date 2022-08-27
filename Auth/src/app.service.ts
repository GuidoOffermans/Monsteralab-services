import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('cats') private catsClient: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  public async addMessageToQueue(message: string) {
    await lastValueFrom(this.catsClient.emit('message_added', { message }));
  }
}
