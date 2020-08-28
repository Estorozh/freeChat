import { combineReducers } from 'redux';
import { drawerWidth } from './widthReducer';
import { socketReducer } from './socketReducer';

let rootReducer;
export default rootReducer = combineReducers({
  drawerWidth,
  socketReducer,
});
