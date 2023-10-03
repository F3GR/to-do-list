import { getProjectsBarFooterNodes } from './static-selectors.js';
import { isHTMLElement } from '../utils.js';
import { ERR_RENDERING } from './errors-text.js';

export function renderProjectsPageNav(current, total) {
    if (typeof current !== 'number' || 
    current === NaN || 
    typeof total !== 'number' || 
    total === NaN
    ) {
        showErrorModal(ERR_RENDERING.PROJECTS_VALUES);
        return;
    }
    if (current === 0) {
        current = 1;
    }
    if (total === 0) {
        total = 1;
    }

    const { nextPageBtn, projectsBarFooter, projectsPageNav, projectsList } = getProjectsBarFooterNodes();
    if (!isHTMLElement(nextPageBtn) || !isHTMLElement(projectsBarFooter)) {
        showErrorModal(ERR_RENDERING.PROJECTS_BAR);
        return;
    }
    if (!isHTMLElement(projectsPageNav)) {
        showErrorModal(ERR_RENDERING.PROJECTS_NAV);
        return;
    }
    if (!isHTMLElement(projectsList)) {
        showErrorModal(ERR_RENDERING.PROJECTS_LIST);
        return;
    }

    projectsList.setAttribute('current-projects-page', `${current}`);
    projectsPageNav.textContent = `${current} / ${total}`;
}