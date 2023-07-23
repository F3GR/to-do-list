import { renderMainPage } from './dom-main-page.js';
import { addListenersSidebar } from './group/event-listeners-sidebar.js';
import { addListenersViewOptions } from './view-options/event-listeners-view-options.js';
import { addListenersManageProjects } from './project/event-listeners-project-menu';
import { addListenersManageTasks } from './task/event-listeners-task-menu.js';
import { projectsController } from './project/controller-projects.js';
import { tasksController } from './task/controller-tasks.js';
import { groupsController } from './group/controller-groups.js';
import { viewController } from './view-options/controller-view-options.js';
import { localStorageController } from '../../controller-local-storage.js';

import { renderProject } from './project/dom-project.js';
import { renderTask } from './task/dom-task.js';
import { renderFilterOptionsMenu } from './view-options/dom-view-options-menu.js';

class Application {
    constructor() {
        if (Application.instance) {
            return Application.instance;
        }
        Application.instance = this;
    }

    start = () => {
        const savedState = localStorageController.getViewState();
        const taskGroup = this.updateView(savedState);
        const projectList = localStorageController.getProjectsList();

        renderMainPage();
        renderFilterOptionsMenu(savedState);
        addListenersViewOptions(savedState);
        addListenersSidebar();
        addListenersManageProjects();
        addListenersManageTasks();
        
        if (projectList) {
            projectList.forEach((project) => {
                renderProject(project.name, project.iconURL, project.id);
            });
        }

        if (taskGroup) {
            taskGroup.forEach((task) => {
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

    createNewProject = (newName, newIconURL) => {
        const currentProjectList = localStorageController.getProjectsList();
        console.log(`Before creating a new project (project List): ${localStorage.getItem(`TrackIt: project-list`)}`);
        const newProject = projectsController.createNew(currentProjectList, newName, newIconURL);
        console.log(`New project: ${newProject}`);

        if (newProject) {
            currentProjectList.push(newProject);
            localStorageController.setProjectsList(currentProjectList);

            localStorage.setItem(`TrackIt: ${newProject.id}`, `[]`);
            console.log(`After (project List): ${localStorage.getItem(`TrackIt: project-list`)}`);
            console.log(`After (new task List): ${localStorage.getItem(`TrackIt: ${newProject.id}`)}`);
        }
        return newProject;
    }

    editProject = (projectId, editedName, editedIconURL) => {
        const currentProjectList = localStorageController.getProjectsList();
        console.log(`Before (editing): ${localStorage.getItem(`TrackIt: project-list`)}`);
        const editedProject = projectsController.edit(currentProjectList, projectId, editedName, editedIconURL);
        console.log(`Edited project: ${editedProject}`);

        if (editedProject) {
            currentProjectList[editedProject.editedProjectIndex] = editedProject.project;
            localStorageController.setProjectsList(currentProjectList);
            console.log(`After: ${localStorage.getItem(`TrackIt: project-list`)}`);
        }
        return editedProject.project;
    }

    removeProject = (projectId) => {
        const currentProjectList = localStorageController.getProjectsList();
        console.log(`Before deleting a project (project List): ${localStorage.getItem(`TrackIt: project-list`)}`);
        const removedProjectIndex = projectsController.remove(currentProjectList, projectId);
        console.log(`Removed task List: ${localStorage.getItem(`TrackIt: ${currentProjectList[removedProjectIndex].id}`)}`);
        
        if (removedProjectIndex !== null || 
            removedProjectIndex !== undefined ||
            removedProjectIndex !== "undefined") {

            localStorage.removeItem(`TrackIt: ${currentProjectList[removedProjectIndex].id}`);
            currentProjectList.splice(removedProjectIndex, 1);
            localStorageController.setProjectsList(currentProjectList);

            console.log(`After: ${localStorage.getItem(`TrackIt: project-list`)}`);
            return true;
        }
        return false;
    }
    
    createNewTask = (projectId, newTitle, newDueDate, newPriority, newDescription, newNotes) => {
        const projectName = localStorageController
                                .getProjectsList()
                                .find((project) => project.id === projectId)
                                .name;

        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const newTask = tasksController.createNew(projectId, projectName, currentTasksList, newTitle, newDueDate, newPriority, newDescription, newNotes);
        console.log(`Created task: ${newTask}`);

        if (newTask) {
            currentTasksList.push(newTask);
            localStorageController.setTasksListByProjectId(projectId, currentTasksList);
            console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
            return newTask;
        }
        return false;
    }

    editTask = (projectId, taskId, editedTitle, editedDueDate, editedPriority, editedDescription, editedNotes) => {
        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const editedTask = tasksController.edit(currentTasksList, taskId, editedTitle, editedDueDate, editedPriority, editedDescription, editedNotes);
        console.log(`Edited task: ${editedTask}`);

        if (editedTask) {
            currentTasksList[editedTask.taskIndex] = editedTask.task;
            localStorageController.setTasksListByProjectId(projectId, currentTasksList);
            console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
            return editedTask.task;
        }
        return false;
    }

    toggleTaskStatus = (projectId, taskId) => {
        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const taskWithNewStatus = tasksController.toggleTaskStatus(currentTasksList, taskId);
        if (taskWithNewStatus) {
            currentTasksList[taskWithNewStatus.taskIndex] = taskWithNewStatus.task;
            localStorageController.setTasksListByProjectId(projectId, currentTasksList);
            console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
            return taskWithNewStatus.task.status;
        }
        return false;
    }

    removeTask = (projectId, taskId) => {
        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const removedTaskIndex = tasksController.remove(currentTasksList, taskId);

        if (removedTaskIndex !== null || 
            removedTaskIndex !== undefined ||
            removedTaskIndex !== "undefined") {

            currentTasksList.splice(removedTaskIndex, 1);
            localStorageController.setTasksListByProjectId(projectId, currentTasksList);
            console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
            return true;
        }
    }

    getTasksGroup = (groupIdentifier) => {
        const standardGroups = localStorageController.getStandardGroups();
        let newGroup;
        if (standardGroups.includes(groupIdentifier)) {
            const allTasks = localStorageController.getAllTasks();
            newGroup = groupsController.getTaskListByGroup(allTasks, groupIdentifier);
        } else {
            newGroup = localStorageController.getTasksListByProjectId(groupIdentifier);
        }
        console.log(`Selected group: ${newGroup}`);

        if (newGroup) {
            localStorageController.setCurrentGroupIdentifier(groupIdentifier);
            return newGroup;
        }
        return false;
    }

    updateView = (viewState) => {
        localStorageController.setViewState(viewState);
        const currentGroupIdentifier = localStorageController.getCurrentGroupIdentifier();
        const currentTasksGroup = this.getTasksGroup(currentGroupIdentifier);

        const filteredTasks = viewController
        .filter(
            currentTasksGroup, 
            viewState.flagIncludeHigh, 
            viewState.flagIncludeMedium,
            viewState.flagIncludeNormal, 
            viewState.flagIncludeOnGoing, 
            viewState.flagIncludeCompleted, 
            viewState.flagIncludeOverdue
        );

        const filteredSortedTasks = viewController.sort(filteredTasks, viewState.sortBy, viewState.ascendingOrder);

        if (filteredSortedTasks) {
            return filteredSortedTasks;
        }
        return false;
    }

}

export const application = new Application();