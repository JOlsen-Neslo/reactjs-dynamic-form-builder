import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { noOp } from '../../../tools/helpers';

import Login from './Login';

describe('Login Screen', () => {
  const setup = (authFailure = false, authSuccess = false, onSubmit = noOp) => render(
    <MemoryRouter initialEntries={['/']}>
      <Login
        authFailure={authFailure}
        authSuccess={authSuccess}
        onSubmit={onSubmit}
        onClearAuthErrors={noOp}
      />
    </MemoryRouter>,
  );

  test('should have the "log in" button disabled by default', () => {
    const { getByText } = setup();
    const loginButton = getByText('Log in');

    expect(loginButton).toBeDisabled();
  });

  describe('login button', () => {
    let loginButton; let
      fakeOnSubmit;

    beforeEach(() => {
      // spy
      fakeOnSubmit = jest.fn();

      const { getByPlaceholderText, getByText } = setup(false, false, fakeOnSubmit);

      const usernameInput = getByPlaceholderText('username');
      const passwordInput = getByPlaceholderText('password');

      // fill in both fields
      fireEvent.change(usernameInput, { target: { value: 'test' } });
      fireEvent.change(passwordInput, { target: { value: 'test' } });

      loginButton = getByText('Log in');
    });

    test('should enable when username and password have values', () => {
      expect(loginButton).not.toBeDisabled();
    });

    test('should fire onSubmit when clicked', () => {
      fireEvent.click(loginButton);

      expect(fakeOnSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('login message', () => {
    test('should be correct for success', () => {
      const { getByText } = setup(false, true);
      expect(getByText(/Success!/i)).toBeInTheDocument();
    });

    test('should be correct for failure', () => {
      const { getByText } = setup(true, false);
      expect(getByText(/No match found./i)).toBeInTheDocument();
    });
  });
});
