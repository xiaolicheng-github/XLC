
import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {

  constructor(private emailService: EmailService) {}

  @Post('/sendcode')
  async sendEmailCode(@Body() data) {
    return await this.emailService.sendEmailCode(data);
  }
  @Get('/getcodes')
  async getEmailCodes(@Query() query: { email: string }) {
    return await this.emailService.getEmailCodes(query.email);
  }
}

