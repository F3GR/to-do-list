import { application } from '../main-app.js';
import { renderTask } from '../task/dom.js';
import { isHTMLElement, showErrorModal } from '../utils.js';
import { getMainNodes, getViewOptionsNodes } from './static-selectors.js';

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

    if (!isHTMLElement(checkboxPriorityHigh) ||
        !isHTMLElement(checkboxPriorityMedium) ||
        !isHTMLElement(checkboxPriorityNormal) ||
        !isHTMLElement(checkboxStatusOnGoing) ||
        !isHTMLElement(checkboxStatusCompleted) ||
        !isHTMLElement(checkboxStatusOverdue) ||
        !isHTMLElement(checkboxSortAscendingOrder)
        ) {
        showErrorModal('Error (applying events on filtering options menu): one or more the filter option elements weren\'t found');
        return;
    }
    if (!isHTMLElement(selectSortOptions)) {
        showErrorModal('Error (rendering filtering options menu): select options menu element wasn\'t found');
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
        sortOptions,
        checkboxSortAscendingOrder 
    };

    viewOptionsIcon.addEventListener('click', () => viewBox.classList.toggle('shown'));
    viewBox.addEventListener('change', (e) => {
        const filterOrSortOption = e.target.closest('input[type="checkbox"], select');
        if (filterOrSortOption) {
            handleViewOptionsChange(queries);
        }
    });
}

const handleViewOptionsChange = (queries) => {
    
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
        sortOptions,
        checkboxSortAscendingOrder 
    } = queries;

    newState.flagIncludeHigh = checkboxPriorityHigh.checked;
    newState.flagIncludeMedium = checkboxPriorityMedium.checked;
    newState.flagIncludeNormal = checkboxPriorityNormal.checked;
    newState.flagIncludeOverdue = checkboxStatusOverdue.checked;
    newState.flagIncludeOnGoing = checkboxStatusOnGoing.checked;
    newState.flagIncludeCompleted = checkboxStatusCompleted.checked;
    newState.sortBy = sortOptions.value;
    newState.ascendingOrder = checkboxSortAscendingOrder.checked;

    const tasksWithUpdatedView = application.applyViewOptions(newState);
    if (!isHTMLElement(tasksWithUpdatedView)) {
        showErrorModal(tasksWithUpdatedView);
        return;
    }

    taskList.innerHTML = '';
    tasksWithUpdatedView.forEach((task) => renderTask(task));
}

