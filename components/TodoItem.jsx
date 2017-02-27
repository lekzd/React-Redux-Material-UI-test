import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import { ListItem, IconButton, IconMenu, MenuItem } from 'material-ui';
import { grey400 } from 'material-ui/styles/colors'

import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import VisibleIcon from 'material-ui/svg-icons/action/visibility';

const ICONS = {
  'configurable': <SettingsIcon color={grey400} />,
  'enumerable': <VisibleIcon color={grey400} />,
  'writable': <EditIcon color={grey400} />
};

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleEdit () {
    this.setState({ editing: true });
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
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
    const { todo, completeTodo, deleteTodo } = this.props;

    return (
      <div className="item">
        <ListItem
            primaryText={todo.name}
            rightIcon={this.getFlags(todo.flags)}
        />
      </div>
    );
  }
}


TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
};

export default TodoItem;
