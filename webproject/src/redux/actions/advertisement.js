import { action } from '.';
import {
    ADD_ADVR,
    GET_ADVR,
    UPDATE_ADVR,
    DELETE_ADVR,
    GET_RECOMMENDED_USERS,
    CLEAR_ADS
} from '../../constants/actionTypes';

export const addAdvr = {
    request: body => action(ADD_ADVR.REQUEST, { body }),
    success: response => action(ADD_ADVR.SUCCESS, { response }),
    failure: error => action(ADD_ADVR.FAILURE, { error })
}

export const getAdvr = {
    request: body => action(GET_ADVR.REQUEST, { body }),
    success: response => action(GET_ADVR.SUCCESS, { response }),
    failure: error => action(GET_ADVR.FAILURE, { error })
}
export const updateAdvr = {
    request: body => action(UPDATE_ADVR.REQUEST, { body }),
    success: response => action(UPDATE_ADVR.SUCCESS, { response }),
    failure: error => action(UPDATE_ADVR.FAILURE, { error })
}
export const deleteAdvr = {
    request: body => action(DELETE_ADVR.REQUEST, { body }),
    success: response => action(DELETE_ADVR.SUCCESS, { response }),
    failure: error => action(DELETE_ADVR.FAILURE, { error })
}
export const getRecommendedUsers = {
    request: body => action(GET_RECOMMENDED_USERS.REQUEST, { body }),
    success: response => action(GET_RECOMMENDED_USERS.SUCCESS, { response }),
    failure: error => action(GET_RECOMMENDED_USERS.FAILURE, { error })
}

export const clearAds = {
    request: () => action(CLEAR_ADS.REQUEST, {}),
    success: response => action(CLEAR_ADS.SUCCESS, { response }),
    failure: error => action(CLEAR_ADS.FAILURE, { error })
}
