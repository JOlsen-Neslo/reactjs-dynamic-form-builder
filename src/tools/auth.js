import Cookies from 'js-cookie';

/**
 * Build the Authorization header value, for use when logging in.
 * @param {string} clientId
 * @param {string} clientSecret
 */
export const buildBasicAuthToken = (clientId, clientSecret) => `Basic ${btoa(`${clientId}:${clientSecret}`)}`;

/**
 * Sets the `accessToken` as a cookie on the client.
 * @param {string} accessToken - token received from a successful auth request.
 */
export const setAccessTokenCookie = (accessToken) => {
  Cookies.set('access-token', accessToken);
};

export const getAccessTokenCookie = () => Cookies.get('access-token');

export const deleteAccessTokenCookie = () => {
  Cookies.remove('access-token');
};
