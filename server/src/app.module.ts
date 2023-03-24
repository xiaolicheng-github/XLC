import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ApiModule, EmailModule],
  controllers: [AppController],
})
export class AppModule {}
