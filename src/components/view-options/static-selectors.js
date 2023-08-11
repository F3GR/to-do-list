let viewOptionsNodes;

export function getViewOptionsNodes() {
    if (viewOptionsNodes) {
        return viewOptionsNodes;
    }

    const main = document.querySelector('.content main');

    const checkboxPriorityHigh = document.querySelector('#view-priority-high');
    const checkboxPriorityMedium = document.querySelector('#view-priority-medium');
    const checkboxPriorityNormal = document.querySelector('#view-priority-normal');
    const checkboxStatusOnGoing = document.querySelector('#view-status-ongoing');
    const checkboxStatusCompleted = document.querySelector('#view-status-completed');
    const checkboxStatusOverdue = document.querySelector('#view-status-overdue');
    const checkboxSortAscendingOrder = document.querySelector('#sort-order');

    const viewOptionsIcon = document.querySelector('header > img.options');
    const viewBox = document.querySelector('main > .view-options-bar');

    return viewOptionsNodes = { 
        main,
        checkboxPriorityHigh,
        checkboxPriorityMedium,
        checkboxPriorityNormal,
        checkboxStatusOnGoing,
        checkboxStatusCompleted,
        checkboxStatusOverdue,
        checkboxSortAscendingOrder,
        viewOptionsIcon,
        viewBox 
    };
};