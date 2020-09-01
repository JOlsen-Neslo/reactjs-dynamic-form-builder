import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Checkbox
        name="testbox"
        label="A test checkbox"
      />,
    );
  });

  test('uses a native checkbox input', () => {
    const { container } = component;

    const inputEl = container.querySelector('input[type="checkbox"]');

    expect(container).toContainElement(inputEl);
  });

  describe('clicking the entire checkbox element', () => {
    beforeEach(() => {
      const { container } = component;
      const labelEl = container.querySelector('.checkbox');
      fireEvent.click(labelEl);
    });

    test('should set the input to checked', () => {
      const { container } = component;
      const inputEl = container.querySelector('input[type="checkbox"]');

      expect(inputEl).toBeChecked();
    });

    test('should mark the indicator div as checked', () => {
      const { container } = component;
      const indicatorEl = container.querySelector('.checkbox__indicator');

      expect(indicatorEl).toHaveClass('checkbox__indicator--checked');
    });

    test('should call the provided onChange handler', () => {
      const fakeOnChange = jest.fn();

      const { container } = render(
        <Checkbox
          name="testbox"
          label="A test checkbox"
          onChange={fakeOnChange}
        />,
      );

      const labelEl = container.querySelector('.checkbox');
      fireEvent.click(labelEl);

      expect(fakeOnChange).toHaveBeenCalledTimes(1);
    });
  });
});
