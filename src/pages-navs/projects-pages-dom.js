import { getProjectsBarFooterNodes } from './static-selectors.js';
import { isHTMLElement } from '../utils.js';

export function renderProjectsPageNav(current, total) {
    if (typeof current !== 'number' || 
    current === NaN || 
    typeof total !== 'number' || 
    total === NaN
    ) {
        showErrorModal([ERR_HEADINGS.PROJECTS, ERR_RENDERING.PROJECTS_VALUES]);
        return;
    }

    const { nextPageBtn, projectsBarFooter } = getProjectsBarFooterNodes();
    if (!isHTMLElement(nextPageBtn) || !isHTMLElement(projectsBarFooter)) {
        showErrorModal([ERR_HEADINGS.PROJECTS, ERR_RENDERING.PROJECTS_BAR]);
        return;
    }

    const oldProjectsPageNav = document.querySelector('.projects-pages-nums');
    if (isHTMLElement(oldProjectsPageNav)) {
        oldProjectsPageNav.remove();
    }

    const projectsPageNav = document.createElement('span');
    projectsPageNav.textContent = `${current} / ${total}`;
    projectsPageNav.classList.add('projects-pages-nums');
    projectsBarFooter.insertBefore(projectsPageNav, nextPageBtn);
}