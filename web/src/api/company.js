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
      url: `${COMPANY}`
    });
  }