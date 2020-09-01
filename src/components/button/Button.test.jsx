import React from 'react';
import { render } from '@testing-library/react';

import { noOp } from '../../tools/helpers';

import Button from './Button';

describe('Button', () => {
  test('uses a native button element', () => {
    const { getByText } = render(<Button label="Test button" onClick={noOp} />);

    const buttonEl = getByText('Test button');
    expect(buttonEl).toContainHTML('<button class="button">Test button</button>');
  });

  test('applies disabled attribute correctly', () => {
    const { getByText } = render(<Button label="Test button" disabled onClick={noOp} />);

    const buttonEl = getByText('Test button');
    expect(buttonEl).toBeDisabled();
  });
});
