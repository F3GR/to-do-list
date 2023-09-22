import { Task } from './task.js';
import { differenceInCalendarDays } from 'date-fns';
import { parseISO } from 'date-fns';
import { isValid, STATUS, noDuplicateTitle, findIndex } from '../utils.js';

export const tasksController = {
    createNew: (tasksList, projectName, inputNewTask) => {
        const { projectId, title, dueDate, priority, description, notes } = inputNewTask;

        if (!Array.isArray(tasksList)) {
            return 'Error: the current task list wasn\'t found';
        }
        if (!projectName || !isValid(projectId)) {
            return 'Error: the project name or id  can\'t be found after the submission';
        }
        if (!title || !dueDate || !priority) {
            return 'Error: the entered task title, due date or priority can\'t be found after the submission';
        }
        if (!isValid(description) || !isValid(notes)) {
            return 'Error: the entered description or notes can\'t be found';
        }
        if (!noDuplicateTitle(tasksList, title)) {
            return 'The task with this title already exists in the project!';
        }

        let newTaskStatus = '1';
        newTaskStatus = updateOverdueStatus(newTaskStatus, parseISO(dueDate));
        
        const newTask = new Task({ projectId, title, dueDate, priority, description, notes }, projectName, newTaskStatus);
        const newTasksList = [...tasksList, newTask];
        return { newTasksList, newTask };
    },

    edit: (tasksList, inputEditedTask) => {
        const { taskId, projectId, title, dueDate, priority, description, notes } = inputEditedTask;

        if (!Array.isArray(tasksList)) {
            return 'Error: the current task list wasn\'t found';
        }
        if (!projectName || !isValid(projectId), !isValid(taskId)) {
            return 'Error: the project name or id  can\'t be found after the edit ';
        }
        if (!title || !dueDate || !priority) {
            return 'Error: the entered task title, due date or priority can\'t be found after the edit';
        }
        if (!isValid(description) || !isValid(notes)) {
            return 'Error: the entered description or notes can\'t be found';
        }
        if (!noDuplicateTitle(tasksList, title)) {
            return 'The task with this title already exists in the project!';
        }

        const editedTaskIndex = findIndex(tasksList, taskId);
        const editedTask = Object.assign({}, tasksList[editedTaskIndex]);
        const editedTasksList = [...tasksList];
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

        editedTasksList.splice(editedTaskIndex, 1, editedTask);
        return { editedTasksList, editedTask };
    },

    toggleTaskStatus: (tasksList, taskId) => {
        if (!Array.isArray(tasksList)) {
            return 'Error: the current task list wasn\'t found';
        }
        if (!isValid(taskId)) {
            return 'Error: the project name or id  can\'t be found after the toggle ';
        }

        const editedTaskIndex = findIndex(tasksList, taskId);        
        const editedTask = Object.assign({}, tasksList[editedTaskIndex]);
        const editedTasksList = [...tasksList];

        if (editedTask.status === STATUS.COMPLETED) {
            let updatedStatus = STATUS.ONGOING;
            editedTask.status = updateOverdueStatus(updatedStatus, parseISO(editedTask.dueDate));
        } else {
            editedTask.status = STATUS.COMPLETED;
        }
        const editedStatus = editedTask.status;

        editedTasksList.splice(editedTaskIndex, 1, editedTask);

        return { editedTasksList, editedStatus };
    },

    updateProjectName: (tasksList, editedProjectName) => {
        if (!Array.isArray(tasksList)) {
            return 'Error: the current task list wasn\'t found';
        }
        if (!isValid(projectName)) {
            return 'Error: the edited project name can\'t be found after the edit';
        }

        const editedTaskList = [...tasksList];
        editedTaskList.forEach((task) => task.projectName = editedProjectName);

        return editedTaskList;
    },

    remove: (tasksList, taskId) => {
        if (!Array.isArray(tasksList)) {
            return 'Error: the current task list wasn\'t found';
        }
        if (!isValid(taskId)) {
            return 'Error: the project name or id  can\'t be found after the toggle ';
        }

        const removedTaskIndex = findIndex(tasksList, taskId);
        
        if (!removedTaskIndex) {
            return 'Error: the removed task can\'t be found after the storage';
        }

        const editedTaskList = [...tasksList];
        editedTaskList.splice(removedTaskIndex, 1);

        return { editedTaskList, taskId };
    },

    resetId: () => Task.resetId
};

const updateOverdueStatus = (status, dueDate) => {
    if (differenceInCalendarDays(dueDate, Date.now()) < 0) {
        status = STATUS.OVERDUE;
        return status;
    }
    return status;
};