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
            const id = currentProject.getAttribute('data-group-id');

            selectedTaskMenu.setAttribute('data-group-id', `${id}`);
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
            const projectId = currentProject.getAttribute('data-group-id');
            const taskId = target.closest('.task').getAttribute('data-task-id');

            selectedTaskMenu.setAttribute('data-group-id', `${projectId}`);
            selectedTaskMenu.setAttribute('data-task-action', 'edit');
            selectedTaskMenu.setAttribute('data-task-id', `${taskId}`);

            selectedTaskMenuTitle.textContent = 'Edit the task';
            selectedSubmitTaskButton.textContent = 'Save';
            selectedMenuCover.classList.add('shown');
            selectedTaskMenu.classList.add('shown');

        } else if (target.classList.contains('remove')) {
            const selectedTask = target.closest('.task');
            const projectId = selectedTask.getAttribute('data-group-id');
            const taskId = selectedTask.getAttribute('data-task-id');
            const removedTask = application.removeTask(projectId, taskId);

            if (removedTask) {
                selectedTask.remove();
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

        const titleInput = document.querySelector('.task-menu #task-title');
        const dueDateInput = document.querySelector('.task-menu #task-dueDate');
        const priorityInput = document.querySelector('.task-menu input[name="priority"]:checked');
        const descriptionInput = document.querySelector('.task-menu #task-description');
        const notesInput = document.querySelector('.task-menu #task-notes');

        const projectId = selectedTaskMenu.getAttribute('data-group-id');
        const taskId = selectedTaskMenu.getAttribute('data-task-id');

        if (!titleInput.value) {
            alert('Please write title for the task');
            return;
        }
        if (!priorityInput.value) {
            alert('Please choose a priority for the task');
            return;
        }

        if (selectedTaskMenu.getAttribute('data-task-action') === 'add-new') {
            
            const newTask = application.createNewTask(projectId, titleInput.value, dueDateInput.value, 
                priorityInput.value, descriptionInput.value, notesInput.value);

            if (newTask) {
                renderTask(projectId, newTask.id, titleInput.value, dueDateInput.value, 
                    newTask.status, priorityInput.value, descriptionInput.value, notesInput.value);
            } else {
                alert('The task with this title already exists!');
            }

        } else if (selectedTaskMenu.getAttribute('data-task-action') === 'edit') {
            const editedTask = application.editTask(projectId, taskId, titleInput.value, dueDateInput.value, 
                priorityInput.value, descriptionInput.value, notesInput.value);

            if (editedTask) {
                const taskSelector = `.task[data-group-id="${projectId}"][data-task-id="${taskId}"]`;

                const oldTitle = document.querySelector(taskSelector + ' .task-title');
                const oldDueDate = document.querySelector(taskSelector + ' .task-due-date span');
                const oldDescription = document.querySelector(taskSelector + ' .task-unfold-box .task-description-box .task-description');
                const oldNotes = document.querySelector(taskSelector + ' .task-unfold-box .task-notes-box .task-notes');

                oldTitle.textContent = titleInput.value;
                oldDueDate.textContent = dueDateInput.value;
                document.querySelector(taskSelector).setAttribute('data-task-priority', `${priorityInput.value}`);
                oldDescription.textContent = descriptionInput.value;
                oldNotes.textContent = notesInput.value;
            
            } else {
                alert('The project with this title already exists!');
            }
        }
    });

    const selectedTaskExitButton = document.querySelector('.task-menu .exit');
    selectedTaskExitButton.addEventListener('click', function(e) {
        e.preventDefault();

        selectedTaskMenuTitle.textContent = '';
        selectedSubmitTaskButton.textContent = '';
        selectedMenuCover.classList.remove('shown');
        selectedTaskMenu.classList.remove('shown');
        selectedTaskMenu.classList.remove('add');
        selectedTaskMenu.removeAttribute('data-task-action');
        selectedTaskMenu.removeAttribute('data-group-id');
        selectedTaskMenu.removeAttribute('data-task-id');
    });

    const selectedCancelButton = document.querySelector('.task-menu .cancel');
    selectedCancelButton.addEventListener('click', function(e) {
        e.preventDefault();

        selectedTaskMenuTitle.textContent = '';
        selectedSubmitTaskButton.textContent = '';
        selectedMenuCover.classList.remove('shown');
        selectedTaskMenu.classList.remove('shown');
        selectedTaskMenu.classList.remove('add');
        selectedTaskMenu.removeAttribute('data-task-action');
        selectedTaskMenu.removeAttribute('data-group-id');
        selectedTaskMenu.removeAttribute('data-task-id');
    });
}


