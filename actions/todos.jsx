import * as types from '../constants/ActionTypes';

export function selectItem(value) {
  return { type: types.SELECT_ITEM, value };
}

export function toggleSort(value) {
  return { type: types.SORT_ITEMS, value };
}
