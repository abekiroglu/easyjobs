import { action } from '.';
import {
    LOGIN_COMPANY,
    GET_ME,
    SIGNUP_COMPANY,
    UPDATE_PROFILE_COMPANY
} from '../constants/actionTypes';

export const loginCompany = {
    request: body => action(LOGIN_COMPANY.REQUEST, { body }),
    success: response => action(LOGIN_COMPANY.SUCCESS, { response }),
    failure: error => action(LOGIN_COMPANY.FAILURE, { error })
};

export const getMe = {
    request: () => action(GET_ME.REQUEST, { }),
    success: response => action(GET_ME.SUCCESS, { response }),
    failure: error => action(GET_ME.FAILURE, { error })
}

export const signupCompany = {
    request: body => action (SIGNUP_COMPANY.REQUEST, { body }),
    success: response => action(SIGNUP_COMPANY.SUCCESS, { response }),
    failure: error => action(SIGNUP_COMPANY.FAILURE, { error })
}

export const updateProfileCompany = {
    request: body => action (UPDATE_PROFILE_COMPANY.REQUEST, { body }),
    success: response => action(UPDATE_PROFILE_COMPANY.SUCCESS, { response }),
    failure: error => action(UPDATE_PROFILE_COMPANY.FAILURE, { error })
}
