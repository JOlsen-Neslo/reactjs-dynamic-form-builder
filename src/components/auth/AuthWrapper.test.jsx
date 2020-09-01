import React from 'react';
import { render } from '@testing-library/react';

import AuthWrapper from './AuthWrapper';

describe('AuthWrapper', () => {
  const setup = () => render(
    <AuthWrapper />,
  );

  test('should have the privacy link', () => {
    const { getByText } = setup();
    const privacyLink = getByText('Privacy and Terms and Conditions');

    expect(privacyLink).toBeInTheDocument();
  });
});
