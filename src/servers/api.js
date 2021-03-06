import { request } from '../request';

export function fetchData(params) {
  return request({
    method: `home?count=${params.count}`,
    options: {
      method: 'GET'
    }
  });
}

export function fetchIsLogin(params) {
  return request({
    method: 'isLogin',
    options: {
      method: 'GET'
    }
  });
}

export function fetchClick(params) {
  return request({
    method: 'fetchClick',
    options: {
      method: 'PUT',
      body: params
    }
  }); 
}