import { application } from '../main-app';
import { getProjectsBarFooterNodes } from './static-selectors';
import { isHTMLElement, showErrorModal } from '../utils';
import { ERR_EVENT, ERR_HEADINGS } from './errors-text';

export function addListenersProjectsPagesNav() {
    const { prevPageBtn, nextPageBtn } = getProjectsBarFooterNodes();

    prevPageBtn.addEventListener('click', (e) => {
        if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
            showErrorModal([ERR_HEADINGS.PROJECTS_EVENT, ERR_EVENT.PROJECTS_BAR]);
            return;
        }

        const currentProjectsPageNav = document.querySelector('.projects-pages-nums');
        if (!isHTMLElement(currentProjectsPageNav)) {
            showErrorModal([ERR_HEADINGS.PROJECTS_EVENT, ERR_EVENT.PROJECTS_NAV]);
            return;
        }

        const currentProjectsPageNumber = parseInt(
        currentProjectsPageNav
        .textContent
        .split('/')[0]
        .trim()
        );

        application.moveProjectsPageBackwards(currentProjectsPageNumber);
    });

    nextPageBtn.addEventListener('click', (e) => {
        if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
            showErrorModal([ERR_HEADINGS.PROJECTS_EVENT, ERR_EVENT.PROJECTS_BAR]);
            return;
        }

        const currentProjectsPageNav = document.querySelector('.projects-pages-nums');
        if (!isHTMLElement(currentProjectsPageNav)) {
            showErrorModal([ERR_HEADINGS.PROJECTS_EVENT, ERR_EVENT.PROJECTS_NAV]);
            return;
        }

        const currentProjectsPageNumber = parseInt(
        currentProjectsPageNav
        .textContent
        .split('/')[0]
        .trim()
        );

        application.moveProjectsPageForward(currentProjectsPageNumber);
    });
}   