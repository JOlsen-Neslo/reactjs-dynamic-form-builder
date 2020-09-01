import { isNull } from '../../helpers';
import {
  API_PREFIX,
  getAuthHeaders,
  getHttpDeleteOptions,
  getHttpGetOptions,
  getHttpPostData,
  getHttpPutData,
} from '../index';

export const getCompanyEndpoint = (companyId) => `${API_PREFIX}/companies/${companyId}`;

export const getCompanyFieldsEndpoint = (companyId, formName, entryName = null) => {
  const objectName = !isNull(entryName) ? `/${entryName}` : '';
  return `${getCompanyEndpoint(companyId)}${objectName}`;
};
export const getCompanyFieldsRequest = (accessToken, companyId, formName, entryName) => [
  getCompanyFieldsEndpoint(companyId, formName, entryName),
  getHttpGetOptions(getAuthHeaders(accessToken)),
];

export const getCompanyUpdateFieldsRequest = (accessToken, companyId, formName, entity, entryName) => [
  getCompanyFieldsEndpoint(companyId, formName, entryName),
  getHttpPostData(entity, getAuthHeaders(accessToken)),
];

export const getCompanyEntriesEndpoint = (companyId, entryName) => `${getCompanyEndpoint(companyId)}/${entryName}`;
export const getCompanyEntriesRequest = (accessToken, companyId, entryName) => [
  getCompanyEntriesEndpoint(companyId, entryName),
  getHttpGetOptions(getAuthHeaders(accessToken)),
];

export const getCompanyEntryEndpoint = (companyId, entryName, entryId) => `${getCompanyEntriesEndpoint(companyId, entryName)}/${entryId}`;
export const getCompanyEntryDeleteRequest = (accessToken, companyId, entryName, entryId) => [
  getCompanyEntryEndpoint(companyId, entryName, entryId),
  getHttpDeleteOptions(getAuthHeaders(accessToken)),
];

export const getFindCompanyEntryRequest = (accessToken, companyId, entryName, entryId) => [
  getCompanyEntryEndpoint(companyId, entryName, entryId),
  getHttpGetOptions(getAuthHeaders(accessToken)),
];

export const getCompanyEntryUpdateRequest = (accessToken, companyId, entryName, entryId, entity) => [
  getCompanyEntryEndpoint(companyId, entryName, entryId),
  getHttpPutData(entity, getAuthHeaders(accessToken)),
];
