import React, { Component, PropTypes } from 'react';
import FlagsList from './FlagsList';

class SelectedItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const { item } = this.props;

    return (
        <div className="selected-item">
          <div>{item.name}</div>
          <FlagsList flags={item.flags} />
        </div>
    );
  }
}


SelectedItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default SelectedItem;
