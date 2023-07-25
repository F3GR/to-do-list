import { createElementWithAttributes } from '../utils.js';

export function renderProject({ id, name, iconURL, altText }) {
    const projectsList = document.querySelector('.projects-list');
    const nodeNewProject = createElementWithAttributes('li', { class: 'project'}, projectsList);
    nodeNewProject.setAttribute('data-group-id', `${id}`);

    const newProjectImage = createElementWithAttributes('img', {
        src: `${iconURL}`,
        alt: `${altText}`,
        class: 'icon'
    }, nodeNewProject);

    const newProjectText = createElementWithAttributes('span', {}, nodeNewProject);
    newProjectText.textContent = name;

    const newProjectEditImage = createElementWithAttributes('img', {
        src: '../src/originals/edit.svg',
        alt: 'Edit project icon',
        class: 'edit'
    }, nodeNewProject);
    const newProjectDeleteImage = createElementWithAttributes('img', {
        src: '../src/originals/delete.svg',
        alt: 'Remove project icon',
        class: 'remove'
    }, nodeNewProject);
}