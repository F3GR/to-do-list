import { Enum } from '../utils.js';

export const ERR_HEADINGS = new Enum({
    PROJECTS: 'Error (rendering the number of projects)',
    TASKS: 'Error (rendering the number of tasks in the list)',
});

export const ERR_RENDERING = new Enum({
    PROJECTS_VALUES: 'Current project count isn\'t a valid number',
    PROJECTS_BAR: 'Projects bar heading and/or \'Add new task\' icon couldn\'t be found',
    TASKS_VALUES: 'Current task amount isn\'t valid number',
    TASKS_BAR: 'Tasks bar heading could\'t be found',
});