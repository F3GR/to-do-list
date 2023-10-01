import { application } from '../main-app.js';
import { renderTask } from '../task/dom.js';
import { isBoolean, isHTMLElement, isPressedKey, showErrorModal, SORTBY } from '../utils.js';
import { getMainNodes, getViewOptionsNodes } from './static-selectors.js';
import { ERR_EVENTS } from './errors-text.js';

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
        viewBox,
        toggleBoxes,
        customSelectBox,
    } = getViewOptionsNodes();
    const {
        taskList
    } = getMainNodes();
    const selectSortOptions = document.querySelector('.view-options-bar .custom-select > select');

    if (!isHTMLElement(taskList)) {
        showErrorModal(ERR_EVENTS.TASK_LIST_PANEL);
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
        showErrorModal(ERR_EVENTS.OPTIONS_NODES);
        return;
    }

    if (!isBoolean(inputPriorityHigh.checked) ||
    !isBoolean(inputPriorityMedium.checked) ||
    !isBoolean(inputPriorityNormal.checked) ||
    !isBoolean(inputStatusOnGoing.checked) ||
    !isBoolean(inputStatusCompleted.checked) ||
    !isBoolean(inputStatusOverdue.checked)
    ) {
        showErrorModal(ERR_EVENTS.FILTER_VALUES);
        return;
    }
    if (!isBoolean(inputSortAscendingOrder.checked)) {
        showErrorModal(ERR_EVENTS.SORT_ORDER_VALUE);
        return;
    }
    if (!Object.values(SORTBY).includes(selectSortOptions.value)) {
        showErrorModal(ERR_EVENTS.SORT_OPTION_VALUE);
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

    viewOptionsIcon.addEventListener('click', (e) => handleViewBoxToggle(e));
    function handleViewBoxToggle(e) {
        if (isPressedKey(e)) {
            viewBox.classList.toggle('shown');
        }
    }

    customSelectBox.addEventListener('click', (e) => handleBoxSelection(e));
    customSelectBox.addEventListener('keydown', (e) => handleBoxSelection(e));
    function handleBoxSelection(e) {
        if (isPressedKey(e)) {
            if (e.target.tagName !== 'DIV') {
                return;
            }
            const optionValue = e.target.getAttribute('value');
            if (optionValue !== null && optionValue !== undefined) {
                selectSortOptions.value = optionValue;
                updateTaskListView(queries);
            }
        }
    }

    toggleBoxes.forEach(box => box.addEventListener('click', (e) => viewOptionToggleHandler(e)));
    toggleBoxes.forEach(box => box.addEventListener('keydown', (e) => viewOptionToggleHandler(e)));
    function viewOptionToggleHandler(e) {
        if (isPressedKey(e) && e.target.closest('.option-button')) {
            e.stopImmediatePropagation();
            e.stopPropagation();
            const element = e.target.closest('.option-button');
            let input;
            if (!element) {
                return;
            }
            input = element.firstElementChild;
            if (!input || input.tagName !== 'INPUT') {
                return;
            }
            input.checked = !(input.checked);
            element.classList.toggle('enabled');
            updateTaskListView(queries);
    }}
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
        showErrorModal([ERR_EVENTS.UPDATING_TASKS_NODE[0], e.message, ERR_EVENTS.UPDATING_TASKS_NODE[2]]);
        return;
    }

    taskList.innerHTML = '';
    tasksWithUpdatedView.forEach((task) => renderTask(task));
}

