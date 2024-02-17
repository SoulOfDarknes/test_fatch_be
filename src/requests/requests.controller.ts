import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('api')
export class ApiController {
  private readonly requestCountPerSecondLimit = 50;
  private requestsCounter = 0;
  private lastResetTime = Date.now();

  @Get()
  async handleRequest(@Query('index') index: number, @Res() res: Response) {
    const currentTime = Date.now();
    if (currentTime - this.lastResetTime > 1000) {
      this.requestsCounter = 0;
      this.lastResetTime = currentTime;
    }

    if (this.requestsCounter >= this.requestCountPerSecondLimit) {
      return res
        .status(HttpStatus.TOO_MANY_REQUESTS)
        .json({ error: 'Too many requests' });
    }

    this.requestsCounter++;

    const delay = Math.floor(Math.random() * 1000) + 1;
    setTimeout(() => {
      res.json({ index });
    }, delay);
  }
}
