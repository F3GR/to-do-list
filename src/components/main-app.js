import { createExampleTaskPanels, createExampleProjectPanel } from "./dom-examples-panels.js";
import { createMainPage } from './main-page/dom-main-page.js';
import { addEventListenersMainPage } from './main-page/event-listeners-main-page.js';
import { projectController } from "./project/project-controller.js";

class Application {
    constructor() {
        if (Application.instance) {
            return Application.instance;
        }
        Application.instance = this;

        this.toDoList = this.getToDoList();
    }

    getToDoList() {
        const storedToDoList = localStorage.getItem('toDoList');
        if (!storedToDoList) {
            const toDoList = new Map();
            localStorage.setItem('toDoList', toDoList);
            return toDoList;
        }
        return storedToDoList;
    }
    
    createMainPage = () => createMainPage();
    addEventListenersMainPage = () => addEventListenersMainPage();

    createNewProject = (newName, newIconURL) => {
        projectController.createNewProject(this.toDoList, newName, newIconURL);
    }
    editProject = (projectId, editedName, editedIconURL) => {
        projectController.edit(this.toDoList, projectId, editedName, editedIconURL);
    }
    removeProject = (projectId) => {
        projectController.remove(this.toDoList, projectId);
    }

    createExampleTaskPanels = () => createExampleTaskPanels();
    createExampleProjectPanel = () => createExampleProjectPanel();
}

export const application = new Application();