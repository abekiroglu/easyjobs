import { action } from '.';
import {
    GET_PROFESSION,
    CLEAR_PROFESSIONS
} from '../../constants/actionTypes';

export const getProfession = {
    request: () => action(GET_PROFESSION.REQUEST, {}),
    success: response => action(GET_PROFESSION.SUCCESS, { response }),
    failure: error => action(GET_PROFESSION.FAILURE, { error })
}


export const clearProfessions = {
    request: () => action(CLEAR_PROFESSIONS.REQUEST, {}),
    success: response => action(CLEAR_PROFESSIONS.SUCCESS, { response }),
    failure: error => action(CLEAR_PROFESSIONS.FAILURE, { error })
}