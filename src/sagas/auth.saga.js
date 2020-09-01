import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  AUTH_FAILURE,
  AUTH_SUCCESS,
  CREATE_PASSWORD_FAILURE,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  REQUEST_AUTH,
  REQUEST_CREATE_PASSWORD,
  REQUEST_FORGOT_PASSWORD,
  REQUEST_REGISTER,
  REQUEST_RESET_PASSWORD,
  REQUEST_VALIDATE_EMAIL_CONFIRMATION,
  REQUEST_VALIDATE_PASSWORD_RESET_TOKEN,
  RESET_PASSWORD_FAILURE,
  USER_LOGOUT,
  VALIDATE_EMAIL_CONFIRMATION_FAILURE,
  VALIDATE_EMAIL_CONFIRMATION_SUCCESS,
  VALIDATE_PASSWORD_RESET_TOKEN_FAILURE,
  VALIDATE_PASSWORD_RESET_TOKEN_SUCCESS,
} from '../actions/auth.actions';
import {
  getAuthRequest,
  getCreatePasswordRequest,
  getForgottenPasswordRequest,
  getRegisterRequest,
  getResetPasswordRequest,
  getValidateEmailConfirmationTokenRequest,
  getValidatePasswordResetTokenRequest,
} from '../tools/api/endpoints/auth.endpoints';
import {
  deleteAccessTokenCookie,
  setAccessTokenCookie,
} from '../tools/auth';

export function* performAuth({ username, password, history }) {
  try {
    // get endpoint and http request options
    const [endpoint, requestOptions] = getAuthRequest(username, password);

    // make the request, save the response.data
    const { data } = yield call(axios, endpoint, requestOptions);

    // trigger a success action, sending the payload data
    yield put({ type: AUTH_SUCCESS, payload: data });

    // set the authentication cookie with the `access_token`
    yield call(setAccessTokenCookie, data.access_token);

    // do role checks, decide where to redirect user to
    yield call(history.push, '/admin/home');
  } catch (e) {
    yield put({ type: AUTH_FAILURE });
  }
}

export function* watchForLogin() {
  yield takeLatest(REQUEST_AUTH, performAuth);
}

export function* performForgotPasswordRequest({ email }) {
  try {
    // get endpoint and http request options
    const [endpoint, requestOptions] = getForgottenPasswordRequest(email);

    // make the request, save the response.data
    const { data } = yield call(axios, endpoint, requestOptions);

    // trigger a success action, sending the payload data
    yield put({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: FORGOT_PASSWORD_FAILURE, payload: error.response });
  }
}

export function* watchForForgottenPassword() {
  yield takeLatest(REQUEST_FORGOT_PASSWORD, performForgotPasswordRequest);
}

export function* performRegisterRequest({ fullName, email, country }) {
  try {
    // get endpoint and http request options
    const [endpoint, requestOptions] = getRegisterRequest(fullName, email, country);

    // make the request, save the response.data
    const { data } = yield call(axios, endpoint, requestOptions);

    // trigger a success action, sending the payload data
    yield put({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: REGISTER_FAILURE });
  }
}

export function* watchForRegister() {
  yield takeLatest(REQUEST_REGISTER, performRegisterRequest);
}

export function* performValidateEmailConfirmationToken({ user, token }) {
  try {
    // get endpoint and http request options
    const [endpoint, requestOptions] = getValidateEmailConfirmationTokenRequest(user, token);

    // make the request, save the response.data
    const { data } = yield call(axios, endpoint, requestOptions);

    // trigger a success action, sending the payload data
    yield put({ type: VALIDATE_EMAIL_CONFIRMATION_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: VALIDATE_EMAIL_CONFIRMATION_FAILURE });
  }
}

export function* watchForValidateEmailConfirmationToken() {
  yield takeLatest(REQUEST_VALIDATE_EMAIL_CONFIRMATION, performValidateEmailConfirmationToken);
}

export function* performCreatePassword({
  user, newPassword, passwordConfirmation, history,
}) {
  try {
    // get endpoint and http request options
    const [endpoint, requestOptions] = getCreatePasswordRequest(user, newPassword, passwordConfirmation);

    // make the request
    yield call(axios, endpoint, requestOptions);

    // redirect user to login on create password success.
    yield call(history.push, '/');
  } catch (error) {
    yield put({ type: CREATE_PASSWORD_FAILURE, payload: error.response });
  }
}

export function* watchForCreatePassword() {
  yield takeLatest(REQUEST_CREATE_PASSWORD, performCreatePassword);
}

export function* watchForValidateResetPasswordToken() {
  yield takeLatest(REQUEST_VALIDATE_PASSWORD_RESET_TOKEN, performValidateResetToken);
}

export function* performValidateResetToken({ user, token }) {
  try {
    // get endpoint and http request options
    const [endpoint, requestOptions] = getValidatePasswordResetTokenRequest(user, token);

    // make the request, save the response.data
    const { data } = yield call(axios, endpoint, requestOptions);

    // trigger a success action, sending the payload data
    yield put({ type: VALIDATE_PASSWORD_RESET_TOKEN_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: VALIDATE_PASSWORD_RESET_TOKEN_FAILURE });
  }
}

export function* performResetPassword({
  user, newPassword, passwordConfirmation, history,
}) {
  try {
    // get endpoint and http request options
    const [endpoint, requestOptions] = getResetPasswordRequest(user, newPassword, passwordConfirmation);

    // make the request
    yield call(axios, endpoint, requestOptions);

    // redirect user to login on create password success.
    yield call(history.push, '/');
  } catch (error) {
    yield put({ type: RESET_PASSWORD_FAILURE, payload: error.response });
  }
}

export function* watchForResetPassword() {
  yield takeLatest(REQUEST_RESET_PASSWORD, performResetPassword);
}

/// Delete the cookie on user logout. This will trigger a redirect to login on the container.
export function* performLogout() {
  yield call(deleteAccessTokenCookie);
}

export function* watchForLogout() {
  yield takeLatest(USER_LOGOUT, performLogout);
}

export default function* authSaga() {
  yield all([
    watchForLogin(),
    watchForForgottenPassword(),
    watchForRegister(),
    watchForValidateEmailConfirmationToken(),
    watchForCreatePassword(),
    watchForValidateResetPasswordToken(),
    watchForResetPassword(),
    watchForLogout(),
  ]);
}
