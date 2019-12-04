import { ADD_ADVR } from '../constants/actionTypes';

const initialState = {};

export default function advertisementReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_ADVR.REQUEST:
            return {
                ...state
            };
        case ADD_ADVR.SUCCESS:
            return {
                ...state,
                user: action.response.user
            };
        case ADD_ADVR.FAILURE:
            return {
                ...state,
                error: action.error.message
            };

        default:
            return state;
    }
}
