import { call, put, takeLatest } from 'redux-saga/effects';
import { REDIRECT } from '../../constants/actionTypes';
import * as actions from '../actions/navigation';
import history from '../../history';

export function* redirect({ body }) {
    try {
        yield put(actions.redirect.success(body));
        yield call(history.push, body.path);
    } catch (e) {
        yield put(actions.redirect.failure(e));
    }
}

export function* watchRedirect() {
    yield takeLatest(REDIRECT.REQUEST, redirect);
}