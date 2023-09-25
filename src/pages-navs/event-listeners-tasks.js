import { application } from '../main-app';
import { getTasksBarFooterNodes } from './static-selectors';
import { isHTMLElement, showErrorModal } from '../utils';
import { ERR_EVENT, ERR_HEADINGS } from './errors-text';
import { renderTask } from '../task/dom';

export function addListenersTasksPagesNav() {
    const { tasksList, prevPageBtn, nextPageBtn } = getTasksBarFooterNodes();

    prevPageBtn.addEventListener('click', (e) => {
        if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
            showErrorModal([ERR_HEADINGS.TASKS_EVENT, ERR_EVENT.TASKS_BAR]);
            return;
        }
        if (!isHTMLElement(tasksList)) {
            showErrorModal([ERR_HEADINGS.TASKS_EVENT, ERR_EVENT.TASKS_LIST]);
            return;
        }

        const currentTasksPageNav = document.querySelector('.tasks-pages-nums');
        if (!isHTMLElement(currentTasksPageNav)) {
            showErrorModal([ERR_HEADINGS.TASKS_EVENT, ERR_EVENT.TASKS_NAV]);
            return;
        }

        const currentTasksPageNumber = parseInt(
        currentTasksPageNav
        .textContent
        .split('/')[0]
        .trim()
        );

        let prevTasksPage;
        try {
            prevTasksPage = application.moveTasksPageBackwards(currentTasksPageNumber);
        } catch (e) {
            showErrorModal([ERR_HEADINGS.TASKS_EVENT, e.message]);
            return;
        }

        tasksList.innerHTML = '';
        prevTasksPage.forEach(task => renderTask(task));
    });

    nextPageBtn.addEventListener('click', (e) => {
        if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
            showErrorModal([ERR_HEADINGS.TASKS_EVENT, ERR_EVENT.TASKS_BAR]);
            return;
        }
        if (!isHTMLElement(tasksList)) {
            showErrorModal([ERR_HEADINGS.TASKS_EVENT, ERR_EVENT.TASKS_LIST]);
            return;
        }

        const currentTasksPageNav = document.querySelector('.tasks-pages-nums');
        if (!isHTMLElement(currentTasksPageNav)) {
            showErrorModal([ERR_HEADINGS.TASKS_EVENT, ERR_EVENT.TASKS_NAV]);
            return;
        }

        const currentTasksPageNumber = parseInt(
        currentTasksPageNav
        .textContent
        .split('/')[0]
        .trim()
        );
        
        let nextTasksPage;
        try {
            nextTasksPage = application.moveTasksPageForward(currentTasksPageNumber);
        } catch (e) {
            showErrorModal([ERR_HEADINGS.TASKS_EVENT, e.message]);
            return;
        }
        
        tasksList.innerHTML = '';
        nextTasksPage.forEach(task => renderTask(task));
    });
}   