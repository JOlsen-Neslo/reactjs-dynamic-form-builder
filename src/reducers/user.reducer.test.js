import userReducer, { initialState } from './user.reducer';
import {
  REQUEST_USER_PROFILE,
  SET_USER_PROFILE,
  requestUserProfile,
} from '../actions/user.actions';

describe('User Reducer', () => {
  test('requestUserProfile creates the action correctly', () => {
    const action = requestUserProfile('token', 'history');

    expect(action).toEqual({
      type: REQUEST_USER_PROFILE,
      accessToken: 'token',
      history: 'history',
    });
  });

  test('initialState is correct', () => {
    const action = { type: 'INVALID_ACTION' };
    expect(userReducer(undefined, action)).toEqual(initialState);
  });

  test('SET_USER_PROFILE returns the correct state', () => {
    const userProfile = {
      id: 10,
      companyId: 5,
      firstName: 'Bob',
      lastName: 'Builder',
      username: 'test-user',
      email: 'test@user.com',
      mobileNumber: '082',
    };

    const action = {
      type: SET_USER_PROFILE,
      userProfile,
    };

    const expectedState = {
      ...initialState,
      ...userProfile,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });
});
