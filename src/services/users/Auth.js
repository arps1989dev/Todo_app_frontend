import axios from 'axios';

export function LoginService(params){
  return axios.post('http://localhost:4000/oauth/token', params);
}
export function LogoutService(params){
  return axios.post('http://localhost:4000/oauth/revoke', params);
}