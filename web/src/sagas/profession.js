import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_PROFESSION } from '../constants/actionTypes';
import * as actions from '../actions/profession';
import history from '../history';
import * as api from '../api/profession';



export function* getProfession() {
    try {
        const response = yield call(api.getProfession);
        yield put(actions.getProfession.success(response));
    } catch (e) {
        yield put(actions.getProfession.failure(e));
    }
}

export function* watchGetProfession() {
    yield takeLatest(GET_PROFESSION.REQUEST, getProfession);
}
