import { SELECT_ITEM, SORT_ITEMS } from '../constants/ActionTypes';

const descriptors = Object.getOwnPropertyDescriptors(window);

const getRandomItem = (name, id) => {
  const flags = [];
  if (descriptors[name].configurable) {
    flags.push('configurable');
  }
  if (descriptors[name].enumerable) {
    flags.push('enumerable');
  }
  if (descriptors[name].writable) {
    flags.push('writable');
  }
  return {
    id,
    name,
    flags
  }
};

const items = Object.keys(descriptors)
    .sort(() => Math.random() * 2|0)
    .map(getRandomItem);

export default function itemsGenerator(from, to) {
  return (state = items.slice(from, to), {type, value}) => {
    return state;
  }
}
