import {
    LOGIN_COMPANY,
    GET_ME,
    SIGNUP_COMPANY,
    UPDATE_PROFILE_COMPANY,
    HIRE, DELETE_COMPANY,
    UPLOAD_IMAGE,
    PUT_ADVR,
    GET_ADVRS,
    GET_APPS,
    LOGOUT
} from '../../constants/actionTypes';
import Logout from 'views/Logout/Logout';

const initialState = {};

export default function companyReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_COMPANY.REQUEST:
            return {
                ...state,
                error: null,
                status: null
            };
        case LOGIN_COMPANY.SUCCESS:
            return {
                ...state,
                firebaseUser: action.response.user
            };
        case LOGIN_COMPANY.FAILURE:
            return {
                ...state,
                error: action.error.message,
                status: 401
            };

        case GET_ME.REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                hasError: false,
                status: null
            };
        case GET_ME.SUCCESS:
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
                hasError: false,
                status: null
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
                status: null
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
                status: null
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
                status: null
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
                hasError: false,
                status: null
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
        case PUT_ADVR.SUCCESS:
            return {
                ...state,
                company: {
                    ...state.company,
                    advertisements: [...state.company.advertisements,
                    { ...action.response, comments: [] }]
                }
            }
        case LOGOUT.SUCCESS:
            return initialState;
        case GET_ADVRS.REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                hasError: false,
                status: null
            };
        case GET_ADVRS.SUCCESS:
            return {
                ...state,
                status: action.response.status,
                isLoading: false,
                advertisements: action.response.data
            };
        case GET_ADVRS.FAILURE:
            return {
                ...state,
                error: action.error.response.data.message,
                status: action.error.response.status,
                isLoading: false,
                hasError: true
            };

        case GET_APPS.REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                hasError: false,
                status: null
            };
        case GET_APPS.SUCCESS:
            return {
                ...state,
                status: action.response.status,
                isLoading: false,
                applications: action.response.data
            };
        case GET_APPS.FAILURE:
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
