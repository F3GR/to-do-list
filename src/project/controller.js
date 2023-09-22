import { Project } from './project.js';
import { noDuplicateName, findIndex, isValid } from '../utils.js';
import { ERR_CONTROLLER } from './errors-text.js';

export const projectsController = {
    createNew: (projectsList, inputNewProject) => {
        const { name, iconURL, altText } = inputNewProject;

        if (!Array.isArray(projectsList)) {
            throw new Error(ERR_CONTROLLER.PROJECT_LIST);
        }
        if (!name || !iconURL || !altText) {
            throw new Error(ERR_CONTROLLER.PROJECT_DATA);
        }

        if (!noDuplicateName(projectsList, name, "")) {
            return -1;
        }

        const newProject = new Project(name, iconURL, altText);
        const newProjectsList = [...projectsList, newProject];
        return newProjectsList;
    },

    edit: (projectsList, inputEditedProject) => {
        const { id, name, iconURL, altText } = inputEditedProject;

        if (!Array.isArray(projectsList)) {
            throw new Error(ERR_CONTROLLER.PROJECT_LIST);
        }
        if (!isValid(id)) {
            throw new Error(ERR_CONTROLLER.INVALID_INDEX);
        }
        if (!name || !iconURL || !altText) {
            throw new Error(ERR_CONTROLLER.PROJECT_DATA);
        }

        const storedProjectIndex = findIndex(projectsList, id);
        if (!isValid(storedProjectIndex)) {
            throw new Error(ERR_CONTROLLER.NO_INDEX);
        }
        
        if (!noDuplicateName(projectsList, name, "")) {
            return -1;
        }

        const editedProjectsList = [...projectsList];
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
            throw new Error(ERR_CONTROLLER.PROJECT_LIST);
        }
        if (!isValid(projectId)) {
            throw new Error(ERR_CONTROLLER.INVALID_INDEX);
        }

        const removedProjectIndex = findIndex(projectsList, projectId);
        if (!isValid(removedProjectIndex)) {
            throw new Error(ERR_CONTROLLER.NO_INDEX);
        }
        
        const editedProjectsList = [...projectsList];
        editedProjectsList.splice(removedProjectIndex, 1);
        const removedId = projectId;

        return { editedProjectsList, removedId };
    },
    
    resetId: () => Project.resetId,
};