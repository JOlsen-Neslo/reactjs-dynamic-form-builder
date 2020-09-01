import axios from 'axios';
import {
  all,
  call,
  delay,
  put,
  takeEvery,
} from 'redux-saga/effects';
import {
  REQUEST_USER_PROFILE,
  SET_USER_PROFILE,
} from '../actions/user.actions';

import { getUserProfileRequest } from '../tools/api';

import { addSystemNotice } from '../actions/system.actions';
import { SNACK_CRITICAL } from '../components/admin/snackAlert/SnackAlert';

export function* performUserProfileRequest({ accessToken, history }) {
  try {
    // get endpoint and http request options
    const [endpoint, requestOptions] = getUserProfileRequest(accessToken);

    // make the request, save the response.data
    const { data } = yield call(axios, endpoint, requestOptions);

    // delay the state update, so the interface doesn't flash-update
    yield delay(200);

    yield put({ type: SET_USER_PROFILE, userProfile: data });
  } catch (error) {
    // TODO: Standardise error reporting

    // deal with a specific error, if detected
    if (error.response && (error.response.data.error === 'invalid_token')) {
      yield call(history.push, '/');
      return;
    }

    // will be replace with a call some central error mechanism:
    yield call(console.error, `From performUserProfileRequest: ${error.message}`);
    yield put(addSystemNotice('Fatal error while fetching your profile', SNACK_CRITICAL));
  }
}

export function* watchForUserProfileRequest() {
  yield takeEvery(REQUEST_USER_PROFILE, performUserProfileRequest);
}

export default function* userSaga() {
  yield all([watchForUserProfileRequest()]);
}
