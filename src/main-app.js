import { renderMainPage } from './main-page/dom-main-page.js';
import { renderProject } from './project/dom.js';
import { applySavedViewState, renderFilterOptionsMenu } from './view-options/dom.js';
import { renderGroup } from './group/dom.js';
import { renderProjectsCount } from './totals/dom-projects-count.js';
import { renderTasksCount } from './totals/dom-tasks-count.js';
import { renderProjectsPageNav } from './pages-navs/projects-pages-dom.js';
import { renderTasksPageNav } from './pages-navs/tasks-pages-dom.js';

import { addListenersSidebar } from './group/event-listeners.js';
import { addListenersViewOptions } from './view-options/event-listeners.js';
import { addListenersManageProjects } from './project/event-listeners.js';
import { addListenersManageTasks } from './task/event-listeners.js';
import { addListenersProjectsPagesNav } from './pages-navs/event-listeners-projects.js';
import { addListenersTasksPagesNav } from './pages-navs/event-listeners-tasks.js';

import { projectsController } from './project/controller.js';
import { tasksController } from './task/controller.js';
import { groupsController } from './group/controller.js';
import { viewController } from './view-options/controller.js';
import { localStorageController } from './controller-local-storage.js';
import { projectsPageController, tasksPageController } from './pages-navs/pages-controller.js';
import { initializeFocusModules } from './main-page/mutationObservers.js';

import { STANDARD_GROUPS, DEFAULT_PAGE, DEFAULT_GROUP } from './utils.js';
import { projectExample, taskExample1, taskExample2 } from './main-page/examples.js';

class Application {
    constructor() {
        if (Application.instance) {
            return Application.instance;
        }
        Application.instance = this;
    }

    start = () => {
        renderMainPage();
    
        addListenersSidebar();
        addListenersManageProjects();
        addListenersViewOptions();
        addListenersManageTasks();
        addListenersProjectsPagesNav();
        addListenersTasksPagesNav();
        applySavedViewState();
        
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
        
        renderProjectsCount(projectsList.length);
        
        console.log('Before forEach:', projectsList);

        projectsPageController.getPageItems(DEFAULT_PAGE, projectsList)
        .forEach((project) => renderProject(project));

        renderProjectsPageNav(DEFAULT_PAGE, projectsPageController.pagesTotal(projectsList));
        
        localStorageController.setCurrentGroupIdentifier(DEFAULT_GROUP);
        const defaultGroupId = localStorageController.getCurrentGroupIdentifier();
        const defaultGroup = application.getTasksGroup(defaultGroupId);
        const defaultFilteredSortedGroup = application.applyViewOptions(
            localStorageController.getViewState(), 
            defaultGroup
        );

        renderTasksCount(defaultGroup.length);
        
        const defaultTasksFirstPage = tasksPageController.getPageItems(DEFAULT_PAGE, defaultFilteredSortedGroup);
        renderGroup(defaultTasksFirstPage, defaultGroupId);
        
        renderTasksPageNav(DEFAULT_PAGE, tasksPageController.pagesTotal(defaultGroup));

        const focusObservers = initializeFocusModules();
    }

    createNewProject = (inputNewProject) => {
        const { projectsList } = localStorageController.getProjectsList();
        console.log(`Before creating a new project (project List): ${localStorage.getItem(`TrackIt: projects-list`)}`);

        const oldLength = projectsList.length;

        const newProjectsList = projectsController.createNew(projectsList, inputNewProject);
        if (newProjectsList === -1) {
            return -1;
        }

        const newLength = newProjectsList.length;

        const newProject = newProjectsList[newLength - 1];
        console.log(`New project: ${newProject}`);

        localStorageController.setProjectsList(newProjectsList);
        localStorageController.addTaskList(newProject.id);
        console.log(`After (project List): ${localStorage.getItem(`TrackIt: projects-list`)}`);
        console.log(`After (new task List): ${localStorage.getItem(`TrackIt: ${newProject.id}`)}`);

        if (oldLength !== newLength) {
            renderProjectsCount(newLength);
        }

        return newProject;
    }

    editProject = (inputEditedProject) => {
        const { projectsList } = localStorageController.getProjectsList();
        console.log(`Before (editing): ${localStorage.getItem(`TrackIt: projects-list`)}`);
    
        const result = projectsController.edit(projectsList, inputEditedProject);
        if (result === -1) {
            return -1;
        }
        const { editedProjectsList, editedProject } = result;

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

        const oldLength = projectsList.length;

        const oldFilteredSortedGroup = application.applyViewOptions(
            localStorageController.getViewState(), 
            application.getTasksGroup(localStorageController.getCurrentGroupIdentifier())
        );

        const { editedProjectsList, removedId } = projectsController.remove(projectsList, projectId);
        console.log(`Removed task List: ${localStorage.getItem(`TrackIt: ${removedId}`)}`);
        const projectsListLength = editedProjectsList.length;

        const newLength = editedProjectsList.length;

        localStorageController.removeTaskList(removedId);
        localStorageController.setProjectsList(editedProjectsList);
        console.log(`After: ${localStorage.getItem(`TrackIt: projects-list`)}`);
        
        if (oldLength !== newLength) {
            renderProjectsCount(newLength);
        }

        return projectsListLength;
    }
    
    createNewTask = (inputNewTask) => {
        const { projectId } = inputNewTask;
        const projectName = localStorageController.getProjectName(projectId);

        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const result = tasksController.createNew(currentTasksList, projectName, inputNewTask);
        if (result === -1) {
            return -1;
        }
        const { newTasksList, newTask } = result;

        console.log(`Created task: ${newTask}`);

        localStorageController.setTasksListByProjectId(projectId, newTasksList);
        console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);

        if (currentTasksList.length !== newTasksList.length) {
            renderTasksCount(newTasksList.length);
        }

        return newTask;
    }

    editTask = (inputEditedTask) => {
        const projectId = inputEditedTask.projectId;

        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const result = tasksController.edit(currentTasksList, inputEditedTask);
        if (result === -1) {
            return -1;
        }
        const { editedTasksList, editedTask } = result;

        console.log(`Edited task: ${editedTask}`);

        localStorageController.setTasksListByProjectId(projectId, editedTasksList);
        console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);

        return editedTask;
    }

    toggleTaskStatus = (projectId, taskId) => {
        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const { editedTasksList, editedStatus } = tasksController.toggleTaskStatus(currentTasksList, taskId);

        localStorageController.setTasksListByProjectId(projectId, editedTasksList);
        console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);

        return editedStatus;
    }

    removeTask = (projectId, taskId) => {    
        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log(`Before tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);
        const { editedTaskList, removed } = tasksController.remove(currentTasksList, taskId);

        localStorageController.setTasksListByProjectId(projectId, editedTaskList);
        console.log(`After tasklist: ${localStorage.getItem(`TrackIt: ${projectId}`)}`);

        if (currentTasksList.length !== editedTaskList.length) {
            renderTasksCount(editedTaskList.length);
        }

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

        return newGroup;
    }

    getViewState = () => localStorageController.getViewState();

    applyViewOptions = (viewState, tasksGroup) => {
        localStorageController.setViewState(viewState);
        if (!tasksGroup) {
            tasksGroup = application.getTasksGroup(localStorageController.getCurrentGroupIdentifier());
        }

        const filteredTasks = viewController.filter(tasksGroup, viewState);
        const filteredSortedTasks = viewController.sort(filteredTasks, viewState);

        renderTasksCount(filteredSortedTasks.length);

        const tasksFirstPage = tasksPageController.getPageItems(DEFAULT_PAGE, filteredSortedTasks);
        renderTasksPageNav(DEFAULT_PAGE, tasksPageController.pagesTotal(filteredSortedTasks));

        return tasksFirstPage;
    }

    moveProjectsPageForward = (projectsPageNumber) => {
        const { projectsList } = localStorageController.getProjectsList();
        const { newPageNumber, newPage } = projectsPageController.movePageForward(projectsPageNumber, projectsList);
        renderProjectsPageNav(newPageNumber, projectsPageController.pagesTotal(projectsList));
        return { newPage, newPageNumber };
    }

    moveProjectsPageBackwards = (projectsPageNumber) => {
        const { projectsList } = localStorageController.getProjectsList();
        const { newPageNumber, newPage }  = projectsPageController.movePageBackwards(projectsPageNumber, projectsList);
        renderProjectsPageNav(newPageNumber, projectsPageController.pagesTotal(projectsList));
        return { newPage, newPageNumber };
    }

    moveTasksPageForward = (tasksPageNumber) => {
        const currentGroup = application.getTasksGroup(localStorageController.getCurrentGroupIdentifier());
        const { newPageNumber, newPage } = tasksPageController.movePageForward(tasksPageNumber, currentGroup);
        renderTasksPageNav(newPageNumber, tasksPageController.pagesTotal(currentGroup));
        return { newPage, newPageNumber };
    }
    
    moveTasksPageBackwards = (tasksPageNumber) => {
        const currentGroup = application.getTasksGroup(localStorageController.getCurrentGroupIdentifier());
        const { newPageNumber, newPage } = tasksPageController.movePageBackwards(tasksPageNumber, currentGroup);
        renderTasksPageNav(newPageNumber, tasksPageController.pagesTotal(currentGroup));
        return { newPage, newPageNumber };
    }
}

export const application = new Application();