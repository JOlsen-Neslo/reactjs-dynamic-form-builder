import React from 'react';
import {
  act,
  render,
} from '@testing-library/react';

import { delay } from '../../../tools/helpers';

import SnackAlert, {
  SNACK_CRITICAL,
  SNACK_SUCCESS,
  SNACK_WARNING,
} from './SnackAlert';

describe('SnackAlert', () => {
  test('should render as info status, if no status is specified', () => {
    const { container } = render(<SnackAlert />);

    const snackEl = container.querySelector('.snack');

    expect(snackEl).toHaveClass('snack--info');
  });

  test('should output the correct classes for each status', () => {
    let wrapper;
    wrapper = render(<SnackAlert status={SNACK_CRITICAL} />);
    expect(wrapper.container.querySelector('.snack')).toHaveClass('snack--critical');

    wrapper = render(<SnackAlert status={SNACK_SUCCESS} />);
    expect(wrapper.container.querySelector('.snack')).toHaveClass('snack--success');

    wrapper = render(<SnackAlert status={SNACK_WARNING} />);
    expect(wrapper.container.querySelector('.snack')).toHaveClass('snack--warning');
  });

  test('should remove the entering classname shortly after rendering', async () => {
    let wrapper;

    await act(async () => {
      wrapper = render(<SnackAlert status={SNACK_CRITICAL} />);
      expect(wrapper.container.querySelector('.snack')).toHaveClass('snack--critical');

      await delay(500);

      expect(wrapper.container.querySelector('.snack')).not.toHaveClass('snack--entering');
    });
  });
});
