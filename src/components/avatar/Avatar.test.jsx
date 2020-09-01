import React from 'react';
import { render } from '@testing-library/react';

import Avatar from './Avatar';

describe('Avatar', () => {
  let component;

  beforeEach(() => {
    component = render(<Avatar name="Test User" />);
  });

  test('should render the name correctly', () => {
    const { container } = component;
    expect(container).toHaveTextContent('Test User');
  });

  test('should render an icon', () => {
    const { container } = component;
    const iconEl = container.querySelector('.avatar__icon');

    expect(iconEl).toBeInTheDocument();
  });
});
