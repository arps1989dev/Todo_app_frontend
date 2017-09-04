import axios from 'axios';
import {apiHeader} from '../../components/Helper';

export function getTodo() {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'todos', apiHeader());
}