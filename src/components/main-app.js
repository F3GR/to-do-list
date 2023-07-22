import { createMainPage } from './dom-main-page.js';
import { addListenersSidebar } from './group/event-listeners-sidebar.js';
import { addListenersViewOptions } from './view-options/event-listeners-view-options.js';
import { addListenersManageProjects } from './project/event-listeners-project-menu';
import { addListenersManageTasks } from './task/event-listeners-task-menu.js';
import { projectsController } from './project/projects-controller.js';
import { tasksController } from './task/tasks-controller.js';
import { groupsController } from './group/groupsController.js';
import { viewController } from './view-options/view-controller.js';

class Application {
    constructor() {
        if (Application.instance) {
            return Application.instance;
        }
        Application.instance = this;
    }

    start = () => {
        createMainPage();
        addListenersViewOptions();
        addListenersSidebar();
        addListenersManageProjects();
        addListenersManageTasks();


    }


    getProjectsList() {
        const storedProjectList = localStorage.getItem('TrackIt: project-list');
        if (storedProjectList === null || 
            storedProjectList === undefined || 
            storedProjectList === "") {
          const projectList = [];
          this.setProjectsList(projectList);
          return projectList;
        }
        return JSON.parse(storedProjectList);
    }
    setProjectsList = (projectList) => localStorage.setItem('TrackIt: project-list', JSON.stringify(projectList));

    getTasksList = (projectId) => {
        const storedTaskList = localStorage.getItem(`TrackIt: ${projectId}`);
        return JSON.parse(storedTaskList);
    }
    setTasksList = (projectId, tasksList) => localStorage.setItem(`TrackIt: ${projectId}`, JSON.stringify(tasksList));

    getAllTasks() {
        const currentProjectList = this.getProjectsList();
        const arrayOfProjectIds = currentProjectList.map(({ id, name, iconURL }) => ({ id }));
        console.log(`Array of project Id's: ${arrayOfProjectIds}`);

        const allTasksList = arrayOfProjectIds.flatMap(({ id }) => {
            return Object.values(this.getTasksList(id));
        });
        console.log(`Array of all tasks: ${allTasksList}`);
        return allTasksList;
    }

    getCurrentGroupIdentifier() {
        const storedCurrentGroup = localStorage.getItem('TrackIt: current-group');
        if (!storedCurrentGroup) {
            const newCurrentGroup = 'all';
            return newCurrentGroup;
        }
        return storedCurrentGroup;
    }
    setCurrentGroupIdentifier = (newGroupIdentifier) => localStorage.setItem('TrackIt: current-group', JSON.stringify(newGroupIdentifier));



    getViewState() {
        const storedViewState = localStorage.getItem('TrackIt: view-state');
        if (!storedViewState) {
            const newViewState = {
                priorityHigh: true,
                priorityMedium: true,
                priorityNormal: true,
                includeOnGoing: true,
                includeCompleted: true,
                includeOverdue: true,
                sortBy: 'date',
                ascendingOrder: true,
            }
            return newViewState;
        }
        return JSON.parse(storedViewState);
    }
    setViewState = (viewState) => localStorage.setItem(`TrackIt: view-state`, JSON.stringify(viewState));

    
    createNewProject = (newName, newIconURL) => {
        const currentProjectList = this.getProjectsList();
        console.log(`Before creating a new project (project List): ${localStorage.getItem(`TrackIt: project-list`)}`);
        const newProject = projectsController.createNew(currentProjectList, newName, newIconURL);
        console.log(`New project: ${newProject}`);

        if (newProject) {
            currentProjectList.push(newProject);
            this.setProjectsList(currentProjectList);

            localStorage.setItem(`TrackIt: ${newProject.id}`, `[]`);
            console.log(`After (project List): ${localStorage.getItem(`TrackIt: project-list`)}`);
            console.log(`After (new task List): ${localStorage.getItem(`TrackIt: ${newProject.id}`)}`);
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
            this.setProjectsList(currentProjectList);
            console.log(`After: ${localStorage.getItem(`TrackIt: project-list`)}`);
        }
        return editedProject.project;
    }

    removeProject = (projectId) => {
        const currentProjectList = this.getProjectsList();
        console.log(`Before deleting a project (project List): ${localStorage.getItem(`TrackIt: project-list`)}`);
        const removedProjectIndex = projectsController.remove(currentProjectList, projectId);
        console.log(`Removed task List: ${localStorage.getItem(`TrackIt: ${currentProjectList[removedProjectIndex].id}`)}`);
        
        if (removedProjectIndex !== null || 
            removedProjectIndex !== undefined ||
            removedProjectIndex !== "undefined") {

            localStorage.removeItem(`TrackIt: ${currentProjectList[removedProjectIndex].id}`);
            currentProjectList.splice(removedProjectIndex, 1);
            this.setProjectsList(currentProjectList);

            console.log(`After: ${localStorage.getItem(`TrackIt: project-list`)}`);
            return true;
        }
        return false;
    }
    

    createNewTask = (projectId, newTitle, newDueDate, newPriority, newDescription, newNotes) => {
        const projectName = this.getProjectsList()
                                .find((project) => project.id === projectId)
                                .name;
        const currentTasksList = this.getTasksList(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const newTask = tasksController.createNew(projectId, projectName, currentTasksList, newTitle, newDueDate, newPriority, newDescription, newNotes);
        console.log(`Created task: ${newTask}`);

        if (newTask) {
            currentTasksList.push(newTask);
            this.setTasksList(projectId, currentTasksList);
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
            currentTasksList[editedTask.taskIndex] = editedTask.task;
            this.setTasksList(projectId, currentTasksList);
            console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
            return editedTask.task;
        }
        return false;
    }

    toggleTaskStatus = (projectId, taskId) => {
        const currentTasksList = this.getTasksList(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const taskWithNewStatus = tasksController.toggleTaskStatus(currentTasksList, taskId);
        if (taskWithNewStatus) {
            currentTasksList[taskWithNewStatus.taskIndex] = taskWithNewStatus.task;
            this.setTasksList(projectId, currentTasksList);
            console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
            return taskWithNewStatus.task.status;
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
            this.setTasksList(projectId, currentTasksList);
            console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
            return true;
        }
    }

    changeTaskGroup = (groupIdentifier) => {
        const allTasks = this.getAllTasks();
        const newGroup = groupsController.getGroup(allTasks, groupIdentifier);
        console.log(`Selected group: ${newGroup}`);

        if (newGroup) {
            this.setCurrentGroupIdentifier(groupIdentifier);
            return newGroup;
        }
        return false;
    }

    updateView = (viewState) => {
        this.setViewState(viewState);
        const allTasks = this.getAllTasks();
        const currentGroupIdentifier = this.getCurrentGroupIdentifier();
        const currentTaskGroup = groupsController.getGroup(allTasks, currentGroupIdentifier);

        const filteredTasks = viewController.filter(currentTaskGroup, viewState.priorityHigh, viewState.priorityMedium,
        viewState.priorityNormal, viewState.includeOnGoing, viewState.includeCompleted, viewState.includeOverdue);

        const sortedTasks = viewController.sort(filteredTasks, viewState.sortBy, viewState.ascendingOrder);

        if (sortedTasks) {
            return sortedTasks;
        }
        return false;
    }

}

export const application = new Application();

/*     createExampleTaskPanels = () => createExampleTaskPanels();
    createExampleProjectPanel = () => createExampleProjectPanel();

    */