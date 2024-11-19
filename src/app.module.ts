import { Module } from '@nestjs/common';
import { ClockPay } from './app.service';

@Module({
  imports: [],
  providers: [ClockPay],
})
export class ClockPayModule {}
