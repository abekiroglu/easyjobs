import { combineReducers } from 'redux';
import navigation from './navigation';
import company from './company'
import advertisement from './advertisement'
import profession from './profession'


const reducers = {
    navigation,
    company,
    advertisement,
    profession
};

export default combineReducers(reducers);
