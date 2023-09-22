import { createElementWithAttributes } from '../utils.js';
import { showErrorModal, ACTIONS_PROJECTS, isHTMLElement, isValid } from '../utils.js';
import { getProjectNodes } from './static-selectors.js';
import { assets } from './assets.js';
import { ERR_HEADINGS, ERR_RENDERING } from './errors-msg.js';

export function renderProject(project) {
    const { projectsList } = getProjectNodes();
    const { id, name, iconURL, altText } = project;
    
    if (!isHTMLElement(projectsList)) {
        showErrorModal([ERR_HEADINGS.RENDERING, ERR_RENDERING.PROJECT_LIST_PANEL]);
        return;
    }
    if (!isValid(id) || !isValid(name) || !isValid(iconURL) || !isValid(altText)) {
        showErrorModal([ERR_HEADINGS.RENDERING, ERR_RENDERING.PROJECT_VALUES]);
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