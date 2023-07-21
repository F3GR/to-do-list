import { application } from "../main-app";
import { renderTask } from "../task/dom-task";

export function addListenersSidebar() {
    const sidebarIcon = document.querySelector('header > img.sidebar-icon');
    const sidebar = document.querySelector('.content aside');
    const selectedMain = document.querySelector('.content main');
    const sidebarCover = document.querySelector('main .sidebar-cover');
    const selectedTaskList = document.querySelector('main .task-list');

    sidebarIcon.addEventListener('click', function() {
        if (!sidebar.classList.contains('shown')) {
            sidebar.classList.add('shown');
            sidebarCover.classList.add('shown');
        } else {
            sidebar.classList.remove('shown');
            sidebarCover.classList.remove('shown');
        }
    });

    const viewOptions = document.querySelector('header > img.options');
    const viewBox = document.querySelector('main > .view-options-bar');
    viewOptions.addEventListener('click', function() {
        if (!viewBox.classList.contains('shown')) {
            viewBox.classList.add('shown');
        } else {
            viewBox.classList.remove('shown');
        }
    });




    let currentGroup;
    const mainGroupIcon = document.querySelector('main .header img');
    const mainGroupName = document.querySelector('main .header span');
    const barTypes = document.querySelector('.bar-types');
    const projectsList = document.querySelector('.projects-list');
    
    barTypes.addEventListener('click', handleGroupSelection);
    projectsList.addEventListener('click', handleGroupSelection);
    
    function handleGroupSelection(e) {
        const target = e.target.closest('.bar-types > *, .projects-list > li.project');
    
        if (target && target !== currentGroup) {
            const groupIdentifier = target.getAttribute('data-group-id');
            const selectedGroupIcon = target.querySelector('img');
            const selectedGroupName = target.querySelector('span');
            if (currentGroup) {
                currentGroup.classList.remove('current');
            }
            target.classList.add('current');
            mainGroupIcon.src = selectedGroupIcon.src;
            mainGroupName.textContent = selectedGroupName.textContent;
            currentGroup = target;
            selectedTaskList.innerHTML = '';
            const groupTasks = application.changeTaskGroup(groupIdentifier);

            if (groupTasks) {
                groupTasks.forEach((task) => {
                    renderTask(task.projectId, task.projectName, task.id, task.title, task.dueDate, 
                    task.status, task.priority, task.description, task.notes);
                });
            }
        }
    }
}