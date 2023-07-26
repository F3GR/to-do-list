export const viewOptionsNodes = (() => {
    const mainGroupName = document.querySelector('main .header span');
    const mainGroupIcon = document.querySelector('main .header img');
    const taskList = document.querySelector('main .task-list');

    const sidebarIcon = document.querySelector('header > img.sidebar-icon');
    const sidebar = document.querySelector('aside');
    const sidebarCover = document.querySelector('main .sidebar-cover');
    const standardGroups = document.querySelector('.bar-types');
    const projectGroups = document.querySelector('.projects-list');

    return {
        mainGroupName,
        mainGroupIcon,
        taskList,

        sidebarIcon,
        sidebar,
        sidebarCover,
        standardGroups,
        projectGroups,
    }
})();

