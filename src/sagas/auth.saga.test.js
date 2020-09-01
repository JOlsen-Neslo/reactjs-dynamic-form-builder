import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import axios from 'axios';
import authSaga, {
  performAuth,
  performCreatePassword,
  performForgotPasswordRequest,
  performRegisterRequest,
  performResetPassword,
  performValidateEmailConfirmationToken,
  performValidateResetToken,
  watchForCreatePassword,
  watchForForgottenPassword,
  watchForLogin,
  watchForLogout,
  watchForRegister,
  watchForResetPassword,
  watchForValidateEmailConfirmationToken,
  watchForValidateResetPasswordToken,
} from './auth.saga';
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
import { noOp } from '../tools/helpers';
import { setAccessTokenCookie } from '../tools/auth';

describe('Auth Saga', () => {
  test('authSaga test', () => {
    const gen = authSaga();

    expect(gen.next().value).toEqual(all([
      watchForLogin(),
      watchForForgottenPassword(),
      watchForRegister(),
      watchForValidateEmailConfirmationToken(),
      watchForCreatePassword(),
      watchForValidateResetPasswordToken(),
      watchForResetPassword(),
      watchForLogout(),
    ]));
  });

  describe('auth logic', () => {
    describe('performAuth', () => {
      test('with no errors', () => {
        const fakeHistory = { push: noOp };
        const params = { username: 'test', password: 'testpass', history: fakeHistory };
        const iterator = performAuth(params);

        const [endpoint, requestOptions] = getAuthRequest(params.username, params.password);

        let response = iterator.next().value;
        expect(response).toEqual(call(axios, endpoint, requestOptions));

        const testPayload = { access_token: 'test-token' };
        response = iterator.next({ data: testPayload }).value;
        expect(response).toEqual(put({ type: AUTH_SUCCESS, payload: testPayload }));

        response = iterator.next().value;
        expect(response).toEqual(call(setAccessTokenCookie, testPayload.access_token));

        response = iterator.next().value;
        expect(response).toEqual(call(fakeHistory.push, '/admin/home'));
      });

      test('with errors', () => {
        const iterator = performAuth({});

        iterator.next();

        const errorValue = iterator.throw().value;

        expect(errorValue).toEqual(put({ type: AUTH_FAILURE }));
      });
    });

    test('watchForLogin test', () => {
      const gen = watchForLogin();

      expect(gen.next().value).toEqual(takeLatest(REQUEST_AUTH, performAuth));
    });
  });

  describe('password logic', () => {
    describe('performForgotPasswordRequest', () => {
      test('with no errors', () => {
        const iterator = performForgotPasswordRequest({ email: 'test' });

        const [endpoint, requestOptions] = getForgottenPasswordRequest('test');

        let response = iterator.next().value;
        expect(response).toEqual(call(axios, endpoint, requestOptions));

        const testPayload = {
          userId: 1,
          access_token: 'test token',
          token_type: 'RESET_PASSWORD',
          links: [],
        };

        response = iterator.next({ data: testPayload }).value;
        expect(response).toEqual(put({ type: FORGOT_PASSWORD_SUCCESS, payload: testPayload }));
      });

      test('with errors', () => {
        const iterator = performForgotPasswordRequest({ email: 'test' });

        iterator.next();

        const errorValue = iterator.throw({
          response: 'test',
        }).value;

        expect(errorValue).toEqual(put({ type: FORGOT_PASSWORD_FAILURE, payload: 'test' }));
      });
    });

    test('watchForForgottenPassword test', () => {
      const gen = watchForForgottenPassword();

      expect(gen.next().value).toEqual(takeLatest(REQUEST_FORGOT_PASSWORD, performForgotPasswordRequest));
    });

    describe('performValidateResetToken', () => {
      test('with no errors', () => {
        const iterator = performValidateResetToken({ user: 1, token: 'test' });

        const [endpoint, requestOptions] = getValidatePasswordResetTokenRequest(1, 'test');

        let response = iterator.next().value;
        expect(response).toEqual(call(axios, endpoint, requestOptions));

        const testPayload = {
          links: [{}, {}],
        };

        response = iterator.next({ data: testPayload }).value;
        expect(response).toEqual(put({ type: VALIDATE_PASSWORD_RESET_TOKEN_SUCCESS, payload: testPayload }));
      });

      test('with errors', () => {
        const iterator = performValidateResetToken({ user: 1, token: 'test' });

        iterator.next();

        const errorValue = iterator.throw().value;

        expect(errorValue).toEqual(put({ type: VALIDATE_PASSWORD_RESET_TOKEN_FAILURE }));
      });
    });

    test('watchForValidateResetPasswordToken test', () => {
      const gen = watchForValidateResetPasswordToken();

      expect(gen.next().value).toEqual(takeLatest(REQUEST_VALIDATE_PASSWORD_RESET_TOKEN, performValidateResetToken));
    });
  });

  describe('register logic', () => {
    describe('performRegisterRequest', () => {
      test('with no errors', () => {
        const iterator = performRegisterRequest({ fullName: 'Test Case', email: 'test', country: 'USA' });

        const [endpoint, requestOptions] = getRegisterRequest('Test Case', 'test', 'USA');

        let response = iterator.next().value;
        expect(response).toEqual(call(axios, endpoint, requestOptions));

        const testPayload = {
          userId: 1,
          access_token: 'test token',
          token_type: 'RESET_PASSWORD',
          links: [],
        };

        response = iterator.next({ data: testPayload }).value;
        expect(response).toEqual(put({ type: REGISTER_SUCCESS, payload: testPayload }));
      });

      test('with errors', () => {
        const iterator = performRegisterRequest({ fullName: 'Test Case', email: 'test', country: 'USA' });

        iterator.next();

        const errorValue = iterator.throw().value;

        expect(errorValue).toEqual(put({ type: REGISTER_FAILURE }));
      });
    });

    test('watchForRegister test', () => {
      const gen = watchForRegister();

      expect(gen.next().value).toEqual(takeLatest(REQUEST_REGISTER, performRegisterRequest));
    });
  });

  describe('performValidateResetToken', () => {
    test('with no errors', () => {
      const iterator = performValidateEmailConfirmationToken({ user: 1, token: 'test' });

      const [endpoint, requestOptions] = getValidateEmailConfirmationTokenRequest(1, 'test');

      let response = iterator.next().value;
      expect(response).toEqual(call(axios, endpoint, requestOptions));

      const testPayload = {
        links: [{}, {}],
      };

      response = iterator.next({ data: testPayload }).value;
      expect(response).toEqual(put({ type: VALIDATE_EMAIL_CONFIRMATION_SUCCESS, payload: testPayload }));
    });

    test('with errors', () => {
      const iterator = performValidateEmailConfirmationToken({ user: 1, token: 'test' });

      iterator.next();

      const errorValue = iterator.throw().value;

      expect(errorValue).toEqual(put({ type: VALIDATE_EMAIL_CONFIRMATION_FAILURE }));
    });
  });

  test('watchForValidateEmailConfirmationToken test', () => {
    const gen = watchForValidateEmailConfirmationToken();

    expect(gen.next().value).toEqual(takeLatest(REQUEST_VALIDATE_EMAIL_CONFIRMATION, performValidateEmailConfirmationToken));
  });

  describe('performCreatePassword', () => {
    test('with no errors', () => {
      const fakeHistory = { push: noOp };
      const params = {
        user: 1, newPassword: 'test', passwordConfirmation: 'test', history: fakeHistory,
      };
      const iterator = performCreatePassword(params);

      const [endpoint, requestOptions] = getCreatePasswordRequest(1, 'test', 'test');

      let response = iterator.next().value;
      expect(response).toEqual(call(axios, endpoint, requestOptions));

      response = iterator.next().value;
      expect(response).toEqual(call(fakeHistory.push, '/'));
    });

    test('with errors', () => {
      const fakeHistory = { push: noOp };
      const params = {
        user: 1, newPassword: 'test', passwordConfirmation: 'test', history: fakeHistory,
      };
      const iterator = performCreatePassword(params);

      iterator.next();

      const errorValue = iterator.throw({
        response: 'test',
      }).value;

      expect(errorValue).toEqual(put({ type: CREATE_PASSWORD_FAILURE, payload: 'test' }));
    });
  });

  test('watchForCreatePassword test', () => {
    const gen = watchForCreatePassword();

    expect(gen.next().value).toEqual(takeLatest(REQUEST_CREATE_PASSWORD, performCreatePassword));
  });

  describe('performResetPassword', () => {
    test('with no errors', () => {
      const fakeHistory = { push: noOp };
      const params = {
        user: 1, newPassword: 'test', passwordConfirmation: 'test', history: fakeHistory,
      };
      const iterator = performResetPassword(params);

      const [endpoint, requestOptions] = getResetPasswordRequest(1, 'test', 'test');

      let response = iterator.next().value;
      expect(response).toEqual(call(axios, endpoint, requestOptions));

      response = iterator.next().value;
      expect(response).toEqual(call(fakeHistory.push, '/'));
    });

    test('with errors', () => {
      const fakeHistory = { push: noOp };
      const params = {
        user: 1, newPassword: 'test', passwordConfirmation: 'test', history: fakeHistory,
      };
      const iterator = performResetPassword(params);

      iterator.next();

      const errorValue = iterator.throw({
        response: 'test',
      }).value;

      expect(errorValue).toEqual(put({ type: RESET_PASSWORD_FAILURE, payload: 'test' }));
    });
  });

  test('watchForResetPassword test', () => {
    const gen = watchForResetPassword();

    expect(gen.next().value).toEqual(takeLatest(REQUEST_RESET_PASSWORD, performResetPassword));
  });
});
