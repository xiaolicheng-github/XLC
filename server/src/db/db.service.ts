import { Injectable } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
import { getEmailCodes,
setEmailCode,
setEmailCodeParams,
getUsersFromEmail,
createUser, 
CreateUserParams} from './db';

interface IRes {
  message?: string;
  code: number,
  data: any
}

@Injectable()
export class DbService {

  db = null;

  constructor() {
    this.db = new sqlite3.Database('../xlcDB.db', (err) => {
      if (err) {
        console.log("Error Occurred - " + err.message);
      } else {
        console.log("DataBase Connected");
      }
    });
  }

  dbSql(sql: string, values?: (string | number)[]) {
    return new Promise((resolve, reject) => {
      if(values?.length) {
        this.db.run(sql, values, (err, rows) => {
          if(err) {
            reject(err);
            return;
          }
          resolve({
            message: '请求成功',
            code: 200,
            data: rows
          });
        });
      } else {
        this.db.all(sql, (err, rows) => {
          if(err) {
            reject(err);
            return;
          }
          resolve({
            message: '请求成功',
            code: 200,
            data: rows
          });
        });
      }
    });
  }

  sqlExecute(parmas: (string | number | (string | number)[])[]): IRes | any {
    if(parmas.length === 2) {
      return this.dbSql(parmas[0] as string, parmas[1] as any);
    } else {
      return this.dbSql(parmas[0] as string);
    }
  }

  /* 存储邮件验证码 */
  setEmailCode(value: setEmailCodeParams) {
    this.sqlExecute(setEmailCode(value))
  }
  /* 根据邮箱地址查询所有对应列 */
  getEmailCodes(value: string) {
    return this.sqlExecute(getEmailCodes(value));
  }
  /* 根据邮箱查询用户 */
  getUsersFromEmail(value: string){
    return this.sqlExecute(getUsersFromEmail(value));
  }
  /* 创建用户 */
  createUser(value: CreateUserParams) {
    return this.sqlExecute(createUser(value));
  }
}