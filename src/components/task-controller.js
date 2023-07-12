import Task from './task.js';
import { checkIfUnique } from './utils.js';

const taskController = (function() {
    !!!TODO!!!
    this.createNew = (project, projectName, newTitle, newDueDate, newStatus, newPriority, newDescription, newNotes) => {
        if (checkIfUnique(project, 'title', newTitle)) {
            const newTask = new Task(projectName, newTitle, newDueDate, newStatus, newPriority, newDescription, newNotes);
            project.set(project.size - 1, newTask);
        } else {
            console.log('The new task is not unique in the project, change the title of the task and try to submit again!')
        }
    }
    this.editTitle = (task, editedTitle) => {
        if (checkIfUnique(project, 'title', editedTitle)) {
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

    this.remove = (project, id) => {
        const removedFoundTask = project.delete(id);
        if (!removedFoundTask) {
            console.log('The task is not found, please, enter the existing task in the current project')
        }
    }
});