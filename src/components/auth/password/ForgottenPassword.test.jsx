import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';

import { noOp } from '../../../tools/helpers';

import ForgottenPassword from './ForgottenPassword';

describe('Forgotten Password Screen', () => {
  const setup = (success = false, onSubmit = noOp) => render(
    <ForgottenPassword
      onSubmit={onSubmit}
      success={success}
      onClearAuthErrors={noOp}
    />,
  );

  test('should have the "Request Link" button disabled by default', () => {
    const { getByText } = setup();
    const submitButton = getByText('Request Link');

    expect(submitButton).toBeDisabled();
  });

  describe('"Request Link" button', () => {
    let submitButton; let
      fakeOnSubmit;

    beforeEach(() => {
      // spy
      fakeOnSubmit = jest.fn();

      const { getByPlaceholderText, getByText } = setup(false, fakeOnSubmit);

      const emailInput = getByPlaceholderText('email');

      // fill in fields
      fireEvent.change(emailInput, { target: { value: 'test' } });

      submitButton = getByText('Request Link');
    });

    test('should enable when email has values', () => {
      expect(submitButton).not.toBeDisabled();
    });

    test('should fire onSubmit when clicked', () => {
      fireEvent.click(submitButton);

      expect(fakeOnSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('request message', () => {
    test('should be correct for success', () => {
      const { getByText } = setup(true, noOp);
      expect(getByText(/Success!/i)).toBeInTheDocument();
    });

    test('should be correct for failure', () => {
      const { getByText } = setup(false, noOp, 'errorMsg');
      expect(getByText(/Oops!/i)).toBeInTheDocument();
    });
  });
});
