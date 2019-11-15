import { combineReducers } from 'redux';
import navigation from './navigation';
import company from './company'

const reducers = {
    navigation,
    company
};

export default combineReducers(reducers);
