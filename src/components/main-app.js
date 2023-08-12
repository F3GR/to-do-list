import { renderMainPage } from './dom-main-page.js';
import { addListenersSidebar } from './group/event-listeners.js';
import { addListenersViewOptions } from './view-options/event-listeners.js';
import { addListenersManageProjects } from './project/event-listeners.js';
import { addListenersManageTasks } from './task/event-listeners.js';
import { projectsController } from './project/controller.js';
import { tasksController } from './task/controller.js';
import { groupsController } from './group/controller.js';
import { viewController } from './view-options/controller.js';
import { localStorageController } from './controller-local-storage.js';

import { renderProject } from './project/dom.js';
import { renderTask } from './task/dom.js';
import { renderFilterOptionsMenu } from './view-options/dom.js';
import { applySavedViewState } from './view-options/dom.js';

import { STANDARD_GROUPS } from './utils.js';
import { projectExample, taskExample1, taskExample2 } from './examples.js';

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

        addListenersSidebar();
        addListenersManageProjects();
        addListenersViewOptions(savedState);
        addListenersManageTasks();
        
        let { projectsList, listStored } = localStorageController.getProjectsList();
        if (!listStored) {
            projectsController.resetId();
            tasksController.resetId();
            application.createNewProject(projectExample);
            application.createNewTask(taskExample1);
            application.createNewTask(taskExample2);

            const { projectsList: newProjectsList, listStored } = localStorageController.getProjectsList();
            projectsList = newProjectsList;
        }
        console.log('Before forEach:', projectsList);
        projectsList.forEach((project) => renderProject(project));

        const taskGroup = application.applyViewOptions(savedState);
        if (!taskGroup) {
            alert('Error: saved tasks can\'t be rendered (no saved tasks / view options)');
            return;
        }  
        taskGroup.forEach((task) => renderTask(task));
    }

    createNewProject = (inputNewProject) => {
        const { projectsList } = localStorageController.getProjectsList();
        console.log(`Before creating a new project (project List): ${localStorage.getItem(`TrackIt: projects-list`)}`);

        const newProjectsList = projectsController.createNew(projectsList, inputNewProject);
        const newProject = newProjectsList[newProjectsList.length - 1];
        console.log(`New project: ${newProject}`);

        localStorageController.setProjectsList(newProjectsList);
        localStorageController.addTaskList(newProject.id);
        console.log(`After (project List): ${localStorage.getItem(`TrackIt: projects-list`)}`);
        console.log(`After (new task List): ${localStorage.getItem(`TrackIt: ${newProject.id}`)}`);
        return newProject;
    }

    editProject = (inputEditedProject) => {
        const { projectsList } = localStorageController.getProjectsList();
        console.log(`Before (editing): ${localStorage.getItem(`TrackIt: projects-list`)}`);
        const { editedProjectsList, editedProject } = projectsController.edit(projectsList, inputEditedProject);
        console.log(`Edited project: ${editedProject}`);

        localStorageController.setProjectsList(editedProjectsList);

        const currentTasksList = localStorageController.getTasksListByProjectId(editedProject.id);
        const editedTasksList = tasksController.updateProjectName(currentTasksList, editedProject.name);

        localStorageController.setTasksListByProjectId(editedProject.id, editedTasksList);
        console.log(`After: ${localStorage.getItem(`TrackIt: projects-list`)}`);
        return editedProject;
    }

    removeProject = (projectId) => {
        const { projectsList } = localStorageController.getProjectsList();
        console.log(`Before deleting a project (project List): ${localStorage.getItem(`TrackIt: projects-list`)}`);
        const { editedProjectsList, removedId } = projectsController.remove(projectsList, projectId);
        console.log(`Removed task List: ${localStorage.getItem(`TrackIt: ${removedId}`)}`);

        localStorageController.removeTaskList(removedId);
        localStorageController.setProjectsList(editedProjectsList);
        console.log(`After: ${localStorage.getItem(`TrackIt: projects-list`)}`);
        return true;
    }
    
    createNewTask = (inputNewTask) => {
        const { projectId } = inputNewTask;
        const projectName = localStorageController.getProjectName(projectId);

        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const { newTasksList, newTask } = tasksController.createNew(currentTasksList, projectName, inputNewTask);
        console.log(`Created task: ${newTask}`);

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

        localStorageController.setTasksListByProjectId(projectId, editedTasksList);
        console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        return editedTask;
    }

    toggleTaskStatus = (projectId, taskId) => {
        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const { editedTaskList, editedStatus } = tasksController.toggleTaskStatus(currentTasksList, taskId);

        localStorageController.setTasksListByProjectId(projectId, editedTaskList);
        console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        return editedStatus;
    }

    removeTask = (projectId, taskId) => {
        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const { editedTaskList, removed } = tasksController.remove(currentTasksList, taskId);

        localStorageController.setTasksListByProjectId(projectId, editedTaskList);
        console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        return removed;
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
        const { newGroup, newGroupIdentifier } = application.getTasksGroup(currentGroupIdentifier);

        const filteredTasks = viewController
        .filter(
            newGroup, 
            viewState
        );

        const filteredSortedTasks = viewController.sort(filteredTasks, viewState);
        return filteredSortedTasks;
    }

}

export const application = new Application();