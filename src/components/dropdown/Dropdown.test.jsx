import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Dropdown from './Dropdown';

describe('Dropdown', () => {
  let component;

  beforeEach(async () => {
    // react-testing-library requires wrapping any state change operations
    //  in an `act()`.
    await act(async () => {
      component = render(
        <Dropdown menuItems={[{ label: 'one' }, { label: 'two' }]}>
          <button>Click</button>
        </Dropdown>,
      );
    });
  });

  test('should render the trigger element correctly', () => {
    const { container } = component;
    const triggerEl = container.querySelector('.dropdown__trigger');

    expect(triggerEl).toContainHTML('<button>Click</button>');
  });

  test('popper menu should be hidden by default', async () => {
    const { container } = component;
    const popperEl = container.querySelector('.dropdown__popper');

    expect(popperEl.classList.contains('dropdown__popper--open')).toBe(false);
  });

  test('clicking the trigger should make the popper menu visible', () => {
    const { container } = component;
    const triggerEl = container.querySelector('.dropdown__trigger');
    const popperEl = container.querySelector('.dropdown__popper');

    fireEvent.click(triggerEl);

    expect(popperEl.classList.contains('dropdown__popper--open')).toBe(true);
  });

  describe('when the popper menu is open', () => {
    test('clicking the overlay should close and hide the popper menu', () => {
      const { container } = component;
      const triggerEl = container.querySelector('.dropdown__trigger');
      const popperEl = container.querySelector('.dropdown__popper');

      fireEvent.click(triggerEl);

      const overlayEl = container.querySelector('.dropdown__overlay');

      fireEvent.click(overlayEl);

      expect(popperEl.classList.contains('dropdown__popper--open')).toBe(false);
    });
  });
});
