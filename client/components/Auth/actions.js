import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FROM_LOCALESTORAGE,
} from './types';

export function authFromLocalStorage() {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    dispatch({ type: LOGIN_FROM_LOCALESTORAGE });
  };
}

export function login(name) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });

    localStorage.setItem('isAuth', true);
    localStorage.setItem('user', name);
    return dispatch({ type: LOGIN_SUCCESS, payload: { name } });
    // let request = async () => {
    //   try {
    //     let response = await fetch(`/auth`, {
    //       method: 'POST',
    //       body: name,
    //     });
    //     response = await response.text();
    //     dispatch({ type: LOGIN_SUCCESS, payload: response });
    //   } catch (err) {
    //     dispatch({ type: LOGIN_FAILE, payload: err });
    //   }
    // };
    // return request();
  };
}
