let projectNodes;

export function getProjectNodes() {
    if (projectNodes) {
        return projectNodes;
    }
    
    const projectsList = document.querySelector('.projects-list');

    const projectsBar = document.querySelector('aside .bar-projects');
    const form = document.querySelector('.project-menu form');
    const exitButton = document.querySelector('.project-menu .exit');
    const cancelButton = document.querySelector('.project-menu .cancel');

    const menuCover = document.querySelector('.menu-cover');
    const menu = document.querySelector('.project-menu');
    const menuTitle = document.querySelector('.project-menu .title-box span');
    const submitButton = document.querySelector('.project-menu button.submit');

    const currentGroupIcon = document.querySelector('main .header img');
    const currentGroupName = document.querySelector('main .header span');

    const removeMenu = document.querySelector('.remove-menu');
    const removeConfirm = document.querySelector('.remove-confirm');
    const removeHeading = document.querySelector('.remove-heading');
    const removeMessage = document.querySelector('.remove-message');

    return projectNodes = { 
        projectsList,
        projectsBar,
        form,
        exitButton,
        cancelButton,
        menuCover,
        menu,
        menuTitle,
        submitButton,
        currentGroupIcon,
        currentGroupName,
        removeMenu,
        removeConfirm,
        removeHeading,
        removeMessage,
    };
};