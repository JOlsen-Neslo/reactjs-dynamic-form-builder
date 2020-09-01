/**
 * Just a test for this placeholder component.
 */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import {
  fireEvent,
  render,
} from '@testing-library/react';

import { initialState as userState } from '../../../reducers/user.reducer';
import { initialState as authState } from '../../../reducers/auth.reducer';

import HomeContainer from './Home.container';

const middlewares = [];
const mockStore = configureStore(middlewares);

const mockState = {
  auth: authState,
  user: userState,
};

describe('HomeContainer', () => {
  let component;

  beforeEach(async () => {
    await act(async () => {
      component = render(
        <Provider store={mockStore(mockState)}>
          <MemoryRouter>
            <HomeContainer />
          </MemoryRouter>
        </Provider>,
      );
    });
  });

  test('should display a welcome modal', async () => {
    const { container } = component;
    const modal = container.querySelector('.admin-modal');

    expect(modal.classList.contains('admin-modal--shown')).toEqual(true);
  });

  describe('clicking the modal action', () => {
    test('should dismiss the modal', async () => {
      const { container } = component;
      const modal = container.querySelector('.admin-modal');
      const modalAction = container.querySelector('.admin-modal__action');

      await act(async () => {
        fireEvent.click(modalAction);
      });

      expect(modal.classList.contains('admin-modal--shown')).toEqual(false);
    });
  });
});
