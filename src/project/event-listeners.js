import { application } from '../main-app.js';
import { renderProject } from './dom.js';
import { renderGroup } from '../group/dom.js';
import { getProjectNodes } from './static-selectors.js';
import { showErrorModal, STANDARD_GROUPS, ACTIONS_PROJECTS, isHTMLElement, isValid } from '../utils.js';

export function addListenersManageProjects() {
    const { projectsBar, form, exitButton, cancelButton } = getProjectNodes();

    if (!isHTMLElement(projectsBar) ||
    !isHTMLElement(form) ||
    !isHTMLElement(exitButton) ||
    !isHTMLElement(cancelButton)
        ) {
        showErrorModal('Error: one or more menu panels weren\'t found');
        return;
    }

    projectsBar.addEventListener('click', (e) => openMenuHandler(e));
    form.addEventListener('submit', (e) => submitHandler(e));
    exitButton.addEventListener('click', (e) => exitHandler(e));
    cancelButton.addEventListener('click', (e) =>  exitHandler(e));
};

const openMenuHandler = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const selectedProjectIcon = e.target;

    if (!isHTMLElement(selectedProjectIcon)) {
        showErrorModal('Error: exit and/or cancel buttons weren\'t found');
        return;
    }

    const action = selectedProjectIcon.getAttribute('data-project-action');
    openMenu(action, target);
};

const openMenu = (action, target) => {
    const { 
        menuCover,
        menu,
        menuTitle,
        submitButton 
    } = getProjectNodes();

    if (!isHTMLElement(menu) || 
    !isHTMLElement(menuCover) || 
    !isHTMLElement(menuTitle) || 
    !isHTMLElement(submitButton)
    ) {
        showErrorModal('Error: one or more menu components weren\'t found');
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
                showErrorModal('Error: edited project and/or its id weren\'t found');
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
                showErrorModal('Error: current group icon and/or heading weren\'t found');
                return;
            }
            if (!isHTMLElement(removedProject) || !isValid(removedProjectId)) {
                showErrorModal('Error: removed project and/or its id weren\'t found');
                return;
            }   

            const removedProjectIndex = application.removeProject(removedProjectId);

            if (!isValid(removedProjectIndex)) {
                showErrorModal('Error: project wasn\'t found in the storage');
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
            removedProject.remove();
            break;
    }
};


const submitHandler = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const { menu } = getProjectNodes();

    if (!isHTMLElement(menu)) {
        showErrorModal('Error: menu wasn\'t found');
        return;
    }

    const action = menu.getAttribute('data-project-action');
    submitForm(action);
};

const submitForm = (action) => {
    const inputName = document.querySelector('#project-name');
    const inputIcon = document.querySelector('.project-menu input[name="iconURL"]:checked');

    if (!isHTMLElement(inputName) || !isValid(inputName.value)) {
        showErrorModal('Please write a project name');
        return;
    }
    if (!isHTMLElement(inputIcon) || !isValid(inputIcon.value) || !isValid(inputIcon.dataset.altText)) {
        showErrorModal('Please select an icon');
        return;
    }

    switch (action) {
        case ACTIONS_PROJECTS.ADD_NEW:
            const inputNewProject = {   
                name: inputName.value,
                iconURL: inputIcon.value,
                altText: inputIcon.dataset.altText,   
            };

            const newProject = application.createNewProject(inputNewProject);
            if (!newProject) {
                showErrorModal('The project with this title already exists!');
                return;  
            }

            renderProject(newProject);
            break;

        case ACTIONS_PROJECTS.EDIT:
            const { menu } = getProjectNodes();
            const id = menu.getAttribute('data-group-id');

            if (!menu) {
                showErrorModal('Error: menu wasn\'t found');
                return;
            }
            if (!id) {
                showErrorModal('Error: group id wasn\'t found');
                return;
            }
            
            const inputEditProject = {  
                id: id,
                name: inputName.value,
                iconURL: inputIcon.value,
                altText: inputIcon.dataset.altText,
            };

            const editedProject = application.editProject(inputEditProject);

            if (!isHTMLElement(editedProject)) {
                showErrorModal(editedProject);
                return;
            }

            updateEditedProjectNode(editedProject);
            break;
        default:
            showErrorModal('Error: the project action wasn\' found');
    }
};

const updateEditedProjectNode = (project) => {
    const { currentGroupIcon, currentGroupName } = getProjectNodes();
    const { id, name, iconURL, altText } = project;
    const editedProjectNodeName = document.querySelector(`.project[data-group-id="${id}"] span`);
    const editedProjectNodeIcon = document.querySelector(`.project[data-group-id="${id}"] .icon`);
    const editedProjectNode = document.querySelector(`.project[data-group-id="${id}"]`);

    if (!isHTMLElement(currentGroupIcon) || !isHTMLElement(currentGroupName)) {
        showErrorModal('Error: current group icon and/or heading weren\'t found');
        return;
    }
    if (!isValid(id) || !isValid(name) || !isValid(iconURL) || !isValid(altText)) {
        showErrorModal('Error: one or more edited project data values weren\'t found');
        return;
    }
    if (!isHTMLElement(editedProjectNodeName) || !isHTMLElement(editedProjectNodeIcon)) {
        showErrorModal('Error: edited project icon and/or name weren\'t found');
        return;
    }
    if (!isHTMLElement(editedProjectNode)) {
        showErrorModal('Error: edited project node wasn\'t found');
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
}

const exitHandler = (e) => {
    e.preventDefault();
    const { menuCover, menu, menuTitle, submitButton } = getProjectNodes();

    if (!isHTMLElement(menu) || 
    !isHTMLElement(menuCover) || 
    !isHTMLElement(menuTitle) || 
    !isHTMLElement(submitButton)
    ) {
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
    menu.removeAttribute('data-task-id');
};
