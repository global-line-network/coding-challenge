import { combineReducers } from 'redux';
import users from './userAccount';

const rootReducer =  combineReducers({
    users
});

export default rootReducer;