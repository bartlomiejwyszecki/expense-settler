import { SharedLibModule } from '@expense-settler-monorepo/shared-lib';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SharedLibModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
