import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';

import Tabs from './Tabs';

describe('Tabs', () => {
  let component; let
    fakeOnClickItem;

  beforeEach(() => {
    fakeOnClickItem = jest.fn();

    component = render(
      <Tabs
        items={[
          { label: 'one' },
          { label: 'two' },
          { label: 'three' },
        ]}
        onClickItem={fakeOnClickItem}
      />,
    );
  });

  test('should render the tab items correctly', () => {
    const { container } = component;
    const tabs = container.querySelectorAll('.tabs__tab');

    expect(tabs.length).toEqual(3);
    expect(tabs[0]).toHaveTextContent('one');
    expect(tabs[1]).toHaveTextContent('two');
    expect(tabs[2]).toHaveTextContent('three');
  });

  describe('clicking items', () => {
    test('should call the onClickItem with the tab\'s index', () => {
      const { container } = component;
      const tabs = container.querySelectorAll('.tabs__tab');
      fireEvent.click(tabs[1]);

      expect(fakeOnClickItem).toHaveBeenCalledWith(1);
    });
  });
});
