import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
const moment = require('moment');
import { DbService } from 'src/db/db.service';
import { randomIntCode } from '../utils/random';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly dbService: DbService) { }

  async sendEmailCode(data) {
    try {
      const code = randomIntCode(6);
      const date = new Date().toString();
      const sendMailOptions: ISendMailOptions = {
        to: data.email,
        subject: data?.subject || '用户邮箱验证',
        template: 'index.ejs', //这里写你的模板名称，如果你的模板名称的单名如 validate.ejs ,直接写validate即可 系统会自动追加模板的后缀名,如果是多个，那就最好写全。
        //内容部分都是自定义的
        context: {
          code, //验证码
          date, //日期
          sign: data?.sign || '系统邮件,回复无效。' //发送的签名,当然也可以不要
        }
      };
      this.mailerService
        .sendMail(sendMailOptions)
        .then(() => {
          this.dbService.setEmailCode({
            email: data.email,
            code: Number(code),
            time: moment.now()
          });
        })
        .catch(error => {
          return { error }
        });
      return { code: 200, message: '发送成功' };
    } catch (error) {
      return { error };
    }
  }
}