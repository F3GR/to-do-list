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
        if (storedToDoList === null) {
          const toDoList = [];
          localStorage.setItem('toDoList', JSON.stringify(toDoList));
          return toDoList;
        }
      
        return JSON.parse(storedToDoList);
    }
    
    createMainPage = () => createMainPage();
    addEventListenersMainPage = () => addEventListenersMainPage();

    createNewProject(newName, newIconURL) {
        const newProject = projectController.createNew(this.toDoList, newName, newIconURL);
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
        return newProject;
    }
    editProject = (projectId, editedName, editedIconURL) => {
        const editedProject = projectController.edit(this.toDoList, projectId, editedName, editedIconURL);
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
        return editedProject;
    }
    removeProject = (projectId) => {
        const removedProject = projectController.remove(this.toDoList, projectId);
        if (removedProject) {
            return true;
        }
        return false;
    }
}

export const application = new Application();

/*     createExampleTaskPanels = () => createExampleTaskPanels();
    createExampleProjectPanel = () => createExampleProjectPanel();

    */