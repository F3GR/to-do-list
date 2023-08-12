import { application } from '../main-app.js';
import { renderTask } from '../task/dom.js';
import { getGroupNodes } from './static-selectors.js';

export function renderGroup(groupIdentifier) {
    const { mainGroupName, mainGroupIcon, taskList } = getGroupNodes();
    if (!mainGroupName || !mainGroupIcon || !taskList) {
        alert ('Error: the elements weren\'t found to render the task group');
    }
    
    const { newGroup, newGroupIdentifier } = application.getTasksGroup(groupIdentifier);
    if (!newGroup || !newGroupIdentifier) {
        alert('Error: group wasn\'t found');
        return;
    }

    const currentViewState = application.getViewState();
    if (!currentViewState) {
        alert('Error: View state wasn\'t found');
        return;
    }

    const filteredSortedNewGroup = application.applyViewOptions(currentViewState);
    if (!filteredSortedNewGroup) {
        alert('Error: applying view options to tasklist was failed');
        filteredSortedNewGroup = newGroup;
        return;
    }

    taskList.innerHTML = '';
    filteredSortedNewGroup.forEach((task) => renderTask(task));

    const allGroups = document.querySelectorAll('.bar-types > *, .projects-list > li.project');
    if (!allGroups) {
        alert ('Error: the group panels weren\'t found');
        return;
    }

    const selectedGroup = document.querySelector(`.bar-types > *[data-group-id="${groupIdentifier}"], 
                                                .projects-list > li.project[data-group-id="${groupIdentifier}"]`);
    if (!selectedGroup) {
        alert ('Error: the group panel with the selected id wasn\'t found');
        return;
    }

    const selectedGroupName = selectedGroup.querySelector('span');
    const selectedGroupIcon = selectedGroup.querySelector('img');
    if (!selectedGroupName || !selectedGroupIcon) {
        alert ('Error: the name and/or icon of the selected group panel weren\'t found');
        return;
    }

    allGroups.forEach((group) => group.classList.remove('current'));
    selectedGroup.classList.add('current');
    
    mainGroupName.textContent = selectedGroupName.textContent;
    mainGroupIcon.src = selectedGroupIcon.src;
    mainGroupIcon.alt = selectedGroupIcon.alt;
}
