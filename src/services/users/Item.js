import axios from 'axios';
import {apiHeader, checkStatus} from '../../components/Helper';



export function createItem(params) {
  const responsePromise = axios.post(
    process.env.REACT_APP_API_BASE_URL + 'todos/' + params.todo_id + '/items',
    params,
    apiHeader());
    return checkStatus(responsePromise);
}

export function getItem(todoId) {
  // debugger
  const responsePromise = axios.get(process.env.REACT_APP_API_BASE_URL + 'todos/' + todoId + '/items',
  apiHeader());
  return checkStatus(responsePromise);
}

export function deleteItem(todoId, id) {
  const responsePromise = axios.delete(process.env.REACT_APP_API_BASE_URL + 'todos/' + todoId + '/items/' + id,
  apiHeader());
  return checkStatus(responsePromise);
}

export function updateItem(params,todo_id, id) {
  const responsePromise = axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'todos/' + todo_id + '/items/' + id, 
    params, 
    apiHeader()
  );
  return checkStatus(responsePromise);
}
