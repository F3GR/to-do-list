import { application } from '../main-app.js';
import { renderProject } from './dom-project.js';
import { renderGroup } from '../group/dom-group.js';
import { ACTIONS, STANDARD_GROUPS } from '../utils.js';
import { projectBarNodes as STATIC_SELECTORS } from './static-selectors-project.js';

export function addListenersManageProjects() {
    STATIC_SELECTORS.projectBar.addEventListener('click', (e) => handleMenuPopUp(e));

    STATIC_SELECTORS.form.addEventListener('submit', (e) => handleSubmit(e));

    STATIC_SELECTORS.exitButton.addEventListener('click', (e) => handleExitMenu(e));
    STATIC_SELECTORS.cancelButton.addEventListener('click', (e) =>  handleExitMenu(e));
}

function handleMenuPopUp(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    
    const target = e.target;
    const projectMenuAction = target.getAttribute('data-project-action');

    if (projectMenuAction === ACTIONS.ADDNEW) {
        STATIC_SELECTORS.menu.setAttribute('data-project-action', ACTIONS.ADDNEW);
    
        STATIC_SELECTORS.menuCover.classList.add('shown');
        STATIC_SELECTORS.menu.classList.add('shown');
        STATIC_SELECTORS.menuTitle.textContent = 'Add a new project';
        STATIC_SELECTORS.submitButton.textContent = 'Add'; 

    } else if (projectMenuAction === ACTIONS.EDIT) {
        STATIC_SELECTORS.menu.setAttribute('data-project-action', ACTIONS.EDIT);

        const project = target.closest('.project');
        const id = project.getAttribute('data-group-id');
        STATIC_SELECTORS.menu.setAttribute('data-group-id', id);

        STATIC_SELECTORS.menuCover.classList.add('shown');
        STATIC_SELECTORS.menu.classList.add('shown');
        STATIC_SELECTORS.menuTitle.textContent = 'Edit the project';
        STATIC_SELECTORS.submitButton.textContent = 'Save';

    } else if (projectMenuAction === ACTIONS.REMOVE) {
        const removedProject = target.closest('.project');
        const id = removedProject.getAttribute('data-group-id');
        const removedProjectIndex = application.removeProject(id);
    
        if (!removedProjectIndex) {
            alert('Error: project wasn\'t found');
            return;
        }

        if (!removedProject.classList.contains('current')) {
            removedProject.remove();
            return;
        }

        STATIC_SELECTORS.currentGroupName.textContent = '';
        STATIC_SELECTORS.currentGroupIcon.src = '';
        STATIC_SELECTORS.currentGroupIcon.alt = '';

        const projectListNodes = document.querySelectorAll('aside .projects-list .project');
        if (projectListNodes.length > 0) {
            const lastProjectNode = projectListNodes[projectListNodes.length - 1];
            const lastProjectId = lastProjectNode.getAttribute('data-group-id');
            renderGroup(lastProjectId);
        } else {
            renderGroup(STANDARD_GROUPS.ALL);
        }
        removedProject.remove();
    }
}

function handleSubmit(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    const inputName = document.querySelector('.project-menu #project-name');
    const inputIcon = document.querySelector('.project-menu input[name="iconURL"]:checked');
    const projectSubmitAction = menu.getAttribute('data-project-action');
    
    if (projectSubmitAction === ACTIONS.ADDNEW) {
        if (!inputName || !inputName.value) {
            alert('Please write a project name');
            return;
        }

        if (!inputIcon || !inputIcon.value || !inputIcon.dataset.altText) {
            alert('Please select an icon');
            return;
        }

        const inputNewProject = {
            name: inputName.value,
            iconURL: inputIcon.value,
            altText: inputIcon.dataset.altText,
        }

        const newProject = application.createNewProject(inputNewProject);
        if (!newProject) {
            alert('The project with this title already exists!');
            return;  
        }
        renderProject(newProject);
        
    } else if (projectSubmitAction === ACTIONS.EDIT) {
        if (!inputName || !inputName.value) {
            alert('Please write a project name');
            return;
        }
        if (!inputIcon || !inputIcon.value || !inputIcon.dataset.altText) {
            alert('Please select an icon');
            return;
        }

        const id = menu.getAttribute('data-group-id');
        const inputEditProject = {
            id: id,
            name: inputName.value,
            iconURL: inputIcon.value,
            altText: inputIcon.dataset.altText,
        }

        const editedProject = application.editProject(inputEditProject);

        if (!editedProject) {
            alert('The project with this title already exists!');
            return;
        }

        replaceMainHeaderNode(project);
    }   
}

function replaceMainHeaderNode(project) {
    const {id, name, iconURL, altText} = project;

    const editedProjectNodeName = document.querySelector(`.project[data-group-id="${id}"] span`);
    const editedProjectNodeIcon = document.querySelector(`.project[data-group-id="${id}"] .icon`);
    
    editedProjectNodeName.textContent = name;
    editedProjectNodeIcon.src = iconURL;
    editedProjectNodeIcon.altText = altText;

    const editedProjectNode = document.querySelector(`.project[data-group-id="${id}"]`);
    if (editedProjectNode.classList.contains('current')) {
        STATIC_SELECTORS.currentGroupName.textContent = name;
        STATIC_SELECTORS.currentGroupIcon.src = iconURL;
        STATIC_SELECTORS.currentGroupIcon.alt = altText;
    }
}

function handleExitMenu(e) {
    e.preventDefault();
  
    STATIC_SELECTORS.menuTitle.textContent = '';
    STATIC_SELECTORS.submitButton.textContent = '';
  
    STATIC_SELECTORS.menuCover.classList.remove('shown');
    STATIC_SELECTORS.menu.classList.remove('shown');
    STATIC_SELECTORS.menu.removeAttribute('data-project-action');
    STATIC_SELECTORS.menu.removeAttribute('data-group-id');
    STATIC_SELECTORS.menu.removeAttribute('data-task-action');
    STATIC_SELECTORS.menu.removeAttribute('data-task-id')
}






