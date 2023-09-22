import { parseISO } from 'date-fns';
import { PRIORITY, STATUS, SORTBY } from '../utils.js';
import { isBoolean } from '../utils.js';

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
            return 'Error (filtering tasks): tasks group wasn\'t found';
        }
        if (!isBoolean(flagIncludeHigh) || 
            !isBoolean(flagIncludeMedium) || 
            !isBoolean(flagIncludeNormal) ||
            !isBoolean(flagIncludeOnGoing) || 
            !isBoolean(flagIncludeCompleted) || 
            !isBoolean(flagIncludeOverdue)) {
            return 'Error (filtering tasks): one or more of the filter option values is not valid';
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
            return 'Error (sorting tasks): tasks group wasn\'t found';
        }
        if (!isBoolean(ascendingOrder)) {
            return 'Error (sorting tasks): the order value of sort option wasn\'t found';
        }
        if (!Object.values(SORTBY).includes(sortBy)) {
            return 'Error (sorting tasks): sort option value is not valid';
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
        const date1 = parseISO(task1.dueDate);
        const date2 = parseISO(task2.dueDate);
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