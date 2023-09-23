import { Enum } from '../utils.js';

export const ERR_CONTROLLER = new Enum({
    TASK_GROUP: 'Current tasks group couldn\'t be found in the storage',
    FILTER_VALUES: 'One or more of the filter option values isn\'t valid',
    SORT_ORDER_VALUE: 'The order value of sort option isn\'t valid',
    SORT_OPTION_VALUE: 'Sort option value isn\'t valid',
});

export const ERR_HEADINGS = new Enum({
    RENDERING: 'Error (rendering filtering options menu)',
    APPLY_EVENTS: 'Error (applying events to the filtering options menu)',
    UPDATING_TASKS_NODE: 'Error (applying the updated view options)',
});

export const ERR_RENDERING = new Enum({
    MAIN_PANEL: 'Main content panel couldn\'t be found',
    OPTIONS_NODES: 'One or more the filter option elements couldn\'t be found',
    FILTER_VALUES: 'One or more of the filter option values isn\'t valid',
    SORT_ORDER_VALUE: 'The order value of sort option isn\'t valid',
    SORT_OPTION_VALUE: 'Sort option value isn\'t valid',
});

export const ERR_APPLY_EVENTS = new Enum({
    OPTIONS_NODES: 'One or more the filter option elements couldn\'t be found',
    FILTER_VALUES: 'One or more of the filter option values isn\'t valid',
    SORT_ORDER_VALUE: 'The order value of sort option isn\'t valid',
    SORT_OPTION_VALUE: 'Sort option value isn\'t valid',
    TASK_LIST_PANEL: 'Task list panel couldn\'t be found',
});