import { action } from '.';
import {
    LOGIN_COMPANY,
    GET_ME,
    SIGNUP_COMPANY,
    UPDATE_PROFILE_COMPANY,
    DELETE_COMPANY,
    UPLOAD_IMAGE,
    HIRE,
    PUT_ADVR,
    PUT_ADVRS,
    GET_ADVRS,
    GET_APPS,
    UPDATE_APP,
    LOGOUT
} from '../../constants/actionTypes';

export const loginCompany = {
    request: body => action(LOGIN_COMPANY.REQUEST, { body }),
    success: response => action(LOGIN_COMPANY.SUCCESS, { response }),
    failure: error => action(LOGIN_COMPANY.FAILURE, { error })
};

export const getMe = {
    request: () => action(GET_ME.REQUEST, {}),
    success: response => action(GET_ME.SUCCESS, { response }),
    failure: error => action(GET_ME.FAILURE, { error })
}

export const signupCompany = {
    request: body => action(SIGNUP_COMPANY.REQUEST, { body }),
    success: response => action(SIGNUP_COMPANY.SUCCESS, { response }),
    failure: error => action(SIGNUP_COMPANY.FAILURE, { error })
}

export const updateProfileCompany = {
    request: body => action(UPDATE_PROFILE_COMPANY.REQUEST, { body }),
    success: response => action(UPDATE_PROFILE_COMPANY.SUCCESS, { response }),
    failure: error => action(UPDATE_PROFILE_COMPANY.FAILURE, { error })
}

export const deleteCompany = {
    request: () => action(DELETE_COMPANY.REQUEST, {}),
    success: response => action(DELETE_COMPANY.SUCCESS, { response }),
    failure: error => action(DELETE_COMPANY.FAILURE, { error })
}

export const uploadImage = {
    request: body => action(UPLOAD_IMAGE.REQUEST, { body }),
    success: response => action(UPLOAD_IMAGE.SUCCESS, { response }),
    failure: error => action(UPLOAD_IMAGE.FAILURE, { error })
}

export const hire = {
    request: (body) => action(HIRE.REQUEST, { body }),
    success: response => action(HIRE.SUCCESS, { response }),
    failure: error => action(HIRE.FAILURE, { error })
}

export const putAdvr = {
    request: () => action(PUT_ADVR.REQUEST, {}),
    success: response => action(PUT_ADVR.SUCCESS, { response }),
    failure: error => action(PUT_ADVR.FAILURE, { error })
}

export const putAdvrs = {
    request: () => action(PUT_ADVRS.REQUEST, {}),
    success: response => action(PUT_ADVRS.SUCCESS, { response }),
    failure: error => action(PUT_ADVRS.FAILURE, { error })
}

export const logout = {
    request: () => action(LOGOUT.REQUEST, {}),
    success: response => action(LOGOUT.SUCCESS, { response }),
    failure: error => action(LOGOUT.FAILURE, { error })
}

export const getAdvrs = {
    request: () => action(GET_ADVRS.REQUEST, {}),
    success: response => action(GET_ADVRS.SUCCESS, { response }),
    failure: error => action(GET_ADVRS.FAILURE, { error })
}

export const getApps = {
    request: () => action(GET_APPS.REQUEST, {}),
    success: response => action(GET_APPS.SUCCESS, { response }),
    failure: error => action(GET_APPS.FAILURE, { error })
}

export const updateApp = {
    request: body => action(UPDATE_APP.REQUEST, { body }),
    success: response => action(UPDATE_APP.SUCCESS, { response }),
    failure: error => action(UPDATE_APP.FAILURE, { error })
}