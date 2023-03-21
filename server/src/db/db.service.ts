import { Injectable } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';

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
            msg: '请求成功',
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
            msg: '请求成功',
            code: 200,
            data: rows
          });
        });
      }
    });
  }

}