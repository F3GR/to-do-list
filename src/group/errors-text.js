import { Enum } from '../utils.js';

export const ERR_CONTROLLER = new Enum({
    TASK_LIST: 'Task list and/or group id weren\'t found in the storage',
    DEFAULT_ID: 'The default group id isn\'t valid',
});

export const ERR_HEADINGS = new Enum({
    POPULATE: 'Error (populating a new group)',
    EVENTS_RENDERING: 'Error (applying events on sidebar)',
});

export const ERR_POPULATE = new Enum({
    CURRENT_GROUP_MAIN: 'The elements of the current group weren\'t found in the main panel',
    ALL_GROUP: 'The \'All group\' panel wasn\'t found',
    ADD_TASK_ICON: 'The \'Add task\' icon wasn\'t found',
    CURRENT_GROUP: 'The current group panel wasn\'t found',
    CURRENT_GROUP_ELEMENT: 'The name and/or icon element of the current group weren\'t found',
});

export const ERR_EVENTS = new Enum({
    SIDEBAR_ELEMENTS: 'One or more elements of the sidebar weren\'t found',
});