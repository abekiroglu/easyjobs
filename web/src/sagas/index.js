import { fork } from 'redux-saga/effects';
import { watchRedirect } from './navigation'

import { watchLoginCompany, watchGetMe, watchSignupCompany } from './company'

export default function* root() {
    yield fork(watchRedirect);
    yield fork(watchLoginCompany);
    yield fork(watchGetMe);
    yield fork(watchSignupCompany);
}
