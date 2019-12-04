import axios from 'axios';
import { ADVERTISEMENT } from '../constants/endpoints'

export function addAdvr(body) {
    return axios.request({
      method: 'post',
      data: body,
      url: `${ADVERTISEMENT}/`
    })
  }
  