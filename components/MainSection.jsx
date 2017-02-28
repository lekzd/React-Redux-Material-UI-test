import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Subheader from 'material-ui/Subheader';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import { Checkbox, List } from 'material-ui';
import TextField from 'material-ui/TextField';

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
      selected: null,
      sortDescending: false,
      search: null
    };
  }

  toggleSort() {
    this.setState({
      sortDescending: !this.state.sortDescending
    });
  }

  onSearchChange(event, value) {
    this.setState({
      search: value
    });
  }

  renderSortSearch(items) {
    const { actions } = this.props;
    return (
      <Subheader className="column-subheader">

        <div className="column-subheader-col">
          <Checkbox
            className="toggle-sort"
            label="Sort"
            defaultChecked={this.state.sortDescending}
            onCheck={() => this.toggleSort()}
          />
        </div>

        <div className="column-subheader-col">
          <TextField
            hintText="Search..."
            defaultValue={this.state.search}
            onChange={this.onSearchChange.bind(this)}
          />
        </div>

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

  selectItem(selected) {
    this.setState({ selected })
  }

  renderSelected(item) {
    return (
        <div>
          <TodoItem key={item.id} item={item} selectItem={null} />
        </div>
    )
  }

  render() {
    const { left, right, actions } = this.props;
    const { search, selected, sortDescending } = this.state;

    let leftFiltered = [];

    if (sortDescending) {
        leftFiltered = left.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() );
    } else {
        leftFiltered = left.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() );
    }

    if (search) {
        leftFiltered = leftFiltered.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
    }

    return (
      <section className="main">
        <div className="column left">
          <List className="todo-list">
            {this.renderSortSearch(left)}
            {leftFiltered.map(item =>
              <TodoItem key={item.id} item={item} selectItem={() => this.selectItem(item)} />
            )}
          </List>
        </div>
        <div className="column center">
          {selected ? this.renderSelected(selected) : '...select item...'}
        </div>
        <div className="column right">
          <List className="todo-list">
            {this.renderFlagsFilter(right)}
            {right.map(item =>
              <TodoItem key={item.id} item={item} selectItem={() => this.selectItem(item)} />
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

