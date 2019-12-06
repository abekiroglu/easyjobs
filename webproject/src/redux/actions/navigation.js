import { action } from '.';
import { REDIRECT } from '../../constants/actionTypes';

export const redirect = {
    request: body => action(REDIRECT.REQUEST, { body }),
    success: response => action(REDIRECT.SUCCESS, { response }),
    failure: error => action(REDIRECT.FAILURE, { error })
};