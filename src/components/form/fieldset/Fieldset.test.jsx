import React from 'react';
import { render } from '@testing-library/react';

import Fieldset from './Fieldset';

describe('Fieldset', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Fieldset title="fancy field set">
        <input />
        <input />
      </Fieldset>,
    );
  });

  test('uses a native fieldset element', () => {
    const { container } = component;
    const fieldsetEl = container.querySelector('fieldset');

    expect(fieldsetEl).toBeInTheDocument();
  });

  test('should set the title as the legend element', () => {
    const { container } = component;
    const legendEl = container.querySelector('legend');

    expect(legendEl).toHaveTextContent('fancy field set');
  });
});
