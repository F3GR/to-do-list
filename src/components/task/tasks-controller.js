import { Task } from './task.js';
import { noDuplicateTitle } from '../utils.js';

export const tasksController = {
    createNew: function(taskList, newTitle, newDueDate, newPriority, newDescription, newNotes) {
        if (noDuplicateTitle(taskList, newTitle)) {
            const newTaskId = Task.getNewTaskId();
            const newTask = new Task(newTaskId, newTitle, newDueDate, 'on-going', newPriority, newDescription, newNotes);
            Task.incrementNewTaskId();
            return newTask;
        } else {
            return false;
        }
    },

    edit: function(taskList, taskId, editedTitle, editedDueDate, editedStatus, editedPriority, editedDescription, editedNotes) {
        const editedTaskIndex = findIndex(taskList, taskId);
        const task = taskList[editedTaskIndex];

        if (noDuplicateTitle(taskList, editedTitle, taskId)) {
            if (task.title !== editedTitle) {
                task.title = editedTitle;
            }
            if (task.dueDate !== editedDueDate) {
                task.dueDate = editedDueDate;
            }
            if (task.status !== editedStatus) {
                task.status = editedStatus;
            }
            if (task.dueDate !== editedDueDate) {
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

    remove: function(taskList, id) {
        const removedFoundTask = taskList.delete(id);
        if (!removedFoundTask) {
            console.log('The task is not found, please, enter the existing task in the current project')
        }
    }
};