import rootReducer from './index';
import { initialState as systemState } from './system.reducer';
import { initialState as authState } from './auth.reducer';
import { initialState as userState } from './user.reducer';
import { initialState as companyState } from './company.reducer';

import { USER_LOGOUT } from '../actions/auth.actions';

describe('Root Reducer', () => {
  const initialState = ({
    system: systemState,
    auth: authState,
    user: userState,
    company: companyState,
  });

  test('returns the default state if no action is picked up', () => {
    const action = { type: 'unknown action' };

    expect(rootReducer(undefined, action)).toEqual(initialState);
  });


  test('USER_LOGOUT returns the correct state', () => {
    const action = { type: USER_LOGOUT };

    expect(rootReducer(undefined, action)).toEqual(initialState);
  });
});
