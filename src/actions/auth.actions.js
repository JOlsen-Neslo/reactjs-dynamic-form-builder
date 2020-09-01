export const REQUEST_AUTH = 'REQUEST_LOGIN';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export function requestAuth(username, password, history) {
  return {
    type: REQUEST_AUTH,
    username,
    password,
    history,
  };
}

export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';

export function clearAuthError() {
  return {
    type: CLEAR_AUTH_ERROR,
  };
}

export const REQUEST_FORGOT_PASSWORD = 'REQUEST_FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export function requestForgotPassword(email) {
  return {
    type: REQUEST_FORGOT_PASSWORD,
    email,
  };
}

export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export function requestRegister(fullName, email, country) {
  return {
    type: REQUEST_REGISTER,
    fullName,
    email,
    country,
  };
}

export const REQUEST_VALIDATE_EMAIL_CONFIRMATION = 'REQUEST_VALIDATE_EMAIL_CONFIRMATION';
export const VALIDATE_EMAIL_CONFIRMATION_SUCCESS = 'VALIDATE_EMAIL_CONFIRMATION_SUCCESS';
export const VALIDATE_EMAIL_CONFIRMATION_FAILURE = 'VALIDATE_EMAIL_CONFIRMATION_FAILURE';

export function requestValidateEmailConfirmationToken(user, token) {
  return {
    type: REQUEST_VALIDATE_EMAIL_CONFIRMATION,
    user,
    token,
  };
}

export const REQUEST_CREATE_PASSWORD = 'REQUEST_CREATE_PASSWORD';
export const CREATE_PASSWORD_SUCCESS = 'CREATE_PASSWORD_SUCCESS';
export const CREATE_PASSWORD_FAILURE = 'CREATE_PASSWORD_FAILURE';

export function requestCreatePassword(user, password, confirmPassword, history) {
  return {
    type: REQUEST_CREATE_PASSWORD,
    user,
    newPassword: password,
    passwordConfirmation: confirmPassword,
    history,
  };
}

export const REQUEST_VALIDATE_PASSWORD_RESET_TOKEN = 'REQUEST_VALIDATE_PASSWORD_RESET_TOKEN';
export const VALIDATE_PASSWORD_RESET_TOKEN_SUCCESS = 'VALIDATE_PASSWORD_RESET_TOKEN_SUCCESS';
export const VALIDATE_PASSWORD_RESET_TOKEN_FAILURE = 'VALIDATE_PASSWORD_RESET_TOKEN_FAILURE';

export function requestValidatePasswordResetToken(user, token) {
  return {
    type: REQUEST_VALIDATE_PASSWORD_RESET_TOKEN,
    user,
    token,
  };
}

export const REQUEST_RESET_PASSWORD = 'REQUEST_RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export function requestResetPassword(user, password, confirmPassword, history) {
  return {
    type: REQUEST_RESET_PASSWORD,
    user,
    newPassword: password,
    passwordConfirmation: confirmPassword,
    history,
  };
}

export const USER_LOGOUT = 'USER_LOGOUT';

export function performLogout() {
  return {
    type: USER_LOGOUT,
  };
}
