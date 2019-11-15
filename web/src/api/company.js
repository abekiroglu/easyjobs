import axios from 'axios';
import { LOCAL_STORAGE } from '../constants/misc';
import { firebaseApp } from '../rescources/firebase'

export function loginCompany(body) {
    return firebaseApp.auth().signInWithEmailAndPassword(body.email, body.password)
        .then(authUser => {
            return authUser;
        })
        .catch(error => {
            return error;
        });
}
