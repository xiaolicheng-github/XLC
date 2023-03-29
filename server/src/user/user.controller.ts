import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {

  @Post('/create')
  async createUser(@Body() data) {

  }
}