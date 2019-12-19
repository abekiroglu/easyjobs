import {
    ADD_ADVR,
    GET_ADVR,
    UPDATE_ADVR,
    DELETE_ADVR,
    GET_RECOMMENDED_USERS,
    CLEAR_ADS,
    CLEAR_RECOMMENDATIONS
} from '../../constants/actionTypes';

const initialState = {};

export default function advertisementReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ADVR.REQUEST:
            return {
                ...state,
                status: null
            };
        case ADD_ADVR.SUCCESS:
            return {
                ...state,
                status: action.response.status,
                advertisement: action.response.data
            };
        case ADD_ADVR.FAILURE:
            return {
                ...state,
                status: action.error.response.status,
                error: action.error.response.data.message
            };
        case GET_ADVR.REQUEST:
            return {
                ...state,
                status: null
            };
        case GET_ADVR.SUCCESS:
            return {
                ...state,
                status: action.response.status,
                advertisement: action.response.data
            };
        case GET_ADVR.FAILURE:
            return {
                ...state,
                status: action.error.response.status,
                error: action.error.response.data.message
            };
        case UPDATE_ADVR.REQUEST:
            return {
                ...state,
                status: null
            };
        case UPDATE_ADVR.SUCCESS:
            return {
                ...state,
                status: action.response.status,
                advertisement: action.response.data
            };
        case UPDATE_ADVR.FAILURE:
            return {
                ...state,
                status: action.error.response.status,
                error: action.error.response.data.message
            };
        case DELETE_ADVR.REQUEST:
            return {
                ...state,
                status: null
            };
        case DELETE_ADVR.SUCCESS:
            return {
                ...state,
                status: action.response.status
            };
        case DELETE_ADVR.FAILURE:
            return {
                ...state,
                status: action.error.response.status,
                error: action.error.response.data.message
            };
        case GET_RECOMMENDED_USERS.REQUEST:
            return {
                ...state,
                status: null
            };
        case GET_RECOMMENDED_USERS.SUCCESS:
            return {
                ...state,
                status: action.response.status,
                recommendedUsers: action.response.data
            };
        case GET_RECOMMENDED_USERS.FAILURE:
            return {
                ...state,
                status: action.error.response.status,
                error: action.error.response.data.message
            };
        case CLEAR_ADS.SUCCESS:
            return initialState;
        case CLEAR_RECOMMENDATIONS.SUCCESS:
            return {
                ...state,
                recommendedUsers: null
            }
        default:
            return state;
    }
}
