import { Injectable } from '@nestjs/common';
const moment = require('moment');
import { CreateUserParams } from '../db/db';
import { DbService } from '../db/db.service';
import { EmailService } from '../email/email.service';
import { codeStatus } from '../utils/statusCode';

@Injectable()
export class UsersService {

  constructor(
    private readonly dbService: DbService,
    private readonly emailService: EmailService
  ){}
  /* 创建用户 */
  async createUser(data: CreateUserParams) {
    // 查询是否已注册
    const usersRes = await this.getUsersFromEmail(data.email) as any;
    const userList = usersRes.data || [];
    if(!!userList.length) {
      return {
        code: codeStatus.BadRequest,
        message: '此邮箱已注册'
      };
    }
    // 查询验证码是否正确
    const emailRes = await this.emailService.getEmailCodes(data.email);
    const emailCodes = emailRes?.data || [];
    if(emailCodes.length) {
      const emailCode = emailCodes[0].code;
      if(String(emailCode) === String(data.email_code)) {
        const createUserRes = await this.dbService.createUser({
          ...data,
          create_time: moment.now()
        });
        return createUserRes;
      } else {
        return {
          code: codeStatus.BadRequest,
          message: '邮箱验证码错误'
        }
      }
    } else {
      return {
        code: codeStatus.BadRequest,
        message: '请重新发送邮箱验证码'
      };
    }
  }
  /* 查询用户 */
  async getUsersFromEmail(value: string) {
    return this.dbService.getUsersFromEmail(value);
  }
}