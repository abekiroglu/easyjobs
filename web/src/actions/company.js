import { action } from '.';
import {
    LOGIN_COMPANY
} from '../constants/actionTypes';

export const loginCompany = {
    request: body => action(LOGIN_COMPANY.REQUEST, { body }),
    success: response => action(LOGIN_COMPANY.SUCCESS, { response }),
    failure: error => action(LOGIN_COMPANY.FAILURE, { error })
};
