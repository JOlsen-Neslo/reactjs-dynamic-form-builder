import { combineReducers } from 'redux';

import authReducer from './auth.reducer';
import companyReducer from './company.reducer';
import userReducer from './user.reducer';
import systemReducer from './system.reducer';

import { USER_LOGOUT } from '../actions/auth.actions';

const appReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  user: userReducer,
  system: systemReducer,
});

/**
 * The root reducer picks up actions that affect the application state as a whole.
 * It defers to the normal application reducer above if no applicable actions are detected.
 */
const rootReducer = (state, action) => {
  switch (action.type) {
    // piggy back off auth reducer's logout action, resets the entire state
    case USER_LOGOUT:
      state = undefined;
      break;

    default:
      break;
  }

  return appReducer(state, action);
};

export default rootReducer;
