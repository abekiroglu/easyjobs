import axios from 'axios';
import { ADVERTISEMENT } from '../../constants/endpoints'
import { LOCAL_STORAGE } from '../../constants/misc';

export function addAdvr(body) {
  var TOKEN = localStorage.getItem(LOCAL_STORAGE);
  return axios.request({
    headers: {
      auth: TOKEN
    },
    method: 'post',
    data: body,
    url: `${ADVERTISEMENT}/`
  })
}

export function getAdvr(request) {
  var TOKEN = localStorage.getItem(LOCAL_STORAGE);
  return axios.request({
    method: 'get',
    headers: {
      auth: TOKEN
    },
    url: `${ADVERTISEMENT}/${request.advertisementId}`
  })
}
export function updateAdvr(request) {
  var TOKEN = localStorage.getItem(LOCAL_STORAGE);
  return axios.request({
    headers: {
      auth: TOKEN
    },
    method: 'patch',
    data: request.body,
    url: `${ADVERTISEMENT}/`,
    params: { advertisementId: request.advertisementId }
  })
}
export function deleteAdvr(request) {
  var TOKEN = localStorage.getItem(LOCAL_STORAGE);
  return axios.request({
    headers: {
      auth: TOKEN
    },
    method: 'delete',
    url: `${ADVERTISEMENT}/`,
    params: { advertisementId: request.advertisementId }
  })
}
export function getRecommendedUsers(request) {
  var TOKEN = localStorage.getItem(LOCAL_STORAGE);
  return axios.request({
    headers: {
      auth: TOKEN
    },
    method: 'get',
    url: `${ADVERTISEMENT}/`,
    params: { advertisementId: request.advertisementId }
  })
}