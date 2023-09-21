import { renderGroup } from './dom.js';
import { isHTMLElement, showErrorModal } from '../utils.js';

export function addListenersSidebar() {
    const sidebarIcon = document.querySelector('header > img.sidebar-icon');
    const sidebar = document.querySelector('aside');
    const sidebarCover = document.querySelector('main .sidebar-cover');
    const standardGroups = document.querySelector('.bar-types');
    const projectGroups = document.querySelector('.projects-list');
    
    if (!isHTMLElement(sidebarIcon) ||
        !isHTMLElement(sidebar) ||
        !isHTMLElement(sidebarCover) ||
        !isHTMLElement(standardGroups) ||
        !isHTMLElement(projectGroups)
        ) {
        showErrorModal('Error: the elements weren\'t found to render the task group');
    }

    sidebarIcon.addEventListener('click', () => {
        sidebar.classList.toggle('shown');
        sidebarCover.classList.toggle('shown');
    });
    
    standardGroups.addEventListener('click', handleGroupSelection);
    projectGroups.addEventListener('click', handleGroupSelection);
};

const handleGroupSelection = (e) => {
    const selectedGroup = e.target.closest('.bar-types > *, .projects-list > li.project');

    if (selectedGroup && !selectedGroup.classList.contains('current')) {
        const groupIdentifier = target.getAttribute('data-group-id');
        renderGroup(groupIdentifier);
    }
}


