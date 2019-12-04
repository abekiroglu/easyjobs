import axios from 'axios';
import { PROFESSION } from '../constants/endpoints'

export function getProfession() {
    var TOKEN = localStorage.getItem(LOCAL_STORAGE);
    return axios.request({
        method: 'get',
        headers: {
          auth: TOKEN
        },
        url: `${PROFESSION}/`
    })
  }
  