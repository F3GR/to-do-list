import { application } from "../main-app";
import { renderTask } from "../task/dom-task";

export function addListenersViewOptions(savedState) {
    const viewOptionsIcon = document.querySelector('header > img.options');
    const viewBox = document.querySelector('main > .view-options-bar');
    
    viewOptionsIcon.addEventListener('click', function() {
        viewBox.classList.toggle('shown');
    });

    const viewState = savedState;

    const checkboxPriorityHigh = document.querySelector('#view-priority-high');
    const checkboxPriorityMedium = document.querySelector('#view-priority-medium');
    const checkboxPriorityNormal = document.querySelector('#view-priority-normal');
    const checkboxStatusOnGoing = document.querySelector('#view-status-ongoing');
    const checkboxStatusCompleted = document.querySelector('#view-status-completed');
    const checkboxStatusOverdue = document.querySelector('#view-status-overdue');
    const selectSortOptions = document.querySelector('.view-options-bar select');
    const checkboxSortAscendingOrder = document.querySelector('#sort-order');

    const selectedCheckboxesFilterOptions = document.querySelectorAll('.view-options-bar input, .view-options-bar select');
    selectedCheckboxesFilterOptions.forEach((checkbox) => {
        checkbox.addEventListener('change', function() {

            viewState.flagIncludeHigh = checkboxPriorityHigh.checked;
            viewState.flagIncludeMedium = checkboxPriorityMedium.checked;
            viewState.flagIncludeNormal = checkboxPriorityNormal.checked;
            viewState.flagIncludeOverdue = checkboxStatusOverdue.checked;
            viewState.flagIncludeOnGoing = checkboxStatusOnGoing.checked;
            viewState.flagIncludeCompleted = checkboxStatusCompleted.checked;
            viewState.sortBy = selectSortOptions.value;
            viewState.ascendingOrder = checkboxSortAscendingOrder.checked;

            const tasksWithUpdatedView = application.updateView(viewState);
            if (tasksWithUpdatedView) {
                const taskList = document.querySelector('.task-list');
                taskList.innerHTML = '';

                tasksWithUpdatedView.forEach((task) => {
                    renderTask(
                        task.projectId,
                        task.projectName,
                        task.id,
                        task.title,
                        task.dueDate,
                        task.status,
                        task.priority,
                        task.description,
                        task.notes
                    );
                });
            }
        });
    });
}