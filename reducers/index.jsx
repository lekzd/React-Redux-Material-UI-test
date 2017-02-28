import { combineReducers } from 'redux';
import itemsGenerator from './itemsGenerator';

const rootReducer = combineReducers({
  leftItems: itemsGenerator(0, 100),
  rightItems: itemsGenerator(100, 200)
});

export default rootReducer;
