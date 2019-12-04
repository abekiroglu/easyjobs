import { fork } from 'redux-saga/effects';
import { watchRedirect } from './navigation'

import { watchLoginCompany, watchGetMe, watchSignupCompany, watchUpdateCompanyProfile} from './company'
import { watchAddAdvr } from './advertisement';

export default function* root() {
    yield fork(watchRedirect);
    yield fork(watchLoginCompany);
    yield fork(watchGetMe);
    yield fork(watchSignupCompany);
    yield fork(watchUpdateCompanyProfile);
    yield fork(watchAddAdvr);
}
