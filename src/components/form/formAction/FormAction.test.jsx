import React from 'react';
import { render } from '@testing-library/react';

import FormAction from './FormAction';

describe('FormAction', () => {
  test('renders the message correctly', () => {
    const { getByText } = render(
      <FormAction message="Click this" actionLabel="Do stuff" />,
    );

    expect(getByText('Click this')).toBeInTheDocument();
  });

  test('renders the actionLabel correctly', () => {
    const { getByText } = render(
      <FormAction message="Click this" actionLabel="Do stuff" />,
    );

    expect(getByText('Do stuff')).toBeInTheDocument();
  });
});
