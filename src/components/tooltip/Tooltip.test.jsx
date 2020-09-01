import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Tooltip from './Tooltip';

describe('Tooltip', () => {
  let component;

  beforeEach(async () => {
    await act(async () => {
      component = render(
        <Tooltip tooltip={<p>Test!</p>}>
          Trigger
        </Tooltip>,
      );
    });
  });

  test('should render an element using class tooltip', () => {
    const { container } = component;
    const tooltipEl = container.querySelector('.tooltip');
    expect(tooltipEl).toBeInTheDocument();
  });

  test('hovering the trigger should open the tooltip', () => {
    const { container, getByText } = component;

    const triggerEl = getByText('Trigger');
    const tooltipEl = container.querySelector('.tooltip__tip');

    fireEvent.mouseEnter(triggerEl);

    expect(tooltipEl).toHaveClass('tooltip__tip--open');
  });
});
