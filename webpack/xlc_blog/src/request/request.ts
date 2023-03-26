import request from './axios';

export const sendEmailCode = (params: any) => request.post('/email/sendcode', params);

