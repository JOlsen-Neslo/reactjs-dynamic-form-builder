import { SET_USER_PROFILE } from '../actions/user.actions';

export const initialState = {
  id: null,
  companyId: null,
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  mobileNumber: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_PROFILE:
      const {
        id, companyId, firstName, lastName, username, email, mobileNumber,
      } = action.userProfile;

      return {
        ...state,
        id,
        companyId,
        username,
        firstName,
        lastName,
        email,
        mobileNumber,
      };

    default:
      return state;
  }
}
