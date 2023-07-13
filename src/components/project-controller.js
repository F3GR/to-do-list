import { Project } from './project.js';

export const projectController = (function() {
    this.createNew = (toDoList, newName, newIconURL) => {
        if (checkIfProjectUnique(toDoList, newName)) {
            const newProjectId = Project.getNewProjectId;
            const newProject = new Project(newName, newIconURL);
            toDoList.set(newProjectId, newProject);
            Project.incrementNewProjectId;
        } else {
            console.log('The new project is not unique, change the name of the project and try to submit again!')
        }
    }

    this.editName = (toDoList, project, editedName) => {
        if (checkIfProjectUnique(toDoList, editedName)) {
            project.name = editedName;
        } else {
            console.log('The edited project is not unique, change the name of the project and try to submit again!')
        }
    }
    this.editIcon = (project, editedIcon) => {
        project.iconURL = editedIcon;
    }

    this.remove = (toDoList, id) => {
        const removedFoundProject = toDoList.delete(id);
        if (!removedFoundProject) {
            console.log('The project is not found, please, enter the existing project')
        }
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