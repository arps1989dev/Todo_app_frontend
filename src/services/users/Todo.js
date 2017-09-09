import axios from 'axios';
import {apiHeader, checkStatus} from '../../components/Helper';

export function getTodo() {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'todos', apiHeader());
}

export function deleteTodo(id) {
  return axios.delete(process.env.REACT_APP_API_BASE_URL + 'todos/' + id, apiHeader());
}

export function updateTodo(params) {
  return axios.patch(process.env.REACT_APP_API_BASE_URL + 'todos/' + params['id'], 
  params['todoForm'], 
  apiHeader());
}


export function createTodo(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'todos',
    params,
    apiHeader()
  );
}

export function showTodo(id) {
  const responsePromise = axios.get(
    process.env.REACT_APP_API_BASE_URL + 'todos/' + id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}