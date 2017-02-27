import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Subheader from 'material-ui/Subheader';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import { Checkbox, List } from 'material-ui';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filter: SHOW_ALL,
      selected: null
    };
  }

  renderSortSearch(items) {
    const { actions } = this.props;
    let checked = false;
    return (
      <Subheader>
        <Checkbox
          className="toggle-sort"
          label="Sort"
          defaultChecked={checked}
          onCheck={() => actions.toggleSort(checked = !checked)} />
      </Subheader>
    )
  }

  renderFlagsFilter(items) {
    return (
      <Subheader>
        flags
      </Subheader>
    )
  }

  render() {
    const { left, right, actions } = this.props;
    const { filter, selected } = this.state;

    // const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    // const completedCount = todos.reduce((count, todo) =>
    //   todo.completed ? count + 1 : count,
    //   0
    // );

    return (
      <section className="main">
        <div className="column left">
          <List className="todo-list">
            {this.renderSortSearch(left)}
            {left.map(item =>
                <TodoItem key={item.id} item={item} {...actions} />
            )}
          </List>
        </div>
        <div className="column center">
          {selected ? selected : '...select item...'}
        </div>
        <div className="column right">
          <List className="todo-list">
            {this.renderFlagsFilter(right)}
            {right.map(item =>
                <TodoItem key={item.id} item={item} {...actions} />
            )}
          </List>
        </div>

      </section>
    );
  }
}


MainSection.propTypes = {
  left: PropTypes.array.isRequired,
  right: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;

