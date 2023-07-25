import { application } from '../main-app.js';
import { renderTask } from '../task/dom-task.js';

export function renderGroup(groupIdentifier) {
    const { newGroup, newGroupIdentifier } = application.getTasksGroup(groupIdentifier);

    if (!newGroup || !newGroupIdentifier) {
        alert('Error: group wasn\'t found');
        return;
    }

    const taskList = document.querySelector('main .task-list');
    taskList.innerHTML = '';

    newGroup.forEach((task) => {
        renderTask(task);
    });

    const allGroups = document.querySelectorAll('.bar-types > *, .projects-list > li.project');
    const mainGroupName = document.querySelector('main .header span');
    const selectedGroup = document.querySelector(`.bar-types > *[data-group-id="${groupIdentifier}"], 
                                                .projects-list > li.project[data-group-id="${groupIdentifier}"]`);
    const selectedGroupName = selectedGroup.querySelector('span');
    const mainGroupIcon = document.querySelector('main .header img');
    const selectedGroupIcon = selectedGroup.querySelector('img');

    allGroups.forEach((group) => {
        group.classList.remove('current');
    });

    selectedGroup.classList.add('current');
    mainGroupName.textContent = selectedGroupName.textContent;
    mainGroupIcon.src = selectedGroupIcon.src;
    mainGroupIcon.alt = selectedGroupIcon.alt;
}
