import { getTasksBarFooterNodes } from './static-selectors.js';
import { isHTMLElement } from '../utils.js';
import { ERR_RENDERING } from './errors-text.js';

export function renderTasksPageNav(current, total) {
    if (typeof current !== 'number' || 
    current === NaN || 
    typeof total !== 'number' || 
    total === NaN
    ) {
        showErrorModal(ERR_RENDERING.TASKS_VALUES);
        return;
    }
    
    if (total === 0) {
        total = 1;
    }

    const { nextPageBtn, tasksBarFooter, tasksPageNav, tasksList } = getTasksBarFooterNodes();
    if (!isHTMLElement(nextPageBtn) || !isHTMLElement(tasksBarFooter)) {
        showErrorModal(ERR_RENDERING.TASKS_BAR);
        return;
    }
    if (!isHTMLElement(tasksPageNav)) {
        showErrorModal(ERR_RENDERING.TASKS_NAV);
        return;
    }
    if (!isHTMLElement(tasksList)) {
        showErrorModal(ERR_RENDERING.TASKS_LIST);
        return;
    }

    tasksList.setAttribute('current-tasks-page', `${current}`);
    tasksPageNav.textContent = `${current} / ${total}`;
}