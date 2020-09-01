import {
  AUTH_FAILURE,
  AUTH_SUCCESS,
  CLEAR_AUTH_ERROR,
  CREATE_PASSWORD_FAILURE,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAILURE,
  VALIDATE_EMAIL_CONFIRMATION_FAILURE,
  VALIDATE_EMAIL_CONFIRMATION_SUCCESS,
  VALIDATE_PASSWORD_RESET_TOKEN_FAILURE,
  VALIDATE_PASSWORD_RESET_TOKEN_SUCCESS,
} from '../actions/auth.actions';

export const initialState = {
  accessToken: null,
  tokenType: null,
  refreshToken: null,
  expiresIn: null,
  scope: null,
  jti: null,
  authFailure: false,
  userId: null,
  links: [],
  errorMsg: null,
  tokenFailure: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const {
        access_token, token_type, refresh_token, expires_in, scope, jti,
      } = action.payload;

      return {
        ...state,
        accessToken: access_token,
        tokenType: token_type,
        refreshToken: refresh_token,
        expiresIn: expires_in,
        scope,
        jti,
      };

    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        authFailure: false,
        errorMsg: null,
      };

      // Actions make use of the same code block.
    case REGISTER_FAILURE:
    case AUTH_FAILURE:
      return {
        ...state,
        authFailure: true,
      };

      // Actions make use of the same code block.
    case REGISTER_SUCCESS:
    case FORGOT_PASSWORD_SUCCESS:
      const {
        userId, token, type, links,
      } = action.payload;

      return {
        ...state,
        userId,
        accessToken: token,
        tokenType: type,
        links,
      };

      // Actions make use of the same code block.
    case CREATE_PASSWORD_FAILURE:
    case RESET_PASSWORD_FAILURE:
    case FORGOT_PASSWORD_FAILURE:
      const { data } = action.payload;

      return {
        ...state,
        errorMsg: data.message,
      };

      // Actions make use of the same code block.
    case VALIDATE_PASSWORD_RESET_TOKEN_SUCCESS:
    case VALIDATE_EMAIL_CONFIRMATION_SUCCESS:
      return {
        ...state,
        links: [action.payload],
      };

      // Actions make use of the same code block.
    case VALIDATE_PASSWORD_RESET_TOKEN_FAILURE:
    case VALIDATE_EMAIL_CONFIRMATION_FAILURE:
      return {
        ...state,
        tokenFailure: true,
      };

    default:
      return state;
  }
}
