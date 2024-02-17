import { Module } from '@nestjs/common';
import { ApiController } from './requests.controller';
import { RequestsService } from './requests.service';

@Module({
  controllers: [ApiController],
  providers: [RequestsService],
})
export class RequestsModule { }
