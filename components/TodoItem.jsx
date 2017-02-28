import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { ListItem } from 'material-ui';
import FlagsList from './FlagsList';

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  render() {
    const { item, selectItem, selected } = this.props;
    const classNames = classnames({
      item: true,
      selected
    });

    return (
        <ListItem
            className={classNames}
            onTouchTap={() => selectItem(item)}
            primaryText={item.name}
            rightIcon={<FlagsList flags={item.flags} />}
        />
    );
  }
}


TodoItem.propTypes = {
  item: PropTypes.object.isRequired,
  selectItem: PropTypes.func.isRequired,
  selected: PropTypes.bool
};

export default TodoItem;
