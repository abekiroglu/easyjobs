import { action } from '.';
import {
    ADD_ADVR
} from '../constants/actionTypes';

export const addAdvr = {
    request: body => action (ADD_ADVR.REQUEST, { body }),
    success: response => action(ADD_ADVR.SUCCESS, { response }),
    failure: error => action(ADD_ADVR.FAILURE, { error })
}