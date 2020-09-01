import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { noOp } from '../../../tools/helpers';

import Registration from './Registration';

describe('Registration Screen', () => {
  let component;

  const setup = async (success = false, failure = false, onSubmit = noOp) => {
    await act(async () => {
      component = render(
        <Registration
          success={success}
          failure={failure}
          onSubmit={onSubmit}
          onClearAuthErrors={noOp}
        />,
      );
    });
  };

  test('should have the "Register" button disabled by default', async () => {
    await setup();
    const { getByText } = component;
    const registerButton = getByText('Register');

    expect(registerButton).toBeDisabled();
  });

  describe('Register button', () => {
    let registerButton; let
      fakeOnSubmit;

    beforeEach(async () => {
      // spy
      fakeOnSubmit = jest.fn();

      await setup(false, false, fakeOnSubmit);

      const { getByPlaceholderText, getByText, container } = component;

      const fullName = getByPlaceholderText('full name');
      const email = getByPlaceholderText('email');
      const country = getByText('select country');

      // Select a country option
      fireEvent.click(country);
      const options = container.querySelectorAll('.dropdown-menu__item');
      fireEvent.click(options[0].querySelector('button'));

      fireEvent.change(fullName, { target: { value: 'test' } });
      fireEvent.change(email, { target: { value: 'test' } });

      registerButton = getByText('Register');
    });

    test('should enable when full name, email and country have values', () => {
      expect(registerButton).not.toBeDisabled();
    });

    test('should fire onSubmit when clicked', () => {
      fireEvent.click(registerButton);

      expect(fakeOnSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('register message', () => {
    test('should be correct for success', async () => {
      await setup(true, false);
      const { getByText } = component;
      expect(getByText(/Thank you!/i)).toBeInTheDocument();
    });

    test('should be correct for failure', async () => {
      await setup(false, true);
      const { getByText } = component;
      expect(getByText(/Oops!/i)).toBeInTheDocument();
    });
  });
});
