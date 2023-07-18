import { createElementWithAttributes } from '../utils.js';

export function renderProject(name, iconURL, id) {
    const projectsList = document.querySelector('.projects-list');
    const newProject = createElementWithAttributes('li', { class: `project`}, projectsList);
    newProject.setAttribute('data-project-id', `${id}`);

    const newProjectImage = createElementWithAttributes('img', {
        src: `${iconURL}`,
        alt: `Project icon`,
        class: 'icon'
    }, newProject);

    const newProjectText = createElementWithAttributes('span', {}, newProject);
    newProjectText.textContent = name;

    const newProjectEditImage = createElementWithAttributes('img', {
        src: '../src/originals/edit.svg',
        alt: `Edit project icon`,
        class: 'edit'
    }, newProject);
    const newProjectDeleteImage = createElementWithAttributes('img', {
        src: '../src/originals/delete.svg',
        alt: `Remove project icon`,
        class: 'remove'
    }, newProject);
}