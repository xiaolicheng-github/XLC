import { Injectable } from '@nestjs/common';
import { CreateUserParams } from '../db/db';

@Injectable()
export class UsersService {

  /* 创建用户 */
  async createUser(data: CreateUserParams) {
    
  }
  /* 查询用户 */
  async getUsersFromEmail() {

  }
}