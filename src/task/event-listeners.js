import { application } from '../main-app.js';
import { renderTask } from './dom.js';
import { ACTIONS_TASKS, isHTMLElement, isNotEmpty, isValid, showErrorModal } from '../utils.js';
import { getTaskNodes } from './static-selectors.js';

export function addListenersManageTasks() {
    const { main, form, exitButton, cancelButton } = getTaskNodes();
    if (!isHTMLElement(main) || 
    !isHTMLElement(form) || 
    !isHTMLElement(exitButton) || 
    !isHTMLElement(cancelButton)
    ) {
        showErrorModal('Error: task menu wasn\'t found');
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
            if (!isValid(currentProject) || !isValid(id)) {
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
            if (!isValid(task) || !isValid(projectId) || !isValid(taskId)) {
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
            if (!isValid(task) || !isValid(projectId) || !isValid(taskId)) {
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
            if (!isValid(task) || !isValid(projectId) || !isValid(taskId)) {
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
    if (!isValid(menu)) {
        showErrorModal('Error: task menu wasn\'t found')
    }
    if (!isValid(titleInput) || !isValid(dueDateInput) || !isValid(descriptionInput) || !isValid(notesInput)) {
        showErrorModal('Error: one or more input fields weren\'t found')
    }
    
    const priorityInput = document.querySelector('.task-menu input[name="priority"]:checked');
    if (!isValid(priorityInput)) {
        showErrorModal('Error: one or more input fields weren\'t found');
        return;
    }

    if (!isNotEmpty(titleInput.value)) {
        showErrorModal('Please write title for the task');
        return;
    }
    if (!isValid(priorityInput.value)) {
        showErrorModal('Please choose a priority for the task');
        return;
    }

    const action = menu.getAttribute('data-task-action');
    if (!isValid(action)) {
        showErrorModal('Error: action for a task menu wasn\'t found');
        return;
    }
    const projectId = menu.getAttribute('data-project-id');
    if (!isValid(action) || !isValid(projectId)) {
        showErrorModal('Error: action and/or projectId weren\'found');
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
            if (!isValid(titleInput.value) || !isValid(dueDateInput.value) || !isValid(priorityInput.value)) {
                showErrorModal('One or more of the required fields\' values are empty');
                return;
            }
            
            const newTask = application.createNewTask(inputNewTask);
            if (!isValid(newTask)) {
                showErrorModal('The task with this title already exists!');
                return;
            }

            renderTask(newTask);
            break;

        case ACTIONS_TASKS.EDIT:
            const taskId = menu.getAttribute('data-task-id');
            if (!isValid(taskId)) {
                showErrorModal('Error: taskId and/or projectId weren\'found');
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
            if (!isValid(titleInput.value) || !isValid(dueDateInput.value) || !isValid(priorityInput.value)) {
                showErrorModal('One or more of the required fields\' values are empty');
                return;
            }
    
            const editedTask = application.editTask(inputEditedTask);
            if (!isValid(editedTask)) {
                showErrorModal('The task with this title already exists!');
                return;
            }
    
            const taskSelector = `.task[data-project-id="${projectId}"][data-task-id="${taskId}"]`;
            if (!isValid(taskSelector)) {
                showErrorModal('The edited task panel isn\'t found');
                return;
            }
    
            const oldTitle = document.querySelector(taskSelector + ' .task-title');
            const oldDueDate = document.querySelector(taskSelector + ' .task-due-date span');
            const oldDescription = document.querySelector(taskSelector + ' .task-description');
            const oldNotes = document.querySelector(taskSelector + ' .task-notes');
            if (!isValid(oldTitle) || 
            !isValid(oldDueDate) || 
            !isValid(oldDescription) || 
            !isValid(oldNotes)) {
                showErrorModal('One or more edited task panel components weren\'t found');
                return;
            }

            document.querySelector(taskSelector).setAttribute('data-task-priority', `${priorityInput.value}`);
    
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
    if (!isValid(menu) || 
    !isValid(menuCover) || 
    !isValid(menuTitle) || 
    !isValid(submitButton)) {
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