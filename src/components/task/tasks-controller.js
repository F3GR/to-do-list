import { Task } from './task.js';
import { noDuplicateTitle, findIndex } from '../utils.js';
import { parseISO, differenceInCalendarDays } from 'date-fns';

export const tasksController = {
    createNew: function(projectId, projectName, taskList, newTitle, newDueDate, newPriority, newDescription, newNotes) {
        if (noDuplicateTitle(taskList, newTitle)) {
            const newTaskId = Task.getNewTaskId();
            let newTaskStatus = "0";
            if (differenceInCalendarDays(parseISO(newDueDate), Date.now()) < 0) {
                newTaskStatus = "2";
            }
            const newTask = new Task(projectId, projectName, newTaskId, newTitle, newDueDate, newTaskStatus, newPriority, newDescription, newNotes);
            Task.incrementNewTaskId();
            return newTask;
        } else {
            return false;
        }
    },

    edit: function(taskList, taskId, editedTitle, editedDueDate, editedPriority, editedDescription, editedNotes) {
        const editedTaskIndex = findIndex(taskList, taskId);
        const task = taskList[editedTaskIndex];

        if (noDuplicateTitle(taskList, editedTitle, taskId)) {
            if (task.title !== editedTitle) {
                task.title = editedTitle;
            }
            if (task.dueDate !== editedDueDate) {
                task.dueDate = editedDueDate;
            }
            if (task.priority !== editedPriority) {
                task.priority = editedPriority;
            }
            if (task.description !== editedDescription) {
                task.description = editedDescription;
            }
            if (task.notes !== editedNotes) {
                task.notes = editedNotes;
            }
            return { task, editedTaskIndex };
        } else {
            return false;
        }
    },

    remove: function(taskList, taskId) {
        return findIndex(taskList, taskId);
    }
};