import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Subheader from 'material-ui/Subheader';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import { Checkbox, List } from 'material-ui';
import TextField from 'material-ui/TextField';
import { FLAGS } from '../constants/FLAGS'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      flagsFilter: [],
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

  selectItem(selected) {
    if (this.state.selected === selected) {
      this.setState({ selected: null })
    } else {
      this.setState({ selected })
    }
  }

  toggleFlagFilter(flag) {
    if (this.state.flagsFilter.includes(flag)) {
      this.setState({ flagsFilter: this.state.flagsFilter.splice(this.state.flagsFilter.indexOf(flag), 1) });
    } else {
      this.setState({ flagsFilter: this.state.flagsFilter.concat([flag]) });
    }
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

  getFlags(flags) {
    const style = {
      width: 75,
      textAlign: 'right'
    };
    return (
      <div className="item-icons" style={style}>
        {flags.map(flagItem => FLAGS[flagItem])}
      </div>
    )
  }

  renderFlagsFilter(items) {
    return (
      <Subheader>
          {this.getFlags(Object.keys(FLAGS))}
      </Subheader>
    )
  }

  renderSelected(item) {
    return (
        <div>
          <TodoItem key={item.id} item={item} selectItem={null} />
        </div>
    )
  }

  processLeftPipeLine(items) {
      const { search, sortDescending } = this.state;
      let results = items.slice(0);

      if (search) {
          results = results.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
      }

      if (sortDescending) {
          results = results.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() );
      } else {
          results = results.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() );
      }

      return results;
  }

  processRightPipeLine(items) {
      const { flagsFilter } = this.state;
      let results = items.slice(0);

      if (Array.isArray(flagsFilter) && flagsFilter.length) {
          rightFiltered = rightFiltered.filter((item) => {
              let isMatched = true;
              flagsFilter.forEach((flag) => {
                  if (!item.flags.includes(flag)) {
                      isMatched = false;
                  }
              });
              return isMatched;
          });
      }
      return results;
  }

  render() {
    const { left, right } = this.props;
    const { selected } = this.state;

    let leftFiltered = this.processLeftPipeLine(left);
    let rightFiltered = this.processRightPipeLine(right);

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
            {rightFiltered.map(item =>
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

