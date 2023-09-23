import { application } from '../main-app.js';
import { renderTask } from './dom.js';
import { ACTIONS_TASKS, isHTMLElement, isNotEmpty, isObject, isValid, showErrorModal } from '../utils.js';
import { getTaskNodes } from './static-selectors.js';
import { ERR_APPLY_EVENTS, ERR_HEADINGS } from './errors-text.js';

export function addListenersManageTasks() {
    const { main, form, exitButton, cancelButton } = getTaskNodes();
    if (!isHTMLElement(main) || 
    !isHTMLElement(form) || 
    !isHTMLElement(exitButton) || 
    !isHTMLElement(cancelButton)
    ) {
        showErrorModal([ERR_HEADINGS.APPLY_EVENTS, ERR_APPLY_EVENTS.TASK_MENU_RENDERING]);
        return;
    }

    main.addEventListener('click', (e) => {
        const reactiveTaskIcon = e.target.closest('.task, img');
        if (isHTMLElement(reactiveTaskIcon)) {
            const action = reactiveTaskIcon.getAttribute('data-task-action');

            if (!isValid(action)) {
                return;
            }
            if (!Object.values(ACTIONS_TASKS).includes(action)) {
                showErrorModal([ERR_HEADINGS.APPLY_EVENTS, ERR_APPLY_EVENTS.DEFAULT_ACTION]);
                return;
            }
    
            taskAction(action, reactiveTaskIcon);
        }
    });
    form.addEventListener('submit', (e) => handleTaskEditSubmit(e));
    exitButton.addEventListener('click', (e) => handleExitMenu(e));
    cancelButton.addEventListener('click', (e) => handleExitMenu(e));
}

const taskAction = (action, target) => {
    const { 
        menu,
        menuCover,
        menuTitle,
        submitButton
    } = getTaskNodes();

    if (!isHTMLElement(menu) || 
    !isHTMLElement(menuCover) ||
    !isHTMLElement(menuTitle) || 
    !isHTMLElement(submitButton)
    ) {
        showErrorModal([ERR_HEADINGS.SHOWING, ERR_APPLY_EVENTS.TASK_MENU_SHOWING]);
        return;
    }

    const task = target.closest('.task');
    let projectId;
    let taskId;

    if (isHTMLElement(task)) {
        projectId = task.getAttribute('data-project-id');
        taskId = task.getAttribute('data-task-id');
    }

    switch (action) {
        case ACTIONS_TASKS.ADD_NEW:
            const currentProject = document.querySelector('.projects-list .project.current');
            const id = currentProject.getAttribute('data-group-id');
            if (!isHTMLElement(currentProject) || !isValid(id)) {
                showErrorModal([ERR_HEADINGS.SHOWING, ERR_APPLY_EVENTS.TASK_MENU_ADD]);
                return;
            }
    
            menu.setAttribute('data-project-id', `${id}`);
            menu.setAttribute('data-task-action', 'add-new');
    
            menuTitle.textContent = 'Add a new task';
            submitButton.textContent = 'Add';
            menuCover.classList.add('shown');
            menu.classList.add('shown');
            break;

        case ACTIONS_TASKS.UPDATE_STATUS:
            if (!isHTMLElement(task) || !isValid(projectId) || !isValid(taskId)) {
                showErrorModal([ERR_HEADINGS.UPDATING_TASK_NODE, ERR_APPLY_EVENTS.NO_TASK_OR_IDS]);
                return;
            }

            const svg = target.closest('.task').querySelector('label svg');
            const path = target.closest('.task').querySelector('label svg path');

            if (!isHTMLElement(svg) || !isHTMLElement(path)) {
                showErrorModal([ERR_HEADINGS.UPDATING_TASK_NODE, ERR_APPLY_EVENTS.NO_TOGGLE_ICON]);
                return;
            }

            const currentTaskStatus = task.getAttribute('data-task-status');
            const updatedTaskStatus = application.toggleTaskStatus(projectId, taskId);

            if (!isValid(updatedTaskStatus) || currentTaskStatus === updatedTaskStatus) {
                showErrorModal([ERR_HEADINGS.UPDATING_TASK_NODE, e.message]);
                return;
            }

            task.setAttribute('data-task-status', updatedTaskStatus);
            break;

        case ACTIONS_TASKS.EDIT:
            if (!isHTMLElement(task) || !isValid(projectId) || !isValid(taskId)) {
                showErrorModal([ERR_HEADINGS.SHOWING, ERR_APPLY_EVENTS.NO_TASK_OR_IDS]);
                return;
            }
    
            menu.setAttribute('data-project-id', `${projectId}`);
            menu.setAttribute('data-task-action', 'edit');
            menu.setAttribute('data-task-id', `${taskId}`);
    
            menuTitle.textContent = 'Edit the task';
            submitButton.textContent = 'Save';
            menuCover.classList.add('shown');
            menu.classList.add('shown');
            break;

        case ACTIONS_TASKS.REMOVE:
            if (!isHTMLElement(task) || !isValid(projectId) || !isValid(taskId)) {
                showErrorModal([ERR_HEADINGS.SHOWING_TASK_REMOVE, ERR_APPLY_EVENTS.NO_TASK_OR_IDS]);
                return;
            }

            let removedTask;
            try {
                removedTask = application.removeTask(projectId, taskId);
            } catch (e) {
                showErrorModal([ERR_HEADINGS.SUBMIT_REMOVING, e.message]);
                return;
            }

            task.remove();
            break;

        case ACTIONS_TASKS.UNFOLD:
            const unfoldedTaskPanel = target.closest('.task');
            const taskInfoPanel = unfoldedTaskPanel.querySelector('.task-unfold-box');

            if (!isHTMLElement(unfoldedTaskPanel) || !isHTMLElement(taskInfoPanel)) {
                showErrorModal([ERR_HEADINGS.UNFOLDING, ERR_APPLY_EVENTS.TASK_UNFOLD_NODES]);
                return;
            }
    
            if (!unfoldedTaskPanel.classList.contains('unfolded')) {
                unfoldedTaskPanel.classList.add('unfolded');
                taskInfoPanel.classList.add('shown');
                target.setAttribute('src', '../src/originals/unfold.svg');
            } else {
                unfoldedTaskPanel.classList.remove('unfolded');
                taskInfoPanel.classList.remove('shown');
                target.setAttribute('src', '../src/originals/fold.svg');
            }
            break;
    }
}

const handleTaskEditSubmit = (e) => {
    e.preventDefault();

    const { 
        menu,
        titleInput,
        dueDateInput,
        descriptionInput,
        notesInput 
    } = getTaskNodes();
    const priorityInput = document.querySelector('.task-menu input[name="priority"]:checked');
    const action = menu.getAttribute('data-task-action');
    const projectId = menu.getAttribute('data-project-id');

    if (!isHTMLElement(menu)) {
        showErrorModal([ERR_HEADINGS.SUBMITTING, ERR_APPLY_EVENTS.NO_TASK_MENU])
    }
    if (!isHTMLElement(titleInput) || 
    !isHTMLElement(dueDateInput) || 
    !isHTMLElement(descriptionInput) || 
    !isHTMLElement(notesInput) ||
    !isHTMLElement(priorityInput)
    ) {
        showErrorModal([ERR_HEADINGS.SUBMITTING, ERR_APPLY_EVENTS.TASK_MENU_SHOWING])
    }
    if (!isValid(action) || !isValid(projectId)) {
        showErrorModal([ERR_HEADINGS.SUBMITTING, ERR_APPLY_EVENTS.NO_PROJECT_ID_OR_ACTION]);
        return;
    }

    if (!isNotEmpty(titleInput.value) || 
    !isNotEmpty(dueDateInput.value) || 
    !isNotEmpty(priorityInput.value)
    ) {
        showErrorModal(['Invalid input (empty field(s))', 'One or more of the required fields\' values are empty!']);
        return;
    }

    switch(action) {
        case ACTIONS_TASKS.ADD_NEW:
            const inputNewTask = {  
                projectId: projectId, 
                title: titleInput.value, 
                dueDate: dueDateInput.value, 
                priority: priorityInput.value, 
                description: descriptionInput.value, 
                notes: notesInput.value  
            };

            let newTask;
            try {
                newTask = application.editTask(inputNewTask);
            } catch (e) {
                showErrorModal([ERR_HEADINGS.SUBMIT_ADDING, e.message]);
                return;
            }
            if (!isObject(newTask)) {
                showErrorModal(['Invalid input (task title)', 'A task with the this title already exists in the project!']);
                return;
            }

            renderTask(newTask);
            break;

        case ACTIONS_TASKS.EDIT:
            const taskId = menu.getAttribute('data-task-id');

            const taskSelector = `.task[data-project-id="${projectId}"][data-task-id="${taskId}"]`;
            const editedTaskNode = document.querySelector(taskSelector);

            const oldTitle = document.querySelector(taskSelector + ' .task-title');
            const oldDueDate = document.querySelector(taskSelector + ' .task-due-date span');
            const oldDescription = document.querySelector(taskSelector + ' .task-description');
            const oldNotes = document.querySelector(taskSelector + ' .task-notes');

            if (!isValid(taskId)) {
                showErrorModal([ERR_HEADINGS.SUBMIT_EDITING, ERR_APPLY_EVENTS.TASK_ID]);
                return;
            }
            if (!isHTMLElement(editedTaskNode) ||
            !isHTMLElement(oldTitle) || 
            !isHTMLElement(oldDueDate) || 
            !isHTMLElement(oldDescription) || 
            !isHTMLElement(oldNotes)) {
                showErrorModal([ERR_HEADINGS.SUBMIT_EDITING, ERR_APPLY_EVENTS.TASK_MENU_SHOWING]);
                return;
            }
    
            const inputEditedTask = {   
                projectId: projectId,
                id: taskId,
                title: titleInput.value, 
                dueDate: dueDateInput.value, 
                priority: priorityInput.value, 
                description: descriptionInput.value, 
                notes: notesInput.value   
            };

            let editedTask;
            try {
                editedTask = application.editTask(inputEditedTask);
            } catch (e) {
                showErrorModal([ERR_HEADINGS.SUBMIT_EDITING, e.message]);
                return;
            }
            if (!isObject(editedTask)) {
                showErrorModal(['Invalid input (task title)', 'A task with the this title already exists in the project!']);
                return;
            }

            editedTaskNode.setAttribute('data-task-priority', `${priorityInput.value}`);
    
            oldTitle.textContent = titleInput.value;
            oldDueDate.textContent = dueDateInput.value;
            oldDescription.textContent = descriptionInput.value;
            oldNotes.textContent = notesInput.value;
            break;

        default:
            showErrorModal('Error: action value is not valid');
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

    if (!isHTMLElement(menu) || 
    !isHTMLElement(menuCover) || 
    !isHTMLElement(menuTitle) || 
    !isHTMLElement(submitButton)) {
        showErrorModal([ERR_HEADINGS.EXITING, ERR_APPLY_EVENTS.TASK_MENU_RENDERING]);
        return;
    }
  
    menuTitle.textContent = '';
    submitButton.textContent = '';
  
    menuCover.classList.remove('shown');
    menu.classList.remove('shown');
    menu.removeAttribute('data-project-action');
    menu.removeAttribute('data-group-id');
    menu.removeAttribute('data-task-action');
    menu.removeAttribute('data-task-id')
}