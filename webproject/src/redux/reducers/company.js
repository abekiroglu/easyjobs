import {
    LOGIN_COMPANY,
    GET_ME,
    SIGNUP_COMPANY,
    UPDATE_PROFILE_COMPANY,
    HIRE, DELETE_COMPANY,
    UPLOAD_IMAGE
} from '../../constants/actionTypes';

const initialState = {};

export default function companyReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_COMPANY.REQUEST:
            return {
                ...state,
                error: null
            };
        case LOGIN_COMPANY.SUCCESS:
            return {
                ...state,
                firebaseUser: action.response.user
            };
        case LOGIN_COMPANY.FAILURE:
            return {
                ...state,
                error: action.error.message
            };

        case GET_ME.REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                hasError: false
            };
        case GET_ME.SUCCESS:
            debugger;
            return {
                ...state,
                status: action.response.status,
                company: action.response.data,
                isLoading: false
            };
        case GET_ME.FAILURE:
            return {
                ...state,
                error: action.error,
                isLoading: false,
                hasError: true
            };

        case SIGNUP_COMPANY.REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                hasError: false
            };
        case SIGNUP_COMPANY.SUCCESS:
            return {
                ...state,
                status: action.response.status,
                company: action.response.data,
                isLoading: false
            };
        case SIGNUP_COMPANY.FAILURE:
            return {
                ...state,
                error: action.error.response.data.message,
                status: action.error.response.status,
                isLoading: false,
                hasError: true
            };

        case UPDATE_PROFILE_COMPANY.REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                hasError: false,
            };
        case UPDATE_PROFILE_COMPANY.SUCCESS:
            return {
                ...state,
                status: action.response.status,
                company: action.response.data,
                isLoading: false
            };
        case UPDATE_PROFILE_COMPANY.FAILURE:
            return {
                ...state,
                error: action.error.response.data.message,
                status: action.error.response.status,
                isLoading: false,
                hasError: true
            };
        case HIRE.REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                hasError: false,
            };
        case HIRE.SUCCESS:
            return {
                ...state,
                status: action.response.status,
                application: action.response.data,
                isLoading: false
            };
        case HIRE.FAILURE:
            return {
                ...state,
                error: action.error.response.data.message,
                status: action.error.response.status,
                isLoading: false,
                hasError: true
            };
        case DELETE_COMPANY.REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                hasError: false,
            };
        case DELETE_COMPANY.SUCCESS:
            return {
                ...state,
                status: action.response.status,
                isLoading: false
            };
        case DELETE_COMPANY.FAILURE:
            return {
                ...state,
                error: action.error.response.data.message,
                status: action.error.response.status,
                isLoading: false,
                hasError: true
            };
        case UPLOAD_IMAGE.REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                hasError: false
            };
        case UPLOAD_IMAGE.SUCCESS:
            return {
                ...state,
                status: action.response.status,
                isLoading: false,
                company: { ...state.company, picture: action.response.data }
            };
        case UPLOAD_IMAGE.FAILURE:
            return {
                ...state,
                error: action.error.response.data.message,
                status: action.error.response.status,
                isLoading: false,
                hasError: true
            };

        default:
            return state;
    }
}
