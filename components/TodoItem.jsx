import React, { Component, PropTypes } from 'react';
import { ListItem, IconButton } from 'material-ui';
import { grey400 } from 'material-ui/styles/colors'

import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import VisibleIcon from 'material-ui/svg-icons/action/visibility';

const buttonStyle = {
  border: 'none',
  padding: 0,
  width: 25,
  height: 25
};

const ICONS = {
  'configurable':
      <IconButton tooltip="configurable" style={buttonStyle}>
        <SettingsIcon color={grey400} />
      </IconButton>,
  'enumerable':
      <IconButton tooltip="enumerable" style={buttonStyle}>
        <VisibleIcon color={grey400} />
      </IconButton>,
  'writable':
      <IconButton tooltip="writable" style={buttonStyle}>
        <EditIcon color={grey400} />
      </IconButton>
};

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

    return <div className="item-icons" style={style}>
        {flags.map((flagItem) => ICONS[flagItem])}
      </div>
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
