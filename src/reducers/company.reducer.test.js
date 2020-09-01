import companyReducer, { initialState } from './company.reducer';
import {
  DELETE_COMPANY_ENTRY,
  deleteCompanyEntry,
  FIND_COMPANY_ENTRY,
  findCompanyEntry,
  REQUEST_COMPANY_ENTRIES,
  REQUEST_COMPANY_FIELDS,
  requestCompanyEntries,
  requestCompanyFields,
  RESET_COMPANY_ENTRIES,
  RESET_UPDATE_COMPANY_FIELDS,
  resetCompanyEntries,
  SET_COMPANY_ENTRIES,
  SET_COMPANY_FIELDS,
  UPDATE_COMPANY_ENTRY,
  UPDATE_COMPANY_FIELDS,
  UPDATE_COMPANY_FIELDS_FAILURE,
  UPDATE_COMPANY_FIELDS_SUCCESS,
  updateCompanyEntry,
  updateCompanyFields,
} from '../actions/company.actions';
import { noOp } from '../tools/helpers';

describe('Company Reducer', () => {
  test('initialState is correct', () => {
    const action = { type: 'INVALID_ACTION' };
    expect(companyReducer(undefined, action)).toEqual(initialState);
  });

  test('requestCompanyFields creates the action correctly', () => {
    const action = requestCompanyFields('token', null, 10, 'Form Name');

    expect(action).toEqual({
      type: REQUEST_COMPANY_FIELDS,
      accessToken: 'token',
      companyId: 10,
      entryName: null,
      formName: 'Form Name',
    });
  });

  test('SET_COMPANY_FIELDS returns the correct state', () => {
    const formFields = {
      testFields: ['field1', 'field2'],
    };

    const action = {
      type: SET_COMPANY_FIELDS,
      formName: 'Test Form',
      formFields,
    };

    const expectedState = {
      ...initialState,
      fields: {
        'Test Form': formFields,
      },
    };

    expect(companyReducer(undefined, action)).toEqual(expectedState);
  });

  test('updateCompanyFields creates the action correctly', () => {
    const action = updateCompanyFields('token', 10, 'entry', 'form', 'values', noOp);

    expect(action).toEqual({
      type: UPDATE_COMPANY_FIELDS,
      accessToken: 'token',
      companyId: 10,
      entryName: 'entry',
      formName: 'form',
      entity: 'values',
      onCompleteAction: noOp,
    });
  });

  test('RESET_UPDATE_COMPANY_FIELDS returns the correct state', () => {
    const action = {
      type: RESET_UPDATE_COMPANY_FIELDS,
    };

    const expectedState = {
      ...initialState,
      companyUpdateSuccess: null,
    };

    expect(companyReducer(undefined, action)).toEqual(expectedState);
  });

  test('UPDATE_COMPANY_FIELDS_SUCCESS returns the correct state', () => {
    const action = {
      type: UPDATE_COMPANY_FIELDS_SUCCESS,
    };

    const expectedState = {
      ...initialState,
      companyUpdateSuccess: true,
    };

    expect(companyReducer(undefined, action)).toEqual(expectedState);
  });

  test('UPDATE_COMPANY_FIELDS_FAILURE returns the correct state', () => {
    const action = {
      type: UPDATE_COMPANY_FIELDS_FAILURE,
    };

    const expectedState = {
      ...initialState,
      companyUpdateSuccess: false,
    };

    expect(companyReducer(undefined, action)).toEqual(expectedState);
  });

  test('SET_COMPANY_ENTRIES returns the correct state', () => {
    const action = {
      type: SET_COMPANY_ENTRIES,
      formName: 'test-form',
      entries: [
        'entry1',
        'entry2',
        'entry3',
      ],
    };

    const expectedState = {
      ...initialState,
      entries: {
        'test-form': ['entry1', 'entry2', 'entry3'],
      },
    };

    expect(companyReducer(undefined, action)).toEqual(expectedState);
  });

  describe('RESET_COMPANY_ENTRIES', () => {
    test('returns the initial state if the form entry key doesnt exist in state', () => {
      const action = {
        type: RESET_COMPANY_ENTRIES,
        formName: 'test-form',
      };

      const expectedState = initialState;

      expect(companyReducer(undefined, action)).toEqual(expectedState);
    });

    test('removes the form key from state if it does exist', () => {
      const action = {
        type: RESET_COMPANY_ENTRIES,
        formName: 'test-form',
      };

      const setupState = {
        ...initialState,
        entries: {
          'test-form': [],
          'wont-be-deleted': [],
        },
      };

      const expectedState = {
        ...initialState,
        entries: {
          'wont-be-deleted': [],
        },
      };

      expect(companyReducer(setupState, action)).toEqual(expectedState);
    });
  });

  test('requestCompanyEntries creates the action correctly', () => {
    const action = requestCompanyEntries('token', 'entry', 10, 'form');

    expect(action).toEqual({
      type: REQUEST_COMPANY_ENTRIES,
      accessToken: 'token',
      companyId: 10,
      entryName: 'entry',
      formName: 'form',
    });
  });

  test('resetCompanyEntries creates the action correctly', () => {
    const action = resetCompanyEntries('form');

    expect(action).toEqual({
      type: RESET_COMPANY_ENTRIES,
      formName: 'form',
    });
  });

  test('deleteCompanyEntry creates the action correctly', () => {
    const action = deleteCompanyEntry('token', 10, 'entry', 'form', 227, noOp);

    expect(action).toEqual({
      type: DELETE_COMPANY_ENTRY,
      accessToken: 'token',
      companyId: 10,
      entryName: 'entry',
      formName: 'form',
      entryId: 227,
      onCompleteAction: noOp,
    });
  });

  test('updateCompanyEntry creates the action correctly', () => {
    const action = updateCompanyEntry('token', 10, 'entry', 12, 'form', {}, noOp);

    expect(action).toEqual({
      type: UPDATE_COMPANY_ENTRY,
      accessToken: 'token',
      companyId: 10,
      entryName: 'entry',
      formName: 'form',
      entryId: 12,
      entity: {},
      onCompleteAction: noOp,
    });
  });

  test('findCompanyEntry creates the action correctly', () => {
    const action = findCompanyEntry('token', 10, 'entry', 'form', 12, noOp);

    expect(action).toEqual({
      type: FIND_COMPANY_ENTRY,
      accessToken: 'token',
      companyId: 10,
      entryName: 'entry',
      formName: 'form',
      entryId: 12,
      onCompleteAction: noOp,
    });
  });
});
