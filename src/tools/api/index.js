import { buildBasicAuthToken } from '../auth';
import { USER_PROFILE_ENDPOINT } from './endpoints';

/// API constants
export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const API_HOST = process.env.REACT_APP_API_HOST;
export const API_PREFIX = `${API_HOST}/api`;

const POST = 'POST';
const PUT = 'PUT';
const GET = 'GET';
const DELETE = 'DELETE';

export const getHttpGetOptions = (headers = null) => ({
  method: GET,
  headers,
});

export const getHttpPostData = (data, headers = null) => ({
  method: POST,
  data,
  headers,
});

export const getHttpPutData = (data, headers = null) => ({
  method: PUT,
  data,
  headers,
});

export const getHttpDeleteOptions = (headers = null) => ({
  method: DELETE,
  headers,
});

/// constructs options relating to the auth http request
export const getAuthRequestOptions = (username, password) => ({
  method: POST,
  params: {
    grant_type: 'password',
    client_id: CLIENT_ID,
    username,
    password,
  },
  headers: {
    Authorization: buildBasicAuthToken(CLIENT_ID, CLIENT_SECRET),
  },
});

export const getAuthHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
});

export const getUserProfileRequest = (accessToken) => [
  USER_PROFILE_ENDPOINT,
  getHttpGetOptions({ Authorization: `Bearer ${accessToken}` }),
];
