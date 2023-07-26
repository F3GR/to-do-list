import { ACTIONS, createElementWithAttributes } from '../utils.js';
import { projectBarNodes as STATIC_SELECTORS } from './static-selectors-project.js';

export function renderProject(project) {
    const { id, name, iconURL, altText } = project;

    const nodeNewProject = createElementWithAttributes('li', { class: 'project'}, STATIC_SELECTORS.projectsList);
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
}