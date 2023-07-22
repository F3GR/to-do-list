import { isToday, parseISO, differenceInWeeks } from 'date-fns';

export const groupsController = {
    getTaskListByGroup: function(taskList, groupIdentifier) {
        if (taskList) {
            switch (groupIdentifier) {
                case 'all':
                    return taskList;
                case 'today':
                    return taskList.filter((task) => { 
                        const dueDate = parseISO(task.dueDate);
                        return isToday(dueDate)});
                case 'week':
                    const today = new Date();
                    return taskList.filter((task) => {
                        const dueDate = parseISO(task.dueDate);
                        return differenceInWeeks(dueDate, today) === 0;
                    });
                case 'completed':
                    return taskList.filter((task) => task.status === '0');
                case 'overdue':
                    return taskList.filter((task) => task.status === '2');
                default:
                    return taskList.filter((task) => {
                        return task.projectId === groupIdentifier;
                    });
            }
        } else {
            return false;
        }
    }
}