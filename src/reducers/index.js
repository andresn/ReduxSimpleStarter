import { combineReducers } from 'redux';
// import { reducer } from 'redux-form';
import { reducer as form } from 'redux-form';
import auth from './auth_reducer';
import feature from './feature';

const rootReducer = combineReducers({
  // state: (state = {}) => state
  auth,
  // form: form // my form property of state is going to be produced by my redux form reducer.
  form,
  feature
});

export default rootReducer;
