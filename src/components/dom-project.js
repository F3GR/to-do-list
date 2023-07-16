import { createElementWithAttributes } from './utils.js';

export function renderNewProject() {
    const projectsList = document.querySelector('.projects-list');
    const exampleProject = createElementWithAttributes('li', { class: `project`}, projectsList);
    exampleProject.setAttribute('data-project-id', '0');

    const exampleProjectImage = createElementWithAttributes('img', {
        src: '../src/originals/category-other.svg',
        alt: `Add new project icon`
    }, exampleProject);
    const exampleProjectText = createElementWithAttributes('span', {}, exampleProject);
    exampleProjectText.textContent = `New project`;
    const exampleProjectEditImage = createElementWithAttributes('img', {
        src: '../src/originals/edit.svg',
        alt: `Edit project icon`,
        class: 'edit'
    }, exampleProject);
    const exampleProjectDeleteImage = createElementWithAttributes('img', {
        src: '../src/originals/delete.svg',
        alt: `Remove project icon`,
        class: 'remove'
    }, exampleProject);

    addListenersToANewProject();
}

export function addListenersToANewProject() {
    const selectedProjectMenu = document.querySelector('.project-menu');
    const selectedProjectMenuTitle = document.querySelector('.project-menu .title-box span');
    const selectedSaveProjectButton = document.querySelector('.project-menu button.save');
    const selectedMenuCover = document.querySelector('.menu-cover');

    const selectedEditProjectButton = document.querySelector('.projects-list li img.edit');
    
    selectedEditProjectButton.addEventListener('click', function() {
        selectedProjectMenuTitle.textContent = 'Edit the project';
        selectedSaveProjectButton.textContent = 'Save';
        selectedMenuCover.classList.add('shown');
        selectedProjectMenu.classList.add('shown');
    });

    const selectedProject = document.querySelector('aside .projects-list .project');
    selectedProject.addEventListener('click', function() {
            if (!selectedProject.classList.contains('current')) {
                selectedProject.classList.add('current');
            } else {
                selectedProject.classList.remove('current');
            }
    });

    const selectedRemoveProjectButton = document.querySelector('.projects-list li img.remove');
    selectedRemoveProjectButton.addEventListener('click', function() {
        const removedProject = selectedRemoveProjectButton.closest('.project');
        removedProject.remove();
    });
}