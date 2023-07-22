import { parseISO } from "date-fns";

export const viewController = {
    filter: function(taskList, flagIncludeHigh, flagIncludeMedium, flagIncludeNormal,
    flagIncludeOnGoing, flagIncludeCompleted, flagIncludeOverdue) {
        if (taskList) {

            return taskList
            .filter((task) => {
                return (
                    (task.priority === '2') === flagIncludeHigh || 
                    (task.priority === '1') === flagIncludeMedium ||
                    (task.priority === '0') === flagIncludeNormal);
                })
            .filter((task) => {
                return (
                    (task.status === '1') === flagIncludeOnGoing ||
                    (task.status === '0') === flagIncludeCompleted ||
                    (task.status === '2') === flagIncludeOverdue);
                });
        }
        return false;
    },
    sort: function(taskList, sortBy, ascendingOrder) {
        if (taskList) {
                switch (sortBy) {
                    case 'date':
                        return sortTasksByDate(taskList, ascendingOrder);
                    case 'priority':
                        return sortTasksByPriority(taskList, ascendingOrder);
                    case 'status':
                        return sortTasksByStatus(taskList, ascendingOrder);
                }
        }
        return false;
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