import { GET_PROFESSION } from '../constants/actionTypes';

const initialState = {};

export default function professionReducer(state = initialState, action) {
    switch (action.type) {

        case GET_PROFESSION.REQUEST:
            return {
                ...state
            };
        case GET_PROFESSION.SUCCESS:
            return {
                ...state,
                professions: action.response.data
            };
        case GET_PROFESSION.FAILURE:
            return {
                ...state,
                error: action.error.response.data.message
            };

        default:
            return state;
    }
}
