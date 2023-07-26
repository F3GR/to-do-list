import { renderGroup } from './dom-group.js';
import { viewOptionsNodes as STATIC_SELECTORS }  from './static-selectors-group.js';

export function addListenersSidebar() {
    STATIC_SELECTORS.sidebarIcon.addEventListener('click', () => {
        STATIC_SELECTORS.sidebar.classList.toggle('shown');
        STATIC_SELECTORS.sidebarCover.classList.toggle('shown');
    });
    
    STATIC_SELECTORS.standardGroups.addEventListener('click', handleGroupSelection);
    STATIC_SELECTORS.projectGroups.addEventListener('click', handleGroupSelection);
}

function handleGroupSelection(e) {
    const target = e.target.closest('.bar-types > *, .projects-list > li.project');

    if (target && !target.classList.contains('current')) {
        const groupIdentifier = target.getAttribute('data-group-id');
        renderGroup(groupIdentifier);
    }
}


