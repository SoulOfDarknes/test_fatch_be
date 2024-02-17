import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestsService {
  async handleRequest(index: number): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
    return index;
  }
}
