import { combineReducers } from 'redux';
import itemsGenerator from './itemsGenerator';
import { SELECT_ITEM, SORT_ITEMS } from '../constants/ActionTypes';

const rootReducer = combineReducers({
  leftItems: itemsGenerator(0, 100, [SELECT_ITEM, SORT_ITEMS]),
  rightItems: itemsGenerator(100, 200, [SELECT_ITEM])
});

export default rootReducer;
