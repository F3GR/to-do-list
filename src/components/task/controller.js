import { Task } from './task.js';
import { noDuplicateTitle, findIndex } from '../utils.js';
import { differenceInCalendarDays } from 'date-fns';
import { parseISO } from 'date-fns';
import { STATUS } from '../utils.js';

export const tasksController = {
    createNew: (tasksList, projectName, inputNewTask) => {
        const { projectId, title, dueDate, priority } = inputNewTask;

        if (!tasksList) {
            return false;
        }
        if (!projectName) {
            return false;
        }
        if (!projectId || !title || !dueDate || !priority) {
            return false;
        }
        if (!noDuplicateTitle(tasksList, title)) {
            return false;
        }

        Task.incrementNewTaskId();

        let newTaskStatus = "1";
        newTaskStatus = updateOverdueStatus(newTaskStatus, parseISO(dueDate));
        
        const newTask = new Task(inputNewTask, projectName, newTaskStatus);

        const newTasksList = [...tasksList, newTask];
        return { newTasksList, newTask };
    },

    edit: (tasksList, inputEditedTask) => {
        if (!tasksList) {
            return false;
        }

        const {
            id: taskId, 
            title: editedTitle, 
            dueDate: editedDueDate, 
            priority: editedPriority, 
            description: editedDescription, 
            notes: editedNotes
        } = inputEditedTask;

        if (!taskId || !editedTitle || !editedDueDate || !editedPriority) {
            return false;
        }

        if (!noDuplicateTitle(tasksList, editedTitle, taskId)) {
            return false;
        }

        const editedTaskIndex = findIndex(tasksList, taskId);
        if (!editedTaskIndex) {
            return false;
        }

        const editedTask = Object.assign({}, tasksList[editedTaskIndex]);
        const editedTaskList = [...tasksList];

        if (editedTask.title !== editedTitle) {
            editedTask.title = editedTitle;
        }
        if (editedTask.dueDate !== editedDueDate) {
            editedTask.dueDate = editedDueDate;
        }
        if (editedTask.status !== '0') {
            editedTask.status = updateOverdueStatus(editedTask.status, parseISO(editedTask.dueDate));
        }
        if (editedTask.priority !== editedPriority) {
            editedTask.priority = editedPriority;
        }
        if (editedTask.description !== editedDescription) {
            editedTask.description = editedDescription;
        }
        if (editedTask.notes !== editedNotes) {
            editedTask.notes = editedNotes;
        }

        return { editedTaskList, editedTask };
    },

    toggleTaskStatus: (tasksList, taskId) => {
        if (!tasksList || !taskId) {
            return false;
        }

        const editedTaskIndex = findIndex(tasksList, taskId);
        if (!editedTaskIndex) {
            return false;
        }
        
        const editedTask = Object.assign({}, tasksList[editedTaskIndex]);
        const editedTaskList = [...tasksList];

        if (editedTask.status === STATUS.COMPLETED) {
            let updatedStatus = STATUS.ONGOING;
            editedTask.status = updateOverdueStatus(updatedStatus, parseISO(editedTask.dueDate));
        } else {
            editedTask.status = STATUS.COMPLETED;
        }
        const editedStatus = editedTask.status;

        return { editedTaskList, editedStatus };
    },

    updateProjectName: (tasksList, editedProjectName) => {
        if (!tasksList || !editedProjectName) {
            return false;
        }

        const editedTaskList = [...tasksList];
        editedTaskList.forEach((task) => task.projectName = editedProjectName);

        return editedTaskList;
    },

    remove: (tasksList, taskId) => {
        let removed = false;
        if (!tasksList || !taskId) {
            return removed;
        }

        const removedTaskIndex = findIndex(tasksList, taskId);
        if (!removedTaskIndex) {
            return removed;
        }

        const editedTaskList = [...tasksList];
        editedTaskList.splice(removedTaskIndex, 1);

        return { editedTaskList, removed };
    },

    resetId: () => Task.resetId
};

const updateOverdueStatus = (status, dueDate) => {
    if (differenceInCalendarDays(dueDate, Date.now()) < 0) {
        status = STATUS.OVERDUE;
        return status;
    }
    return status;
}