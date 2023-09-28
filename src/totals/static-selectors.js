let projectsBarHeaderNodes;
export function getProjectsBarHeaderNodes() {
    if (projectsBarHeaderNodes) {
        return projectsBarHeaderNodes;
    }

    const emptyDiv = document.querySelector('.bar-projects > .header > div');
    const projectsBarHeader = document.querySelector('.bar-projects > .header');
    return projectsBarHeaderNodes = {
        emptyDiv,
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