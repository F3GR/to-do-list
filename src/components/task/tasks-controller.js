import { Task } from './task.js';
import { noDuplicateTitle, findIndex } from '../utils.js';
import { differenceInCalendarDays } from 'date-fns';
import { parseISO } from 'date-fns';

// Task status: "0" - "completed", "1" - "on-going", "2" - "overdue"
// Task priority: "0" - "normal", "1" - "medium", "2" - "high"
export const tasksController = {
    createNew: function(projectId, projectName, tasksList, newTitle, newDueDate, newPriority, newDescription, newNotes) {
        if (noDuplicateTitle(tasksList, newTitle)) {
            const newTaskId = Task.getNewTaskId();
            const newTaskStatus = "1";

            const newTask = new Task(projectId, projectName, newTaskId, newTitle, newDueDate, newTaskStatus, newPriority, newDescription, newNotes);

            newTask.status = updateOverdueStatus(newTask.status, parseISO(newTask.dueDate));

            Task.incrementNewTaskId();
            return newTask;
        } else {
            return false;
        }
    },

    edit: function(tasksList, taskId, editedTitle, editedDueDate, editedPriority, editedDescription, editedNotes) {
        const taskIndex = findIndex(tasksList, taskId);
        const task = tasksList[taskIndex];

        if (noDuplicateTitle(tasksList, editedTitle, taskId)) {
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
        } else {
            return false;
        }
    },

    toggleTaskStatus: function(tasksList, taskId) {
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

    remove: function(taskList, taskId) {
        return findIndex(taskList, taskId);
    }
};

function updateOverdueStatus(status, dueDate) {
    if (differenceInCalendarDays(dueDate, Date.now()) < 0) {
        status = '2';
        return status;
    }
    return status;
}