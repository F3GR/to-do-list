import { Project } from './project.js';
import { noDuplicateName, findIndex } from '../utils.js';

export const projectsController = {
    createNew: (projectsList, inputNewProject) => {
        const { name, iconURL, altText } = inputNewProject;

        if (!Array.isArray(projectsList) || !name || !iconURL || !altText) {
            return false;
        }
        if (!noDuplicateName(projectsList, name, "")) {
            return false;
        }

        const newProject = new Project(inputNewProject);
        const newProjectsList = [...projectsList, newProject];
        return newProjectsList;
    },

    edit: (projectsList, inputEditedProject) => {
        const { id, name, iconURL, altText } = inputEditedProject;
        
        if (!Array.isArray(projectsList) || 
            !id || 
            !name || 
            !iconURL || 
            !altText) {
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
        if (!Array.isArray(projectsList) || !projectId) {
            return false;
        }

        const editedProjectsList = [...projectsList];
        const removedProjectIndex = findIndex(editedProjectsList, projectId);

        editedProjectsList.splice(removedProjectIndex, 1);
        const removedId = projectId;

        return { editedProjectsList, removedId };
    },
    
    resetId: () => Project.resetId
};