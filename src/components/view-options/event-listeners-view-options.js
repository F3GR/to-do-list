import { application } from "../main-app";
import { renderTask } from "../task/dom-task";

export const addListenersViewOptions = (savedState) => {

    const taskList = document.querySelector('.task-list');
    const checkboxPriorityHigh = document.querySelector('#view-priority-high');
    const checkboxPriorityMedium = document.querySelector('#view-priority-medium');
    const checkboxPriorityNormal = document.querySelector('#view-priority-normal');
    const checkboxStatusOnGoing = document.querySelector('#view-status-ongoing');
    const checkboxStatusCompleted = document.querySelector('#view-status-completed');
    const checkboxStatusOverdue = document.querySelector('#view-status-overdue');
    const sortOptions = document.querySelector('.view-options-bar select');
    const checkboxSortAscendingOrder = document.querySelector('#sort-order');

    const queries = {
        taskList,
        checkboxPriorityHigh,
        checkboxPriorityMedium,
        checkboxPriorityNormal,
        checkboxStatusOnGoing,
        checkboxStatusCompleted,
        checkboxStatusOverdue,
        sortOptions,
        checkboxSortAscendingOrder,
    };

    const viewOptionsIcon = document.querySelector('header > img.options');
    const viewBox = document.querySelector('main > .view-options-bar');
    
    viewOptionsIcon.addEventListener('click', () => viewBox.classList.toggle('shown'));
    viewBox.addEventListener('change', (e) => handleViewOptionsChange(e, savedState, queries));
}

function handleViewOptionsChange(e, state, queries) {
    const target = e.target.closest('input[type="checkbox"], select');
    
    if (!state) {
        alert('Error: current view state wasn\'t found');
        return;
    }
    if (!queries) {
        alert('Error: Checkbox options and/or select option weren\'t found');
        return;
    }

    const stateCopy = Object.assign({}, state);
    const {
        flagIncludeHigh, 
        flagIncludeMedium,
        flagIncludeNormal, 
        flagIncludeOverdue, 
        flagIncludeOnGoing, 
        flagIncludeCompleted, 
        sortBy, 
        ascendingOrder, 
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
        checkboxSortAscendingOrder,
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

