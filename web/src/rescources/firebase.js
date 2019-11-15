import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from '../constants/firebaseConfig';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
