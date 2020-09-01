import React from 'react';
import { render } from '@testing-library/react';

import Form from './Form';

describe('Form', () => {
  test('uses a native form element', () => {
    const { container } = render(
      <Form>
        <input />
        <input />
      </Form>,
    );

    const formEl = container.querySelector('form');
    expect(formEl).toBeInTheDocument();
  });

  test('should have a "form" classname', () => {
    const { container } = render(
      <Form>
        <input />
        <input />
      </Form>,
    );

    const formEl = container.querySelector('form');
    expect(formEl).toHaveClass('form');
  });
});
