let projectsBarFooterNodes;
export function getProjectsBarFooterNodes() {
    if (projectsBarFooterNodes) {
        return projectsBarFooterNodes;
    }

    const projectsBarFooter = document.querySelector('.projects-nav');
    const nextPageBtn = projectsBarFooter.querySelector('.projects-next-page');

    return projectsBarFooterNodes = {
        nextPageBtn,
        projectsBarFooter,
    };
};

let tasksBarFooterNodes;
export function getTasksBarFooterNodes() {
    if (tasksBarFooterNodes) {
        return tasksBarFooterNodes;
    }
    
    const tasksBarFooter = document.querySelector('main > .page-menu');
    const nextPageBtn = tasksBarFooter.querySelector('.tasks-next-page');
    
    return tasksBarFooterNodes = {
        nextPageBtn,
        tasksBarFooter,
    };
};