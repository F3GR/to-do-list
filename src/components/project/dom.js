import { ACTIONS, createElementWithAttributes } from '../utils.js';
import { getProjectNodes } from './static-selectors.js';

export function renderProject(project) {
    const { projectsList } = getProjectNodes();
    if (!projectsList) {
        alert('Error: project list panel wasn\'t found');
    }

    const { id, name, iconURL, altText } = project;
    if (!id || !name || !iconURL || !altText) {
        alert('Error: project cannot be rendered');
    }

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
    newProjectEditImage.setAttribute('data-project-action', ACTIONS.EDIT);
    
    const newProjectDeleteImage = createElementWithAttributes('img', {
        src: '../src/originals/delete.svg',
        alt: 'Remove project icon',
        class: 'remove'
    }, nodeNewProject);
    newProjectDeleteImage.setAttribute('data-project-action', ACTIONS.REMOVE);
};