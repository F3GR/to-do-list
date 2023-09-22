import { application } from '../main-app.js';
import { renderTask } from './dom.js';
import { ACTIONS_TASKS, isHTMLElement, isNotEmpty, isObject, isValid, showErrorModal } from '../utils.js';
import { getTaskNodes } from './static-selectors.js';

export function addListenersManageTasks() {
    const { main, form, exitButton, cancelButton } = getTaskNodes();
    if (!isHTMLElement(main) || 
    !isHTMLElement(form) || 
    !isHTMLElement(exitButton) || 
    !isHTMLElement(cancelButton)
    ) {
        showErrorModal('Error: one or more task menu elements wasn\'t found (rendering task menu)');
        return;
    }

    main.addEventListener('click', (e) => {
        const reactiveTaskIcon = e.target.closest('.task, img');
        if (isHTMLElement(reactiveTaskIcon)) {
            const action = reactiveTaskIcon.getAttribute('data-task-action');
            taskAction(action, reactiveTaskIcon);
        }
    });
    form.addEventListener('submit', (e) => handleSubmit(e));
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

    if (!isValid(menu) || 
    !isValid(menuCover) ||
    !isValid(menuTitle) || 
    !isValid(submitButton)
    ) {
        showErrorModal('Error: one or more menu components weren\'t found');
        return;
    }

    const task = target.closest('.task');
    let projectId;
    let taskId;

    if (isValid(task)) {
        projectId = task.getAttribute('data-project-id');
        taskId = task.getAttribute('data-task-id');
    }

    switch (action) {
        case ACTIONS_TASKS.ADD_NEW:
            const currentProject = document.querySelector('.projects-list .project.current');
            const id = currentProject.getAttribute('data-group-id');
            if (!isHTMLElement(currentProject) || !isValid(id)) {
                showErrorModal('Error: current project and/or its id weren\'t found');
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
                showErrorModal('Error: task panel and/or task and/or projectId weren\'found when updating status');
                return;
            }

            const svg = target.closest('.task').querySelector('label svg');
            const path = target.closest('.task').querySelector('label svg path');

            if (!isHTMLElement(svg) || !isHTMLElement(path)) {
                showErrorModal('Error: status toggle icon wasn\'found');
                return;
            }

            const currentTaskStatus = task.getAttribute('data-task-status');
            const updatedTaskStatus = application.toggleTaskStatus(projectId, taskId);
    
            if (!isValid(updatedTaskStatus) || currentTaskStatus === updatedTaskStatus) {
                showErrorModal('Error: task status wasn\'t updated');
                return;
            }

            task.setAttribute('data-task-status', updatedTaskStatus);
            break;

        case ACTIONS_TASKS.EDIT:
            if (!isHTMLElement(task) || !isValid(projectId) || !isValid(taskId)) {
                showErrorModal('Error: task panel and/or task and/or projectId weren\'t found when editing status');
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
                showErrorModal('Error: task panel and/or task and/or projectId weren\'found when removing the task');
                return;
            }

            const removedTask = application.removeTask(projectId, taskId);

            if (!isValid(removedTask)) {
                showErrorModal('Error: removed task wasn\'t found in the storage')
                return;
            }
    
            task.remove();
            break;

        case ACTIONS_TASKS.UNFOLD:
            const unfoldedTaskPanel = target.closest('.task');
            const taskInfoPanel = unfoldedTaskPanel.querySelector('.task-unfold-box');

            if (!isHTMLElement(unfoldedTaskPanel) || !isHTMLElement(taskInfoPanel)) {
                showErrorModal('Error: task panel and/or its unfolded box weren\'t found');
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
        default:
            showErrorModal('Error: action value is not valid');
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
    const action = menu.getAttribute('data-task-action');
    const projectId = menu.getAttribute('data-project-id');

    if (!isHTMLElement(menu)) {
        showErrorModal('Error: task menu wasn\'t found')
    }
    if (!isHTMLElement(titleInput) || 
    !isHTMLElement(dueDateInput) || 
    !isHTMLElement(descriptionInput) || 
    !isHTMLElement(notesInput)
    ) {
        showErrorModal('Error: one or more input fields weren\'t found')
    }
    if (!isHTMLElement(priorityInput)) {
        showErrorModal('Error: one or more input fields weren\'t found');
        return;
    }
    if (!isValid(action) || !isValid(projectId)) {
        showErrorModal('Error: action and/or projectId weren\'found');
        return;
    }

    if (!isNotEmpty(titleInput.value) || 
    !isNotEmpty(dueDateInput.value) || 
    !isNotEmpty(priorityInput.value)
    ) {
        showErrorModal('One or more of the required fields\' values are empty');
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

            const newTask = application.createNewTask(inputNewTask);
            if (!isObject(newTask)) {
                showErrorModal(newTask);
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
                showErrorModal('Error: taskId and/or projectId weren\'found');
                return;
            }
            if (!isHTMLElement(editedTaskNode)) {
                showErrorModal('The edited task panel isn\'t found');
                return;
            }
            if (!isHTMLElement(oldTitle) || 
            !isHTMLElement(oldDueDate) || 
            !isHTMLElement(oldDescription) || 
            !isHTMLElement(oldNotes)) {
                showErrorModal('One or more edited task panel components weren\'t found');
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

            const editedTask = application.editTask(inputEditedTask);
            if (!isObject(editedTask)) {
                showErrorModal(editedTask);
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
        showErrorModal('Error: one or more menu components weren\'t found');
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