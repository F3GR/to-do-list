import { isToday, parseISO, differenceInWeeks } from 'date-fns';

export const groupsController = {
    getGroup: function(taskList, groupIdentifier) {
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
                    return taskList.filter((task) => task.status === 'completed');
                case 'overdue':
                    return taskList.filter((task) => task.status === 'overdue');
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