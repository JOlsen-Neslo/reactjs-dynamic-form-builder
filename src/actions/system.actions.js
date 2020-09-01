export const ADD_SYSTEM_NOTICE = 'ADD_SYSTEM_NOTICE';
export const REMOVE_SYSTEM_NOTICE = 'REMOVE_SYSTEM_NOTICE';

export function addSystemNotice(title, alertType) {
  return {
    type: ADD_SYSTEM_NOTICE,
    title,
    alertType,
  };
}

export function removeSystemNotice(id) {
  return {
    type: REMOVE_SYSTEM_NOTICE,
    id,
  };
}
