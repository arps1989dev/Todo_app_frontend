import axios from 'axios';
import {apiHeader} from '../../components/Helper';

export function getItem(todoId) {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'todos/' + todoId + '/items' 
  , apiHeader());
}

export function deleteItem(todoId, id) {
  return axios.delete(process.env.REACT_APP_API_BASE_URL + 'todos/' + todoId + 'items' + id
  , apiHeader());
}

// export function updateItem(todo_id, id) {
//   return axios.patch(process.env.REACT_APP_API_BASE_URL + 'todos/' + todo_id + 'items' + id
//   , params['itemForm'], 
//   apiHeader());
// }


export function createItem(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'todos/' + params.todo_id + 'items',
    params,
    apiHeader()
  );
}