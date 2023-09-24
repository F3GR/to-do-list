import { application } from '../main-app.js';
import { renderProject } from './dom.js';
import { renderGroup } from '../group/dom.js';
import { getProjectNodes } from './static-selectors.js';
import { showErrorModal, STANDARD_GROUPS, ACTIONS_PROJECTS, isHTMLElement, isValid, isObject } from '../utils.js';
import { ERR_APPLY_EVENTS, ERR_HEADINGS } from './errors-text.js';
import { renderProjectsCount } from '../totals/dom-projects-count.js';

export function addListenersManageProjects() {
    const { projectsBar, form, exitButton, cancelButton } = getProjectNodes();
    const { removeConfirm }  = getProjectNodes();

    if (!isHTMLElement(projectsBar) ||
    !isHTMLElement(form) ||
    !isHTMLElement(exitButton) ||
    !isHTMLElement(cancelButton)
    ) {
        showErrorModal([ERR_HEADINGS.APPLY_EVENTS, ERR_APPLY_EVENTS.PROJECT_MENU_RENDERING]);
        return;
    }

    projectsBar.addEventListener('click', (e) => openMenuHandler(e));
    form.addEventListener('submit', (e) => submitHandler(e));
    removeConfirm.addEventListener('click', (e) => removeHandler(e));
    exitButton.addEventListener('click', (e) => exitHandler(e));
    cancelButton.addEventListener('click', (e) =>  exitHandler(e));
};

const openMenuHandler = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    
    const action = e.target.getAttribute('data-project-action');
    if (!isValid(action)) {
        return;
    }
    if (!Object.values(ACTIONS_PROJECTS).includes(action)) {
        showErrorModal([ERR_HEADINGS.SHOWING, ERR_APPLY_EVENTS.DEFAULT_ACTION]);
        return;
    }

    openMenu(action, e.target);
};

const openMenu = (action, target) => {
    const { 
        menuCover,
        menu,
        menuTitle,
        submitButton,
        removeMenu,
        removeConfirm,
        removeHeading,
        removeMessage,
    } = getProjectNodes();

    if (!isHTMLElement(menu) || 
    !isHTMLElement(menuCover) || 
    !isHTMLElement(menuTitle) || 
    !isHTMLElement(submitButton) ||
    !isHTMLElement(removeMenu) ||
    !isHTMLElement(removeConfirm) ||
    !isHTMLElement(removeHeading) ||
    !isHTMLElement(removeMessage)
    ) {
        showErrorModal([ERR_HEADINGS.SHOWING, ERR_APPLY_EVENTS.PROJECT_MENU_SHOWING]);
        return;
    }

    switch (action) {
        case ACTIONS_PROJECTS.ADD_NEW:
            menu.setAttribute('data-project-action', action);
            menuCover.classList.add('shown');
            menu.classList.add('shown');
            menuTitle.textContent = 'Add a new project';
            submitButton.textContent = 'Add'; 
            break;

        case ACTIONS_PROJECTS.EDIT:
            const editedProject = target.closest('.project');
            const editedProjectId = editedProject.getAttribute('data-group-id');

            if (!isHTMLElement(editedProject) || !isValid(editedProjectId)) {
                showErrorModal([ERR_HEADINGS.SHOWING, ERR_APPLY_EVENTS.EDITED_PROJECT]);
                return;
            }   

            menu.setAttribute('data-project-action', action);
            menu.setAttribute('data-group-id', editedProjectId);
            menuCover.classList.add('shown');
            menu.classList.add('shown');
            menuTitle.textContent = 'Edit the project';
            submitButton.textContent = 'Save';
            break;

        case ACTIONS_PROJECTS.REMOVE:
            const { currentGroupIcon, currentGroupName } = getProjectNodes();
            const removedProject = target.closest('.project');
            const removedProjectId = removedProject.getAttribute('data-group-id');

            if (!isHTMLElement(currentGroupIcon) || !isHTMLElement(currentGroupName)) {
                showErrorModal([ERR_HEADINGS.SHOWING, ERR_APPLY_EVENTS.REMOVED_PROJECT_NODES]);
                return;
            }
            if (!isHTMLElement(removedProject) || !isValid(removedProjectId)) {
                showErrorModal([ERR_HEADINGS.SHOWING, ERR_APPLY_EVENTS.REMOVED_PROJECT]);
                return;
            }

            removeMenu.removedProject = removedProject;
            removeMenu.removedProjectId = removedProjectId;
            removeMenu.setAttribute('data-project-action', action);

            menuCover.classList.add('shown');
            removeMenu.classList.add('shown');
            removeHeading.textContent = 'Remove the project';
            removeMessage.textContent = 'Are you sure you want to delete the project? All tasks of the project will be removed as well.';
            break;
    }
};

const removeHandler = (e) => {
    const {
        currentGroupIcon, 
        currentGroupName,
        removeMenu,
        removeConfirm,
        removeHeading,
        removeMessage,
    } = getProjectNodes();

    if (!isHTMLElement(removeMenu) ||
    !isHTMLElement(removeConfirm) ||
    !isHTMLElement(removeHeading) ||
    !isHTMLElement(removeMessage)
    ) {
        showErrorModal([ERR_HEADINGS.SHOWING, ERR_APPLY_EVENTS.PROJECT_MENU_SHOWING]);
        return;
    }

    const removedProject = removeMenu.removedProject;
    const removedProjectId = removeMenu.removedProjectId;
    if (!isHTMLElement(removedProject) || !isValid(removeConfirm)) {
        showErrorModal([ERR_HEADINGS.SHOWING, ERR_APPLY_EVENTS.PROJECT_MENU_SHOWING_REMOVED]);
        return;
    }
    
    let projectListLength;
    try {
        projectListLength = application.removeProject(removedProjectId);
    } catch (e) {
        showErrorModal([ERR_HEADINGS.REMOVING, e.message]);
        return;
    }

    if (!removedProject.classList.contains('current')) {
        removedProject.remove();
        return;
    }

    currentGroupName.textContent = '';
    currentGroupIcon.src = '';
    currentGroupIcon.alt = '';

    renderGroup(STANDARD_GROUPS.ALL);
    renderProjectsCount(projectListLength);
    removedProject.remove();

    removeMenu.removedProject = null;
    removeMenu.removedProjectId = null;
};

const submitHandler = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const { menu } = getProjectNodes();
    if (!isHTMLElement(menu)) {
        showErrorModal([ERR_HEADINGS.SUBMITTING, ERR_APPLY_EVENTS.NO_PROJECT_MENU]);
        return;
    }

    const action = menu.getAttribute('data-project-action');
    submitForm(action);
};

const submitForm = (action) => {
    const inputName = document.querySelector('#project-name');
    const inputIcon = document.querySelector('.project-menu input[name="iconURL"]:checked');

    if (!isValid(inputName.value)) {
        showErrorModal(['Invalid input (project name)', 'Please provide a new project\'s name']);
        return;
    }
    if (!isHTMLElement(inputIcon) || !isValid(inputIcon.value) || !isValid(inputIcon.dataset.altText)) {
        showErrorModal(['Invalid input (project icon)', 'Please select an icon']);
        return;
    }

    switch (action) {
        case ACTIONS_PROJECTS.ADD_NEW:
            const inputNewProject = {   
                name: inputName.value,
                iconURL: inputIcon.value,
                altText: inputIcon.dataset.altText,   
            };

            let addedProject;
            try {
                addedProject = application.createNewProject(inputNewProject);
            } catch (e) {
                showErrorModal([ERR_HEADINGS.SUBMIT_ADDING, e.message]);
                return;
            }
            if (!isObject(addedProject)) {
                showErrorModal(['Invalid input (project name)', 'A project with the new name already exists!']);
                return;
            }

            const { newProject, projectsListLength } = addedProject;
            renderProject(newProject);
            renderProjectsCount(projectsListLength);
            break;

        case ACTIONS_PROJECTS.EDIT:
            const { menu } = getProjectNodes();
            const id = menu.getAttribute('data-group-id');

            if (!menu) {
                showErrorModal([ERR_HEADINGS.SUBMIT_EDITING, ERR_APPLY_EVENTS.PROJECT_MENU_SHOWING]);
                return;
            }
            if (!id) {
                showErrorModal([ERR_HEADINGS.SUBMIT_EDITING, ERR_APPLY_EVENTS.GROUP_ID]);
                return;
            }
            
            const inputEditProject = {  
                id: id,
                name: inputName.value,
                iconURL: inputIcon.value,
                altText: inputIcon.dataset.altText,
            };

            let editedProject;
            try {
                editedProject = application.editProject(inputEditProject);
            } catch (e) {
                showErrorModal([ERR_HEADINGS.SUBMIT_EDITING, e.message]);
                return;
            }
            if (!isObject(editedProject)) {
                showErrorModal(['Invalid input (project name)', 'A project with the new name already exists!']);
                return;
            }

            updateEditedProjectNode(editedProject);
            break;
    }
};

const updateEditedProjectNode = (project) => {
    const { currentGroupIcon, currentGroupName } = getProjectNodes();
    const { id, name, iconURL, altText } = project;
    const editedProjectNodeName = document.querySelector(`.project[data-group-id="${id}"] span`);
    const editedProjectNodeIcon = document.querySelector(`.project[data-group-id="${id}"] .icon`);
    const editedProjectNode = document.querySelector(`.project[data-group-id="${id}"]`);
    const editedProjectTaskNodes = document.querySelectorAll(`.task[data-project-id="${id}"]`);

    if (!isHTMLElement(currentGroupIcon) || 
    !isHTMLElement(currentGroupName) ||
    !isHTMLElement(editedProjectNodeName) || 
    !isHTMLElement(editedProjectNodeIcon) ||
    !isHTMLElement(editedProjectNode)
    ) {
        showErrorModal([ERR_HEADINGS.UPDATING_PROJECT_NODE, ERR_APPLY_EVENTS.EDITED_PROJECT_NODES]);
        return;
    }
    if (!isValid(id) || !isValid(name) || !isValid(iconURL) || !isValid(altText)) {
        showErrorModal([ERR_HEADINGS.UPDATING_PROJECT_NODE, ERR_APPLY_EVENTS.EDITED_DATA_VALUES]);
        return;
    }
    
    editedProjectNodeName.textContent = name;
    editedProjectNodeIcon.src = iconURL;
    editedProjectNodeIcon.alt = altText;

    if (editedProjectNode.classList.contains('current')) {
        currentGroupName.textContent = name;
        currentGroupIcon.src = iconURL;
        currentGroupIcon.alt = altText;
    }

    if (editedProjectTaskNodes) {
        editedProjectTaskNodes.forEach(taskNode => {
            const projectNameNode = taskNode.querySelector('.task-project-name');
            projectNameNode.textContent = name;
        });
    }
};

const exitHandler = (e) => {
    e.preventDefault();
    const { menuCover, menu, menuTitle, submitButton } = getProjectNodes();

    if (!isHTMLElement(menu) || 
    !isHTMLElement(menuCover) || 
    !isHTMLElement(menuTitle) || 
    !isHTMLElement(submitButton)
    ) {
        showErrorModal([ERR_HEADINGS.EXITING, ERR_APPLY_EVENTS.PROJECT_MENU_RENDERING]);
        return;
    }
  
    menuTitle.textContent = '';
    submitButton.textContent = '';
  
    menuCover.classList.remove('shown');
    menu.classList.remove('shown');
    menu.removeAttribute('data-project-action');
    menu.removeAttribute('data-group-id');
    menu.removeAttribute('data-task-action');
    menu.removeAttribute('data-task-id');
};
