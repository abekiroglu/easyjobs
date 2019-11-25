import { fork } from 'redux-saga/effects';
import { watchRedirect } from './navigation'

import { watchLoginCompany, watchGetMe } from './company'

export default function* root() {
    yield fork(watchRedirect);
    yield fork(watchLoginCompany);
    yield fork(watchGetMe);
}
