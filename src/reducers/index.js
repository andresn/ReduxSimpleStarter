import { combineReducers } from 'redux';
import usersReducer from './users';

const rootReducer = combineReducers({
    // state: (state = {}) => state
    users: usersReducer
});

export default rootReducer;
