import { renderMainPage } from "./dom-main-page.js";
import { renderNewProject } from "./dom-project.js";
import { renderNewTask } from "./dom-task.js";

export class Application {
    constructor() {
        if (Application.instance) {
            return Application.instance;
        }
        Application.instance = this;
        this.initialize();
    }

    initialize() {
        if (!localStorage.getItem('toDoList')) {
            const toDoList = new Map();
            localStorage.setItem('toDoList', toDoList);
        }
    }
    getToDoList() {
        const storedToDoList = localStorage.getItem('toDoList');
        if (!storedToDoList) {
            this.initialize();
            return localStorage.getItem('toDoList');
        }
        return storedToDoList;
    }
    
    renderMainPage = () => renderMainPage();
    renderNewProject = () => renderNewProject();
    renderNewTask = () => renderNewTask();
}
