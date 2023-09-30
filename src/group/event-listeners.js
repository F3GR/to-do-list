import { renderGroup } from './dom.js';
import { isHTMLElement, isValid, showErrorModal } from '../utils.js';
import { ERR_EVENTS } from './errors-text.js';
import { application } from '../main-app.js';

export function addListenersSidebar() {
    const sidebarIcon = document.querySelector('header > .sidebar-icon');
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
        showErrorModal(ERR_EVENTS.SIDEBAR_ELEMENTS);
        return;
    }

    sidebarIcon.addEventListener('click', () => {
        sidebar.classList.toggle('shown');
        sidebarCover.classList.toggle('shown');
    });
    
    standardGroups.addEventListener('click', handleGroupSelection);
    projectGroups.addEventListener('click', handleGroupSelection);
    projectGroups.addEventListener('keydown', (e) => {
        if (e.keyCode === 13 || e.keyCode === 32) {
            handleGroupSelection(e);
        }
    });
};

const handleGroupSelection = (e) => {
    const selectedGroup = e.target.closest('.bar-types > *, .projects-list > li.project');

    if (selectedGroup && !selectedGroup.classList.contains('current')) {
        const groupIdentifier = selectedGroup.getAttribute('data-group-id');
        if (!isValid(groupIdentifier)) {
            showErrorModal(ERR_EVENTS.NO_GROUP_ID);
            return;
        }

        let newGroup;
        try {
            newGroup = application.getTasksGroup(groupIdentifier);
        } catch(e) {
            showErrorModal([ERR_EVENTS.NEW_GROUP[0], e.message, ERR_EVENTS.NEW_GROUP[2]]);
            return;
        }
    
        let currentViewState;
        try {
            currentViewState = application.getViewState();
        } catch(e) {
            showErrorModal([ERR_EVENTS.NEW_GROUP[0], e.message, ERR_EVENTS.NEW_GROUP[2]]);
            return;
        }
    
        let filteredSortedFirstPage;
        try {
            filteredSortedFirstPage = application.applyViewOptions(currentViewState, newGroup);
        } catch(e) {
            showErrorModal([ERR_EVENTS.NEW_GROUP[0], e.message, ERR_EVENTS.NEW_GROUP[2]]);
            return;
        }

        renderGroup(filteredSortedFirstPage, groupIdentifier);
    }
}


