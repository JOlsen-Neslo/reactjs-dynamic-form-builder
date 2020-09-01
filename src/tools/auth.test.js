import { setAccessTokenCookie, getAccessTokenCookie } from './auth';

// stub out js-cookie, so that any module that imports it, gets the mocked
//  version defined here
jest.mock('js-cookie');
let jsCookieMock = require('js-cookie');

describe('setAccessTokenCookie', () => {
  beforeEach(() => {
    // setup the `set` function to be a spy
    jsCookieMock.set = jest.fn();
  });

  test('should set access token as a cookie', () => {
    setAccessTokenCookie('test-token');

    expect(jsCookieMock.set).toHaveBeenCalledWith('access-token', 'test-token');
  });
});

describe('getAccessTokenCookie', () => {
  beforeEach(() => {
    // setup the `get` function to return an expected value
    jsCookieMock.get.mockImplementation((_) => 'test-token');
  });

  test('should set access token as a cookie', () => {
    const token = getAccessTokenCookie();

    expect(token).toEqual(token);
  });
});