import axios from 'axios';
import { message } from 'ant-design-vue';

/* 请求拦截器 */
axios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
})
/* 响应拦截器 */
axios.interceptors.response.use((response: any) => {
  if(response.data?.code !== 200) {
    message.error(response.data?.message || JSON.stringify(response.data.data));
    return Promise.reject(response.data);
  }
  return response;
}, (error) => {
  message.error(JSON.stringify(error));
  return Promise.reject(error);
});

const request = (method: string, url: string, data: any) => {
  return axios({
    method,
    url,
    data
  }).then(response => {
    return response.data;
  });
}
export default {
  get: (url: string, params: any) => {
    return request('get', url, params);
  },
  post: (url: string, params: any) => {
    return request('post', url, params);
  },
  put: (url: string, params: any) => {
    return request('put', url, params);
  },
  delete: (url: string, params: any) => {
    return request('delete', url, params);
  }
}