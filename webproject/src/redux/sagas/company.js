import { call, put, takeLatest } from 'redux-saga/effects';
import {
    LOGIN_COMPANY,
    GET_ME,
    SIGNUP_COMPANY,
    UPDATE_PROFILE_COMPANY,
    DELETE_COMPANY,
    HIRE,
    UPLOAD_IMAGE,
    GET_ADVRS,
    GET_APPS,
    LOGOUT
} from '../../constants/actionTypes';
import { LOCAL_STORAGE } from '../../constants/misc'
import * as actions from '../actions/company';
import history from '../../history';
import * as api from '../api/company';

export function* loginCompany({ body }) {
    try {
        const response = yield call(api.loginCompany, body);
        if (response.user) {
            localStorage.setItem(LOCAL_STORAGE, response.user.ma);
            yield put(actions.loginCompany.success(response));
        } else {
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
        yield call(history.push, '/admin')
    } catch (e) {
        yield put(actions.getMe.failure(e));
    }
}

export function* signupCompany({ body }) {
    try {
        const response = yield call(api.signupCompany, body);
        yield put(actions.signupCompany.success(response));
    } catch (e) {
        yield put(actions.signupCompany.failure(e));
    }
}

export function* updateProfileCompany({ body }) {
    try {
        const response = yield call(api.updateProfileCompany, body);
        yield put(actions.updateProfileCompany.success(response));
    } catch (e) {
        yield put(actions.updateProfileCompany.failure(e));
    }
}

export function* deleteCompany() {
    try {
        const response = yield call(api.deleteCompany);
        yield put(actions.deleteCompany.success(response));
    } catch (e) {
        yield put(actions.deleteCompany.failure(e));
    }
}

export function* hire({ body }) {
    try {
        const response = yield call(api.hire, body);
        yield put(actions.hire.success(response));
    } catch (e) {
        yield put(actions.hire.failure(e));
    }
}

export function* uploadImage({ body }) {
    try {
        const response = yield call(api.uploadImage, body);
        yield put(actions.uploadImage.success(response));
    } catch (e) {
        yield put(actions.uploadImage.failure(e));
    }
}

export function* getAdvrs() {
    try {
        const response = yield call(api.getAdvrs);
        yield put(actions.getAdvrs.success(response));
    } catch (e) {
        yield put(actions.getAdvrs.failure(e));
    }
}

export function* getApps() {
    try {
        const response = yield call(api.getApps);
        yield put(actions.getApps.success(response));
    } catch (e) {
        yield put(actions.getApps.failure(e));
    }
}

export function* logout() {
    yield put(actions.logout.success());
    localStorage.removeItem(LOCAL_STORAGE);
    yield call(history.push, '/landing/login')
    debugger;
}

export function* watchLogout() {
    yield takeLatest(LOGOUT.REQUEST, logout)
}

export function* watchGetAdvrs() {
    yield takeLatest(GET_ADVRS.REQUEST, getAdvrs)
}

export function* watchGetApps() {
    yield takeLatest(GET_APPS.REQUEST, getApps)
}

export function* watchDeleteCompany() {
    yield takeLatest(DELETE_COMPANY.REQUEST, deleteCompany)
}

export function* watchHire() {
    yield takeLatest(HIRE.REQUEST, hire)
}

export function* watchUploadImage() {
    yield takeLatest(UPLOAD_IMAGE.REQUEST, uploadImage)
}

export function* watchGetMe() {
    yield takeLatest(GET_ME.REQUEST, getMe)
}

export function* watchLoginCompany() {
    yield takeLatest(LOGIN_COMPANY.REQUEST, loginCompany);
}

export function* watchSignupCompany() {
    yield takeLatest(SIGNUP_COMPANY.REQUEST, signupCompany);
}

export function* watchUpdateCompanyProfile() {
    yield takeLatest(UPDATE_PROFILE_COMPANY.REQUEST, updateProfileCompany);
}

