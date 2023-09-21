import { createElementWithAttributes } from '../utils.js';
import { showErrorModal, ACTIONS_PROJECTS, isHTMLElement, isValid } from '../utils.js';
import { getProjectNodes } from './static-selectors.js';
import { assets } from './assets.js';

export function renderProject(project) {
    const { projectsList } = getProjectNodes();
    const { id, name, iconURL, altText } = project;
    
    if (!isHTMLElement(projectsList)) {
        showErrorModal('Error: project list panel wasn\'t found');
        return;
    }
    if (!isValid(id) || !isValid(name) || !isValid(iconURL) || !isValid(altText)) {
        showErrorModal('Error: one of the project parameters aren\'t found');
        return;
    }

    const nodeNewProject = createElementWithAttributes('li', { class: 'project'}, projectsList);
    nodeNewProject.setAttribute('data-group-id', `${id}`);

    const newProjectImage = createElementWithAttributes('img', {
        src: `${iconURL}`,
        alt: `${altText}`,
        class: 'icon',
    }, nodeNewProject);

    const newProjectText = createElementWithAttributes('span', {}, nodeNewProject);
    newProjectText.textContent = name;

    const newProjectEditImage = createElementWithAttributes('img', {
        src: assets.newProjectEditImagePath,
        alt: 'Edit project icon',
        class: 'edit',
    }, nodeNewProject);
    newProjectEditImage.setAttribute('data-project-action', ACTIONS_PROJECTS.EDIT);
    
    const newProjectDeleteImage = createElementWithAttributes('img', {
        src: assets.newProjectDeleteImagePath,
        alt: 'Remove project icon',
        class: 'remove',
    }, nodeNewProject);
    newProjectDeleteImage.setAttribute('data-project-action', ACTIONS_PROJECTS.REMOVE);
};