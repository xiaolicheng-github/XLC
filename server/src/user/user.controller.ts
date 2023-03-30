import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service';
@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UsersService
  ){}

  @Post('/create')
  async createUser(@Body() data) {
    return await this.userService.createUser(data);
  }
}