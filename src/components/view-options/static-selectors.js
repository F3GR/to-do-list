let viewOptionsNodes;

export function getViewOptionsNodes() {
    if (viewOptionsNodes) {
        return viewOptionsNodes;
    }

    const main = document.querySelector('.content main');

    const checkboxPriorityHigh = document.getElementById('#view-priority-high');
    const checkboxPriorityMedium = document.getElementById('#view-priority-medium');
    const checkboxPriorityNormal = document.getElementById('#view-priority-normal');
    const checkboxStatusOnGoing = document.getElementById('#view-status-ongoing');
    const checkboxStatusCompleted = document.getElementById('#view-status-completed');
    const checkboxStatusOverdue = document.getElementById('#view-status-overdue');
    const checkboxSortAscendingOrder = document.getElementById('#sort-order');

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