import React from 'react';
import { render } from '@testing-library/react';

import FormRow from './FormRow';

describe('FormRow', () => {
  test('should have a "form-row" classname', () => {
    const { container } = render(<FormRow />);

    const formRowEl = container.children[0];
    expect(formRowEl).toHaveClass('form-row');
  });
});
