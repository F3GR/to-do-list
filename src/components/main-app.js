import { renderMainPage } from "./dom-main-page.js";
import { createExampleTaskPanels, createExampleProjectPanel } from "./dom-examples-panels.js";
import { createMainPage } from "./dom-main-page.js";

export class Application {
    constructor() {
        if (Application.instance) {
            return Application.instance;
        }
        Application.instance = this;
        this.firstLoad();
    }

    firstLoad = function() {
        if (!localStorage.getItem('toDoList')) {
            const toDoList = new Map();
            localStorage.setItem('toDoList', toDoList);
        }
    }
    getToDoList() {
        const storedToDoList = localStorage.getItem('toDoList');
        if (!storedToDoList) {
            this.firstLoad;
            return localStorage.getItem('toDoList');
        }
        return storedToDoList;
    }
    
    createMainPage = () => createMainPage();
    createExampleTaskPanels = () => createExampleTaskPanels();
    createExampleProjectPanel = () => createExampleProjectPanel();
}
