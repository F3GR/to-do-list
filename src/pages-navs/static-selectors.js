let projectsBarFooterNodes;
export function getProjectsBarFooterNodes() {
    if (projectsBarFooterNodes) {
        return projectsBarFooterNodes;
    }

    const projectsBarFooter = document.querySelector('.projects-nav');
    const prevPageBtn = document.querySelector('.projects-previous-page');
    const nextPageBtn = projectsBarFooter.querySelector('.projects-next-page');

    return projectsBarFooterNodes = {
        prevPageBtn,
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
    const prevPageBtn = document.querySelector('.tasks-previous-page');
    const nextPageBtn = tasksBarFooter.querySelector('.tasks-next-page');
    
    return tasksBarFooterNodes = {
        prevPageBtn,
        nextPageBtn,
        tasksBarFooter,
    };
};