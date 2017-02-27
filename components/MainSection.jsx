import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
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
    this.state = { filter: SHOW_ALL };
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  }

  handleShow(filter) {
    this.setState({ filter });
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      return (
        <Checkbox className="toggle-all"
                  style={{marginBottom: 10}}
                  label="Toggle All"
                  defaultChecked={completedCount === todos.length}
                  onCheck={actions.completeAll} />
      );
    }
  }

  render() {
    const { left, right, actions } = this.props;
    const { filter } = this.state;

    // const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    // const completedCount = todos.reduce((count, todo) =>
    //   todo.completed ? count + 1 : count,
    //   0
    // );

    return (
      <section className="main">
        {/*{this.renderToggleAll(completedCount)}*/}

        <div className="column left">
          <List className="todo-list">
            {left.map(todo =>
                <TodoItem key={todo.id} todo={todo} {...actions} />
            )}
          </List>
        </div>
        <div className="column center">
          selected item
        </div>
        <div className="column right">
          <List className="todo-list">
            {right.map(todo =>
                <TodoItem key={todo.id} todo={todo} {...actions} />
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
