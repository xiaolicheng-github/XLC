import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { EmailModule } from './email/email.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ApiModule,
    EmailModule,
    UserModule
  ],
  controllers: [AppController],
})
export class AppModule {}
