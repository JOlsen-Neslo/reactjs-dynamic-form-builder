import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import SnackBar from './SnackBar';

describe('SnackBar', () => {
  test('should render notices correctly', () => {
    const { container } = render(
      <SnackBar
        notices={[
          { id: 'adwa213', title: 'test 1' },
          { id: 'zdws5r3', title: 'test 2' },
        ]}
      />,
    );

    expect(container).toHaveTextContent('test 1');
    expect(container).toHaveTextContent('test 2');
  });

  test('should add new notices to when updated', () => {
    const { container, rerender } = render(
      <SnackBar
        notices={[
          { id: 'adwa213', title: 'test 1' },
          { id: 'zdws5r3', title: 'test 2' },
        ]}
      />,
    );

    expect(container).toHaveTextContent('test 1');
    expect(container).toHaveTextContent('test 2');

    rerender(
      <SnackBar
        notices={[
          { id: 'adwa213', title: 'test 1' },
          { id: 'zdws5r3', title: 'test 2' },
          { id: '_awd12', title: 'newly added' },
        ]}
      />,
    );

    expect(container).toHaveTextContent('newly added');
  });

  test('should remove stale notices when updated', () => {
    const { container, rerender, debug } = render(
      <SnackBar
        notices={[
          { id: 'adwa213', title: 'test 1' },
          { id: 'zdws5r3', title: 'test 2' },
        ]}
      />,
    );

    expect(container).toHaveTextContent('test 1');
    expect(container).toHaveTextContent('test 2');

    rerender(
      <SnackBar
        notices={[
          { id: 'adwa213', title: 'test 1' },
        ]}
      />,
    );

    expect(container).not.toHaveTextContent('test 2');
  });

  test('should remove notices when closed', async () => {
    const fakeOnClose = jest.fn();

    await act(async () => {
      const { getByText } = render(
        <SnackBar
          notices={[
            { id: 'adwa213', title: 'test 1' },
          ]}
          onCloseNotice={fakeOnClose}
        />,
      );

      const closeButtonEl = getByText('Close');

      fireEvent.click(closeButtonEl);

      expect(fakeOnClose).toHaveBeenCalledTimes(0);
    });
  });
});
