import { Task } from './task.js';
import { isValid, STATUS, noDuplicateTitle, findIndex } from '../utils.js';
import { ERR_CONTROLLER } from './errors-text.js';

export const tasksController = {
    createNew: (tasksList, projectName, inputNewTask) => {
        const { projectId, title, dueDate, priority, description, notes } = inputNewTask;
        if (!Array.isArray(tasksList)) {
            throw new Error(ERR_CONTROLLER.TASK_LIST);
        }
        if (!projectName || 
            !isValid(projectId) ||  
            !title || 
            !dueDate || 
            !priority || 
            description === undefined || 
            notes === undefined
            ) {
            throw new Error(ERR_CONTROLLER.TASK_DATA);
        }

        if (!noDuplicateTitle(tasksList, title)) {
            return -1;
        }

        let newTaskStatus = '1';
        newTaskStatus = updateOverdueStatus(newTaskStatus, Date.parse(dueDate));
        
        const newTask = new Task(
            projectId, 
            title, 
            dueDate, 
            priority, 
            description, 
            notes, 
            projectName, 
            newTaskStatus
            );
        const newTasksList = [...tasksList, newTask];
        return { newTasksList, newTask };
    },

    edit: (tasksList, inputEditedTask) => {
        const { projectName, taskId, projectId, title, dueDate, priority, description, notes } = inputEditedTask;
        if (!Array.isArray(tasksList)) {
            throw new Error(ERR_CONTROLLER.TASK_LIST);
        }
        if (!projectName || 
            !isValid(projectId) ||
            !isValid(taskId) ||  
            !title || 
            !dueDate || 
            !priority || 
            description === undefined || 
            notes === undefined
            ) {
            throw new Error(ERR_CONTROLLER.TASK_DATA);
        }

        const editedTaskIndex = findIndex(tasksList, taskId);
        if (!isValid(editedTaskIndex)) {
            throw new Error(ERR_CONTROLLER.NO_INDEX);
        }

        if (!noDuplicateTitle(tasksList, title)) {
            return -1;
        }
        
        const editedTask = Object.assign({}, tasksList[editedTaskIndex]);
        const editedTasksList = [...tasksList];
        if (editedTask.title !== editedTitle) {
            editedTask.title = editedTitle;
        }
        if (editedTask.dueDate !== editedDueDate) {
            editedTask.dueDate = editedDueDate;
        }
        if (editedTask.status !== '0') {
            editedTask.status = updateOverdueStatus(editedTask.status, Date.parse(editedTask.dueDate));
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
            throw new Error(ERR_CONTROLLER.TASK_LIST);
        }
        if (!isValid(taskId)) {
            throw new Error(ERR_CONTROLLER.TASK_DATA);
        }

        const editedTaskIndex = findIndex(tasksList, taskId);  
        if (!isValid(editedTaskIndex)) {
            throw new Error(ERR_CONTROLLER.NO_INDEX);
        }

        const editedTask = Object.assign({}, tasksList[editedTaskIndex]);
        const editedTasksList = [...tasksList];

        if (editedTask.status === STATUS.COMPLETED) {
            let updatedStatus = STATUS.ONGOING;
            editedTask.status = updateOverdueStatus(updatedStatus, Date.parse(editedTask.dueDate));
        } else {
            editedTask.status = STATUS.COMPLETED;
        }
        const editedStatus = editedTask.status;

        editedTasksList.splice(editedTaskIndex, 1, editedTask);

        return { editedTasksList, editedStatus };
    },

    updateProjectName: (tasksList, editedProjectName) => {
        if (!Array.isArray(tasksList)) {
            throw new Error(ERR_CONTROLLER.TASK_LIST);
        }
        if (!isValid(editedProjectName)) {
            throw new Error(ERR_CONTROLLER.TASK_DATA);
        }

        const editedTaskList = [...tasksList];
        editedTaskList.forEach((task) => task.projectName = editedProjectName);

        return editedTaskList;
    },

    remove: (tasksList, taskId) => {
        if (!Array.isArray(tasksList)) {
            throw new Error(ERR_CONTROLLER.TASK_LIST);
        }
        if (!isValid(taskId)) {
            throw new Error(ERR_CONTROLLER.TASK_DATA);
        }

        const removedTaskIndex = findIndex(tasksList, taskId);
        if (!isValid(removedTaskIndex)) {
            throw new Error(ERR_CONTROLLER.NO_INDEX);
        }

        const editedTaskList = [...tasksList];
        editedTaskList.splice(removedTaskIndex, 1);

        return { editedTaskList, taskId };
    },

    resetId: () => Task.resetId
};

const updateOverdueStatus = (status, dueDate) => {
    if (Date.now() - dueDate > 0) {
        status = STATUS.OVERDUE;
        return status;
    }
    return status;
};