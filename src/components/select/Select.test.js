import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Select from './Select';

describe('Select', () => {
  let component;

  beforeEach(async () => {
    await act(async () => {
      component = render(
        <Select
          menuItems={[
            { label: 'one', value: 1 },
            { label: 'two', value: 2 },
            { label: 'three', value: 3 },
          ]}
          placeholder="select something"
        />,
      );
    });
  });

  test('should display menu items correctly', async () => {
    const { container } = component;

    const items = container.querySelectorAll('.dropdown-menu__item');

    expect(items[0]).toHaveTextContent('one');
    expect(items[1]).toHaveTextContent('two');
    expect(items[2]).toHaveTextContent('three');
  });

  describe('clicking the select', () => {
    test('should open its menu', () => {
      const { container, getByText } = component;

      const selectEl = container.querySelector('.select');
      const inputEl = getByText('select something');

      fireEvent.click(inputEl);

      expect(selectEl).toHaveClass('select--open');
    });
  });

  describe('selecting an item', () => {
    // open the menu
    beforeEach(() => {
      const { getByText } = component;
      const inputEl = getByText('select something');
      fireEvent.click(inputEl);
    });

    test('should display the selected item\'s label', () => {
      const { container } = component;
      const items = container.querySelectorAll('.dropdown-menu__item');

      // handle on the second item's button
      const buttonEl = items[1].querySelector('button');

      fireEvent.click(buttonEl);

      expect(container.querySelector('.select__label')).toHaveTextContent('two');
    });
  });
});
