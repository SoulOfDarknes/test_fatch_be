import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Controller('api')
export class ApiController {
  private requestCountPerSecondLimit = 50;
  private requestsCounter = 0;
  private lastResetTime = Date.now();

  @Get()
  async handleRequest(@Query('index') index: number): Promise<number> {
    const currentTime = Date.now();

    if (currentTime - this.lastResetTime > 1000) {
      this.requestsCounter = 0;
      this.lastResetTime = currentTime;
    }

    if (this.requestsCounter >= this.requestCountPerSecondLimit) {
      throw new HttpException(
        'Too many requests',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    this.requestsCounter++;

    await new Promise((resolve) =>
      setTimeout(resolve, Math.floor(Math.random() * 1000) + 1),
    );

    return index;
  }
}
