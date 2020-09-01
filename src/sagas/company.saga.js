import axios from 'axios';
import {
    all,
    call,
    put,
    takeEvery,
} from 'redux-saga/effects';
import {
    DELETE_COMPANY_ENTRY,
    FIND_COMPANY_ENTRY,
    REQUEST_COMPANY_ENTRIES,
    REQUEST_COMPANY_FIELDS,
    RESET_UPDATE_COMPANY_FIELDS,
    resetCompanyEntries,
    SET_COMPANY_ENTRIES,
    SET_COMPANY_FIELDS,
    UPDATE_COMPANY_ENTRY,
    UPDATE_COMPANY_FIELDS,
    UPDATE_COMPANY_FIELDS_FAILURE,
    UPDATE_COMPANY_FIELDS_SUCCESS,
} from '../actions/company.actions';
import {
    getCompanyEntriesRequest,
    getCompanyEntryDeleteRequest,
    getCompanyEntryUpdateRequest,
    getCompanyFieldsRequest,
    getCompanyUpdateFieldsRequest,
    getFindCompanyEntryRequest,
} from '../tools/api/endpoints/company.endpoints';
import { addSystemNotice } from '../actions/system.actions';
import {
    SNACK_CRITICAL,
    SNACK_SUCCESS,
} from '../components/admin/snackAlert/SnackAlert';

export function* performCompanyFieldsRequest({
                                                 accessToken, companyId, formName, entryName,
                                             }) {
    try {
        const [endpoint, requestOptions] = getCompanyFieldsRequest(accessToken, companyId, formName, entryName);
        
        const { data } = yield call(axios, endpoint, requestOptions);
        
        yield put({ type: SET_COMPANY_FIELDS, formName, formFields: data });
    } catch (error) {
        yield call(console.error, `From performCompanyFieldsRequest: ${ error.message }`);
        yield put(addSystemNotice(`Error retrieving ${ formName }`, SNACK_CRITICAL));
    }
}

export function* watchForCompanyFieldsRequest() {
    yield takeEvery(REQUEST_COMPANY_FIELDS, performCompanyFieldsRequest);
}

export function* performCompanyFieldsUpdate({
                                                accessToken, companyId, entryName, formName, entity, onCompleteAction,
                                            }) {
    try {
        yield put({ type: RESET_UPDATE_COMPANY_FIELDS });
        
        const [endpoint, requestOptions] = getCompanyUpdateFieldsRequest(accessToken, companyId, formName, entity, entryName);
        
        const { data } = yield call(axios, endpoint, requestOptions);
        
        yield put({ type: SET_COMPANY_FIELDS, formName, formFields: data });
        yield put({ type: UPDATE_COMPANY_FIELDS_SUCCESS });
        
        // complete would be false if there are validation errors
        
        // TODO: add mechanism to set a form as complete
        // TODO: handle validation errors
        yield put(addSystemNotice(`${ formName } successfully updated`, SNACK_SUCCESS));
        // remove all the entries pertaining to this `formName`, which allows the TabWizard to re-fetch all entries
        yield put(resetCompanyEntries(formName));
        yield call(onCompleteAction);
    } catch (error) {
        yield call(console.error, `From performCompanyUpdateFields: ${ error.message }`);
        yield put({ type: UPDATE_COMPANY_FIELDS_FAILURE });
        yield put(addSystemNotice(`Error updating ${ formName }`, SNACK_CRITICAL));
    }
}

export function* watchForCompanyFieldsUpdateRequest() {
    yield takeEvery(UPDATE_COMPANY_FIELDS, performCompanyFieldsUpdate);
}

export function* performCompanyEntriesRequest({
                                                  accessToken, companyId, formName, entryName,
                                              }) {
    try {
        getCompanyEntriesRequest(accessToken, companyId, entryName);
        
        // removed for demo purposes
        // const { data: { content } } = yield call(axios, endpoint, requestOptions);
        
        yield put({ type: SET_COMPANY_ENTRIES, formName, entries: getEntriesForDemo(entryName) });
    } catch (error) {
        yield call(console.error, `From performCompanyEntriesRequest: ${ error.message }`);
        yield put(addSystemNotice(`Error retrieving entries for ${ entryName }`, SNACK_CRITICAL));
    }
}

function getEntriesForDemo(entryName) {
    switch (entryName) {
        case 'categories':
            return [{ client_Category: 'Demo category', is_Generic: true }];
        case 'products':
            return [{ agency_Code: 'APC001', client_Group: 'Demo product' }];
        case 'trust-accounts':
            return [{
                account_Name: 'Demo account',
                generic: true,
                bank_Branch_Code: '123123',
                account_No: '12345667890'
            }];
        case 'credit-cards':
            return [{ provider: 'Demo provider' }];
        case 'credit-bureaus':
            return [{ credit_Bureau: 'Demo Bureau', listing: false }];
        case 'debit-order-products':
            return [{ product_Name: 'Demo product', product_Code: 'Demo code' }];
        case 'employee-types':
            return [{ code: 'EMP001', employee_Type: 'Demo employee type' }];
        case 'commission':
            return [{ client_Category_Name: 'Demo Comms structure', setup: false }];
        default:
            return [];
    }
}

export function* watchForCompanyEntriesRequest() {
    yield takeEvery(REQUEST_COMPANY_ENTRIES, performCompanyEntriesRequest);
}

export function* performCompanyEntryDelete({
                                               accessToken, companyId, formName, entryName, entryId, onCompleteAction,
                                           }) {
    try {
        const [endpoint, requestOptions] = getCompanyEntryDeleteRequest(accessToken, companyId, entryName, entryId);
        
        yield call(axios, endpoint, requestOptions);
        
        yield put(addSystemNotice(`Successfully deleted ${ entryName }`, SNACK_SUCCESS));
        yield call(onCompleteAction);
    } catch (error) {
        yield call(console.error, `From performCompanyEntryDelete: ${ error.message }`);
        yield put(addSystemNotice(`Error deleting ${ entryName }, id: ${ entryId }`, SNACK_CRITICAL));
    }
}

export function* watchForCompanyEntryDelete() {
    yield takeEvery(DELETE_COMPANY_ENTRY, performCompanyEntryDelete);
}

export function* performFindCompanyEntryRequest({
                                                    accessToken, companyId, formName, entryName, entryId, onCompleteAction,
                                                }) {
    try {
        const [endpoint, requestOptions] = getFindCompanyEntryRequest(accessToken, companyId, entryName, entryId);
        
        const { data } = yield call(axios, endpoint, requestOptions);
        yield call(onCompleteAction, data);
    } catch (error) {
        yield call(console.error, `From performFindCompanyEntryRequest: ${ error.message }`);
        yield put(addSystemNotice(`Error finding ${ entryName }, id: ${ entryId }`, SNACK_CRITICAL));
    }
}

export function* watchForFindCompanyEntryRequest() {
    yield takeEvery(FIND_COMPANY_ENTRY, performFindCompanyEntryRequest);
}

export function* performCompanyEntryUpdate({
                                               accessToken, companyId, formName, entryName, entryId, entity, onCompleteAction,
                                           }) {
    try {
        const [endpoint, requestOptions] = getCompanyEntryUpdateRequest(accessToken, companyId, entryName, entryId, entity);
        
        yield call(axios, endpoint, requestOptions);
        
        // remove all the entries pertaining to this `formName`, which allows the TabWizard to re-fetch all entries
        yield put(resetCompanyEntries(formName));
        
        yield put(addSystemNotice(`Successfully updated ${ entryName }`, SNACK_SUCCESS));
        yield call(onCompleteAction);
    } catch (error) {
        yield call(console.error, `From performCompanyEntryUpdate: ${ error.message }`);
        yield put(addSystemNotice(`Error updating ${ entryName }, id: ${ entryId }`, SNACK_CRITICAL));
    }
}

export function* watchForCompanyEntryUpdate() {
    yield takeEvery(UPDATE_COMPANY_ENTRY, performCompanyEntryUpdate);
}

export default function* companySaga() {
    yield all([
        watchForCompanyFieldsRequest(),
        watchForCompanyFieldsUpdateRequest(),
        watchForCompanyEntriesRequest(),
        watchForCompanyEntryDelete(),
        watchForFindCompanyEntryRequest(),
        watchForCompanyEntryUpdate(),
    ]);
}
