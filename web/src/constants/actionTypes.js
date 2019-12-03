import createRequestTypes from '../actions';

//Navigation
export const REDIRECT = createRequestTypes('REDIRECT');

//Company
export const LOGIN_COMPANY = createRequestTypes('LOGIN_COMPANY'); 

export const GET_ME = createRequestTypes("GET_ME");

export const SIGNUP_COMPANY = createRequestTypes("SIGNUP_COMPANY");

export const FORM_PROFILE_COMPANY = createRequestTypes("FORM_PROFILE_COMPANY");