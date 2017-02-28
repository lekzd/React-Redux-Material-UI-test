import React, { Component, PropTypes } from 'react';
import { FLAGS } from '../constants/FLAGS'
import { deepOrange400, grey400 } from 'material-ui/styles/colors'
import { IconButton } from 'material-ui';

class FlagsList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selected: []
    };
  }

  toggleSelect(flag) {
    if (typeof this.props.onSelect !== 'function') {
      return false;
    }
    let results = [];
    const { selected } = this.state;
    if (selected.includes(flag)) {
      results = selected.filter(item => item !== flag);
    } else {
      results = selected.concat([flag]);
    }
    this.setState({ selected: results });
    this.props.onSelect(results);
  }

  renderFlag(flagItem) {
    const { selected } = this.state;
    const buttonStyle = {
      border: 'none',
      padding: 0,
      width: 25,
      height: 25,
      outline: selected.includes(flagItem) ? '1px solid orange' : 'none'
    };

    return (
        <IconButton
            key={flagItem}
            tooltip={flagItem}
            onTouchTap={() => this.toggleSelect(flagItem)}
            style={buttonStyle}
        >
          { FLAGS[flagItem] }
        </IconButton>
    )
  }

  render() {
    const { flags } = this.props;
    const style = {
      width: 75,
      textAlign: 'right'
    };

    return (
        <div className="item-icons" style={style}>
          {flags.map(this.renderFlag.bind(this))}
        </div>
    )
  }
}

FlagsList.propTypes = {
  flags: PropTypes.array.isRequired,
  onSelect: PropTypes.func
};

export default FlagsList;
