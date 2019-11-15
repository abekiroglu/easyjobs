import { fork } from 'redux-saga/effects';
import { watchRedirect } from './navigation'

import { watchLoginCompany } from './company'

export default function* root() {
    yield fork(watchRedirect);
    yield fork(watchLoginCompany);
}
