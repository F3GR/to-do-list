import { application } from '../main-app.js';
import { renderTask } from '../task/dom.js';
import { isBoolean, isHTMLElement, showErrorModal, SORTBY } from '../utils.js';
import { getMainNodes, getViewOptionsNodes } from './static-selectors.js';
import { ERR_APPLY_EVENTS, ERR_HEADINGS } from './errors-text.js';

export function addListenersViewOptions() {
    const {
        inputPriorityHigh,
        inputPriorityMedium,
        inputPriorityNormal,
        inputStatusOnGoing,
        inputStatusCompleted,
        inputStatusOverdue,
        inputSortAscendingOrder,
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
    if (!isHTMLElement(inputPriorityHigh) ||
    !isHTMLElement(inputPriorityMedium) ||
    !isHTMLElement(inputPriorityNormal) ||
    !isHTMLElement(inputStatusOnGoing) ||
    !isHTMLElement(inputStatusCompleted) ||
    !isHTMLElement(inputStatusOverdue) ||
    !isHTMLElement(inputSortAscendingOrder) ||
    !isHTMLElement(selectSortOptions)
    ) {
        showErrorModal([ERR_HEADINGS.APPLY_EVENTS, ERR_APPLY_EVENTS.OPTIONS_NODES]);
        return;
    }

    if (!isBoolean(inputPriorityHigh.checked) ||
    !isBoolean(inputPriorityMedium.checked) ||
    !isBoolean(inputPriorityNormal.checked) ||
    !isBoolean(inputStatusOnGoing.checked) ||
    !isBoolean(inputStatusCompleted.checked) ||
    !isBoolean(inputStatusOverdue.checked)
    ) {
        showErrorModal(ERR_HEADINGS.APPLY_EVENTS, ERR_APPLY_EVENTS.FILTER_VALUES);
        return;
    }
    if (!isBoolean(inputSortAscendingOrder.checked)) {
        showErrorModal(ERR_HEADINGS.APPLY_EVENTS, ERR_APPLY_EVENTS.SORT_ORDER_VALUE);
        return;
    }
    if (!Object.values(SORTBY).includes(selectSortOptions.value)) {
        showErrorModal(ERR_HEADINGS.APPLY_EVENTS, ERR_APPLY_EVENTS.SORT_OPTION_VALUE);
        return;
    }

    const queries = { 
        taskList,
        inputPriorityHigh,
        inputPriorityMedium,
        inputPriorityNormal,
        inputStatusOverdue,
        inputStatusOnGoing,
        inputStatusCompleted,
        selectSortOptions,
        inputSortAscendingOrder 
    };

    viewOptionsIcon.addEventListener('click', () => viewBox.classList.toggle('shown'));
    viewBox.addEventListener('change', (e) => {
        const SortOption = e.target.closest('select');
        if (SortOption) {
            updateTaskListView(queries);
        }
    });
    viewBox.addEventListener('click', (e) => {
        if (e.target.tagName === 'LABEL' || e.target.tagName === 'BUTTON') {
            const filterOption = e.target.closest('label').firstElementChild;
            if (filterOption) {
                filterOption.checked = !(filterOption.checked);
                updateTaskListView(queries);
            }
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
        inputPriorityHigh,
        inputPriorityMedium,
        inputPriorityNormal,
        inputStatusOverdue,
        inputStatusOnGoing,
        inputStatusCompleted,
        selectSortOptions,
        inputSortAscendingOrder 
    } = queries;

    newState.flagIncludeHigh = inputPriorityHigh.checked;
    newState.flagIncludeMedium = inputPriorityMedium.checked;
    newState.flagIncludeNormal = inputPriorityNormal.checked;
    newState.flagIncludeOverdue = inputStatusOverdue.checked;
    newState.flagIncludeOnGoing = inputStatusOnGoing.checked;
    newState.flagIncludeCompleted = inputStatusCompleted.checked;
    newState.sortBy = selectSortOptions.value;
    newState.ascendingOrder = inputSortAscendingOrder.checked;

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

