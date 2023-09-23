import { Enum } from '../utils.js';

export const ERR_CONTROLLER = new Enum({
    TASK_LIST: 'The current task list couldn\'t be found in the storage',
    TASK_DATA: 'One or more task data entries couldn\'t be identified',
    DUPLICATE_TASK: 'The task with this title already exists!',
    NO_INDEX: 'The id of the task couldn\'t be found in the storage',
    EDIT_PROJECT_DATA: 'The new project name couldn\'t be identified',
});

export const ERR_HEADINGS = new Enum({
    RENDERING: 'Error (rendering the task)',
    APPLY_EVENTS: 'Error (applying events to the task menu)',
    SHOWING: 'Error (showing the task menu)',
    SHOWING_TASK_REMOVE: 'Error (showing the task deleting confirmation modal)',
    EXITING: 'Error (exiting the task menu)',
    SUBMITTING: 'Error (submitting the task)',
    SUBMIT_ADDING: 'Error (creating the new task)',
    SUBMIT_EDITING: 'Error (editing the task)',
    SUBMIT_REMOVING: 'Error (removing the task)',
    UPDATING_TASK_NODE: 'Error (updating the task panel)',
    UNFOLDING: 'Error (unfolding the task panel)',
});

export const ERR_RENDERING = new Enum({
    TASK_VALUES: 'One or more of the task values couldn\'t be found',
    TASK_LIST_PANEL: 'Task list panel couldn\'t be found',
});

export const ERR_APPLY_EVENTS = new Enum({
    TASK_MENU_RENDERING: 'One or more menu components couldn\'t be found',
    DEFAULT_ACTION: 'Task action isn\'t valid',
    TASK_MENU_SHOWING: 'One or more menu components couldn\'t be found',
    TASK_MENU_ADD: 'Current project and/or its id couldn\'t be found',
    TASK_ID: 'Task id couldn\'t be found',
    NO_TASK_MENU: 'Task menu couldn\'t be found',
    NO_PROJECT_ID_OR_ACTION: 'Action value and/or project id couldn\'t be found',
    TASK_UNFOLD_NODES: 'Task panel and/or its unfolded box couldn\'t be found',
    NO_TASK_OR_IDS: 'Task panel and/or task and/or project id couldn\'t be found',
    NO_TOGGLE_ICON: 'Toggle icon of the panel couldn\'t be found',
});