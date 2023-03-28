import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
const path = require('path');
import { Module } from '@nestjs/common';
import { sendMailConfig } from './mail.js'
import { EmailService } from './email.service';
import { EmailController } from './email.controller.js';
import { DbModule } from '../db/db.module';

@Module({
    imports: [
        MailerModule.forRoot({
            ...sendMailConfig,
            preview: false,// 是否开启预览，开启了这个属性，在调试模式下会自动打开一个网页，预览邮件
            template: {
                dir: path.join(process.cwd(), './src/email/template'),//这里就是你的ejs模板文件夹路径
                adapter: new EjsAdapter(),
                options: {
                    strict: true //严格模式
                }
            }
        }),
        DbModule
    ],
    providers: [EmailService],
    controllers: [EmailController],
    exports: [EmailService]
})
export class EmailModule { }