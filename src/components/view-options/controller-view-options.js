import { parseISO } from 'date-fns';
import { PRIORITY, STATUS, SORTBY } from '../utils.js';

export const viewController = {
    filter: function(taskList, flagIncludeHigh, flagIncludeMedium, flagIncludeNormal,
    flagIncludeOnGoing, flagIncludeCompleted, flagIncludeOverdue) {
        if (taskList) {
            return taskList
            .filter((task) => {
                switch (task.priority) {
                    case PRIORITY.HIGH:
                        return flagIncludeHigh;
                    case PRIORITY.MEDIUM:
                        return flagIncludeMedium;
                    case PRIORITY.NORMAL:
                        return flagIncludeNormal;
                }   
            })
            .filter((task) => {
                switch (task.status) {
                    case STATUS.ONGOING:
                        return flagIncludeOnGoing;
                    case STATUS.COMPLETED:
                        return flagIncludeCompleted;
                    case STATUS.OVERDUE:
                        return flagIncludeOverdue;
                }
            });
        }
        return false;
    },
    
    sort: function(taskList, sortBy, ascendingOrder) {
        if (taskList) {
                switch (sortBy) {
                    case SORTBY.DATE:
                        return sortTasksByDate(taskList, ascendingOrder);
                    case SORTBY.PRIORITY:
                        return sortTasksByPriority(taskList, ascendingOrder);
                    case SORTBY.STATUS:
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

function sortTasksByPriority(taskList, ascendingOrder) {
    return taskList.sort((task1, task2) => {
        if (ascendingOrder) {
            return task2.priority - task1.priority;
        } else {
            return task1.priority - task2.priority;
        }
    });
}

function sortTasksByStatus(taskList, ascendingOrder) {
    return taskList.sort((task1, task2) => {
        if (ascendingOrder) {
            return task2.status - task1.status;
        } else {
            return task1.status - task2.status;
        }
    });
}