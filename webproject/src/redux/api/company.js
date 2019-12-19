import axios from 'axios';
import { LOCAL_STORAGE } from '../../constants/misc';
import { firebaseApp } from './firebase'
import { COMPANY } from '../../constants/endpoints'

export function loginCompany(body) {
  return firebaseApp.auth().signInWithEmailAndPassword(body.email, body.password)
    .then(authUser => {
      return authUser;
    })
    .catch(error => {
      return error;
    });
}

export function getMe() {
  var TOKEN = localStorage.getItem(LOCAL_STORAGE);
  return axios.request({
    method: 'get',
    headers: {
      auth: TOKEN
    },
    url: `${COMPANY}/`
  });
}


export function signupCompany(body) {
  return axios.request({
    method: 'post',
    data: body,
    url: `${COMPANY}/signup`
  })
}

export function updateProfileCompany(request) {
  var TOKEN = localStorage.getItem(LOCAL_STORAGE);
  return axios.request({
    method: 'patch',
    headers: {
      auth: TOKEN
    },
    data: request.body,
    url: `${COMPANY}/${request.id}`
  })
}

export function hire(request) {
  var TOKEN = localStorage.getItem(LOCAL_STORAGE);
  return axios.request({
    method: 'get',
    headers: {
      auth: TOKEN
    },
    data: request.body,
    url: `${COMPANY}/hire`,
    params: { advertisementId: request.advertisementId, userId: request.userId }
  })
}

export function deleteCompany() {
  var TOKEN = localStorage.getItem(LOCAL_STORAGE);
  return axios.request({
    method: 'delete',
    headers: {
      auth: TOKEN
    },
    url: `${COMPANY}/`
  })
}

export function uploadImage(body) {
  var TOKEN = localStorage.getItem(LOCAL_STORAGE);

  const formData = new FormData();
  formData.append('file', body)

  return axios.request({
    method: 'post',
    headers: {
      auth: TOKEN,
      'content-type': 'multipart/form-data'
    },
    data: formData,
    url: `${COMPANY}/upload`
  })
}

export function getAdvrs() {
  var TOKEN = localStorage.getItem(LOCAL_STORAGE);
  return axios.request({
    method: 'get',
    headers: {
      auth: TOKEN
    },
    url: `${COMPANY}/advertisements`
  })
}

export function getApps() {
  var TOKEN = localStorage.getItem(LOCAL_STORAGE);
  return axios.request({
    method: 'get',
    headers: {
      auth: TOKEN
    },
    url: `${COMPANY}/applications`
  })
}

export function updateApp(request) {
  var TOKEN = localStorage.getItem(LOCAL_STORAGE);
  return axios.request({
    method: 'patch',
    headers: {
      auth: TOKEN
    },
    data: request.body,
    url: `${COMPANY}/applications/${request.applicationId}`
  })
}