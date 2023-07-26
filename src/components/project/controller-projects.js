import { Project } from './project.js';
import { noDuplicateName, findIndex } from '../utils.js';

export const projectsController = {
    createNew: (projectsList, inputNewProject) => {
        const { name, iconURL, altText } = inputNewProject;

        if (!projectsList || !name || !iconURL || !altText) {
            return false;
        }

        if (!noDuplicateName(projectsList, name, "")) {
            return false;
        }

        const newId = Project.getNewId();
        const newProject = new Project(newId, name, iconURL, altText);
        Project.incrementNewProjectId();

        const newProjectsList = [...projectsList, newProject];
        return newProjectsList;
    },

    edit: (projectsList, inputEditedProject) => {
        const { id, name, iconURL, altText } = inputEditedProject;
        
        if (!projectsList || !name || !iconURL || !altText) {
            return false;
        }

        if (!noDuplicateName(projectsList, name, id)) {
            return false;
        }

        const editedProjectsList = [...projectsList];

        const storedProjectIndex = findIndex(editedProjectsList, id);
        const editedProject = editedProjectsList[storedProjectIndex];

        if (editedProject.name !== name) {
            editedProject.name = name;
        }
        if (editedProject.iconURL !== iconURL) {
            editedProject.iconURL = iconURL;
        }
        if (editedProject.altText !== altText) {
            editedProject.altText = altText;
        }

        return { editedProjectsList, editedProject };
    },

    remove: (projectsList, projectId) => {
        if (!projectsList || !projectId) {
            return false;
        }

        const editedProjectsList = [...projectsList];
        const removedProjectIndex = findIndex(editedProjectsList, projectId);

        editedProjectsList.splice(removedProjectIndex, 1);

        return { editedProjectsList, removedProjectIndex };
    }
};