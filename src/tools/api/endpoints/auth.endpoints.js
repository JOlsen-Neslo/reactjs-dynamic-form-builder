import {
  API_USERS_ENDPOINT,
  AUTH_ENDPOINT,
} from './index';

import {
  API_PREFIX,
  getAuthRequestOptions,
  getHttpGetOptions,
  getHttpPostData,
} from '../index';

/**
 * Returns a pair of [endpoint, requestOptions], relating to a request
 *  to authenticate.
 *
 * @param {string} username - name of the user attempting to log in
 * @param {string} password - user's password
 * @returns {array} containing the endpoint and requestOptions
 */
export const getAuthRequest = (username, password) => [
  AUTH_ENDPOINT,
  getAuthRequestOptions(username, password),
];

export const getForgotPasswordEndpoint = (email) => `${API_PREFIX}/users/${email}/passwords/reset`;
export const getForgottenPasswordRequest = (email) => [
  getForgotPasswordEndpoint(email),
  getHttpGetOptions(),
];

export const getRegisterRequest = (fullName, email, country) => [
  API_USERS_ENDPOINT,
  getHttpPostData({ fullName, email, country }),
];

export const getEmailTokenInvalidationEndpoint = (user, token) => `${API_PREFIX}/users/${user}/confirmations/${token}`;
export const getValidateEmailConfirmationTokenRequest = (user, token) => [
  getEmailTokenInvalidationEndpoint(user, token),
  getHttpGetOptions(),
];

export const getCreatePasswordEndpoint = (user) => `${API_PREFIX}/users/${user}/passwords`;
export const getCreatePasswordRequest = (user, newPassword, passwordConfirmation) => [
  getCreatePasswordEndpoint(user),
  getHttpPostData({ newPassword, passwordConfirmation }),
];

export const getPasswordTokenInvalidationEndpoint = (user, token) => `${API_PREFIX}/users/${user}/passwords/${token}/change`;
export const getValidatePasswordResetTokenRequest = (user, token) => [
  getPasswordTokenInvalidationEndpoint(user, token),
  getHttpGetOptions(),
];

export const getSavePasswordEndpoint = (user) => `${API_PREFIX}/users/${user}/passwords/save`;
export const getResetPasswordRequest = (user, newPassword, passwordConfirmation) => [
  getSavePasswordEndpoint(user),
  getHttpPostData({ newPassword, passwordConfirmation }),
];
