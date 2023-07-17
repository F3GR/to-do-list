import { Project } from './project.js';
import { noDuplicateName, findIndex } from '../utils.js';

const projectController = {
    createNew: function(projectList, newName, newIconURL) {
        if (noDuplicateName(projectList, newName, "")) {
            const newId = Project.getNewId();
            const newProject = new Project(newId, newName, newIconURL);
            Project.incrementNewProjectId();
            return newProject;
        } else {
            return false;
        }
    },

    edit: function(projectList, projectId, editedName, editedIcon) {
        const editedProjectIndex = findIndex(projectList, projectId);
        const project = projectList[editedProjectIndex];

        if (noDuplicateName(projectList, editedName, projectId)) {
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

    remove: function(projectList, projectId) {
        return findIndex(projectList, projectId);
    }
};

export { projectController };