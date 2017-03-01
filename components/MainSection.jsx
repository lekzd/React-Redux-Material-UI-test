import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import FlagsList from './FlagsList';
import SelectedItem from './SelectedItem';
import Subheader from 'material-ui/Subheader';
import { Checkbox, List } from 'material-ui';
import TextField from 'material-ui/TextField';
import { FLAGS } from '../constants/FLAGS'

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

  toggleFlagFilter(flagsFilter) {
    this.setState({ flagsFilter });
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
          <FlagsList
              flags={Object.keys(FLAGS)}
              onSelect={this.toggleFlagFilter.bind(this)}
          />
      </Subheader>
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
          results = results.filter((item) => {
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
          {this.renderSortSearch(left)}
          <hr/>
          <List className="todo-list">
            {leftFiltered.map(item =>
              <TodoItem
                  key={item.id}
                  item={item}
                  selectItem={() => this.selectItem(item)}
                  selected={selected === item}
              />
            )}
          </List>
        </div>
        <div className="column center">
          {selected ? (<SelectedItem item={selected} />) : '...select item...'}
        </div>
        <div className="column right">
          {this.renderFlagsFilter(right)}
          <hr/>
          <List className="todo-list">
            {rightFiltered.map(item =>
              <TodoItem
                  key={item.id}
                  item={item}
                  selectItem={() => this.selectItem(item)}
                  selected={selected === item}
              />
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

