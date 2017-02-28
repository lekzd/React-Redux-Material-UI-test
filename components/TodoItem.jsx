import React, { Component, PropTypes } from 'react';
import { ListItem } from 'material-ui';
import { FLAGS } from '../constants/FLAGS'

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  getFlags(flags) {
    const style = {
      width: 75,
      textAlign: 'right'
    };

    return (
      <div className="item-icons" style={style}>
        {flags.map((flagItem) => FLAGS[flagItem])}
      </div>
    )
  }

  render() {
    const { item, selectItem } = this.props;

    return (
      <div className="item">
        <ListItem
            onTouchTap={() => selectItem(item)}
            primaryText={item.name}
            rightIcon={this.getFlags(item.flags)}
        />
      </div>
    );
  }
}


TodoItem.propTypes = {
  item: PropTypes.object.isRequired,
  selectItem: PropTypes.func.isRequired
};

export default TodoItem;
