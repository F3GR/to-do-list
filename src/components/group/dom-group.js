import { application } from '../main-app.js';
import { renderTask } from '../task/dom-task.js';
import { viewOptionsNodes as STATIC_SELECTORS }  from './static-selectors-group.js';

export const renderGroup = (groupIdentifier) => {
    const { newGroup, newGroupIdentifier } = application.getTasksGroup(groupIdentifier);
    if (!newGroup || !newGroupIdentifier) {
        alert('Error: group wasn\'t found');
        return;
    }

    const currentViewState = application.getViewState();
    if (!currentViewState) {
        alert('Error: View state wasn\'t found');
    }

    const filteredSortedNewGroup = application.applyViewOptions(currentViewState);
    if (!filteredSortedNewGroup) {
        alert('Error: applying view options to tasklist was failed');
        filteredSortedNewGroup = newGroup;
    }

    STATIC_SELECTORS.taskList.innerHTML = '';
    filteredSortedNewGroup.forEach((task) => renderTask(task));

    const allGroups = document.querySelectorAll('.bar-types > *, .projects-list > li.project');
    const selectedGroup = document.querySelector(`.bar-types > *[data-group-id="${groupIdentifier}"], 
                                                .projects-list > li.project[data-group-id="${groupIdentifier}"]`);
    const selectedGroupName = selectedGroup.querySelector('span');
    const selectedGroupIcon = selectedGroup.querySelector('img');

    allGroups.forEach((group) => group.classList.remove('current'));
    selectedGroup.classList.add('current');
    
    STATIC_SELECTORS.mainGroupName.textContent = selectedGroupName.textContent;
    STATIC_SELECTORS.mainGroupIcon.src = selectedGroupIcon.src;
    STATIC_SELECTORS.mainGroupIcon.alt = selectedGroupIcon.alt;
}
