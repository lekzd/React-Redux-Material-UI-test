import React from 'react';

import { IconButton } from 'material-ui';
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

export const FLAGS = {
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