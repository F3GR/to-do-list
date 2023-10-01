import { PRIORITY, STATUS, SORTBY } from '../utils.js';
import { isBoolean } from '../utils.js';
import { ERR_CONTROLLER } from './errors-text.js';

export const viewController = {
    filter: (tasksGroup, viewState) => {
        const {
            flagIncludeHigh, 
            flagIncludeMedium,
            flagIncludeNormal,
            flagIncludeOnGoing, 
            flagIncludeCompleted, 
            flagIncludeOverdue
        } = viewState;

        if (!Array.isArray(tasksGroup)) {
            throw new Error(ERR_CONTROLLER.TASK_GROUP);
        }
        if (!isBoolean(flagIncludeHigh) || 
            !isBoolean(flagIncludeMedium) || 
            !isBoolean(flagIncludeNormal) ||
            !isBoolean(flagIncludeOnGoing) || 
            !isBoolean(flagIncludeCompleted) || 
            !isBoolean(flagIncludeOverdue)) {
            throw new Error(ERR_CONTROLLER.FILTER_VALUES);
        }
        
        return tasksGroup
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
    
    sort: (tasksGroup, viewState) => {
        const { sortBy, ascendingOrder } = viewState;

        if (!Array.isArray(tasksGroup)) {
            throw new Error(ERR_CONTROLLER.TASK_GROUP);
        }
        if (!isBoolean(ascendingOrder)) {
            throw new Error(ERR_CONTROLLER.SORT_ORDER_VALUE);
        }
        if (!Object.values(SORTBY).includes(sortBy)) {
            throw new Error(ERR_CONTROLLER.SORT_OPTION_VALUE);
        }

        switch (sortBy) {
            case SORTBY.DATE:
                return sortTasksByDate(tasksGroup, ascendingOrder);
            case SORTBY.PRIORITY:
                return sortTasksByPriority(tasksGroup, ascendingOrder);
            case SORTBY.STATUS:
                return sortTasksByStatus(tasksGroup, ascendingOrder);
        }
    }   
};

const sortTasksByDate = (tasksGroup, ascendingOrder) => {
    return tasksGroup.sort((task1, task2) => {
        const date1 = Date.parse(task1.dueDate);
        const date2 = Date.parse(task2.dueDate);
        if (ascendingOrder) {
            return date1 - date2;
        } else {
            return date2 - date1;
        }
    });
};

const sortTasksByPriority = (tasksGroup, ascendingOrder) => {
    return tasksGroup.sort((task1, task2) => {
        if (ascendingOrder) {
            return task2.priority - task1.priority;
        } else {
            return task1.priority - task2.priority;
        }
    });
};

const sortTasksByStatus = (tasksGroup, ascendingOrder) => {
    return tasksGroup.sort((task1, task2) => {
        if (ascendingOrder) {
            return task2.status - task1.status;
        } else {
            return task1.status - task2.status;
        }
    });
};