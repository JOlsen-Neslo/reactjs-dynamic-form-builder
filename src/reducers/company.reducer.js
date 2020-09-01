import {
  RESET_COMPANY_ENTRIES,
  RESET_UPDATE_COMPANY_FIELDS,
  SET_COMPANY_ENTRIES,
  SET_COMPANY_FIELDS,
  UPDATE_COMPANY_FIELDS_FAILURE,
  UPDATE_COMPANY_FIELDS_SUCCESS,
} from '../actions/company.actions';

export const initialState = {
  fields: {},
  entries: {},
  companyUpdateSuccess: null,
};

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMPANY_FIELDS:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.formName]: action.formFields,
        },
      };

    case RESET_UPDATE_COMPANY_FIELDS:
      return {
        ...state,
        companyUpdateSuccess: null,
      };

    case UPDATE_COMPANY_FIELDS_SUCCESS:
      return {
        ...state,
        companyUpdateSuccess: true,
      };

    case UPDATE_COMPANY_FIELDS_FAILURE:
      return {
        ...state,
        companyUpdateSuccess: false,
      };

    case SET_COMPANY_ENTRIES:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.formName]: action.entries,
        },
      };

    case RESET_COMPANY_ENTRIES:
      if (!state.entries.hasOwnProperty(action.formName)) {
        return state;
      }

      // exclude `formName` from the hash of entries in state
      const newEntries = { ...state.entries };
      delete newEntries[action.formName];

      return {
        ...state,
        entries: newEntries,
      };

    default:
      return state;
  }
}
