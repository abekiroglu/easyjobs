import { action } from '.';
import {
    GET_PROFESSION
} from '../../constants/actionTypes';

export const getProfession = {
    request: () => action(GET_PROFESSION.REQUEST, {}),
    success: response => action(GET_PROFESSION.SUCCESS, { response }),
    failure: error => action(GET_PROFESSION.FAILURE, { error })
}