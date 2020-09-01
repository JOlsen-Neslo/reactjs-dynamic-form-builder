import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthTokenErrorMessage from './AuthTokenErrorMessage';

describe('AuthTokenErrorMessage', () => {
  const setup = () => render(
    <MemoryRouter>
      <AuthTokenErrorMessage message="Test error" />
    </MemoryRouter>,
  );

  test('should have the privacy link', () => {
    const { getByText } = setup();
    const privacyLink = getByText('Privacy and Terms and Conditions');

    expect(privacyLink).toBeInTheDocument();
  });
});
