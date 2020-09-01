export const REQUEST_USER_PROFILE = 'REQUEST_USER_PROFILE';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';

export function requestUserProfile(accessToken, history) {
  return {
    type: REQUEST_USER_PROFILE,
    accessToken,
    history,
  };
}
