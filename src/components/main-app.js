import { createExampleTaskPanels, createExampleProjectPanel } from "./dom-examples-panels.js";
import { createMainPage } from './main-page/dom-main-page.js';
import { addEventListenersMainPage } from './main-page/event-listeners-main-page.js';
import { projectController } from './project/project-controller.js';
import { updateLocalStorage } from './utils.js'

class Application {
    constructor() {
        if (Application.instance) {
            return Application.instance;
        }
        Application.instance = this;
    }

    getProjectList() {
        const storedProjectList = localStorage.getItem('TrackIt: project-list');
        if (storedProjectList === null || 
            storedProjectList === undefined || 
            storedProjectList === "") {
          const projectList = [];
          updateLocalStorage(projectList);
          return projectList;
        }
        return JSON.parse(storedProjectList);
    }
    
    createMainPage = () => createMainPage();
    addEventListenersMainPage = () => addEventListenersMainPage();

    createNewProject(newName, newIconURL) {
        const currentProjectList = this.getProjectList(); 
        const newProject = projectController.createNew(currentProjectList, newName, newIconURL);
        if (newProject) {
            currentProjectList.push(newProject);
            updateLocalStorage(currentProjectList);
        }
        return newProject;
    }


    editProject = (projectId, editedName, editedIconURL) => {
        const editedProject = projectController.edit(this.getProjectList(), projectId, editedName, editedIconURL);
        updateLocalStorage(this.getProjectList());
        return editedProject;
    }


    removeProject = (projectId) => {
        const currentProjectList = this.getProjectList();
        const removedProjectIndex = projectController.remove(currentProjectList, projectId);
        
        if (removedProjectIndex !== null || 
            removedProjectIndex !== undefined ||
            removedProjectIndex !== "undefined") {
            currentProjectList.splice(removedProjectIndex, 1);
            updateLocalStorage(currentProjectList);
            return true;
        }
        return false;
    }
}

export const application = new Application();

/*     createExampleTaskPanels = () => createExampleTaskPanels();
    createExampleProjectPanel = () => createExampleProjectPanel();

    */