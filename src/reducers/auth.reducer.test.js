import authReducer, { initialState } from './auth.reducer';
import {
  AUTH_FAILURE,
  AUTH_SUCCESS,
  CREATE_PASSWORD_FAILURE,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  REQUEST_AUTH,
  REQUEST_FORGOT_PASSWORD,
  REQUEST_REGISTER,
  REQUEST_VALIDATE_EMAIL_CONFIRMATION,
  REQUEST_VALIDATE_PASSWORD_RESET_TOKEN,
  requestAuth,
  requestForgotPassword,
  requestRegister,
  requestValidateEmailConfirmationToken,
  requestValidatePasswordResetToken,
  RESET_PASSWORD_FAILURE,
  VALIDATE_EMAIL_CONFIRMATION_FAILURE,
  VALIDATE_EMAIL_CONFIRMATION_SUCCESS,
  VALIDATE_PASSWORD_RESET_TOKEN_FAILURE,
  VALIDATE_PASSWORD_RESET_TOKEN_SUCCESS,
} from '../actions/auth.actions';

describe('Auth Reducer', () => {
  test('initialState is correct', () => {
    const action = { type: 'INVALID_ACTION' };
    expect(authReducer(undefined, action)).toEqual(initialState);
  });

  describe('Auth actions', () => {
    test('requestAuth creates the action correctly', () => {
      const action = requestAuth('test-user', 'test-password');

      expect(action).toEqual({
        type: REQUEST_AUTH,
        username: 'test-user',
        password: 'test-password',
      });
    });

    test('AUTH_SUCCESS returns the correct state', () => {
      const payload = {
        access_token: '1231232',
        token_type: 'Bearer',
        refresh_token: '93n3ir22',
        expires_in: 500,
        scope: 'test-scope',
        jti: 'jti',
      };

      const action = {
        type: AUTH_SUCCESS,
        payload,
      };

      const expectedState = {
        ...initialState,
        accessToken: '1231232',
        tokenType: 'Bearer',
        refreshToken: '93n3ir22',
        expiresIn: 500,
        scope: 'test-scope',
        jti: 'jti',
      };

      expect(authReducer(undefined, action)).toEqual(expectedState);
    });

    test('AUTH_FAILURE returns the correct state', () => {
      const action = { type: AUTH_FAILURE };

      const expectedState = {
        ...initialState,
        authFailure: true,
      };

      expect(authReducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('Password actions', () => {
    test('requestForgotPassword creates the action correctly', () => {
      const action = requestForgotPassword('test-user');

      expect(action).toEqual({
        type: REQUEST_FORGOT_PASSWORD,
        email: 'test-user',
      });
    });

    test('FORGOT_PASSWORD_SUCCESS returns the correct state', () => {
      const payload = {
        userId: 1,
        token: 'test token',
        type: 'RESET_PASSWORD',
        links: [],
        errorMsg: null,
      };

      const action = {
        type: FORGOT_PASSWORD_SUCCESS,
        payload,
      };

      const expectedState = {
        ...initialState,
        userId: 1,
        accessToken: 'test token',
        tokenType: 'RESET_PASSWORD',
        links: [],
        errorMsg: null,
      };

      expect(authReducer(undefined, action)).toEqual(expectedState);
    });

    test('FORGOT_PASSWORD_FAILURE returns the correct state', () => {
      const testError = {
        data: {
          message: 'This is an error.',
        },
      };

      const action = { type: FORGOT_PASSWORD_FAILURE, payload: testError };

      const expectedState = {
        ...initialState,
        errorMsg: 'This is an error.',
      };

      expect(authReducer(undefined, action)).toEqual(expectedState);
    });

    test('requestValidatePasswordResetToken creates the action correctly', () => {
      const action = requestValidatePasswordResetToken(1, 'test-user');

      expect(action).toEqual({
        type: REQUEST_VALIDATE_PASSWORD_RESET_TOKEN,
        user: 1,
        token: 'test-user',
      });
    });

    test('VALIDATE_PASSWORD_RESET_TOKEN_SUCCESS returns the correct state', () => {
      const payload = {};

      const action = {
        type: VALIDATE_PASSWORD_RESET_TOKEN_SUCCESS,
        payload,
      };

      const expectedState = {
        ...initialState,
        links: [{}],
      };

      expect(authReducer(undefined, action)).toEqual(expectedState);
    });

    test('VALIDATE_PASSWORD_RESET_TOKEN_FAILURE returns the correct state', () => {
      const action = { type: VALIDATE_PASSWORD_RESET_TOKEN_FAILURE };

      const expectedState = {
        ...initialState,
        tokenFailure: true,
      };

      expect(authReducer(undefined, action)).toEqual(expectedState);
    });

    test('RESET_PASSWORD_FAILURE returns the correct state', () => {
      const testError = {
        data: {
          message: 'This is an error.',
        },
      };

      const action = { type: RESET_PASSWORD_FAILURE, payload: testError };

      const expectedState = {
        ...initialState,
        errorMsg: 'This is an error.',
      };

      expect(authReducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('Register actions', () => {
    test('requestRegister creates the action correctly', () => {
      const action = requestRegister('test-user', 'test', 'USA');

      expect(action).toEqual({
        type: REQUEST_REGISTER,
        fullName: 'test-user',
        email: 'test',
        country: 'USA',
      });
    });

    test('REGISTER_SUCCESS returns the correct state', () => {
      const payload = {
        userId: 1,
        token: 'test token',
        type: 'EMAIL_CONFIRMATION',
        links: [],
        errorMsg: null,
      };

      const action = {
        type: REGISTER_SUCCESS,
        payload,
      };

      const expectedState = {
        ...initialState,
        userId: 1,
        accessToken: 'test token',
        tokenType: 'EMAIL_CONFIRMATION',
        links: [],
        errorMsg: null,
      };

      expect(authReducer(undefined, action)).toEqual(expectedState);
    });

    test('REGISTER_FAILURE returns the correct state', () => {
      const action = { type: REGISTER_FAILURE };

      const expectedState = {
        ...initialState,
        authFailure: true,
      };

      expect(authReducer(undefined, action)).toEqual(expectedState);
    });

    test('CREATE_PASSWORD_FAILURE returns the correct state', () => {
      const testError = {
        data: {
          message: 'This is an error.',
        },
      };

      const action = { type: CREATE_PASSWORD_FAILURE, payload: testError };

      const expectedState = {
        ...initialState,
        errorMsg: 'This is an error.',
      };

      expect(authReducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('Validate actions', () => {
    test('requestValidateEmailConfirmationToken creates the action correctly', () => {
      const action = requestValidateEmailConfirmationToken(1, 'test-user');

      expect(action).toEqual({
        type: REQUEST_VALIDATE_EMAIL_CONFIRMATION,
        user: 1,
        token: 'test-user',
      });
    });

    test('VALIDATE_EMAIL_CONFIRMATION_SUCCESS returns the correct state', () => {
      const payload = {};

      const action = {
        type: VALIDATE_EMAIL_CONFIRMATION_SUCCESS,
        payload,
      };

      const expectedState = {
        ...initialState,
        links: [{}],
      };

      expect(authReducer(undefined, action)).toEqual(expectedState);
    });

    test('VALIDATE_EMAIL_CONFIRMATION_FAILURE returns the correct state', () => {
      const action = { type: VALIDATE_EMAIL_CONFIRMATION_FAILURE };

      const expectedState = {
        ...initialState,
        tokenFailure: true,
      };

      expect(authReducer(undefined, action)).toEqual(expectedState);
    });
  });
});
