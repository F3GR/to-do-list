import { application } from '../main-app.js';
import { renderTask } from '../task/dom.js';
import { getGroupNodes } from './static-selectors.js';
import { STANDARD_GROUPS, isHTMLElement, isNodeList, isObject, showErrorModal } from '../utils.js';
import { ERR_HEADINGS, ERR_POPULATE } from './errors-text.js';

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
        showErrorModal([ERR_HEADINGS.POPULATE, ERR_POPULATE.CURRENT_GROUP_MAIN]);
        return;
    }
    if (!isNodeList(allGroups)) {
        showErrorModal([ERR_HEADINGS.POPULATE, ERR_POPULATE.ALL_GROUP]);
        return;
    }
    if (!isHTMLElement(addTaskIcon)) {
        showErrorModal([ERR_HEADINGS.POPULATE, ERR_POPULATE.ADD_TASK_ICON]);
        return;
    }
    if (!isHTMLElement(selectedGroup)) {
        showErrorModal([ERR_HEADINGS.POPULATE, ERR_POPULATE.CURRENT_GROUP]);
        return;
    }
    if (!isHTMLElement(selectedGroupName) || !isHTMLElement(selectedGroupIcon)) {
        showErrorModal([ERR_HEADINGS.POPULATE, ERR_POPULATE.CURRENT_GROUP_ELEMENT]);
        return;
    }
    
    let newGroup;
    try {
        newGroup = application.getTasksGroup(groupIdentifier);
    } catch(e) {
        showErrorModal([ERR_HEADINGS.POPULATE, e.message]);
        return;
    }

    let currentViewState;
    try {
        currentViewState = application.getViewState();
    } catch(e) {
        showErrorModal([ERR_HEADINGS.POPULATE, e.message]);
        return;
    }

    let filteredSortedNewGroup;
    try {
        filteredSortedNewGroup = application.applyViewOptions(currentViewState, newGroup);
    } catch(e) {
        showErrorModal([ERR_HEADINGS.POPULATE, e.message]);
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
