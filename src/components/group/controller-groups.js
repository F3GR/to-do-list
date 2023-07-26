import { isToday, parseISO, differenceInWeeks } from 'date-fns';
import { STATUS, STANDARD_GROUPS } from '../utils';

export const groupsController = {
    getTaskListByGroup: (taskList, groupIdentifier) => {
        if (!taskList || !groupIdentifier) {
            console.error('Error: task list and/or group id weren\'t found');
            return [];
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

function filterTasksByToday(taskList) {
    return taskList.filter(({ dueDate }) => isToday(parseISO(dueDate)));
}

function filterTasksByWeek(taskList) {
    const today = new Date();
    return taskList.filter(({ dueDate }) => differenceInWeeks(parseISO(dueDate), today) === 0);
}

function filterTasksByStatus(taskList, status) {
    return taskList.filter(({ status: taskStatus }) => taskStatus === status);
}