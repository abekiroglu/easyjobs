import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_COMPANY } from '../constants/actionTypes';
import { LOCAL_STORAGE } from '../constants/misc'
import * as actions from '../actions/company';
import history from '../history';
import * as api from '../api/company';

export function* loginCompany({ body }) {
    try {
        const response = yield call(api.loginCompany, body);
        localStorage.setItem(LOCAL_STORAGE, response.user.ma);
        yield put(actions.loginCompany.success(response));
        yield call(history.push, 'REDIRECT_FROM_LOGIN_TODO');
    } catch (e) {
        yield put(actions.loginCompany.failure(e));
    }
}

export function* watchLoginCompany() {
    yield takeLatest(LOGIN_COMPANY.REQUEST, loginCompany);
}