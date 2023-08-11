import { application } from '../main-app.js';
import { renderTask } from '../task/dom.js';
import { getViewOptionsNodes } from './static-selectors.js';
import { SORTBY } from '../utils.js';

export function addListenersViewOptions(savedState) {

    const { 
        flagIncludeHigh, 
        flagIncludeMedium,
        flagIncludeNormal, 
        flagIncludeOverdue, 
        flagIncludeOnGoing, 
        flagIncludeCompleted, 
        sortBy, 
        ascendingOrder
    } = savedState;

    if (!isBoolean(flagIncludeHigh) || 
        !isBoolean(flagIncludeMedium) || 
        !isBoolean(flagIncludeNormal) ||
        !isBoolean(flagIncludeOnGoing) || 
        !isBoolean(flagIncludeCompleted) || 
        !isBoolean(flagIncludeOverdue) ||
        !Object.values(SORTBY).includes(sortBy) ||
        !isBoolean(ascendingOrder)) {
        alert('Error: one or more the filter option values weren\'t found');
    }

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

    if (!checkboxPriorityHigh ||
        !checkboxPriorityMedium ||
        !checkboxPriorityNormal ||
        !checkboxStatusOnGoing ||
        !checkboxStatusCompleted ||
        !checkboxStatusOverdue ||
        !checkboxSortAscendingOrder) {
        alert('Error: one or more the filter option checkboxes weren\'t found');
    }

    const sortOptions = document.querySelector('.view-options-bar select');

    if (!sortOptions) {
        alert('Error: select options menu wasn\'t found');
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
    viewBox.addEventListener('change', (e) => handleViewOptionsChange(e, savedState, queries));
}

const handleViewOptionsChange = (e, state, queries) => {
    const target = e.target.closest('input[type="checkbox"], select');
    if (!target) {
        alert('Error: the element wasn\'t found');
        return;
    }

    const stateCopy = { ...state };
    const { 
        flagIncludeHigh, 
        flagIncludeMedium,
        flagIncludeNormal, 
        flagIncludeOverdue, 
        flagIncludeOnGoing, 
        flagIncludeCompleted, 
        sortBy, 
        ascendingOrder
    } = stateCopy;

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

    flagIncludeHigh = checkboxPriorityHigh.checked;
    flagIncludeMedium = checkboxPriorityMedium.checked;
    flagIncludeNormal = checkboxPriorityNormal.checked;
    flagIncludeOverdue = checkboxStatusOverdue.checked;
    flagIncludeOnGoing = checkboxStatusOnGoing.checked;
    flagIncludeCompleted = checkboxStatusCompleted.checked;
    sortBy = sortOptions.value;
    ascendingOrder = checkboxSortAscendingOrder.checked;

    const tasksWithUpdatedView = application.applyViewOptions(stateCopy);
    if (!tasksWithUpdatedView) {
        alert('Applying new view options failed.');
        return;
    }

    taskList.innerHTML = '';
    tasksWithUpdatedView.forEach((task) => renderTask(task));
}

