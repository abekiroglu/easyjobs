import { LOGIN_COMPANY } from '../constants/actionTypes';

const initialState = {};

export default function companyReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_COMPANY.REQUEST:
            return {
                ...state
            };
        case LOGIN_COMPANY.SUCCESS:
            return {
                ...state,
                user: action.response.user
            };
        case LOGIN_COMPANY.FAILURE:
            return {
                ...state,
                error: action.response
            };
        default:
            return state;
    }
}
