import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';

import { noOp } from '../../../tools/helpers';

import NewPassword from './NewPassword';

describe('New Password Screen', () => {
  const setup = (error = false, errorMsg, submit = noOp) => render(
    <NewPassword
      onSubmit={submit}
      error={error}
      errorMsg={errorMsg}
      onClearAuthErrors={noOp}
    />,
  );

  test('should have the "Create Password" button disabled by default', () => {
    const { getByText } = setup();
    const submitButton = getByText('Create Password');

    expect(submitButton).toBeDisabled();
  });

  describe('"Create Password" button', () => {
    let submitButton; let
      fakeOnSubmit;

    beforeEach(() => {
      fakeOnSubmit = jest.fn();

      const { getByPlaceholderText, getByText } = setup(false, undefined, fakeOnSubmit);

      const passwordInput = getByPlaceholderText('new password');
      const confirmPasswordInput = getByPlaceholderText('confirm password');

      // fill in fields
      fireEvent.change(passwordInput, { target: { value: 'test' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'test' } });

      submitButton = getByText('Create Password');
    });

    test('should enable when both password fields have values', () => {
      expect(submitButton).not.toBeDisabled();
    });

    test('should fire onSubmit when clicked', () => {
      fireEvent.click(submitButton);

      expect(fakeOnSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('result message', () => {
    test('should be correct for failure', () => {
      const { getByText } = setup(true, 'Invalid password.');
      expect(getByText(/Oops!/i)).toBeInTheDocument();
      expect(getByText(/Invalid password./i)).toBeInTheDocument();
    });
  });
});
