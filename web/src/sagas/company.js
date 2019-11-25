import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_COMPANY, GET_ME } from '../constants/actionTypes';
import { LOCAL_STORAGE } from '../constants/misc'
import * as actions from '../actions/company';
import history from '../history';
import * as api from '../api/company';

export function* loginCompany({ body }) {
    try {
        const response = yield call(api.loginCompany, body);
        if(response.user){
            localStorage.setItem(LOCAL_STORAGE, response.user.ma);
            yield put(actions.loginCompany.success(response));
            yield call(history.push, '/main')
        }else{
            throw response;
        }
    } catch (e) {
        yield put(actions.loginCompany.failure(e));
    }
}

export function* getMe() {
    try {
        const response = yield call(api.getMe);
        yield put(actions.getMe.success(response));
    } catch (e) {
        yield put(actions.getMe.failure(e));
    }
}

export function*  watchGetMe() {
    yield takeLatest(GET_ME.REQUEST, getMe)
}

export function* watchLoginCompany() {
    yield takeLatest(LOGIN_COMPANY.REQUEST, loginCompany);
}