import { ADD_SYSTEM_NOTICE, REMOVE_SYSTEM_NOTICE } from '../actions/system.actions';
import { generateId } from '../tools/helpers';

export const initialState = {
  notices: [],
};

export default function systemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SYSTEM_NOTICE:
      const { title, alertType } = action;

      return {
        ...state,
        notices: [
          ...state.notices,
          { id: generateId(), title, alertType },
        ],
      };

    case REMOVE_SYSTEM_NOTICE:
      const { id } = action;

      return {
        ...state,
        notices: state.notices.filter((notice) => notice.id !== id),
      };

    default:
      return state;
  }
}
