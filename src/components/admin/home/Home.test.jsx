import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from './Home';
import { act } from 'react-dom/test-utils';

describe('Admin Home Screen', () => {
  let component, fakeHandler;

  async function setup(modalShown=false) {
    await act(async () => {
      // handler spy
      fakeHandler = jest.fn();

      component = render(<Home
        user={{}}
        menuItems={[]}
        welcomeModalShown={modalShown}
        onCloseWelcomeModal={fakeHandler}
      />);
    });
  }

  describe('Welcome Message Modal', () => {
    test('should be hidden when `welcomeModalShow` is false', async () => {
      await setup();
      const { container } = component;
      const modalEl = container.querySelector('.admin-modal');

      expect(modalEl.classList.contains('admin-modal--shown')).toEqual(false);
    });

    test('should be visible when `welcomeModalShow` is true', async () => {
      await setup(true);
      const { container } = component;
      const modalEl = container.querySelector('.admin-modal');

      expect(container).toHaveTextContent('Welcome to our app');
      expect(modalEl.classList.contains('admin-modal--shown')).toEqual(true);
    });

    test('dismissing the modal should call the onCloseWelcomeModal handler', async () => {
      await setup(true);
      const { container } = component;
      const dismissEl = container.querySelector('.admin-modal__action');

      fireEvent.click(dismissEl);
    
      expect(fakeHandler).toHaveBeenCalledTimes(1);
    });
  });


});
