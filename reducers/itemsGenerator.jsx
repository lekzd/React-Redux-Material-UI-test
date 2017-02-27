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

export default function itemsGenerator(from, to, allowed) {
  return (state = items.slice(from, to), {type, value}) => {
    if (!allowed.includes(type)) {
      return state;
    }
    switch (type) {
      case SELECT_ITEM:
        state.selected = value;
        return state;

      case SORT_ITEMS:
        if (value) {
          return state.sort((a, b) => a.name < b.name ).slice(0);
        } else {
          return state.sort((a, b) => a.name > b.name ).slice(0);
        }

      default:
        return state;
    }
  }
}
