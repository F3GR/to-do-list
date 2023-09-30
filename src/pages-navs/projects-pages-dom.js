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

    if (total === 0) {
        total = 1;
    }

    const { nextPageBtn, projectsBarFooter, projectsPageNav } = getProjectsBarFooterNodes();
    if (!isHTMLElement(nextPageBtn) || !isHTMLElement(projectsBarFooter)) {
        showErrorModal(ERR_RENDERING.PROJECTS_BAR);
        return;
    }
    if (!isHTMLElement(projectsPageNav)) {
        showErrorModal(ERR_RENDERING.PROJECTS_NAV);
        return;
    }
    projectsPageNav.textContent = `${current} / ${total}`;
}