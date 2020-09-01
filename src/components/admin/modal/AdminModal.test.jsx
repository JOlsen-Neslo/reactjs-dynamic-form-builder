import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';

import AdminModal from './AdminModal';

describe('AdminModal', () => {
  let component; let
    onDismissSpy;

  beforeEach(() => {
    onDismissSpy = jest.fn();

    component = render(
      <AdminModal
        title="Test Modal Title"
        message="Test modal message..."
        dismissText="Click to close"
        onDismiss={() => onDismissSpy()}
      />,
    );
  });

  test('should render its title correctly', () => {
    const { container } = component;
    const titleEl = container.querySelector('.admin-modal__title');
    expect(titleEl).toHaveTextContent('Test Modal Title');
  });

  test('should render its message correctly', () => {
    const { container } = component;
    const messageEl = container.querySelector('.admin-modal__message');
    expect(messageEl).toHaveTextContent('Test ');
  });

  test('should render its dismissal text correctly', () => {
    const { container } = component;
    const actionEl = container.querySelector('.admin-modal__action');
    expect(actionEl).toHaveTextContent('Click to close');
  });

  describe('clicking dismiss text', () => {
    test('should fire its onDismiss action', () => {
      const { container } = component;
      const actionEl = container.querySelector('.admin-modal__action');

      fireEvent.click(actionEl);

      expect(onDismissSpy).toHaveBeenCalledTimes(1);
    });
  });
});
