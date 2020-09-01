export const REQUEST_COMPANY_FIELDS = 'REQUEST_COMPANY_FIELDS';
export const SET_COMPANY_FIELDS = 'SET_COMPANY_FIELDS';
export const UPDATE_COMPANY_FIELDS = 'UPDATE_COMPANY_FIELDS';
export const RESET_UPDATE_COMPANY_FIELDS = 'RESET_UPDATE_COMPANY_FIELDS';
export const UPDATE_COMPANY_FIELDS_SUCCESS = 'UPDATE_COMPANY_FIELDS_SUCCESS';
export const UPDATE_COMPANY_FIELDS_FAILURE = 'UPDATE_COMPANY_FIELDS_FAILURE';

export const REQUEST_COMPANY_ENTRIES = 'REQUEST_COMPANY_ENTRIES';
export const SET_COMPANY_ENTRIES = 'SET_COMPANY_ENTRIES';
export const RESET_COMPANY_ENTRIES = 'RESET_COMPANY_ENTRIES';
export const DELETE_COMPANY_ENTRY = 'DELETE_COMPANY_ENTRY';
export const FIND_COMPANY_ENTRY = 'FIND_COMPANY_ENTRY';
export const UPDATE_COMPANY_ENTRY = 'UPDATE_COMPANY_ENTRY';

export function requestCompanyFields(accessToken, entryName, companyId, formName) {
  return {
    type: REQUEST_COMPANY_FIELDS,
    accessToken,
    companyId,
    entryName,
    formName,
  };
}

export function updateCompanyFields(accessToken, companyId, entryName, formName, entity, onCompleteAction) {
  return {
    type: UPDATE_COMPANY_FIELDS,
    accessToken,
    companyId,
    entryName,
    formName,
    entity,
    onCompleteAction,
  };
}

export function requestCompanyEntries(accessToken, entryName, companyId, formName) {
  return {
    type: REQUEST_COMPANY_ENTRIES,
    accessToken,
    companyId,
    entryName,
    formName,
  };
}

/// Remove a particular set of form `entries` from state
export function resetCompanyEntries(formName) {
  return {
    type: RESET_COMPANY_ENTRIES,
    formName
  };
}

export function deleteCompanyEntry(accessToken, companyId, entryName, formName, entryId, onCompleteAction) {
  return {
    type: DELETE_COMPANY_ENTRY,
    accessToken,
    companyId,
    entryName,
    formName,
    entryId,
    onCompleteAction,
  };
}

export function findCompanyEntry(accessToken, companyId, entryName, formName, entryId, onCompleteAction) {
  return {
    type: FIND_COMPANY_ENTRY,
    accessToken,
    companyId,
    entryName,
    formName,
    entryId,
    onCompleteAction,
  };
}

export function updateCompanyEntry(accessToken, companyId, entryName, entryId, formName, entity, onCompleteAction) {
  return {
    type: UPDATE_COMPANY_ENTRY,
    accessToken,
    companyId,
    entryName,
    entryId,
    formName,
    entity,
    onCompleteAction,
  };
}
