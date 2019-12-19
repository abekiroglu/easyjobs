import { call, put, takeLatest } from 'redux-saga/effects';
import {
    ADD_ADVR,
    GET_ADVR,
    UPDATE_ADVR,
    DELETE_ADVR,
    GET_RECOMMENDED_USERS,
} from '../../constants/actionTypes';
import * as actions from '../actions/advertisement';
import { putAdvr } from '../actions/company'
import * as api from '../api/advertisement';


export function* addAdvr({ body }) {
    try {
        const response = yield call(api.addAdvr, body);
        yield put(actions.addAdvr.success(response));
        yield put(putAdvr.success(response.data));
    } catch (e) {
        yield put(actions.addAdvr.failure(e));
    }
}

export function* getAdvr({ body }) {
    try {
        const response = yield call(api.getAdvr, body);
        yield put(actions.getAdvr.success(response));
    } catch (e) {
        yield put(actions.getAdvr.failure(e));
    }
}

export function* updateAdvr({ body }) {
    try {
        const response = yield call(api.updateAdvr, body);
        yield put(actions.updateAdvr.success(response));
    } catch (e) {
        yield put(actions.updateAdvr.failure(e));
    }
}

export function* deleteAdvr({ body }) {
    try {
        const response = yield call(api.deleteAdvr, body);
        yield put(actions.deleteAdvr.success(response));
    } catch (e) {
        yield put(actions.deleteAdvr.failure(e));
    }
}

export function* getRecommendedUsers({ body }) {
    try {
        const response = yield call(api.getRecommendedUsers, body);
        yield put(actions.getRecommendedUsers.success(response));
    } catch (e) {
        yield put(actions.getRecommendedUsers.failure(e));
    }
}

export function* watchAddAdvr() {
    yield takeLatest(ADD_ADVR.REQUEST, addAdvr);
}

export function* watchGetAdvr() {
    yield takeLatest(GET_ADVR.REQUEST, getAdvr);
}

export function* watchUpdateAdvr() {
    yield takeLatest(UPDATE_ADVR.REQUEST, updateAdvr);
}

export function* watchDeleteAdvr() {
    yield takeLatest(DELETE_ADVR.REQUEST, deleteAdvr);
}

export function* watchGetRecommendedUsers() {
    yield takeLatest(GET_RECOMMENDED_USERS.REQUEST, getRecommendedUsers);
}