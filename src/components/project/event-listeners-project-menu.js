import { application } from '../main-app.js';
import { renderProject } from './dom-project.js';
import { renderGroup } from '../group/dom-group.js';
import { STANDARD_GROUPS } from '../utils.js';

export function addListenersManageProjects() {
    const menuCover = document.querySelector('.menu-cover');
    const menu = document.querySelector('.project-menu');
    const menuTitle = document.querySelector('.project-menu .title-box span');
    const submitButton = document.querySelector('.project-menu button.submit');
    const projectBar = document.querySelector('aside .bar-projects');
    const form = document.querySelector('.project-menu form');

    projectBar.addEventListener('click', (e) => handleMenuPopUp(e));

    form.addEventListener('submit', (e) => handleSubmit(e));

    const exitButton = document.querySelector('.project-menu .exit');
    exitButton.addEventListener('click', (e) => {
        e.preventDefault();
        menuTitle.textContent = '';
        submitButton.textContent = '';
        
        menuCover.classList.remove('shown');
        menu.classList.remove('shown');
        menu.removeAttribute('data-project-action');
        menu.removeAttribute('data-group-id');
    });

    const cancelButton = document.querySelector('.project-menu .cancel');
    cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        menuTitle.textContent = '';
        submitButton.textContent = '';

        menuCover.classList.remove('shown');
        menu.classList.remove('shown');
        menu.removeAttribute('data-project-action');
        menu.removeAttribute('data-group-id');
    });
}

function handleMenuPopUp(e) {
    const menuCover = document.querySelector('.menu-cover');
    const menu = document.querySelector('.project-menu');
    const menuTitle = document.querySelector('.project-menu .title-box span');
    const submitButton = document.querySelector('.project-menu button.submit');
    const currentGroupIcon = document.querySelector('main .header img');
    const currentGroupName = document.querySelector('main .header span');

    e.preventDefault();
    e.stopImmediatePropagation();
    const target = e.target;

    if (target.classList.contains('add-new')) {
        menu.setAttribute('data-project-action', 'add-new');
    
        menuCover.classList.add('shown');
        menu.classList.add('shown');
        menuTitle.textContent = 'Add a new project';
        submitButton.textContent = 'Add'; 

    } else if (target.classList.contains('edit')) {
        menu.setAttribute('data-project-action', 'edit');
        const project = target.closest('.project');
        const id = project.getAttribute('data-group-id');
        menu.setAttribute('data-group-id', id);

        menuCover.classList.add('shown');
        menu.classList.add('shown');
        menuTitle.textContent = 'Edit the project';
        submitButton.textContent = 'Save';

    } else if (target.classList.contains('remove')) {
        const project = target.closest('.project');
        const id = project.getAttribute('data-group-id');
        const removedProject = application.removeProject(id);
    
        if (!removedProject) {
            alert('Error: project wasn\'t found');
        }

        if (project.classList.contains('current')) {
            currentGroupName.textContent = '';
            currentGroupIcon.src = '';
            currentGroupIcon.alt = '';

            const projectListNodes = document.querySelectorAll('.aside .projects-list .project');
            if (projectListNodes.length > 0) {
                const lastProjectNode = projectListNodes[projectListNodes.length - 1];
                const lastProjectId = lastProjectNode.getAttribute('data-group-id');
                renderGroup(lastProjectId);
            } else {
                renderGroup(STANDARD_GROUPS.ALL);
            }
        }
        project.remove();
    }
}

function handleSubmit(e) {
    const menu = document.querySelector('.project-menu');
    const currentGroupIcon = document.querySelector('main .header img');
    const currentGroupName = document.querySelector('main .header span');

    e.preventDefault();
    e.stopImmediatePropagation();

    const inputName = document.querySelector('.project-menu #project-name');
    const inputIcon = document.querySelector('.project-menu input[name="iconURL"]:checked');
    
    if (menu.getAttribute('data-project-action') === 'add-new') {
        if (!inputName || !inputName.value) {
            alert('Please select an icon');
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
        if (newProject) {
            renderProject(newProject);
        } else {
            alert('The project with this title already exists!');
        }
        
    } else if (menu.getAttribute('data-project-action') === 'edit') {
        if (!inputName) {
            alert('Please write a project name');
            return;
        }
        if (!inputIcon || !inputIcon.value) {
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

        const editedProjectNodeName = document.querySelector(`.project[data-group-id="${id}"] span`);
        const editedProjectNodeIcon = document.querySelector(`.project[data-group-id="${id}"] .icon`);
        
        editedProjectNodeName.textContent = editedProject.name;
        editedProjectNodeIcon.src = editedProject.iconURL;
        editedProjectNodeIcon.altText = editedProject.altText;

        const editedProjectNode = document.querySelector(`.project[data-group-id="${id}"]`);
        if (editedProjectNode.classList.contains('current')) {
            currentGroupName.textContent = editedProject.name;
            currentGroupIcon.src = editedProject.iconURL;
            currentGroupIcon.alt = editedProject.altText;
        }
    }   
}


