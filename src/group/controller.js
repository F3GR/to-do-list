import { isToday, parseISO, differenceInWeeks } from 'date-fns';
import { STATUS, STANDARD_GROUPS } from './utils.js';

export const groupsController = {
    getTaskListByGroup: (taskList, groupIdentifier) => {
        if (!Array.isArray(taskList) || !groupIdentifier) {
            console.error('Error: task list and/or group id weren\'t found');
            return false;
        }
        switch (groupIdentifier) {
            case STANDARD_GROUPS.ALL:
                return taskList;
            case STANDARD_GROUPS.TODAY:
                return filterTasksByToday(taskList);
            case STANDARD_GROUPS.WEEK:
                return filterTasksByWeek(taskList);
            case STANDARD_GROUPS.COMPLETED:
                return filterTasksByStatus(taskList, STATUS.COMPLETED);
            case STANDARD_GROUPS.OVERDUE:
                return filterTasksByStatus(taskList, STATUS.OVERDUE);
        }
    },
}

const filterTasksByToday = (taskList) => taskList.filter( ({ dueDate }) => isToday(parseISO(dueDate)) );

const filterTasksByWeek = (taskList) => {
    const today = new Date();
    return taskList.filter(({ dueDate }) => differenceInWeeks(parseISO(dueDate), today) === 0);
}

const filterTasksByStatus = (taskList, status) => taskList.filter(({ status: taskStatus }) => taskStatus === status);
