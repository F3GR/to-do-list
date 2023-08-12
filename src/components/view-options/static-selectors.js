let viewOptionsNodes;

export function getViewOptionsNodes() {
    if (viewOptionsNodes) {
        return viewOptionsNodes;
    }
    
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


let mainNodes;

export function getMainNodes() {
    if (mainNodes) {
        return mainNodes;
    }

    const main = document.querySelector('.content main');
    const taskList = document.querySelector('.content main ul.task-list');
    return mainNodes = { 
        main,
        taskList
    };
};