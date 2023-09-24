import { getTasksBarFooterNodes } from './static-selectors.js';
import { isHTMLElement } from '../utils.js';

export function renderTasksPageNav(current, total) {
    if (typeof current !== 'number' || 
    current === NaN || 
    typeof total !== 'number' || 
    total === NaN
    ) {
        showErrorModal([ERR_HEADINGS.TASKS, ERR_RENDERING.TASKS_VALUES]);
        return;
    }

    const { nextPageBtn, tasksBarFooter } = getTasksBarFooterNodes();
    if (!isHTMLElement(nextPageBtn) || !isHTMLElement(tasksBarFooter)) {
        showErrorModal([ERR_HEADINGS.TASKS, ERR_RENDERING.TASKS_BAR]);
        return;
    }

    const oldTasksPageNav = document.querySelector('.tasks-pages-nums');
    if (isHTMLElement(oldTasksPageNav)) {
        oldTasksPageNav.remove();
    }

    const tasksPageNav = document.createElement('span');
    tasksPageNav.textContent = `${current} / ${total}`;
    tasksPageNav.classList.add('tasks-pages-nums');
    tasksBarFooter.insertBefore(tasksPageNav, nextPageBtn);
}