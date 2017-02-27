import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes';

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
    completed: false,
    flags
  }
};

const items = Object.keys(descriptors)
    .sort(() => Math.random() * 2|0)
    .map(getRandomItem)
    .slice(0, 200);


export default function todos(state = items, action) {
  switch (action.type) {
  case ADD_TODO:
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text: action.text
    }, ...state];

  case DELETE_TODO:
    return state.filter(todo =>
      todo.id !== action.id
    );

  case EDIT_TODO:
    return state.map(todo =>
      todo.id === action.id ?
        Object.assign({}, todo, { text: action.text }) :
        todo
    );

  case COMPLETE_TODO:
    return state.map(todo =>
      todo.id === action.id ?
        Object.assign({}, todo, { completed: !todo.completed }) :
        todo
    );

  case COMPLETE_ALL:
    const areAllMarked = state.every(todo => todo.completed);
    return state.map(todo => Object.assign({}, todo, {
      completed: !areAllMarked
    }));

  case CLEAR_COMPLETED:
    return state.filter(todo => todo.completed === false);

  default:
    return state;
  }
}
