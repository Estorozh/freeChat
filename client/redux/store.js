import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from './rootReducers';

export default configureStore({
  reducer,
});
// export default createStore(reducer, applyMiddleware(thunk))