import { fork } from 'redux-saga/effects';
import { watchRedirect } from './navigation'

import { watchLoginCompany, watchGetMe, watchSignupCompany, watchformCompanyProfile } from './company'

export default function* root() {
    yield fork(watchRedirect);
    yield fork(watchLoginCompany);
    yield fork(watchGetMe);
    yield fork(watchSignupCompany);
    yield fork(watchformCompanyProfile);
}
