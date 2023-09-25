import { application } from '../main-app';
import { getProjectsBarFooterNodes } from './static-selectors';
import { isHTMLElement, showErrorModal } from '../utils';
import { ERR_EVENT, ERR_HEADINGS } from './errors-text';
import { renderProject } from '../project/dom';

export function addListenersProjectsPagesNav() {
    const { projectsList, prevPageBtn, nextPageBtn } = getProjectsBarFooterNodes();

    prevPageBtn.addEventListener('click', (e) => {
        if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
            showErrorModal([ERR_HEADINGS.PROJECTS_EVENT, ERR_EVENT.PROJECTS_BAR]);
            return;
        }
        if (!isHTMLElement(projectsList)) {
            showErrorModal([ERR_HEADINGS.TASKS_EVENT, ERR_EVENT.PROJECTS_LIST]);
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

        let prevProjectsPage;
        try {
            prevProjectsPage = application.moveProjectsPageBackwards(currentProjectsPageNumber);
        } catch (e) {
            showErrorModal([ERR_HEADINGS.PROJECTS_EVENT, e.message]);
            return;
        }

        projectsList.innerHTML = '';
        prevProjectsPage.forEach(project => renderProject(project));
    });

    nextPageBtn.addEventListener('click', (e) => {
        if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
            showErrorModal([ERR_HEADINGS.PROJECTS_EVENT, ERR_EVENT.PROJECTS_BAR]);
            return;
        }
        if (!isHTMLElement(projectsList)) {
            showErrorModal([ERR_HEADINGS.TASKS_EVENT, ERR_EVENT.PROJECTS_LIST]);
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

        let nextProjectsPage;
        try {
            nextProjectsPage = application.moveProjectsPageForward(currentProjectsPageNumber);
        } catch (e) {
            showErrorModal([ERR_HEADINGS.PROJECTS_EVENT, e.message]);
            return;
        }

        projectsList.innerHTML = '';
        nextProjectsPage.forEach(project => renderProject(project));
    });
}   