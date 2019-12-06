import {
    ADD_ADVR,
    GET_ADVR,
    UPDATE_ADVR,
    DELETE_ADVR,
    GET_RECOMMENDED_USERS
} from '../../constants/actionTypes';

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
                advertisement: action.response.data
            };
        case ADD_ADVR.FAILURE:
            return {
                ...state,
                error: action.error.response.data.message
            };
        case GET_ADVR.REQUEST:
            return {
                ...state
            };
        case GET_ADVR.SUCCESS:
            return {
                ...state,
                advertisement: action.response.data
            };
        case GET_ADVR.FAILURE:
            return {
                ...state,
                error: action.error.response.data.message
            };
        case UPDATE_ADVR.REQUEST:
            return {
                ...state
            };
        case UPDATE_ADVR.SUCCESS:
            return {
                ...state,
                advertisement: action.response.data
            };
        case UPDATE_ADVR.FAILURE:
            return {
                ...state,
                error: action.error.response.data.message
            };
        case DELETE_ADVR.REQUEST:
            return {
                ...state
            };
        case DELETE_ADVR.SUCCESS:
            return {
                ...state
            };
        case DELETE_ADVR.FAILURE:
            return {
                ...state,
                error: action.error.response.data.message
            };
        case GET_RECOMMENDED_USERS.REQUEST:
            return {
                ...state
            };
        case GET_RECOMMENDED_USERS.SUCCESS:
            return {
                ...state,
                recommendedUsers: action.response.data
            };
        case GET_RECOMMENDED_USERS.FAILURE:
            return {
                ...state,
                error: action.error.response.data.message
            };
        default:
            return state;
    }
}
