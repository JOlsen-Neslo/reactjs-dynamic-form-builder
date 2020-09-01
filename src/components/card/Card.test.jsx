import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';

import Card from './Card';

describe('Card', () => {
  let component; let
    fakeOnAction;

  beforeEach(() => {
    // create a spy
    fakeOnAction = jest.fn();

    component = render(
      <Card
        actionLabel="Test Action"
        onAction={fakeOnAction}
      >
        <h1>Test Body</h1>
      </Card>,
    );
  });

  test('should render the body correctly', () => {
    const { container } = component;
    const body = container.querySelector('.card__body');

    expect(body).toHaveTextContent('Test Body');
  });

  test('should render the action correctly', () => {
    const { container } = component;
    const button = container.querySelector('button');

    expect(button).toHaveTextContent('Test Action');
  });

  describe('clicking the action', () => {
    test('should run the onAction handler', () => {
      const { container } = component;
      const button = container.querySelector('button');

      fireEvent.click(button);

      expect(fakeOnAction).toHaveBeenCalledTimes(1);
    });
  });
});
