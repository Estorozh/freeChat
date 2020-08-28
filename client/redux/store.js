import { createStore, compose } from 'redux';
import rootReducer from '@r/rootReducer';

let store = createStore(
  rootReducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
