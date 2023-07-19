import { Project } from './project.js';
import { noDuplicateName, findIndex } from '../utils.js';

export const projectsController = {
    createNew: function(projectsList, newName, newIconURL) {
        if (noDuplicateName(projectsList, newName, "")) {
            const newId = Project.getNewId();
            const newProject = new Project(newId, newName, newIconURL);
            Project.incrementNewProjectId();
            return newProject;
        } else {
            return false;
        }
    },

    edit: function(projectsList, projectId, editedName, editedIcon) {
        const editedProjectIndex = findIndex(projectsList, projectId);
        const project = projectsList[editedProjectIndex];

        if (noDuplicateName(projectsList, editedName, projectId)) {
            if (project.name !== editedName) {
                project.name = editedName;
            }
            if (project.iconURL !== editedIcon) {
                project.iconURL = editedIcon;
            }
            return { project, editedProjectIndex };
        } else {
            return false;
        }
    },

    remove: function(projectsList, projectId) {
        return findIndex(projectsList, projectId);
    }
};