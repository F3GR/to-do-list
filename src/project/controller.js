import { Project } from './project.js';
import { noDuplicateName, findIndex } from '../utils.js';

export const projectsController = {
    createNew: (projectsList, inputNewProject) => {
        const { name, iconURL, altText } = inputNewProject;

        if (!Array.isArray(projectsList)) {
            return 'Error: the current project list wasn\'t found';
        }
        if (!name || !iconURL || !altText) {
            return 'Error: the entered project name or icon can\'t be found';
        }
        if (!noDuplicateName(projectsList, name, "")) {
            return 'The project with this name already exists!';
        }

        const newProject = new Project(name, iconURL, altText);
        const newProjectsList = [...projectsList, newProject];
        return newProjectsList;
    },

    edit: (projectsList, inputEditedProject) => {
        const { id, name, iconURL, altText } = inputEditedProject;
        
        if (!Array.isArray(projectsList)) {
            return 'Error: the current project list wasn\'t found';
        }
        if (!name || !iconURL || !altText) {
            return 'Error: the new project name or icon aren\'t selected';
        }
        if (!noDuplicateName(projectsList, name, "")) {
            return 'The project with this name already exists!';
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
        if (!Array.isArray(projectsList)) {
            return 'Error: the current project list wasn\'t found';
        }
        if (!isValid(projectId)) {
            return 'Error: the id of the removed project wasn\'t found';
        }

        const editedProjectsList = [...projectsList];
        const removedProjectIndex = findIndex(editedProjectsList, projectId);

        editedProjectsList.splice(removedProjectIndex, 1);
        const removedId = projectId;

        return { editedProjectsList, removedId };
    },
    
    resetId: () => Project.resetId,
};