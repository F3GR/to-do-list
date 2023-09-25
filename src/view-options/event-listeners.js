import { application } from '../main-app.js';
import { renderTask } from '../task/dom.js';
import { isBoolean, isHTMLElement, showErrorModal, SORTBY } from '../utils.js';
import { getMainNodes, getViewOptionsNodes } from './static-selectors.js';
import { ERR_APPLY_EVENTS, ERR_HEADINGS } from './errors-text.js';

export function addListenersViewOptions() {
    const {
        checkboxPriorityHigh,
        checkboxPriorityMedium,
        checkboxPriorityNormal,
        checkboxStatusOnGoing,
        checkboxStatusCompleted,
        checkboxStatusOverdue,
        checkboxSortAscendingOrder,
        viewOptionsIcon,
        viewBox
    } = getViewOptionsNodes();
    const {
        taskList
    } = getMainNodes();
    const selectSortOptions = document.querySelector('.view-options-bar select');

    if (!isHTMLElement(taskList)) {
        showErrorModal([ERR_HEADINGS.APPLY_EVENTS, ERR_APPLY_EVENTS.TASK_LIST_PANEL]);
        return;
    }
    if (!isHTMLElement(checkboxPriorityHigh) ||
    !isHTMLElement(checkboxPriorityMedium) ||
    !isHTMLElement(checkboxPriorityNormal) ||
    !isHTMLElement(checkboxStatusOnGoing) ||
    !isHTMLElement(checkboxStatusCompleted) ||
    !isHTMLElement(checkboxStatusOverdue) ||
    !isHTMLElement(checkboxSortAscendingOrder) ||
    !isHTMLElement(selectSortOptions)
    ) {
        showErrorModal([ERR_HEADINGS.APPLY_EVENTS, ERR_APPLY_EVENTS.OPTIONS_NODES]);
        return;
    }

    if (!isBoolean(checkboxPriorityHigh.checked) ||
    !isBoolean(checkboxPriorityMedium.checked) ||
    !isBoolean(checkboxPriorityNormal.checked) ||
    !isBoolean(checkboxStatusOnGoing.checked) ||
    !isBoolean(checkboxStatusCompleted.checked) ||
    !isBoolean(checkboxStatusOverdue.checked)
    ) {
        showErrorModal(ERR_HEADINGS.APPLY_EVENTS, ERR_APPLY_EVENTS.FILTER_VALUES);
        return;
    }
    if (!isBoolean(checkboxSortAscendingOrder.checked)) {
        showErrorModal(ERR_HEADINGS.APPLY_EVENTS, ERR_APPLY_EVENTS.SORT_ORDER_VALUE);
        return;
    }
    if (!Object.values(SORTBY).includes(selectSortOptions.value)) {
        showErrorModal(ERR_HEADINGS.APPLY_EVENTS, ERR_APPLY_EVENTS.SORT_OPTION_VALUE);
        return;
    }

    const queries = { 
        taskList,
        checkboxPriorityHigh,
        checkboxPriorityMedium,
        checkboxPriorityNormal,
        checkboxStatusOverdue,
        checkboxStatusOnGoing,
        checkboxStatusCompleted,
        selectSortOptions,
        checkboxSortAscendingOrder 
    };

    viewOptionsIcon.addEventListener('click', () => viewBox.classList.toggle('shown'));
    viewBox.addEventListener('change', (e) => {
        const filterOrSortOption = e.target.closest('input[type="checkbox"], select');
        if (filterOrSortOption) {
            updateTaskListView(queries);
        }
    });
}

const updateTaskListView = (queries) => {
    
    let newState = { 
        flagIncludeHigh: null, 
        flagIncludeMedium: null,
        flagIncludeNormal: null, 
        flagIncludeOverdue: null, 
        flagIncludeOnGoing: null, 
        flagIncludeCompleted: null, 
        sortBy: null, 
        ascendingOrder: null
    }

    const { 
        taskList,
        checkboxPriorityHigh,
        checkboxPriorityMedium,
        checkboxPriorityNormal,
        checkboxStatusOverdue,
        checkboxStatusOnGoing,
        checkboxStatusCompleted,
        selectSortOptions,
        checkboxSortAscendingOrder 
    } = queries;

    newState.flagIncludeHigh = checkboxPriorityHigh.checked;
    newState.flagIncludeMedium = checkboxPriorityMedium.checked;
    newState.flagIncludeNormal = checkboxPriorityNormal.checked;
    newState.flagIncludeOverdue = checkboxStatusOverdue.checked;
    newState.flagIncludeOnGoing = checkboxStatusOnGoing.checked;
    newState.flagIncludeCompleted = checkboxStatusCompleted.checked;
    newState.sortBy = selectSortOptions.value;
    newState.ascendingOrder = checkboxSortAscendingOrder.checked;

    let tasksWithUpdatedView;
    try {
        tasksWithUpdatedView = application.applyViewOptions(newState);
    } catch (e) {
        showErrorModal([ERR_APPLY_EVENTS.UPDATING_TASKS_NODE, e.message]);
        return;
    }

    taskList.innerHTML = '';
    tasksWithUpdatedView.forEach((task) => renderTask(task));
}

