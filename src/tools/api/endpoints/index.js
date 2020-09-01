const API_HOST = process.env.REACT_APP_API_HOST;
const API_PREFIX = `${API_HOST}/api`;

// Auth/Password endpoints
export const AUTH_ENDPOINT = `${API_HOST}/oauth/token`;
export const USER_PROFILE_ENDPOINT = `${API_PREFIX}/users/profile`;
export const API_USERS_ENDPOINT = `${API_PREFIX}/users`;
