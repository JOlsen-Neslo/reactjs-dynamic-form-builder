import axios from 'axios';
import {
  all,
  call,
  delay,
  put,
  takeEvery,
} from 'redux-saga/effects';

import userSaga, {
  performUserProfileRequest,
  watchForUserProfileRequest,
} from './user.saga';

import {
  REQUEST_USER_PROFILE,
  SET_USER_PROFILE,
} from '../actions/user.actions';
import { getUserProfileRequest } from '../tools/api';
import { noOp } from '../tools/helpers';

import { addSystemNotice } from '../actions/system.actions';
import { SNACK_CRITICAL } from '../components/admin/snackAlert/SnackAlert';

describe('User Saga', () => {
  describe('performUserProfileRequest', () => {
    test('with no errors', () => {
      const params = {
        accessToken: 'aw82nwod9',
        history: () => {
        },
      };

      const iterator = performUserProfileRequest(params);

      const [endpoint, requestOptions] = getUserProfileRequest(params.accessToken);

      let response = iterator.next().value;
      expect(response).toEqual(call(axios, endpoint, requestOptions));

      const testUserProfile = { username: 'test' };

      // test the intentional delay
      response = iterator.next({ data: testUserProfile }).value;
      expect(response).toEqual(delay(200));

      // call to set user profile data to state
      response = iterator.next().value;
      expect(response).toEqual(put({ type: SET_USER_PROFILE, userProfile: testUserProfile }));
    });

    test('with an "invalid_token" error', () => {
      const fakeHistory = { push: noOp };
      const iterator = performUserProfileRequest({ history: fakeHistory });

      // step into the the first `yield` in the `try` block
      iterator.next();

      const apiResponse = { response: { data: { error: 'invalid_token' } } };

      // trigger an error on the saga iterator, with a dummy api response
      const errorValue = iterator.throw(apiResponse).value;

      expect(errorValue).toEqual(call(fakeHistory.push, '/'));

      expect(iterator.next().value).toEqual(undefined);
    });

    test('with any unexpected error', () => {
      const iterator = performUserProfileRequest({});

      iterator.next();

      const errorValue = iterator.throw({ message: 'test-error' }).value;

      expect(errorValue).toEqual(call(console.error, 'From performUserProfileRequest: test-error'));

      const response = iterator.next().value;
      expect(response).toEqual(put(addSystemNotice('Fatal error while fetching your profile', SNACK_CRITICAL)));
    });
  });

  test('watchForUserProfileRequest test', () => {
    const iterator = watchForUserProfileRequest();

    expect(iterator.next().value).toEqual(takeEvery(REQUEST_USER_PROFILE, performUserProfileRequest));
  });

  test('userSaga test', () => {
    const iterator = userSaga();

    expect(iterator.next().value).toEqual(all([watchForUserProfileRequest()]));
  });
});
