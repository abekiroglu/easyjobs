import axios from 'axios';
import { LOCAL_STORAGE } from '../constants/misc';
import { firebaseApp } from '../rescources/firebase'
import { COMPANY } from '../constants/endpoints'

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
  debugger;
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
