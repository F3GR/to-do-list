import { Task } from './task.js';

export const taskController = (function() {
    this.createNew = (project, newTitle, newDueDate, newStatus, newPriority, newDescription, newNotes) => {
        if (checkIfTaskUnique(project.taskList, newTitle)) {
            const projectName = project.projectName;
            const newTaskId = Task.getNewTaskId;
            const newTask = new Task(projectName, newTitle, newDueDate, newStatus, newPriority, newDescription, newNotes);
            project.taskList.set(newTaskId, newTask);
            Task.incrementNewTaskId;
        } else {
            console.log('The new task is not unique in the project, change the title of the task and try to submit again!')
        }
    }

    this.editTitle = (task, editedTitle) => {
        if (checkIfTaskUnique(project.taskList, editedTitle)) {
            task.title = editedTitle;
        } else {
            console.log('The edited task is not unique in the project, change the title of the task and try to submit again!')
        }
    }
    this.editDueDate = (task, editedDueDate) => {
        task.dueDate = editedDueDate;
    }
    this.editStatus = (task, editedStatus) => {
        task.status = editedStatus;
    }
    this.editPriority = (task, editedPriority) => {
        task.priority = editedPriority;
    }
    this.editDescription = (task, editedDescription) => {
        task.description = editedDescription;
    }
    this.editNotes = (task, editedNotes) => {
        task.notes = editedNotes;
    }

    this.remove = (taskList, id) => {
        const removedFoundTask = taskList.delete(id);
        if (!removedFoundTask) {
            console.log('The task is not found, please, enter the existing task in the current project')
        }
    }

    function checkIfTaskUnique(taskList, title) {
        for (let [id, task] of taskList.entries()) {
            if (task.title === title) {
                return false;
            }
        }
        return true;
    }
});