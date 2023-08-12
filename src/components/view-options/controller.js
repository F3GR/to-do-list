import { parseISO } from 'date-fns';
import { PRIORITY, STATUS, SORTBY } from '../utils.js';
import { isBoolean } from '../utils.js';

export const viewController = {
    filter: (taskList, viewState) => {
        const {
            flagIncludeHigh, 
            flagIncludeMedium, 
            flagIncludeNormal,
            flagIncludeOnGoing, 
            flagIncludeCompleted, 
            flagIncludeOverdue
        } = viewState;

        if (!Array.isArray(taskList)) {
            return false;
        }
        if (!isBoolean(flagIncludeHigh) || 
            !isBoolean(flagIncludeMedium) || 
            !isBoolean(flagIncludeNormal) ||
            !isBoolean(flagIncludeOnGoing) || 
            !isBoolean(flagIncludeCompleted) || 
            !isBoolean(flagIncludeOverdue)) {
            return false;
        }
        
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
        }).filter((task) => {
            switch (task.status) {
                case STATUS.ONGOING:
                    return flagIncludeOnGoing;
                case STATUS.COMPLETED:
                    return flagIncludeCompleted;
                case STATUS.OVERDUE:
                    return flagIncludeOverdue;
            }
        })
    },
    
    sort: (taskList, viewState) => {
        const { sortBy, ascendingOrder } = viewState;
        if (!Array.isArray(taskList) ||
            !isBoolean(ascendingOrder) ||
            !Object.values(SORTBY).includes(sortBy)) {
            return false;
        }

        switch (sortBy) {
            case SORTBY.DATE:
                return sortTasksByDate(taskList, ascendingOrder);
            case SORTBY.PRIORITY:
                return sortTasksByPriority(taskList, ascendingOrder);
            case SORTBY.STATUS:
                return sortTasksByStatus(taskList, ascendingOrder);
        }
    }   
}

const sortTasksByDate = (taskList, ascendingOrder) => {
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

const sortTasksByPriority = (taskList, ascendingOrder) => {
    return taskList.sort((task1, task2) => {
        if (ascendingOrder) {
            return task2.priority - task1.priority;
        } else {
            return task1.priority - task2.priority;
        }
    });
}

const sortTasksByStatus = (taskList, ascendingOrder) => {
    return taskList.sort((task1, task2) => {
        if (ascendingOrder) {
            return task2.status - task1.status;
        } else {
            return task1.status - task2.status;
        }
    });
}