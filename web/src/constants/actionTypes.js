import createRequestTypes from '../actions';

//Navigation
export const REDIRECT = createRequestTypes('REDIRECT');

//Company
export const LOGIN_COMPANY = createRequestTypes('LOGIN_COMPANY');

export const SIGNUP_COMPANY = createRequestTypes("SIGNUP_COMPANY");

export const GET_ME = createRequestTypes("GET_ME");

export const UPDATE_PROFILE_COMPANY = createRequestTypes("UPDATE_PROFILE_COMPANY");

export const DELETE_COMPANY = createRequestTypes("DELETE_COMPANY");

export const UPLOAD_IMAGE = createRequestTypes("UPLOAD_IMAGE");

export const HIRE = createRequestTypes("HIRE");

//Advertisement
export const ADD_ADVR = createRequestTypes("ADD_ADVR");

//Profession
export const GET_PROFESSION = createRequestTypes("GET_PROFESSION");


