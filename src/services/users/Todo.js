import axios from 'axios';

export function getTodo() {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'todos');
}