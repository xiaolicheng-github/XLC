type dataParams = [string, (number | string)[]?];
export interface setEmailCodeParams {
  email: string;
  code: number;
  time: number;
}
/* 存储邮箱验证码 */
export function setEmailCode(value: setEmailCodeParams): dataParams {
  return [
    'INSERT INTO EMAIL_CODE (email,code,time) VALUES (?,?,?)',
    [ value.email, value.code, value.time ]
  ]
}