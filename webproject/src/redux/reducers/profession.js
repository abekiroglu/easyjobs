import { GET_PROFESSION } from '../../constants/actionTypes';

const initialState = {};

export default function professionReducer(state = initialState, action) {
    switch (action.type) {

        case GET_PROFESSION.REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case GET_PROFESSION.SUCCESS:
            return {
                ...state,
                professions: action.response.data,
                isLoading: false,
                hasError: false
            };
        case GET_PROFESSION.FAILURE:
            return {
                ...state,
                error: action.error.response.data.message,
                isLoading: false,
                hasError: true
            };

        default:
            return state;
    }
}
