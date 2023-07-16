import { Project } from './project.js';

export const projectController = (function() {
    this.createNew = (toDoList, newName, newIconURL) => {
        if (checkIfProjectUnique(toDoList, newName)) {
            const newProjectId = Project.getNewProjectId;
            const newProject = new Project(newName, newIconURL);
            toDoList.set(newProjectId, newProject);
            Project.incrementNewProjectId;
            return true;
        } else {
            return false;
        }
    }

    this.edit = (toDoList, projectId, editedName, editedIcon) => {
        const project = toDoList[projectId];
        if (checkIfProjectUnique(toDoList, editedName)) {
            project.name = editedName;
            project.iconURL = editedIcon;
            return true;
        } else {
            return false;
        }
    }

    this.remove = (toDoList, projectId) => {
        const removedFoundProject = toDoList.delete(projectId);
        return true;
    }

    function checkIfProjectUnique(toDoList, name) {
        for (let [id, project] of toDoList.entries()) {
            if (project.name === name) {
                return false;
            }
        }
        return true;
    }
});