import { createMainPage } from './main-page/dom-main-page.js';
import { addEventListenersMainPage } from './main-page/event-listeners-main-page.js';
import { projectsController } from './project/projects-controller.js';
import { tasksController } from './task/tasks-controller.js';
import { updateProjectsList, updateTasksList } from './utils.js'
import { addListenersManageProjects } from './project/event-listeners-project-menu';
import { addListenersManageTasks } from './task/event-listeners-task-menu.js';
import { taskController } from './task/tasks-controller.js';

class Application {
    constructor() {
        if (Application.instance) {
            return Application.instance;
        }
        Application.instance = this;
    }

    getProjectsList() {
        const storedProjectList = localStorage.getItem('TrackIt: project-list');
        if (storedProjectList === null || 
            storedProjectList === undefined || 
            storedProjectList === "") {
          const projectList = [];
          updateProjectsList(projectList);
          return projectList;
        }
        return JSON.parse(storedProjectList);
    }

    getTasksList(projectId) {
        const storedTaskList = localStorage.getItem(`TrackIt: ${projectId}`);
        return JSON.parse(storedTaskList);
    }
    
    createMainPage = () => createMainPage();
    addEventListenersMainPage = () => addEventListenersMainPage();
    addListenersManageProjects = () => addListenersManageProjects();
    addListenersManageTasks = () => addListenersManageTasks();

    createNewProject(newName, newIconURL) {
        const currentProjectList = this.getProjectsList(); 
        const newProject = projectsController.createNew(currentProjectList, newName, newIconURL);
        if (newProject) {
            currentProjectList.push(newProject);
            updateProjectsList(currentProjectList);
            localStorage.setItem(`TrackIt: ${newProject.id}`, `[]`);
        }
        return newProject;
    }


    editProject = (projectId, editedName, editedIconURL) => {
        const currentProjectList = this.getProjectsList();
        const editedProject = projectsController.edit(currentProjectList, projectId, editedName, editedIconURL);

        if (editedProject) {
            currentProjectList[editedProject.editedProjectIndex] = editedProject.project;
            updateProjectsList(currentProjectList);
        }
        return editedProject.project;
    }

    removeProject = (projectId) => {
        const currentProjectList = this.getProjectsList();
        const removedProjectIndex = projectsController.remove(currentProjectList, projectId);
        
        if (removedProjectIndex !== null || 
            removedProjectIndex !== undefined ||
            removedProjectIndex !== "undefined") {

            localStorage.removeItem(`TrackIt: ${currentProjectList[removedProjectIndex].id}`);
            currentProjectList.splice(removedProjectIndex, 1);
            updateProjectsList(currentProjectList);

            return true;
        }
        return false;
    }

    createNewTask = (projectId, newTitle, newDueDate, newPriority, newDescription, newNotes) => {
        const currentTaskList = this.getTasksList(projectId);
        const newTask = tasksController.createNew(currentTaskList, newTitle, newDueDate, newPriority, newDescription, newNotes);
        if (newTask) {
            currentTaskList.push(newTask);
            updateTasksList(projectId, currentTaskList);
            return newTask;
        }
        return false;
    }

    editTask = () => {

    }

    removeTask = () => {

    }




    changeTaskGroup = (taskGroup) => {

    }
    sort = (sortOption) => {

    }
    filter = (filterOption) => {

    }
}

export const application = new Application();

/*     createExampleTaskPanels = () => createExampleTaskPanels();
    createExampleProjectPanel = () => createExampleProjectPanel();

    */