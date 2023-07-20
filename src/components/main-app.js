import { createMainPage } from './main-page/dom-main-page.js';
import { addEventListenersMainPage } from './main-page/event-listeners-main-page.js';
import { projectsController } from './project/projects-controller.js';
import { tasksController } from './task/tasks-controller.js';
import { updateProjectsList, updateTasksList } from './utils.js'
import { addListenersManageProjects } from './project/event-listeners-project-menu';
import { addListenersManageTasks } from './task/event-listeners-task-menu.js';

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
        console.log(`Before (adding a new project): ${localStorage.getItem(`TrackIt: project-list`)}`);
        const newProject = projectsController.createNew(currentProjectList, newName, newIconURL);
        console.log(`New project: ${newProject}`);
        if (newProject) {
            currentProjectList.push(newProject);
            updateProjectsList(currentProjectList);
            localStorage.setItem(`TrackIt: ${newProject.id}`, `[]`);
            console.log(`After: ${localStorage.getItem(`TrackIt: project-list`)}`);
            console.log(`After new item storage: ${localStorage.getItem(`TrackIt: ${newProject.id}`)}`);
        }
        return newProject;
    }


    editProject = (projectId, editedName, editedIconURL) => {
        const currentProjectList = this.getProjectsList();
        console.log(`Before (editing): ${localStorage.getItem(`TrackIt: project-list`)}`);
        const editedProject = projectsController.edit(currentProjectList, projectId, editedName, editedIconURL);
        console.log(`Edited project: ${editedProject}`);

        if (editedProject) {
            currentProjectList[editedProject.editedProjectIndex] = editedProject.project;
            updateProjectsList(currentProjectList);
            console.log(`After: ${localStorage.getItem(`TrackIt: project-list`)}`);
        }
        return editedProject.project;
    }

    removeProject = (projectId) => {
        const currentProjectList = this.getProjectsList();
        console.log(`Before (deleting): ${localStorage.getItem(`TrackIt: project-list`)}`);
        const removedProjectIndex = projectsController.remove(currentProjectList, projectId);
        console.log(`Removed item storage: ${localStorage.getItem(`TrackIt: ${currentProjectList[removedProjectIndex].id}`)}`);
        
        if (removedProjectIndex !== null || 
            removedProjectIndex !== undefined ||
            removedProjectIndex !== "undefined") {

            localStorage.removeItem(`TrackIt: ${currentProjectList[removedProjectIndex].id}`);
            currentProjectList.splice(removedProjectIndex, 1);
            updateProjectsList(currentProjectList);
            console.log(`After: ${localStorage.getItem(`TrackIt: project-list`)}`);
            return true;
        }
        return false;
    }

    createNewTask = (projectId, newTitle, newDueDate, newPriority, newDescription, newNotes) => {
        const currentTasksList = this.getTasksList(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const newTask = tasksController.createNew(currentTasksList, newTitle, newDueDate, newPriority, newDescription, newNotes);
        console.log(`Created task: ${newTask}`);
        if (newTask) {
            currentTasksList.push(newTask);
            updateTasksList(projectId, currentTasksList);
            console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
            return newTask;
        }
        return false;
    }

    editTask = (projectId, taskId, editedTitle, editedDueDate, editedPriority, editedDescription, editedNotes) => {
        const currentTasksList = this.getTasksList(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const editedTask = tasksController.edit(currentTasksList, taskId, editedTitle, editedDueDate, editedPriority, editedDescription, editedNotes);
        console.log(`Edited task: ${editedTask}`);

        if (editedTask) {
            currentTasksList[editedTask.editedTaskIndex] = editedTask.task;
            updateTasksList(projectId, currentTasksList);
            console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
            return editedTask.task;
        }
        return false;
    }

    removeTask = (projectId, taskId) => {
        const currentTasksList = this.getTasksList(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const removedTaskIndex = tasksController.remove(currentTasksList, taskId);

        if (removedTaskIndex !== null || 
            removedTaskIndex !== undefined ||
            removedTaskIndex !== "undefined") {

            currentTasksList.splice(removedTaskIndex, 1);
            updateTasksList(projectId, currentTasksList);
            console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
            return true;
        }
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