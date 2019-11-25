import { combineReducers } from 'redux';
import navigation from './navigation';
import company from './company'
import advertisement from './advertisement'

const reducers = {
    navigation,
    company,
    advertisement
};

export default combineReducers(reducers);
