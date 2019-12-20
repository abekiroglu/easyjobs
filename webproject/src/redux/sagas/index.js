import { fork } from 'redux-saga/effects';
import { watchRedirect } from './navigation'

import {
    watchLoginCompany,
    watchGetMe,
    watchSignupCompany,
    watchUpdateCompanyProfile,
    watchDeleteCompany,
    watchHire,
    watchUploadImage,
    watchGetAdvrs,
    watchGetApps,
    watchLogout,
    watchUpdateApplication,
    watchGetStatistics
} from './company'
import {
    watchAddAdvr,
    watchDeleteAdvr,
    watchGetAdvr,
    watchGetRecommendedUsers,
    watchUpdateAdvr,
    watchClearRecommendations
} from './advertisement';
import { watchGetProfession } from './profession';

export default function* root() {
    yield fork(watchGetStatistics);
    yield fork(watchClearRecommendations);
    yield fork(watchUpdateApplication);
    yield fork(watchRedirect);
    yield fork(watchLoginCompany);
    yield fork(watchGetMe);
    yield fork(watchSignupCompany);
    yield fork(watchUpdateCompanyProfile);
    yield fork(watchAddAdvr);
    yield fork(watchGetProfession);
    yield fork(watchDeleteCompany);
    yield fork(watchHire);
    yield fork(watchUploadImage);
    yield fork(watchDeleteAdvr);
    yield fork(watchGetAdvr);
    yield fork(watchGetRecommendedUsers);
    yield fork(watchUpdateAdvr);
    yield fork(watchGetApps);
    yield fork(watchGetAdvrs);
    yield fork(watchLogout);
}
