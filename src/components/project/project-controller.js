import { Project } from './project.js';

export const projectController = function() {
    this.createNew = (toDoList, newName, newIconURL) => {
        if (noDuplicateName(toDoList, newName, "")) {
            const newProject = new Project(newName, newIconURL);
            toDoList.push(newProject);
            Project.incrementNewProjectId();
            return newProject;
        } else {
            return false;
        }
    }

    this.edit = (toDoList, projectId, editedName, editedIcon) => {
        const project = toDoList.find((project) => { return project.getProjectId == projectId });

        if (noDuplicateName(toDoList, editedName, projectId)) {
            if (project.name !== editedName) {
                project.name = editedName;
            }
            if (project.iconURL !== editedIcon) {
                project.iconURL = editedIcon;
            }
            return true;
        } else {
            return false;
        }
    }

    this.remove = (toDoList, projectId) => {
        const removedFoundProject = toDoList.splice(index, 1);
        return true;
    }

    function noDuplicateName(toDoList, name, projectId) {
        const n = toDoList.length();
        let i = 0;
        for (; i < n; i++) {
            if (toDoList[i].getProjectId === projectId) {
                continue;
            }
            if (toDoList[i].name === name) {
                return false;
            }
        }
        return true;
    }
};