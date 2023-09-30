import { Enum } from '../utils.js';

export const ERR_CONTROLLER = new Enum({
    TASK_LIST: 'Task list and/or group id weren\'t found in the storage',
    DEFAULT_ID: 'The default group id isn\'t valid',
});

export const ERR_RENDERING = new Enum({
    CURRENT_GROUP_MAIN: ['Application error', 'The elements of the current group weren\'t found in the main panel', 'Process: rendering the new group'],
    ALL_GROUP: ['Application error', 'The \'All group\' panel wasn\'t found', 'Process: rendering the new group'],
    ADD_TASK_ICON: ['Application error', 'The \'Add task\' icon wasn\'t found', 'Process: rendering the new group'],
    CURRENT_GROUP: ['Application error', 'The current group panel wasn\'t found', 'Process: rendering the new group'],
    CURRENT_GROUP_ELEMENT: ['Application error', 'The name and/or icon element of the current group weren\'t found', 'Process: rendering the new group'],
});

export const ERR_EVENTS = new Enum({
    NO_GROUP_ID: ['Application error', 'The id of the selected group wasn\'t found', 'Process: applying events on the sidebar'],
    SIDEBAR_ELEMENTS: ['Application error', 'One or more elements of the sidebar weren\'t found', 'Process: applying events on the sidebar'],
    NEW_GROUP: ['Application error', null, 'Process: selecting the new group'],
});