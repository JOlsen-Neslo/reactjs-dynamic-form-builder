import systemReducer, { initialState } from './system.reducer';
import {
  ADD_SYSTEM_NOTICE,
  addSystemNotice,
  REMOVE_SYSTEM_NOTICE,
  removeSystemNotice,
} from '../actions/system.actions';
import { SNACK_CRITICAL } from '../components/admin/snackAlert/SnackAlert';

describe('System Reducer', () => {
  test('initialState is correct', () => {
    const action = { type: 'INVALID_ACTION' };
    expect(systemReducer(undefined, action)).toEqual(initialState);
  });

  test('addSystemNotice creates the action correctly', () => {
    const action = addSystemNotice('Test Notice', SNACK_CRITICAL);

    expect(action).toEqual({
      type: ADD_SYSTEM_NOTICE,
      title: 'Test Notice',
      alertType: SNACK_CRITICAL,
    });
  });

  test('ADD_SYSTEM_NOTICE returns the correct state', () => {
    const action = {
      type: ADD_SYSTEM_NOTICE,
      title: 'test-title',
      alertType: 'BAD',
    };

    const expectedState = {
      ...initialState,
      notices: [
        {
          title: 'test-title',
          alertType: 'BAD',
        },
      ],
    };

    const state = systemReducer(undefined, action);

    expect(state.notices[0].title).toEqual('test-title');
    expect(state.notices[0].alertType).toEqual('BAD');
  });

  test('removeSystemNotice creates the action correctly', () => {
    const action = removeSystemNotice(69);

    expect(action).toEqual({
      type: REMOVE_SYSTEM_NOTICE,
      id: 69,
    });
  });

  test('REMOVE_SYSTEM_NOTICE returns the correct state', () => {
    const action = {
      type: REMOVE_SYSTEM_NOTICE,
      id: 69,
    };

    const setupState = {
      ...initialState,
      notices: [{
        id: 69,
        title: 'This alert will be removed',
        alertType: 'BAD',
      }],
    };

    const expectedState = { ...initialState };

    expect(systemReducer(setupState, action)).toEqual(expectedState);
  });
});
