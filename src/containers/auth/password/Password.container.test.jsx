/**
 * Just a test for this placeholder component.
 */
import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {
  MemoryRouter,
  Route,
} from 'react-router-dom';

import { initialState as authState } from '../../../reducers/auth.reducer';

import PasswordContainer from './Password.container';

const mockStore = configureStore([]);

const mockState = {
  auth: authState,
};

const errorState = {
  auth: {
    ...authState,
    tokenFailure: true,
  },
};

describe('PasswordContainer', () => {
  const setup = (state, initialEntry) => render(
    <Provider store={mockStore(state)}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Route path="/password/:context" component={PasswordContainer} />
      </MemoryRouter>
    </Provider>,
  );

  describe('Create context', () => {
    const createPath = '/password/create?user=1&token=test';

    test('should render the context', async () => {
      const { getByText } = setup(mockState, createPath);
      const createButton = getByText('Create Password');

      expect(createButton).toBeInTheDocument();
    });

    test('should attempt to call the api', () => {
      const { getByText, getByPlaceholderText } = setup(mockState, createPath);

      const passwordInput = getByPlaceholderText('new password');
      const confirmPasswordInput = getByPlaceholderText('confirm password');

      // fill in fields
      fireEvent.change(passwordInput, { target: { value: 'test' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'test' } });

      const createButton = getByText('Create Password');
      fireEvent.click(createButton);

      expect(createButton).toBeInTheDocument();
    });

    test('should render the error message', async () => {
      const { getByText } = setup(errorState, createPath);

      const errorMessage = getByText('The email confirmation link is not valid.');

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Reset context', () => {
    const resetPath = '/password/reset?user=1&token=test';

    test('should render the context', async () => {
      const { getByText } = setup(mockState, resetPath);
      const resetButton = getByText('Reset Password');

      expect(resetButton).toBeInTheDocument();
    });

    test('should attempt to call the api', () => {
      const { getByText, getByPlaceholderText } = setup(mockState, resetPath);

      const passwordInput = getByPlaceholderText('new password');
      const confirmPasswordInput = getByPlaceholderText('confirm password');

      // fill in fields
      fireEvent.change(passwordInput, { target: { value: 'test' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'test' } });

      const resetButton = getByText('Reset Password');
      fireEvent.click(resetButton);

      expect(resetButton).toBeInTheDocument();
    });

    test('should render the error message', async () => {
      const { getByText } = setup(errorState, resetPath);

      const errorMessage = getByText('The reset password link is not valid.');

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Forgot context', () => {
    test('should render the context', async () => {
      const { getByText } = setup(mockState, '/password/forgot');

      const createButton = getByText('Request Link');

      expect(createButton).toBeInTheDocument();
    });
  });
});
