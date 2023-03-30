type dataParams = [string, (number | string)[]?];
export interface setEmailCodeParams {
  email: string;
  code: number;
  time: number;
}
export interface CreateUserParams {
  email: string;
  name: string;
  password: string;
  create_time: number;
  email_code: number;
}
/* 存储邮箱验证码 */
export function setEmailCode(value: setEmailCodeParams): dataParams {
  return [
    'INSERT INTO EMAIL_CODE (email,code,time) VALUES (?,?,?)',
    [ value.email, value.code, value.time ]
  ]
}
/* 根据邮箱地址查询验证码（根据时间倒序排列） */
export function getEmailCodes(value: string) {
  return [
    `SELECT * FROM EMAIL_CODE WHERE email = "${value}" ORDER BY time DESC`
  ]
}
/* 根据email查询用户 */
export function getUsersFromEmail(value: string) {
  return [
    `SELECT * FROM USER WHERE email = "${value}"`
  ]
}

/* 创建用户 */
export function createUser(value: CreateUserParams) {
  return [
    `INSERT INTO USER (email, name, password, create_time, email_code) VALUES (?,?,?,?,?)`,
    [value.email, value.name, value.password, value.create_time, value.email_code]
  ]
}