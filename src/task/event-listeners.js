import { application } from '../main-app.js';
import { renderTask } from './dom.js';
import { ACTIONS_TASKS, isHTMLElement, isNodeList, isObject, isValid, showErrorModal, handleExitRemoveMenu, isPressedKey, isReal, NUM_TASKS_PAGE } from '../utils.js';
import { getTaskNodes } from './static-selectors.js';
import { ERR_EVENTS } from './errors-text.js';
import { assets } from './assets.js';
import { renderGroup } from '../group/dom.js';

export function addListenersManageTasks() {
    const { main, form, exitButton, cancelButton, removeConfirm, removeMenu } = getTaskNodes();
    if (!isHTMLElement(main) || 
    !isHTMLElement(form) || 
    !isHTMLElement(exitButton) || 
    !isHTMLElement(cancelButton) ||
    !isHTMLElement(removeMenu) ||
    !isHTMLElement(removeConfirm)
    ) {
        showErrorModal(ERR_EVENTS.TASK_MENU_RENDERING);
        return;
    }

    main.addEventListener('click', (e) => handleTaskAction(e));
    main.addEventListener('click', (e) => handleLabelSelection(e));
    main.addEventListener('keydown', (e) => handleLabelSelection(e));
    function handleTaskAction(e) {
        if (isPressedKey(e)) {
            const reactiveTaskIcon = e.target.closest('.task button, .task-bar .add-new');
            if (isHTMLElement(reactiveTaskIcon)) {
                const action = reactiveTaskIcon.getAttribute('data-task-action');
    
                if (!isValid(action)) {
                    return;
                }
                if (!Object.values(ACTIONS_TASKS).includes(action)) {
                    showErrorModal(ERR_EVENTS.DEFAULT_ACTION);
                    return;
                }
        
                taskAction(action, reactiveTaskIcon);
            }
        }
    }
    function handleLabelSelection(e) {
        if (isPressedKey(e)) {
            const reactiveTaskIcon = e.target.closest('.task label');
            if (isHTMLElement(reactiveTaskIcon)) {
                const action = reactiveTaskIcon.getAttribute('data-task-action');
    
                if (!isValid(action)) {
                    return;
                }
                if (!Object.values(ACTIONS_TASKS).includes(action)) {
                    showErrorModal(ERR_EVENTS.DEFAULT_ACTION);
                    return;
                }
        
                taskAction(action, reactiveTaskIcon);
            }
        }
    }

    form.addEventListener('submit', (e) => submitHandler(e));
    removeConfirm.addEventListener('click', (e) => {
        if (isPressedKey(e)) {
            const taskAction = removeMenu.getAttribute('data-task-action');
            if (taskAction && taskAction !== 'null') {
                removeHandler(e);
                handleExitRemoveMenu(e);
            }
        }
    });

    exitButton.addEventListener('click', (e) => {
        if (isPressedKey(e)) {
            exitHandler(e);
        }
    });
    cancelButton.addEventListener('click', (e) => {
        if (isPressedKey(e)) {
            exitHandler(e);
        }
    });
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
        showErrorModal(ERR_EVENTS.TASK_MENU_SHOWING);
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
                showErrorModal(ERR_EVENTS.TASK_MENU_ADD);
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
                showErrorModal(ERR_EVENTS.NO_TASK_OR_IDS_UPDATE);
                return;
            }

            const svg = target.closest('.task').querySelector('label svg');
            const path = target.closest('.task').querySelector('label svg path');
            if (!isHTMLElement(svg) || !isHTMLElement(path)) {
                showErrorModal(ERR_EVENTS.NO_TOGGLE_ICON);
                return;
            }

            const currentTaskStatus = task.getAttribute('data-task-status');
            const updatedTaskStatus = application.toggleTaskStatus(projectId, taskId);
            if (!isValid(updatedTaskStatus) || currentTaskStatus === updatedTaskStatus) {
                showErrorModal([ERR_EVENTS.ACTION_UPDATE_STATUS[0], e.message, ERR_EVENTS.ACTION_UPDATE_STATUS[2]]);
                return;
            }

            task.setAttribute('data-task-status', updatedTaskStatus);
            handleToggleOverdueIcon(task);

            break;

        case ACTIONS_TASKS.EDIT:
            if (!isHTMLElement(task) || !isValid(projectId) || !isValid(taskId)) {
                showErrorModal(ERR_EVENTS.NO_TASK_OR_IDS_EDIT_SHOWING);
                return;
            }

            const {
                titleInput,
                allPriorityInputs,
                dueDateInput,
                descriptionInput,
                notesInput,
            } = getTaskNodes();
        
            if (!isHTMLElement(titleInput) ||
            !isNodeList(allPriorityInputs) ||
            !isHTMLElement(dueDateInput) ||
            !isHTMLElement(descriptionInput) ||
            !isHTMLElement(notesInput)
            ) {
                showErrorModal(ERR_EVENTS.NO_TASK_OR_IDS_EDIT_SHOWING);
                return;
            }

            const tasksTitle = task.querySelector('.task .task-title').textContent;
            const tasksPriorityCode = task.getAttribute('data-task-priority');
            const tasksDueDate = task.querySelector('.task .task-due-date span').textContent;
            const tasksDescription = task.querySelector('.task .task-description').textContent;
            const tasksNotes = task.querySelector('.task .task-notes').textContent;

            if (!isReal(tasksTitle) ||
            !isReal(tasksPriorityCode) ||
            !isReal(tasksDueDate) ||
            !isReal(tasksDescription) ||
            !isReal(tasksNotes)
            ) {
                showErrorModal(ERR_EVENTS.NO_TASK_OR_IDS_EDIT_SHOWING);
                return;
            }

            let selectedInput;
            for (const input of allPriorityInputs) {
                if (input.value === tasksPriorityCode) {
                    selectedInput = input;
                    selectedInput.checked = true;
                    break;
                }
            }
            if (!selectedInput) {
                showErrorModal(ERR_EVENTS.EDITED_TASK_PRIORITY_VALUE);
                return;
            }

            titleInput.value = tasksTitle;
            dueDateInput.value = tasksDueDate;
            descriptionInput.value = tasksDescription;
            notesInput.value = tasksNotes;

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
                showErrorModal(ERR_EVENTS.NO_TASK_OR_IDS_REMOVE);
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
                showErrorModal(ERR_EVENTS.TASK_UNFOLD_NODES);
                return;
            }
    
            if (!unfoldedTaskPanel.classList.contains('unfolded')) {
                unfoldedTaskPanel.classList.add('unfolded');
                taskInfoPanel.classList.add('shown');

                unfoldedTaskPanel.querySelector('.unfold').ariaLabel = 'Fold the task\'s details panel';
                target.style.backgroundImage = `url(${assets.taskFoldIconPath})`;
            } else {
                unfoldedTaskPanel.classList.remove('unfolded');
                taskInfoPanel.classList.remove('shown');
                
                unfoldedTaskPanel.querySelector('.unfold').ariaLabel = 'Unfold the task\'s details panel';
                target.style.backgroundImage = `url(${assets.taskUnfoldIconPath})`;
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
        taskList,
        sidebar,
    } = getTaskNodes();

    if (!isHTMLElement(removeMenu) ||
    !isHTMLElement(removeConfirm) ||
    !isHTMLElement(removeHeading) ||
    !isHTMLElement(removeMessage)
    ) {
        showErrorModal(ERR_EVENTS.TASK_MENU_REMOVING);
        return;
    }
    if (!isHTMLElement(taskList)) {
        showErrorModal(ERR_EVENTS.ACTION_REMOVING_TASKS_LIST);
        return;
    }
    if (!isHTMLElement(sidebar)) {
        showErrorModal(ERR_EVENTS.ACTION_REMOVING_SIDEBAR);
        return;
    }

    const currentTasksPage = Number(taskList.getAttribute('current-tasks-page'));
    if (!isValid(currentTasksPage)) {
        showErrorModal(ERR_EVENTS.ACTION_REMOVING_TASKS_LIST);
        return;
    }

    const currentGroupId = sidebar.getAttribute('current-group');
    if (!isValid(currentGroupId)) {
        showErrorModal(ERR_EVENTS.ACTION_REMOVING_SIDEBAR);
        return;
    }

    const allTaskNodes = taskList.querySelectorAll('.task');
    if (!isNodeList(allTaskNodes)) {
        showErrorModal(ERR_EVENTS.ACTION_REMOVING_TASKS_NODES);
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
        showErrorModal(ERR_EVENTS.TASK_REMOVING);
        return;
    }
    
    let removeTask;
    try {
        removeTask = application.removeTask(removedProjectId, removedTaskId, currentTasksPage, allTaskNodes.length);
    } catch (e) {
        showErrorModal([ERR_EVENTS.ACTION_REMOVING_TASK[0], e.message, ERR_EVENTS.ACTION_REMOVING_TASK[2]]);
        return;
    }
    const { newTasksPageView } = removeTask;

    taskList.innerHTML = '';
    renderGroup(newTasksPageView, currentGroupId);

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
        notesInput,
        taskList,
    } = getTaskNodes();
    const priorityInputs = document.querySelectorAll('.task-menu input[name="priority"]');
    const action = menu.getAttribute('data-task-action');
    const projectId = menu.getAttribute('data-project-id');
    const currentTasksPage = Number(taskList.getAttribute('current-tasks-page'));

    if (!isHTMLElement(menu)) {
        showErrorModal(ERR_EVENTS.NO_TASK_MENU_SUBMIT)
    }
    if (!isHTMLElement(taskList)) {
        showErrorModal(ERR_EVENTS.ACTION_SUBMITTING_PROJECT_LIST_PANEL);
        return;
    }
    if (!isHTMLElement(titleInput) || 
    !isHTMLElement(dueDateInput) || 
    !isHTMLElement(descriptionInput) || 
    !isHTMLElement(notesInput) ||
    !isNodeList(priorityInputs)
    ) {
        showErrorModal(ERR_EVENTS.TASK_MENU_PANEL_SUBMIT)
    }
    if (!isValid(action) || !isValid(projectId) || !isValid(currentTasksPage)) {
        showErrorModal(ERR_EVENTS.NO_PROJECT_ID_OR_ACTION);
        return;
    }

    const priorityInput = document.querySelector('.task-menu input[name="priority"]:checked');
    if (!isValid(titleInput) || 
    !isValid(dueDateInput) || 
    !isValid(priorityInput)
    ) {
        showErrorModal(['Invalid input (empty field(s))', 'One or more of the required fields\' values are empty!', '']);
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

            let addTask;
            try {
                addTask = application.createNewTask(inputNewTask, currentTasksPage);
            } catch (e) {
                showErrorModal([ERR_EVENTS.ACTION_ADDING_TASK[0], e.message, ERR_EVENTS.ACTION_ADDING_TASK[2]]);
                return;
            }
            const { newTask, currentPageLength } = addTask;
            if (!isObject(addTask)) {
                showErrorModal(['Invalid input (task title)', 'A task with the this title already exists in the project!', '']);
                return;
            }

            if (currentPageLength < NUM_TASKS_PAGE) {
                renderTask(newTask);
            }
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
                showErrorModal(ERR_EVENTS.TASK_ID_EDITING);
                return;
            }
            if (!isHTMLElement(editedTaskNode) ||
            !isHTMLElement(oldTitle) || 
            !isHTMLElement(oldDueDate) || 
            !isHTMLElement(oldDescription) || 
            !isHTMLElement(oldNotes)) {
                showErrorModal(ERR_EVENTS.TASK_MENU_PANEL_EDITING);
                return;
            }
    
            const inputEditedTask = {   
                projectName: projectName.textContent,
                projectId: projectId,
                taskId: taskId,
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
                showErrorModal([ERR_EVENTS.ACTION_EDITING_TASK[0], e.message, ERR_EVENTS.ACTION_EDITING_TASK[2]]);
                return;
            }
            if (!isObject(editedTask)) {
                showErrorModal(['Invalid input (task title)', 'A task with the this title already exists in the project!', '']);
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

    exitHandler(e);
};

const exitHandler = (e) => {
    e.preventDefault();

    const { 
        menu,
        menuCover,
        menuTitle,
        submitButton,
        titleInput,
        allPriorityInputs,
        dueDateInput,
        descriptionInput,
        notesInput,
    } = getTaskNodes();

    if (!isHTMLElement(menu) || 
    !isHTMLElement(menuCover) || 
    !isHTMLElement(menuTitle) || 
    !isHTMLElement(submitButton) ||
    !isHTMLElement(titleInput) ||
    !isNodeList(allPriorityInputs) ||
    !isHTMLElement(dueDateInput) ||
    !isHTMLElement(descriptionInput) ||
    !isHTMLElement(notesInput)
    ) {
        showErrorModal(ERR_EVENTS.TASK_MENU_PANEL_EXITING);
        return;
    }
  
    menuTitle.textContent = '';
    submitButton.textContent = '';
  
    menuCover.classList.remove('shown');
    menu.classList.remove('shown');
    menu.removeAttribute('data-project-action');
    menu.removeAttribute('data-project-id');
    menu.removeAttribute('data-task-action');
    menu.removeAttribute('data-task-id');

    titleInput.value = '';
    allPriorityInputs.forEach(input => input.checked = false);
    dueDateInput.value = '';
    descriptionInput.value = '';
    notesInput.value = '';
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