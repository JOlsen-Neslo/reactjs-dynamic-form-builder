import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';

import PasswordInput from './PasswordInput';

describe('Clicking the ToggleIcon', () => {
  test('changes the input type to "text"', () => {
    const { getByPlaceholderText, container } = render(
      <PasswordInput name="test-password" placeholder="password" />,
    );

    const passwordInput = getByPlaceholderText(/password/i);

    // should exist, and type=password
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.getAttribute('type')).toEqual('password');

    const toggleIcon = container.querySelector('.password-toggle');

    // click toggle icon
    fireEvent.click(toggleIcon);

    // type=text
    expect(passwordInput.getAttribute('type')).toEqual('text');
  });
});
