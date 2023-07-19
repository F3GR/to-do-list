import { application } from '../main-app.js';
import { renderTask } from './dom-task.js';


export function addListenersManageTasks() {
    const selectedMain = document.querySelector('.content main');
    const selectedTaskMenu = document.querySelector('.content .task-menu');
    const selectedMenuCover = document.querySelector('.menu-cover');
    const selectedTaskForm = document.querySelector('.task-menu form');
    const selectedTaskMenuTitle = document.querySelector('.task-menu .title');
    const selectedSubmitTaskButton = document.querySelector('.task-menu button.submit');

    selectedMain.addEventListener('click', function(e) {
        const target = e.target;

        if (target.classList.contains('add-new')) {
            const currentProject = document.querySelector('.projects-list .project.current');
            const id = currentProject.getAttribute('data-project-id');

            selectedTaskMenu.setAttribute('data-project-id', `${id}`);
            selectedTaskMenu.setAttribute('data-task-action', 'add-new');

            selectedTaskMenuTitle.textContent = 'Add a new task';
            selectedSubmitTaskButton.textContent = 'Add';
            selectedCancelButton.textContent = 'Cancel';
            selectedMenuCover.classList.add('shown');
            selectedTaskMenu.classList.add('shown');

        } else if (target.classList.contains('status')) { 
            const svg = target.closest('.task label svg');
            const path = target.closest('.task label svg path');
            const project = target.closest('.task');
            
            if (!target.checked) {
                svg.classList.add('checked');
                project.setAttribute('data-task-status', 'completed');

            } else {
                svg.classList.remove('checked');
                project.setAttribute('data-task-status', 'on-going');
            }

        } else if (target.classList.contains('edit')) {
            const currentProject = document.querySelector('.projects-list .project.current');
            const id = currentProject.getAttribute('data-project-id');

            selectedTaskMenu.setAttribute('data-project-id', `${id}`);
            selectedTaskMenu.setAttribute('data-task-action', 'edit');
            selectedTaskMenu.setAttribute('data-task-id', id);

            selectedTaskMenuTitle.textContent = 'Edit the task';
            selectedSubmitTaskButton.textContent = 'Save';
            selectedMenuCover.classList.add('shown');
            selectedTaskMenu.classList.add('shown');

        } else if (target.classList.contains('remove')) {
            const removedTask = target.closest('.task');

            if (removedTask) {
                removedTask.remove();
            } else {
                alert('Error: task wasn\'t found.')
            }
            
        } else if (target.classList.contains('unfold')) {
            const unfoldedTaskPanel = target.closest('.task');
            const taskInfoPanel = unfoldedTaskPanel.querySelector('.task-unfold-box');

            if (!unfoldedTaskPanel.classList.contains('unfolded')) {
                unfoldedTaskPanel.classList.add('unfolded');
                taskInfoPanel.classList.add('shown');
                target.setAttribute('src', '../src/originals/unfold.svg');
            } else {
                unfoldedTaskPanel.classList.remove('unfolded');
                taskInfoPanel.classList.remove('shown');
                target.setAttribute('src', '../src/originals/fold.svg');
            }
        }
    });

    selectedTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (selectedTaskMenu.getAttribute('data-task-action') === 'add-new') {

            const titleInput = document.querySelector('.task-menu[data-task-action="add-new"] #title');
            const dueDateInput = document.querySelector('.task-menu[data-task-action="add-new"] #dueDate');
            const priorityInput = document.querySelector('.task-menu[data-task-action="add-new"] input[name="priority"]:checked');
            const descriptionInput = document.querySelector('.task-menu[data-task-action="add-new"] #description');
            const notesInput = document.querySelector('.task-menu[data-task-action="add-new"] #notes');

            if (!titleInput.value) {
                alert('Please write title for the task');
                return;
            }

            const currentProject = document.querySelector('.projects-list .project.current');
            const projectId = currentProject.getAttribute('data-project-id');
    
            const newTask = application.createNewTask(projectId, titleInput.value, dueDateInput.value, 
                priorityInput.value, descriptionInput.value, notesInput.value);

            if (newTask) {
                renderTask(projectId, newTask.id, titleInput.value, dueDateInput.value, 
                    newTask.status, priorityInput.value, descriptionInput.value, notesInput.value);
            } else {
                alert('The task with this title already exists!');
            }

        } else if (selectedTaskMenu.getAttribute('data-project-action') === 'edit') {
            const selectNameInput = document.querySelector('.project-menu[data-project-action="edit"] #name');
            const selectIconInput = document.querySelector('.project-menu[data-project-action="edit"] input[name="iconURL"]:checked');
            if (!selectIconInput || !selectIconInput.value) {
                alert('Please select an icon');
                return;
            }
            const id = selectedTaskMenu.getAttribute('data-task-id');
    
            const editProject = application.editProject(id, selectNameInput.value, selectIconInput.value);
            if (editProject) {
                const oldIcon = document.querySelector(`.project[data-project-id="${id}"] .icon`);
                const oldName = document.querySelector(`.project[data-project-id="${id}"] span`);
                oldIcon.src = selectIconInput.value;
                oldName.textContent = selectNameInput.value;

                const editedProject = document.querySelector(`.project[data-project-id="${id}"]`);
                if (editedProject.classList.contains('current')) {
                    mainGroupIcon.src = selectIconInput.value;
                    mainGroupName.textContent = selectNameInput.value;
                }
            } else {
                alert('The project with this title already exists!');
            }
        }
    });

    const selectedTaskExitButton = document.querySelector('.task-menu .exit');
    selectedTaskExitButton.addEventListener('click', function() {
        selectedTaskMenuTitle.textContent = '';
        selectedSubmitTaskButton.textContent = '';
        selectedMenuCover.classList.remove('shown');
        selectedTaskMenu.classList.remove('shown');
        selectedTaskMenu.classList.remove('add');
        selectedTaskMenu.removeAttribute('data-task-action');
        selectedTaskMenu.removeAttribute('data-project-id');
        selectedTaskMenu.removeAttribute('data-task-id');
    });

    const selectedCancelButton = document.querySelector('.task-menu .cancel');
    selectedCancelButton.addEventListener('click', function() {
        selectedTaskMenuTitle.textContent = '';
        selectedSubmitTaskButton.textContent = '';
        selectedMenuCover.classList.remove('shown');
        selectedTaskMenu.classList.remove('shown');
        selectedTaskMenu.classList.remove('add');
        selectedTaskMenu.removeAttribute('data-task-action');
        selectedTaskMenu.removeAttribute('data-project-id');
        selectedTaskMenu.removeAttribute('data-task-id');
    });
}


/*

import { application } from '../main-app.js';
import { renderProject } from './dom-project.js';

export function addListenersManageProjects() {
    const selectedProjectBar = document.querySelector('aside .bar-projects');
    const mainGroupIcon = document.querySelector('main .header img');
    const mainGroupName = document.querySelector('main .header span');

    selectedForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        if (selectedProjectMenu.getAttribute('data-project-action') === 'add-new') {

        } else if (selectedProjectMenu.getAttribute('data-project-action') === 'edit') {
            const selectNameInput = document.querySelector('.project-menu[data-project-action="edit"] #name');
            const selectIconInput = document.querySelector('.project-menu[data-project-action="edit"] input[name="iconURL"]:checked');
            if (!selectIconInput || !selectIconInput.value) {
                alert('Please select an icon');
                return;
            }
            const id = selectedProjectMenu.getAttribute('data-project-id');
    
            const editProject = application.editProject(id, selectNameInput.value, selectIconInput.value);
            if (editProject) {
                const oldIcon = document.querySelector(`.project[data-project-id="${id}"] .icon`);
                const oldName = document.querySelector(`.project[data-project-id="${id}"] span`);
                oldIcon.src = selectIconInput.value;
                oldName.textContent = selectNameInput.value;

                const editedProject = document.querySelector(`.project[data-project-id="${id}"]`);
                if (editedProject.classList.contains('current')) {
                    mainGroupIcon.src = selectIconInput.value;
                    mainGroupName.textContent = selectNameInput.value;
                }
            } else {
                alert('The project with this title already exists!');
            }
        }
    });
}

*/

