import { Task } from './task.js';
import { noDuplicateTitle, findIndex } from '../utils.js';
import { differenceInCalendarDays } from 'date-fns';
import { parseISO } from 'date-fns';

export const tasksController = {
    createNew: (projectId, projectName, tasksList, newTitle, newDueDate, newPriority, newDescription, newNotes) => {
        
        if (!(projectId && projectName && tasksList && newTitle && newDueDate && newPriority)) {
            return false;
        }

        if (!noDuplicateTitle(tasksList, newTitle)) {
            return false;
        }

        const newTaskId = Task.getNewTaskId();
        const newTaskStatus = "1";
        const newTask = new Task(projectId, projectName, newTaskId, newTitle, newDueDate, newTaskStatus, newPriority, newDescription, newNotes);

        newTask.status = updateOverdueStatus(newTask.status, parseISO(newTask.dueDate));

        Task.incrementNewTaskId();
        return { newTask };
    },

    edit: (tasksList, taskId, editedTitle, editedDueDate, editedPriority, editedDescription, editedNotes) => {
        if (!(tasksList && taskId)) {
            return false;
        }

        const taskIndex = findIndex(tasksList, taskId);
        const task = tasksList[taskIndex];

        if (!noDuplicateTitle(tasksList, editedTitle, taskId)) {
            return false;
        }

        if (editedTitle && task.title !== editedTitle) {
            task.title = editedTitle;
        }
        if (editedDueDate && task.dueDate !== editedDueDate) {
            task.dueDate = editedDueDate;
        }
        if (task.status !== '0') {
            task.status = updateOverdueStatus(task.status, parseISO(task.dueDate));
        }
        if (editedPriority && task.priority !== editedPriority) {
            task.priority = editedPriority;
        }
        if (editedDescription && task.description !== editedDescription) {
            task.description = editedDescription;
        }
        if (editedNotes && task.notes !== editedNotes) {
            task.notes = editedNotes;
        }
        return { task, taskIndex };
    },

    toggleTaskStatus: (tasksList, taskId) => {
        if (!(tasksList && taskId)) {
            return false;
        }

        const taskIndex = findIndex(tasksList, taskId);
        const task = tasksList[taskIndex];

        if (task.status === '0') {
            let updatedStatus = '1';
            task.status = updateOverdueStatus(updatedStatus, parseISO(task.dueDate));
            return { task, taskIndex };
        } else {
            task.status = '0';
            return { task, taskIndex };
        }
    },

    updateProjectName: (tasksList, editedProjectName) => {
        if (!(tasksList && editedProjectName)) {
            return false;
        }
        tasksList.forEach((task) => task.projectName = editedProjectName);
        return  { tasksList };
    },

    remove: (tasksList, taskId) => {
        if (!(tasksList && taskId)) {
            return false;
        }
        return findIndex(tasksList, taskId);
    },
};

function updateOverdueStatus(status, dueDate) {
    if (differenceInCalendarDays(dueDate, Date.now()) < 0) {
        status = '2';
        return status;
    }
    return status;
}