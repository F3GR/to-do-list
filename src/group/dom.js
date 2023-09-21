import { application } from '../main-app.js';
import { renderTask } from '../task/dom.js';
import { getGroupNodes } from './static-selectors.js';
import { STANDARD_GROUPS, isHTMLElement, isNodeList, isObject, showErrorModal } from '../utils.js';

export function renderGroup(groupIdentifier) {
    const { mainGroupName, mainGroupIcon, taskList } = getGroupNodes();
    const allGroups = document.querySelectorAll('.bar-types > *, .projects-list > li.project');
    const selectedGroup = document.querySelector(`.bar-types > *[data-group-id="${groupIdentifier}"], 
                                                .projects-list > li.project[data-group-id="${groupIdentifier}"]`);
    const { addTaskIcon } = getGroupNodes();
    const selectedGroupName = selectedGroup.querySelector('span');
    const selectedGroupIcon = selectedGroup.querySelector('img');

    if (!isHTMLElement(mainGroupName) || 
    !isHTMLElement(mainGroupIcon) || 
    !isHTMLElement(taskList)
    ) {
        showErrorModal('Error: the elements weren\'t found to render the task group');
        return;
    }
    if (!isNodeList(allGroups)) {
        showErrorModal('Error: the all group panels weren\'t found');
        return;
    }
    if (!isHTMLElement(addTaskIcon)) {
        showErrorModal('Error: the add task icon wasn\'t found');
        return;
    }
    if (!isHTMLElement(selectedGroup)) {
        showErrorModal('Error: the group panel with the selected group id wasn\'t found');
        return;
    }
    if (!isHTMLElement(selectedGroupName) || !isHTMLElement(selectedGroupIcon)) {
        showErrorModal('Error: the name and/or icon of the selected group panel weren\'t found');
        return;
    }
    
    const newGroup = application.getTasksGroup(groupIdentifier);
    const currentViewState= application.getViewState();
    const filteredSortedNewGroup = application.applyViewOptions(currentViewState, newGroup);

    if (!isNodeList(newGroup)) {
        showErrorModal(newGroup);
        return;
    }
    if (!isObject(currentViewState)) {
        showErrorModal(currentViewState);
        return;
    }
    if (!Array.isArray(filteredSortedNewGroup)) {
        showErrorModal(filteredSortedNewGroup);
        return;
    }

    taskList.innerHTML = '';
    filteredSortedNewGroup.forEach((task) => renderTask(task));

    if (Object.values(STANDARD_GROUPS).includes(groupIdentifier)) {
        addTaskIcon.classList.add('shown');
    } else {
        addTaskIcon.classList.remove('shown');
    }

    allGroups.forEach((group) => group.classList.remove('current'));
    selectedGroup.classList.add('current');
    
    mainGroupName.textContent = selectedGroupName.textContent;
    mainGroupIcon.src = selectedGroupIcon.src;
    mainGroupIcon.alt = selectedGroupIcon.alt;
}
