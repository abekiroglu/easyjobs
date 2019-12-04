import { call, put, takeLatest } from 'redux-saga/effects';
import { ADD_ADVR } from '../constants/actionTypes';
import * as actions from '../actions/advertisement';
import history from '../history';
import * as api from '../api/advertisement';


export function* addAdvr({ body }) {
    try {
        debugger;
        const response = yield call(api.addAdvr, body);
        yield put(actions.addAdvr.success(response));
    } catch (e) {
        yield put(actions.addAdvr.failure(e));
    }
}

export function* watchAddAdvr() {
    yield takeLatest(ADD_ADVR.REQUEST, addAdvr);
}
