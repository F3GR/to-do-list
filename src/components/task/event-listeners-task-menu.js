import { application } from '../main-app.js';
import { renderTask } from './dom-task.js';
import { ACTIONS } from '../utils.js';
import { getTaskNodes } from './static-selectors.js';

export function addListenersManageTasks() {
    const { main, form, exitButton, cancelButton } = getTaskNodes();

    main.addEventListener('click', (e) => handleMenuPopUp(e));

    form.addEventListener('submit', (e) => handleSubmit(e));

    exitButton.addEventListener('click', (e) => handleExitMenu(e));
    cancelButton.addEventListener('click', (e) => handleExitMenu(e));
}

const handleMenuPopUp = (e) => {
    const { 
        menu,
        menuCover,
        menuTitle,
        submitButton,
        cancelButton 
    } = getTaskNodes();

    const target = e.target;
    const taskAction = target.getAttribute('data-task-action');

    if (taskAction === ACTIONS.ADDNEW) {
        const currentProject = document.querySelector('.projects-list .project.current');
        const id = currentProject.getAttribute('data-group-id');

        menu.setAttribute('data-project-id', `${id}`);
        menu.setAttribute('data-task-action', 'add-new');

        menuTitle.textContent = 'Add a new task';
        submitButton.textContent = 'Add';
        cancelButton.textContent = 'Cancel';
        menuCover.classList.add('shown');
        menu.classList.add('shown');

    } else if (taskAction === ACTIONS.UPDATE_STATUS) {
        const svg = target.closest('.task').querySelector('label svg');
        const path = target.closest('.task').querySelector('label svg path');
        const task = target.closest('.task');

        const projectId = task.getAttribute('data-project-id');
        const taskId = task.getAttribute('data-task-id');

        const currentTaskStatus = task.getAttribute('data-task-status');
        const updatedTaskStatus = application.toggleTaskStatus(projectId, taskId);

        if (!updatedTaskStatus || currentTaskStatus === updatedTaskStatus) {
            alert('Error: task status wasn\'t updated');
            return;
        }
        task.setAttribute('data-task-status', updatedTaskStatus);
        
    } else if (taskAction === ACTIONS.EDIT) {
        const projectId = target.closest('.task').getAttribute('data-project-id');
        const taskId = target.closest('.task').getAttribute('data-task-id');

        menu.setAttribute('data-project-id', `${projectId}`);
        menu.setAttribute('data-task-action', 'edit');
        menu.setAttribute('data-task-id', `${taskId}`);

        menuTitle.textContent = 'Edit the task';
        submitButton.textContent = 'Save';
        menuCover.classList.add('shown');
        menu.classList.add('shown');

    } else if (taskAction === ACTIONS.REMOVE) {
        const task = target.closest('.task');
        const projectId = task.getAttribute('data-project-id');
        const taskId = task.getAttribute('data-task-id');
        const removedTask = application.removeTask(projectId, taskId);

        if (!removedTask) {
            alert('Error: task wasn\'t found.')
            return;
        }

        task.remove();
        
    } else if (taskAction === ACTIONS.UNFOLD) {
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
}

const handleSubmit = (e) => {
    e.preventDefault();

    const { 
        menu,
        titleInput,
        dueDateInput,
        descriptionInput,
        notesInput 
    } = getTaskNodes();

    const priorityInput = document.querySelector('.task-menu input[name="priority"]:checked');

    const menuAction = menu.getAttribute('data-task-action');

    if (!titleInput.value) {
        alert('Please write title for the task');
        return;
    }
    if (!priorityInput.value) {
        alert('Please choose a priority for the task');
        return;
    }

    if (menuAction === ACTIONS.ADDNEW) {
        const projectId = menu.getAttribute('data-project-id');

        const inputNewTask = {  
            projectId: projectId, 
            title: titleInput.value, 
            dueDate: dueDateInput.value, 
            priority: priorityInput.value, 
            description: descriptionInput.value, 
            notes: notesInput.value  
        };
        
        const newTask = application.createNewTask(inputNewTask);

        if (!newTask) {
            alert('The task with this title already exists!');
            return;
        }
        renderTask(newTask);

    } else if (menuAction === ACTIONS.EDIT) {
        const projectId = menu.getAttribute('data-project-id');
        const taskId = menu.getAttribute('data-task-id');

        const inputEditedTask = {   
            projectId: projectId,
            id: taskId,
            title: titleInput.value, 
            dueDate: dueDateInput.value, 
            priority: priorityInput.value, 
            description: descriptionInput.value, 
            notes: notesInput.value   
        };

        const editedTask = application.editTask(inputEditedTask);
        if (!editedTask) {
            alert('The project with this title already exists!');
            return;
        }

        const taskSelector = `.task[data-project-id="${projectId}"][data-task-id="${taskId}"]`;

        const oldTitle = document.querySelector(taskSelector + ' .task-title');
        const oldDueDate = document.querySelector(taskSelector + ' .task-due-date span');
        const oldDescription = document.querySelector(taskSelector + ' .task-description');
        const oldNotes = document.querySelector(taskSelector + ' .task-notes');

        oldTitle.textContent = titleInput.value;
        oldDueDate.textContent = dueDateInput.value;
        document.querySelector(taskSelector).setAttribute('data-task-priority', `${priorityInput.value}`);
        oldDescription.textContent = descriptionInput.value;
        oldNotes.textContent = notesInput.value;
    }
}

const handleExitMenu = (e) => {
    e.preventDefault();

    const { 
        menu,
        menuCover,
        menuTitle,
        submitButton 
    } = getTaskNodes();
  
    menuTitle.textContent = '';
    submitButton.textContent = '';
  
    menuCover.classList.remove('shown');
    menu.classList.remove('shown');
    menu.removeAttribute('data-project-action');
    menu.removeAttribute('data-group-id');
    menu.removeAttribute('data-task-action');
    menu.removeAttribute('data-task-id')
}