import { createMainPage } from './dom-main-page.js';
import { addListenersSidebar } from './group/event-listeners-sidebar.js';
import { addListenersViewOptions } from './view-options/event-listeners-view-options.js';
import { addListenersManageProjects } from './project/event-listeners-project-menu';
import { addListenersManageTasks } from './task/event-listeners-task-menu.js';
import { projectsController } from './project/projects-controller.js';
import { tasksController } from './task/tasks-controller.js';
import { groupsController } from './group/groupsController.js';
import { viewController } from './view-options/view-controller.js';

import { renderProject } from './project/dom-project.js';
import { renderTask } from './task/dom-task.js';

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

        const projectList = this.getProjectsList();
        projectList.forEach((project) => {
            renderProject(project.name, project.iconURL, project.id);
        });

        const groupIdentifier = this.getCurrentGroupIdentifier();
        const tasksGroup = this.getTasksGroup(groupIdentifier);
        const viewState = this.getViewState();
        const finalTaskGroup = this.updateView(viewState);

        if (finalTaskGroup) {
            finalTaskGroup.forEach((task) => {
                renderTask(
                    task.projectId,
                    task.projectName,
                    task.id,
                    task.title,
                    task.dueDate,
                    task.status,
                    task.priority,
                    task.description,
                    task.notes
                );
            });
        }
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

    getTasksListByProjectId = (projectId) => {
        const storedTaskList = localStorage.getItem(`TrackIt: ${projectId}`);
        return JSON.parse(storedTaskList);
    }
    setTasksListByProjectId = (projectId, tasksList) => localStorage.setItem(`TrackIt: ${projectId}`, JSON.stringify(tasksList));

    getAllTasks() {
        const currentProjectList = this.getProjectsList();
        const arrayOfProjectIds = currentProjectList.map(({ id, name, iconURL }) => ({ id }));
        console.log(`Array of project Id's: ${arrayOfProjectIds}`);

        const allTasksList = arrayOfProjectIds.flatMap(({ id }) => {
            return Object.values(this.getTasksListByProjectId(id));
        });
        console.log(`Array of all tasks: ${allTasksList}`);
        return allTasksList;
    }

    getStandardGroups() {
        return ['all', 'today', 'week', 'completed', 'overdue'];
    }

    getCurrentGroupIdentifier() {
        const storedCurrentGroup = localStorage.getItem('TrackIt: current-group');
        if (!storedCurrentGroup) {
            const newCurrentGroup = 'all';
            return newCurrentGroup;
        }
        return storedCurrentGroup;
    }
    setCurrentGroupIdentifier = (newGroupIdentifier) => localStorage.setItem('TrackIt: current-group', newGroupIdentifier);

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
        const currentTasksList = this.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const newTask = tasksController.createNew(projectId, projectName, currentTasksList, newTitle, newDueDate, newPriority, newDescription, newNotes);
        console.log(`Created task: ${newTask}`);

        if (newTask) {
            currentTasksList.push(newTask);
            this.setTasksListByProjectId(projectId, currentTasksList);
            console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
            return newTask;
        }
        return false;
    }

    editTask = (projectId, taskId, editedTitle, editedDueDate, editedPriority, editedDescription, editedNotes) => {
        const currentTasksList = this.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const editedTask = tasksController.edit(currentTasksList, taskId, editedTitle, editedDueDate, editedPriority, editedDescription, editedNotes);
        console.log(`Edited task: ${editedTask}`);

        if (editedTask) {
            currentTasksList[editedTask.taskIndex] = editedTask.task;
            this.setTasksListByProjectId(projectId, currentTasksList);
            console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
            return editedTask.task;
        }
        return false;
    }

    toggleTaskStatus = (projectId, taskId) => {
        const currentTasksList = this.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const taskWithNewStatus = tasksController.toggleTaskStatus(currentTasksList, taskId);
        if (taskWithNewStatus) {
            currentTasksList[taskWithNewStatus.taskIndex] = taskWithNewStatus.task;
            this.setTasksListByProjectId(projectId, currentTasksList);
            console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
            return taskWithNewStatus.task.status;
        }
        return false;
    }

    removeTask = (projectId, taskId) => {
        const currentTasksList = this.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const removedTaskIndex = tasksController.remove(currentTasksList, taskId);

        if (removedTaskIndex !== null || 
            removedTaskIndex !== undefined ||
            removedTaskIndex !== "undefined") {

            currentTasksList.splice(removedTaskIndex, 1);
            this.setTasksListByProjectId(projectId, currentTasksList);
            console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
            return true;
        }
    }

    getTasksGroup = (groupIdentifier) => {
        const standardGroups = this.getStandardGroups();
        let newGroup;
        if (standardGroups.includes(groupIdentifier)) {
            const allTasks = this.getAllTasks();
            newGroup = groupsController.getTaskListByGroup(allTasks, groupIdentifier);
        } else {
            newGroup = this.getTasksListByProjectId(groupIdentifier);
        }
        console.log(`Selected group: ${newGroup}`);

        if (newGroup) {
            this.setCurrentGroupIdentifier(groupIdentifier);
            return newGroup;
        }
        return false;
    }

    updateView = (viewState) => {
        this.setViewState(viewState);
        const currentGroupIdentifier = this.getCurrentGroupIdentifier();
        const currentTasksGroup = this.getTasksGroup(currentGroupIdentifier);

        const filteredTasks = viewController
        .filter(
            currentTasksGroup, 
            viewState.priorityHigh, 
            viewState.priorityMedium,
            viewState.priorityNormal, 
            viewState.includeOnGoing, 
            viewState.includeCompleted, 
            viewState.includeOverdue
        );

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