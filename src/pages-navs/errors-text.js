

export const ERR_HEADINGS = new Enum({
    PROJECTS: 'Error (rendering the projects navigation bar)',
    TASKS: 'Error (rendering the tasks navigation bar)',
    PROJECTS_EVENT: 'Error (event the projects navigation bar)',
    TASKS_EVENT: 'Error (event the tasks navigation bar)',
});

export const ERR_RENDERING = new Enum({
    PROJECTS_BAR: 'Projects navigation buttons couldn\'t be found',
    TASKS_BAR: 'Tasks navigation buttons couldn\'t be found',
    PROJECTS_NAV: 'Projects pagination couldn\'t be found',
    TASKS_NAV: 'Tasks pagination couldn\'t be found',
    PROJECTS_VALUES: 'Total number of projects pages and/or current project page isn\'t a valid number',
    TASKS_VALUES: 'Total number of projects pages and/or current project page isn\'t a valid number',
});

export const ERR_EVENT = new Enum({
    PROJECTS_BAR: 'Projects navigation buttons couldn\'t be found',
    TASKS_BAR: 'Tasks navigation buttons couldn\'t be found',
});