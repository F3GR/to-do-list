import { application } from '../main-app.js';
import { renderTask } from './dom.js';
import { ACTIONS_TASKS, isHTMLElement, isNodeList, isObject, isValid, showErrorModal, handleExitRemoveMenu } from '../utils.js';
import { getTaskNodes } from './static-selectors.js';
import { ERR_APPLY_EVENTS, ERR_HEADINGS } from './errors-text.js';

export function addListenersManageTasks() {
    const { main, form, exitButton, cancelButton, removeConfirm, removeMenu } = getTaskNodes();
    if (!isHTMLElement(main) || 
    !isHTMLElement(form) || 
    !isHTMLElement(exitButton) || 
    !isHTMLElement(cancelButton) ||
    !isHTMLElement(removeMenu) ||
    !isHTMLElement(removeConfirm)
    ) {
        showErrorModal([ERR_HEADINGS.APPLY_EVENTS, ERR_APPLY_EVENTS.TASK_MENU_RENDERING]);
        return;
    }

    main.addEventListener('click', (e) => {
        const reactiveTaskIcon = e.target.closest('.task, button, svg');
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

    form.addEventListener('submit', (e) => submitHandler(e));

    removeConfirm.addEventListener('click', (e) => {
        const taskAction = removeMenu.getAttribute('data-task-action');
        if (taskAction && taskAction !== 'null') {
            removeHandler(e);
            handleExitRemoveMenu(e);
        }
    });

    exitButton.addEventListener('click', (e) => exitHandler(e));
    cancelButton.addEventListener('click', (e) => exitHandler(e));
}

const taskAction = (action, target) => {
    const { 
        menu,
        menuCover,
        menuTitle,
        submitButton,
        removeMenu,
        removeHeading,
        removeMessage,
    } = getTaskNodes();

    if (!isHTMLElement(menu) || 
    !isHTMLElement(menuCover) ||
    !isHTMLElement(menuTitle) || 
    !isHTMLElement(submitButton) ||
    !isHTMLElement(removeMenu) ||
    !isHTMLElement(removeHeading) || 
    !isHTMLElement(removeMessage)
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
            handleToggleOverdueIcon(task);

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

            removeMenu.task = task;
            removeMenu.setAttribute('data-project-id', projectId);
            removeMenu.setAttribute('data-task-id', taskId);
            removeMenu.setAttribute('data-task-action', action);

            menuCover.classList.add('shown');
            removeMenu.classList.add('shown');
            removeHeading.textContent = 'Remove the task';
            removeMessage.textContent = 'Are you sure you want to delete the task?';
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
};

const removeHandler = (e) => {
    const {
        removeMenu,
        removeConfirm,
        removeHeading,
        removeMessage,
    } = getTaskNodes();

    if (!isHTMLElement(removeMenu) ||
    !isHTMLElement(removeConfirm) ||
    !isHTMLElement(removeHeading) ||
    !isHTMLElement(removeMessage)
    ) {
        showErrorModal([ERR_HEADINGS.SHOWING, ERR_APPLY_EVENTS.PROJECT_MENU_SHOWING]);
        return;
    }

    const task = removeMenu.task;
    const removedProjectId = removeMenu.getAttribute('data-project-id');
    const removedTaskId = removeMenu.getAttribute('data-task-id');
    if (!isHTMLElement(task) || 
    !isValid(removedProjectId) || 
    !isValid(removedTaskId) ||
    removedProjectId === 'null' ||
    removedTaskId === 'null'
    ) {
        showErrorModal([ERR_HEADINGS.SHOWING, ERR_APPLY_EVENTS.PROJECT_MENU_SHOWING_REMOVED]);
        return;
    }
    
    let removedTask;
    try {
        removedTask = application.removeTask(removedProjectId, removedTaskId);
    } catch (e) {
        showErrorModal([ERR_HEADINGS.SUBMIT_REMOVING, e.message]);
        return;
    }

    task.remove();

    removeMenu.task = null;
    removeMenu.setAttribute('data-project-id', null);
    removeMenu.setAttribute('data-task-id', null);
    removeMenu.setAttribute('data-task-action', null);
    removeHeading.textContent = '';
    removeMessage.textContent = '';
};

const submitHandler = (e) => {
    e.preventDefault();

    const { 
        menu,
        titleInput,
        dueDateInput,
        descriptionInput,
        notesInput 
    } = getTaskNodes();
    const priorityInputs = document.querySelectorAll('.task-menu input[name="priority"]');
    const action = menu.getAttribute('data-task-action');
    const projectId = menu.getAttribute('data-project-id');

    if (!isHTMLElement(menu)) {
        showErrorModal([ERR_HEADINGS.SUBMITTING, ERR_APPLY_EVENTS.NO_TASK_MENU])
    }
    if (!isHTMLElement(titleInput) || 
    !isHTMLElement(dueDateInput) || 
    !isHTMLElement(descriptionInput) || 
    !isHTMLElement(notesInput) ||
    !isNodeList(priorityInputs)
    ) {
        showErrorModal([ERR_HEADINGS.SUBMITTING, ERR_APPLY_EVENTS.TASK_MENU_SHOWING])
    }
    if (!isValid(action) || !isValid(projectId)) {
        showErrorModal([ERR_HEADINGS.SUBMITTING, ERR_APPLY_EVENTS.NO_PROJECT_ID_OR_ACTION]);
        return;
    }

    const priorityInput = document.querySelector('.task-menu input[name="priority"]:checked');
    if (!isValid(titleInput) || 
    !isValid(dueDateInput) || 
    !isValid(priorityInput)
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
                newTask = application.createNewTask(inputNewTask);
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
            const projectName = document.querySelector(taskSelector + ' .task-project-name');
            
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
                projectName: projectName.textContent,
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

            handleToggleOverdueIcon(editedTaskNode);
            break;
    }
};

const exitHandler = (e) => {
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

const handleToggleOverdueIcon = (task) => {
    const icon = task.querySelector('img.overdue');
    const newStatus = task.getAttribute('data-task-status')
    if (newStatus === '2') {
        icon.classList.add('shown');
    } else {
        icon.classList.remove('shown');
    }
};