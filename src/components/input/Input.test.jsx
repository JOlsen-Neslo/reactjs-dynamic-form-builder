import React from 'react';
import { render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  test('should render a text input, if unspecified', () => {
    const { container } = render(<Input />);
    const inputEl = container.querySelector('input');

    expect(inputEl).toHaveAttribute('type', 'text');
  });

  test('should render a suffix, if provided', () => {
    const { container } = render(<Input suffix="suffix-as-text" />);
    const suffixEl = container.querySelector('.input__suffix');

    expect(suffixEl).toHaveTextContent('suffix-as-text');
  });
});
