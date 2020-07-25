import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILE,
  LOGIN_FROM_LOCALESTORAGE,
} from './types';

const initialState = {
  isAuth: false,
  user: '',
  token: '',
};

export function auth(state = initialState, action) {
  // eslint-disable-next-line no-console
  console.log(action);
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuth: true, user: action.payload.name };
    case LOGIN_FAILE:
      return { ...state, isAuth: false, user: '' };
    case LOGIN_FROM_LOCALESTORAGE:
      return {
        ...state,
        isAuth: localStorage.getItem('isAuth'),
        user: localStorage.getItem('user'),
      };
    default:
      return state;
  }
}
