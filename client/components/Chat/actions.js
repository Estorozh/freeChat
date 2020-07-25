import * as types from './types';

export function sendMessage() {
  dispatch({ type: types.SEND_MESSAGE });
}
