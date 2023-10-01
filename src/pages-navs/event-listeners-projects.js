import { application } from '../main-app';
import { getProjectsBarFooterNodes } from './static-selectors';
import { isHTMLElement, isPressedKey, showErrorModal } from '../utils';
import { ERR_EVENTS } from './errors-text';
import { renderProject } from '../project/dom';

export function addListenersProjectsPagesNav() {
    const { projectsList, prevPageBtn, nextPageBtn } = getProjectsBarFooterNodes();

    prevPageBtn.addEventListener('click', (e) => handleMovePrevPage(e));
    function handleMovePrevPage(e) {
        if (isPressedKey(e)) {
            if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
                showErrorModal(ERR_EVENTS.PROJECTS_BAR);
                return;
            }
            if (!isHTMLElement(projectsList)) {
                showErrorModal(ERR_EVENTS.PROJECTS_LIST);
                return;
            }
    
            const currentProjectsPageNav = document.querySelector('.projects-pages-nums');
            if (!isHTMLElement(currentProjectsPageNav)) {
                showErrorModal(ERR_EVENTS.PROJECTS_NAV);
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
                showErrorModal([ERR_EVENTS.PREV_PROJECTS_PAGE[0], e.message, ERR_EVENTS.PREV_PROJECTS_PAGE[2]]);
                return;
            }
    
            if (currentProjectsPageNumber === prevProjectsPage.newPageNumber) {
                return;
            }
    
            projectsList.innerHTML = '';
            prevProjectsPage.newPage.forEach(project => renderProject(project));
        }
    }

    nextPageBtn.addEventListener('click', (e) => handleMoveNextPage(e));
    function handleMoveNextPage(e) {
        if (isPressedKey(e)) {
            if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
                showErrorModal(ERR_EVENTS.PROJECTS_BAR);
                return;
            }
            if (!isHTMLElement(projectsList)) {
                showErrorModal(ERR_EVENTS.PROJECTS_LIST);
                return;
            }
    
            const currentProjectsPageNav = document.querySelector('.projects-pages-nums');
            if (!isHTMLElement(currentProjectsPageNav)) {
                showErrorModal(ERR_EVENTS.PROJECTS_NAV);
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
                showErrorModal([ERR_EVENTS.NEXT_PROJECTS_PAGE[0], e.message, ERR_EVENTS.NEXT_PROJECTS_PAGE[2]]);
                return;
            }
    
            if (currentProjectsPageNumber === nextProjectsPage.newPageNumber) {
                return;
            }
    
            projectsList.innerHTML = '';
            nextProjectsPage.newPage.forEach(project => renderProject(project));
        }
    }
}   