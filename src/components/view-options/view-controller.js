export const viewController = {
    filter: function(taskList, priorityHigh, priorityMedium, priorityNormal,
    includeOnGoing, includeCompleted, includeOverdue) {
        return taskList
        .filter((task) => {
            return (task.priority === priorityHigh || 
                task.priority === priorityMedium ||
                task.priority === priorityNormal);
        })
        .filter((task) => {
            return (task.status === includeOnGoing ||
                task.status === includeCompleted ||
                task.status === includeOverdue);
        });
    },
    sort: function(taskList, sortBy, ascendingOrder) {
        if (oldViewState.sortBy !== sortBy) {
            switch (sortBy) {
                case 'date':
                    return sortTasksByDate(taskList, ascendingOrder);
                case 'priority':
                    return sortTasksByPriority(taskList, ascendingOrder);
                case 'status':
                    return sortTasksByStatus(taskList, ascendingOrder);
            }
        }
    }   
}

function sortTasksByDate(taskList, ascendingOrder) {
    return taskList.sort((task1, task2) => {
        const date1 = parseISO(task1.dueDate);
        const date2 = parseISO(task2.dueDate);
        if (ascendingOrder) {
            return date1 - date2;
        } else {
            return date2 - date1;
        }
    });
}

// Priority: "0" - "normal", "1" - "medium", "2" - "high"
function sortTasksByPriority(taskList, ascendingOrder) {
    return taskList.sort((task1, task2) => {
        if (ascendingOrder) {
            return task1.priority - task2.priority;
        } else {
            return task2.priority - task1.priority;
        }
    });
}

// Status: "0" - "completed", "1" - "on-going", "2" - "overdue"
function sortTasksByStatus(taskList, ascendingOrder) {
    return taskList.sort((task1, task2) => {
        if (ascendingOrder) {
            return task1.status - task2.status;
        } else {
            return task2.status - task1.status;
        }
    });
}