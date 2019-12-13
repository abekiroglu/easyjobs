import { GET_PROFESSION } from '../../constants/actionTypes';

const initialState = {};

export default function professionReducer(state = initialState, action) {
    switch (action.type) {

        case GET_PROFESSION.REQUEST:
            return {
                ...state,
                isLoading: true,
                status: null
            };
        case GET_PROFESSION.SUCCESS:
            return {
                ...state,
                professions: action.response.data,
                status: action.response.status,
                isLoading: false,
                hasError: false
            };
        case GET_PROFESSION.FAILURE:
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
