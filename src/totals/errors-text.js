import { Enum } from '../utils.js';

export const ERR_HEADINGS = new Enum({
    PROJECTS: 'Error (rendering the number of projects)',
    TASKS: 'Error (rendering the number of tasks in the list)',
});

export const ERR_RENDERING = new Enum({
    PROJECTS_VALUES: 'Current project count isn\'t a valid number',
    PROJECTS_BAR: 'Projects bar and/or its components couldn\'t be found',
    TASKS_VALUES: 'Current task count isn\'t a valid number',
    TASKS_BAR: 'Tasks list heading could\'t be found',
});