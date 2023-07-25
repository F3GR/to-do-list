import { renderGroup } from './dom-group.js';

export function addListenersSidebar() {
    const sidebarIcon = document.querySelector('header > img.sidebar-icon');
    const sidebar = document.querySelector('aside');
    const sidebarCover = document.querySelector('main .sidebar-cover');

    sidebarIcon.addEventListener('click', () => {
        sidebar.classList.toggle('shown');
        sidebarCover.classList.toggle('shown');
    });

    const standardGroups = document.querySelector('.bar-types');
    const projectGroups = document.querySelector('.projects-list');

    standardGroups.addEventListener('click', handleGroupSelection);
    projectGroups.addEventListener('click', handleGroupSelection);
}

function handleGroupSelection(e) {
    const target = e.target.closest('.bar-types > *, .projects-list > li.project');

    if (target && !target.classList.contains('current')) {
        const groupIdentifier = target.getAttribute('data-group-id');
        renderGroup(groupIdentifier);
    }
}


