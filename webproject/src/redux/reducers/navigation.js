import {
    REDIRECT,
    POP,
    LOGOUT
} from '../../constants/actionTypes';

const initialState = {};

export default function navigationReducer(state = initialState, action) {
    switch (action.type) {
        case REDIRECT.REQUEST:
            return {
                ...state
            };
        case REDIRECT.SUCCESS:
            return {
                ...state,
                ...action.response
            };
        case REDIRECT.FAILURE:
            return {
                ...state
            };
        default:
            return state;
    }
}
