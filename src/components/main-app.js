import { renderMainPage } from './dom-main-page.js';
import { addListenersSidebar } from './group/event-listeners-sidebar.js';
import { addListenersViewOptions } from './view-options/event-listeners-view-options.js';
import { addListenersManageProjects } from './project/event-listeners-project-menu';
import { addListenersManageTasks } from './task/event-listeners-task-menu.js';
import { projectsController } from './project/controller-projects.js';
import { tasksController } from './task/controller-tasks.js';
import { groupsController } from './group/controller-groups.js';
import { viewController } from './view-options/controller-view-options.js';
import { localStorageController } from './controller-local-storage.js';

import { renderProject } from './project/dom-project.js';
import { renderTask } from './task/dom-task.js';
import { renderFilterOptionsMenu } from './view-options/dom-view-options-menu.js';
import { applySavedViewState } from './view-options/dom-view-options-menu.js';

import { STANDARD_GROUPS } from './utils.js';

class Application {
    constructor() {
        if (Application.instance) {
            return Application.instance;
        }
        Application.instance = this;
    }

    start = () => {
        const savedState = application.getViewState();
        renderMainPage();
        renderFilterOptionsMenu();
        applySavedViewState(savedState);
        addListenersViewOptions(savedState);

        addListenersSidebar();
        addListenersManageProjects();
        addListenersManageTasks();
        
        const projectList = localStorageController.getProjectsList();
        if (!projectList) {
            alert('Error:project list wasn\'t found');
            return;
        }
        projectList.forEach((project) => renderProject(project));

        const taskGroup = this.updateView(savedState);
        if (!taskGroup) {
            alert('Error: saved tasks can\'t be rendered (no saved tasks / view options)');
            return;
        }  
        taskGroup.forEach((task) => renderTask(task));
    }

    createNewProject = (inputNewProject) => {
        const currentProjectList = localStorageController.getProjectsList();
        console.log(`Before creating a new project (project List): ${localStorage.getItem(`TrackIt: projects-list`)}`);

        const newProjectsList = projectsController.createNew(currentProjectList, inputNewProject);
        const newProject = newProjectsList[newProjectsList.length - 1];
        console.log(`New project: ${newProject}`);

        if (!newProjectsList || !newProject) {
            return false;
        }

        localStorageController.setProjectsList(newProjectsList);
        localStorageController.addTaskList(newProject.id);
        console.log(`After (project List): ${localStorage.getItem(`TrackIt: projects-list`)}`);
        console.log(`After (new task List): ${localStorage.getItem(`TrackIt: ${newProject.id}`)}`);
        return newProject;
    }

    editProject = (inputEditedProject) => {
        const currentProjectList = localStorageController.getProjectsList();
        console.log(`Before (editing): ${localStorage.getItem(`TrackIt: projects-list`)}`);
        const { editedProjectsList, editedProject } = projectsController.edit(currentProjectList, inputEditedProject);
        console.log(`Edited project: ${editedProject}`);

        if (!editedProjectsList || !editedProject) {
            return false;
        }
        localStorageController.setProjectsList(editedProjectsList);

        const currentTasksList = localStorageController.getTasksListByProjectId(editedProject.id);
        const editedTasksList = tasksController.updateProjectName(currentTasksList, editedProject.name);

        localStorageController.setTasksListByProjectId(editedProject.id, editedTasksList);
        console.log(`After: ${localStorage.getItem(`TrackIt: projects-list`)}`);
        return editedProject;
    }

    removeProject = (projectId) => {
        const currentProjectList = localStorageController.getProjectsList();
        console.log(`Before deleting a project (project List): ${localStorage.getItem(`TrackIt: projects-list`)}`);
        const { editedProjectsList, removedProjectIndex } = projectsController.remove(currentProjectList, projectId);
        console.log(`Removed task List: ${localStorage.getItem(`TrackIt: ${currentProjectList[removedProjectIndex].id}`)}`);
        
        if (!editedProjectsList || !removedProjectIndex === null || removedProjectIndex === undefined) {
            return false;
        }

        localStorageController.removeTaskList(currentProjectList[removedProjectIndex].id);
        localStorageController.setProjectsList(currentProjectList);
        console.log(`After: ${localStorage.getItem(`TrackIt: projects-list`)}`);
        return true;
    }
    
    createNewTask = (inputNewTask) => {
        const projectId = inputNewTask.projectId;
        const projectName = localStorageController
                                .getProjectsList()
                                .find((project) => project.id === Number(projectId))
                                .name;

        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const { newTasksList, newTask } = tasksController.createNew(currentTasksList, projectName, inputNewTask);
        console.log(`Created task: ${newTask}`);

        if (!newTask || !newTasksList) {
            return false;
        }

        localStorageController.setTasksListByProjectId(projectId, newTasksList);
        console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        return newTask;
    }

    editTask = (inputEditedTask) => {
        const projectId = inputEditedTask.projectId;

        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const { editedTasksList, editedTask } = tasksController.edit(currentTasksList, inputEditedTask);
        console.log(`Edited task: ${editedTask}`);

        if (!editedTasksList || !editedTask) {
            return false;
        }
        
        localStorageController.setTasksListByProjectId(projectId, editedTasksList);
        console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        return editedTask;
    }

    toggleTaskStatus = (projectId, taskId) => {
        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const { editedTaskList, editedStatus } = tasksController.toggleTaskStatus(currentTasksList, taskId);

        if (!editedTaskList || !editedStatus) {
            return false;
        }

        localStorageController.setTasksListByProjectId(projectId, editedTaskList);
        console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        return editedStatus;
    }

    removeTask = (projectId, taskId) => {
        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const editedTaskList = tasksController.remove(currentTasksList, taskId);

        if (!editedTaskList) {
            return false;
        }
        
        localStorageController.setTasksListByProjectId(projectId, editedTaskList);
        console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        return true;
    }

    getTasksGroup = (newGroupIdentifier) => {
        let newGroup;
        if (Object.values(STANDARD_GROUPS).includes(newGroupIdentifier)) {
            
            const allTasks = localStorageController.getAllTasks();
            newGroup = groupsController.getTaskListByGroup(allTasks, newGroupIdentifier);
        } else {
            newGroup = localStorageController.getTasksListByProjectId(newGroupIdentifier);
        }
        console.log(`Selected group: ${newGroup}`);

        if (!newGroup) {
            return false;
        }
        localStorageController.setCurrentGroupIdentifier(newGroupIdentifier);
        return { newGroup, newGroupIdentifier };
    }

    getViewState = () => {
        const currentViewState = localStorageController.getViewState();
        return currentViewState;
    }

    applyViewOptions = (viewState) => {
        localStorageController.setViewState(viewState);
        const currentGroupIdentifier = localStorageController.getCurrentGroupIdentifier();
        const { updatedGroup, groupIdentifier } = this.getTasksGroup(currentGroupIdentifier);

        const filteredTasks = viewController
        .filter(
            updatedGroup, 
            viewState.flagIncludeHigh, 
            viewState.flagIncludeMedium,
            viewState.flagIncludeNormal, 
            viewState.flagIncludeOnGoing, 
            viewState.flagIncludeCompleted, 
            viewState.flagIncludeOverdue
        );

        const filteredSortedTasks = viewController.sort(filteredTasks, viewState.sortBy, viewState.ascendingOrder);

        if (!filteredSortedTasks) {
            return false;
        }
        return filteredSortedTasks;
    }

}

export const application = new Application();