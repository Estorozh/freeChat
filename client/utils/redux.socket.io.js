export function actionConnected(socket) {
  return (dispatch) => {
    // eslint-disable-next-line no-console
    console.log(socket);
    return dispatch({ type: 'CONNECTED', payload: { socket } });
  };
}

export function socket(state = {}, action) {
  // eslint-disable-next-line no-console
  console.log(action);
  switch (action.type) {
    case 'CONNECTED':
      return { ...state, socket: action.payload };
    default:
      return state;
  }
}
