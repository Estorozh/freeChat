import * as types from './types';

export function messages(state, action) {
  // eslint-disable-next-line no-console
  console.log(action);
  switch (action.type) {
    case types.SEND_MESSAGE:
      return { ...state, messages: action.payload };
    default:
      return state;
  }
}
