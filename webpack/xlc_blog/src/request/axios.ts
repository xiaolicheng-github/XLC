import axios from 'axios';

const request = (method: string, url: string, data: any) => {
  return axios({
    method,
    url,
    data
  }).then(response => {
    return response.data;
  }).catch(error => {
    return error;
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