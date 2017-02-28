import React from 'react';

import { grey400 } from 'material-ui/styles/colors'

import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import VisibleIcon from 'material-ui/svg-icons/action/visibility';

export const FLAGS = {
    'configurable': <SettingsIcon color={grey400} />,
    'enumerable': <VisibleIcon color={grey400} />,
    'writable': <EditIcon color={grey400} />
};