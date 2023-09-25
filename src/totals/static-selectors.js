let projectsBarHeaderNodes;
export function getProjectsBarHeaderNodes() {
    if (projectsBarHeaderNodes) {
        return projectsBarHeaderNodes;
    }

    const addNewIcon = document.querySelector('.bar-projects > .header > .add-new');
    const projectsBarHeader = document.querySelector('.bar-projects > .header');
    return projectsBarHeaderNodes = {
        addNewIcon,
        projectsBarHeader,
    };
};

let tasksBarHeaderNodes;
export function getTasksBarHeaderNodes() {
    if (tasksBarHeaderNodes) {
        return tasksBarHeaderNodes;
    }
    
    const tasksNumberBox = document.querySelector('.task-bar > .task-number');
    return tasksBarHeaderNodes = {
        tasksNumberBox,
    };
};