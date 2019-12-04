import axios from 'axios';
import { COMPANY } from '../constants/endpoints'

export function addAdvr(body) {
    return axios.request({
      method: 'post',
      data: body,
      url: `${COMPANY}/signup`
    })
  }
  