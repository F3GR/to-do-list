import { application } from '../main-app.js';
import { renderTask } from '../task/dom.js';
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
    if (!checkboxPriorityHigh ||
        !checkboxPriorityMedium ||
        !checkboxPriorityNormal ||
        !checkboxStatusOnGoing ||
        !checkboxStatusCompleted ||
        !checkboxStatusOverdue ||
        !checkboxSortAscendingOrder) {
        alert('Error: one or more the filter option checkboxes weren\'t found');
    }

    const {
        taskList
    } = getMainNodes();

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
    viewBox.addEventListener('change', (e) => {
        const target = e.target.closest('input[type="checkbox"], select');
        if (target) {
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
    if (!tasksWithUpdatedView) {
        alert('Applying new view options failed.');
        return;
    }

    taskList.innerHTML = '';
    tasksWithUpdatedView.forEach((task) => renderTask(task));
}

