import { renderGroup } from './dom.js';

export function addListenersSidebar() {
    const sidebarIcon = document.querySelector('header > img.sidebar-icon');
    const sidebar = document.querySelector('aside');
    const sidebarCover = document.querySelector('main .sidebar-cover');
    const standardGroups = document.querySelector('.bar-types');
    const projectGroups = document.querySelector('.projects-list');
    if (!sidebarIcon ||
        !sidebar ||
        !sidebarCover ||
        !standardGroups ||
        !projectGroups) {
        alert ('Error: the elements weren\'t found to render the task group');
    }

    sidebarIcon.addEventListener('click', () => {
        sidebar.classList.toggle('shown');
        sidebarCover.classList.toggle('shown');
    });
    
    standardGroups.addEventListener('click', handleGroupSelection);
    projectGroups.addEventListener('click', handleGroupSelection);
};

const handleGroupSelection = (e) => {
    const target = e.target.closest('.bar-types > *, .projects-list > li.project');
    if (!target) {
        alert('Error: the selected group wasn\'t found');
    }

    if (target && !target.classList.contains('current')) {
        const groupIdentifier = target.getAttribute('data-group-id');
        renderGroup(groupIdentifier);
    }
}


