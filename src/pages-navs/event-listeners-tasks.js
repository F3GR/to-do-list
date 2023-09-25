import { application } from '../main-app';
import { getTasksBarFooterNodes } from './static-selectors';
import { isHTMLElement, showErrorModal } from '../utils';
import { ERR_EVENT, ERR_HEADINGS } from './errors-text';

export function addListenersTasksPagesNav() {
    const { prevPageBtn, nextPageBtn } = getTasksBarFooterNodes();

    prevPageBtn.addEventListener('click', (e) => {
        if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
            showErrorModal([ERR_HEADINGS.TASKS_EVENT, ERR_EVENT.TASKS_BAR]);
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

        application.moveTasksPageBackwards(currentTasksPageNumber);
    });

    nextPageBtn.addEventListener('click', (e) => {
        if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
            showErrorModal([ERR_HEADINGS.TASKS_EVENT, ERR_EVENT.TASKS_BAR]);
            return;
        }

        const currentTasksPageNav = document.querySelector('.tasks-pages-nums');
        if (!isHTMLElement(currentTasksPageNav)) {
            showErrorModal([ERR_HEADINGS.TASKS_EVENT, ERR_EVENT.TASKS_NAV]);
            return;
        }

        const currentTasksPageNumber = parseInt(
        currentPageNav
        .textContent
        .split('/')[0]
        .trim()
        );

        application.moveTasksPageForward(currentTasksPageNumber);
    });
}   