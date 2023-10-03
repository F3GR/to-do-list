import { application } from '../main-app';
import { getTasksBarFooterNodes } from './static-selectors';
import { isHTMLElement, isPressedKey, showErrorModal, isValid } from '../utils';
import { ERR_EVENTS } from './errors-text';
import { renderTask } from '../task/dom';

export function addListenersTasksPagesNav() {
    const { tasksList, prevPageBtn, nextPageBtn } = getTasksBarFooterNodes();

    prevPageBtn.addEventListener('click', (e) => handleMovePrevPage(e));
    function handleMovePrevPage(e) {
        if (isPressedKey(e)) {
            if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
                showErrorModal(ERR_EVENTS.TASKS_BAR);
                return;
            }
            if (!isHTMLElement(tasksList)) {
                showErrorModal(ERR_EVENTS.TASKS_LIST);
                return;
            }
    
            const currentTasksPageNumber = parseInt(tasksList.getAttribute('current-tasks-page'));
            if (!isValid(currentTasksPageNumber)) {
                showErrorModal(ERR_EVENTS.PROJECTS_NAV);
                return;
            }
    
            let prevTasksPage;
            try {
                prevTasksPage = application.moveTasksPageBackwards(currentTasksPageNumber);
            } catch (e) {
                showErrorModal([ERR_EVENTS.PREV_TASKS_PAGE[0], e.message, ERR_EVENTS.PREV_TASKS_PAGE[2]]);
                return;
            }
    
            if (currentTasksPageNumber === prevTasksPage.newPageNumber) {
                return;
            }
    
            tasksList.innerHTML = '';
            prevTasksPage.newPage.forEach(task => renderTask(task));
        }
    }

    nextPageBtn.addEventListener('click', (e) => handleMoveNextPage(e));
    function handleMoveNextPage(e) {
        if (isPressedKey(e)) {
            if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
                showErrorModal(ERR_EVENTS.TASKS_BAR);
                return;
            }
            if (!isHTMLElement(tasksList)) {
                showErrorModal(ERR_EVENTS.TASKS_LIST);
                return;
            }
    
            const currentTasksPageNumber = parseInt(tasksList.getAttribute('current-tasks-page'));
            if (!isValid(currentTasksPageNumber)) {
                showErrorModal(ERR_EVENTS.PROJECTS_NAV);
                return;
            }
            
            let nextTasksPage;
            try {
                nextTasksPage = application.moveTasksPageForward(currentTasksPageNumber);
            } catch (e) {
                showErrorModal([ERR_EVENTS.NEXT_TASKS_PAGE[0], e.message, ERR_EVENTS.NEXT_TASKS_PAGE[2]]);
                return;
            }
    
            if (currentTasksPageNumber === nextTasksPage.newPageNumber) {
                return;
            }
            
            tasksList.innerHTML = '';
            nextTasksPage.newPage.forEach(task => renderTask(task));
        }
    }
}   