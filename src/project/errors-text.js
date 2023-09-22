import { Enum } from '../utils.js';

export const ERR_CONTROLLER = new Enum({
    PROJECT_LIST: 'The current project list wasn\'t found in the storage',
    PROJECT_DATA: 'The entered project name or icon couldn\'t be identified',
    DUPLICATE_PROJECT: 'The project with this name already exists!',
    INVALID_INDEX: 'the id of the project couldn\'t be identified',
    NO_INDEX: 'the id of the project couldn\'t be found in the storage',
});

export const ERR_HEADINGS = new Enum({
    RENDERING: 'Error (rendering the project)',
    APPLY_EVENTS: 'Error (applying events to the project menu)',
    SHOWING: 'Error (showing the project menu)',
    REMOVING: 'Error (removing the project)',
    SUBMITTING: 'Error (submitting the project)',
    SUBMIT_ADDING: 'Error (creating the new project)',
    SUBMIT_EDITING: 'Error (editing the project)',
});

export const ERR_RENDERING = new Enum({
    PROJECT_LIST_PANEL: 'Project list panel wasn\'t found',
    PROJECT_VALUES: 'One or more of the project values weren\'t found',
});

export const ERR_APPLY_EVENTS = new Enum({
    PROJECT_MENU_RENDERING: 'One or more menu components weren\'t found',
    PROJECT_MENU_SHOWING: 'One or more menu components weren\'t found',
    EDITED_PROJECT: 'Edited project and/or its id weren\'t found',
    REMOVED_PROJECT_NODES: 'Current group icon and/or heading weren\'t found',
    REMOVED_PROJECT: 'Removed project and/or its id weren\'t found',
    DEFAULT_ACTION: 'Project action isn\'t valid',
    NO_PROJECT_MENU: 'Project menu wasn\'t found',
    NO_MENU_NAME_PANEL: '',
    NO_ICON_SELECTED_PANEL: '',
    GROUP_ID: 'Error: group id wasn\'t found',

});