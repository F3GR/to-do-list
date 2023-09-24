export const ERR_HEADINGS = new Enum({
    PROJECTS: 'Error (rendering the projects navigation bar)',
    TASKS: 'Error (rendering the tasks navigation bar)',
});

export const ERR_RENDERING = new Enum({
    PROJECTS_BAR: 'Projects navigation bar and/or its components couldn\'t be found',
    TASKS_BAR: 'Tasks navigation bar and/or its components couldn\'t be found',
    PROJECTS_VALUES: 'Total number of projects pages and/or current project page isn\'t a valid number',
    TASKS_VALUES: 'Total number of projects pages and/or current project page isn\'t a valid number',
});