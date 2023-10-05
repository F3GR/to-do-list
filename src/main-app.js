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

import { STANDARD_GROUPS, DEFAULT_PAGE, DEFAULT_GROUP, isReal } from './utils.js';
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

            application.createNewProject(projectExample, DEFAULT_PAGE);
            application.createNewTask(taskExample1, DEFAULT_PAGE);
            application.createNewTask(taskExample2, DEFAULT_PAGE);

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
        renderTasksPageNav(DEFAULT_PAGE, tasksPageController.pagesTotal(defaultGroup));
        
        const defaultTasksFirstPage = tasksPageController.getPageItems(DEFAULT_PAGE, defaultFilteredSortedGroup);
        renderGroup(defaultTasksFirstPage, defaultGroupId);

        const focusObservers = initializeFocusModules();
    }

    createNewProject = (inputNewProject, currentProjectsPage) => {
        const { projectsList } = localStorageController.getProjectsList();
        console.log('Before creating a new project (project List):', localStorage.getItem(`TrackIt: projects-list`));

        const currentPageLength = projectsPageController.getPageItems(currentProjectsPage, projectsList).length;

        const newProjectsList = projectsController.createNew(projectsList, inputNewProject);
        if (newProjectsList === -1) {
            return -1;
        }

        const newLength = newProjectsList.length;
        const newProject = newProjectsList[newLength - 1];
        console.log('New project:', newProject);

        localStorageController.setProjectsList(newProjectsList);
        localStorageController.addTaskList(newProject.id);
        console.log('After (project List):', localStorage.getItem(`TrackIt: projects-list`));
        console.log('After (new task List):', localStorage.getItem(`TrackIt: ${newProject.id}`));

        renderProjectsCount(newLength);
        renderProjectsPageNav(currentProjectsPage, projectsPageController.pagesTotal(newProjectsList));

        return { newProject, currentPageLength };
    }

    editProject = (inputEditedProject) => {
        const { projectsList } = localStorageController.getProjectsList();
        console.log('Before (editing):', localStorage.getItem(`TrackIt: projects-list`));
    
        const result = projectsController.edit(projectsList, inputEditedProject);
        if (result === -1) {
            return -1;
        }
        const { editedProjectsList, editedProject } = result;

        console.log('Edited project:', editedProject);
        localStorageController.setProjectsList(editedProjectsList);

        const currentTasksList = localStorageController.getTasksListByProjectId(editedProject.id);
        const editedTasksList = tasksController.updateProjectName(currentTasksList, editedProject.name);


        localStorageController.setTasksListByProjectId(editedProject.id, editedTasksList);
        console.log('After:', localStorage.getItem('TrackIt: projects-list'));

        return editedProject;
    }

    removeProject = (projectId, currentProjectsPageNumber, currentProjectPageLength, groupId) => {
        let newProjectsPageNumber = currentProjectsPageNumber;
        const { projectsList } = localStorageController.getProjectsList();
        console.log('Before deleting a project (project List):', localStorage.getItem('TrackIt: projects-list'));

        if (currentProjectPageLength === 1) {
            newProjectsPageNumber--;
        }

        const { editedProjectsList, removedId } = projectsController.remove(projectsList, projectId);
        console.log('Removed task List:', localStorage.getItem(`TrackIt: ${removedId}`));
        
        localStorageController.removeTaskList(removedId);
        localStorageController.setProjectsList(editedProjectsList);
        console.log('After:', localStorage.getItem('TrackIt: projects-list'));

        const viewState = application.getViewState();
        let newFilteredSortedGroup = application
            .applyViewOptions(viewState, application.getTasksGroup(groupId));

        const newProjectsPageView = projectsPageController.getPageItems(newProjectsPageNumber, editedProjectsList);
        const newTasksPageView = tasksPageController.getPageItems(DEFAULT_PAGE, newFilteredSortedGroup);

        renderProjectsCount(editedProjectsList.length);
        renderTasksCount(newFilteredSortedGroup.length);

        renderProjectsPageNav(newProjectsPageNumber, projectsPageController.pagesTotal(editedProjectsList));
        renderTasksPageNav(DEFAULT_PAGE, tasksPageController.pagesTotal(newFilteredSortedGroup));

        return { newTasksPageView, newProjectsPageView };
    }
    
    createNewTask = (inputNewTask, currentTasksPage) => {
        const { projectId } = inputNewTask;
        const projectName = localStorageController.getProjectName(projectId);

        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log('Before tasklist:', localStorage.getItem(`TrackIt: ${projectId}`));
        const currentPageLength = tasksPageController.getPageItems(currentTasksPage, currentTasksList).length;

        const result = tasksController.createNew(currentTasksList, projectName, inputNewTask);
        if (result === -1) {
            return -1;
        }
        const { newTasksList, newTask } = result;

        console.log('Created task:', newTask);

        localStorageController.setTasksListByProjectId(projectId, newTasksList);
        console.log('After tasklist:', localStorage.getItem(`TrackIt: ${projectId}`));

        renderTasksCount(newTasksList.length);
        renderTasksPageNav(currentTasksPage, tasksPageController.pagesTotal(newTasksList));

        return { newTask, currentPageLength };
    }

    editTask = (inputEditedTask) => {
        const projectId = inputEditedTask.projectId;

        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log('Before tasklist:', localStorage.getItem(`TrackIt: ${projectId}`));
        const result = tasksController.edit(currentTasksList, inputEditedTask);
        if (result === -1) {
            return -1;
        }
        const { editedTasksList, editedTask } = result;

        console.log('Edited task:', editedTask);

        localStorageController.setTasksListByProjectId(projectId, editedTasksList);
        console.log('After tasklist:', localStorage.getItem(`TrackIt: ${projectId}`));

        return editedTask;
    }

    toggleTaskStatus = (projectId, taskId) => {
        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log('Before tasklist:', localStorage.getItem(`TrackIt: ${projectId}`));
        const { editedTasksList, editedStatus } = tasksController.toggleTaskStatus(currentTasksList, taskId);

        localStorageController.setTasksListByProjectId(projectId, editedTasksList);
        console.log('After tasklist:', localStorage.getItem(`TrackIt: ${projectId}`));

        return editedStatus;
    }

    removeTask = (projectId, taskId, currentTasksPage, currentTasksPageLength) => {    
        let newTasksPageNumber = currentTasksPage;
        const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
        console.log('Before tasklist:', localStorage.getItem(`TrackIt: ${projectId}`));

        if (currentTasksPageLength === 1) {
            newTasksPageNumber--;
        }

        const { editedTaskList, removed } = tasksController.remove(currentTasksList, taskId);

        localStorageController.setTasksListByProjectId(projectId, editedTaskList);
        console.log('After tasklist:', localStorage.getItem(`TrackIt: ${projectId}`));

        const viewState = application.getViewState();
        let newFilteredSortedGroup = application
            .applyViewOptions(viewState, null, newTasksPageNumber);

        const newTasksPageView = tasksPageController.getPageItems(newTasksPageNumber, newFilteredSortedGroup);

        renderTasksCount(newFilteredSortedGroup.length);
        renderTasksPageNav(newTasksPageNumber, tasksPageController.pagesTotal(editedTaskList));

        return { newTasksPageView };
    }

    getTasksGroup = (newGroupIdentifier) => {     
        let newGroup;

        if (Object.values(STANDARD_GROUPS).includes(newGroupIdentifier)) {
            const allTasks = localStorageController.getAllTasks();
            newGroup = groupsController.getTaskListByGroup(allTasks, newGroupIdentifier);
        } else {
            newGroup = localStorageController.getTasksListByProjectId(newGroupIdentifier);
        }

        console.log('Selected group:', newGroup);
        localStorageController.setCurrentGroupIdentifier(newGroupIdentifier);

        return newGroup;
    }

    getViewState = () => localStorageController.getViewState();

    applyViewOptions = (viewState, tasksGroup, currentTasksPage) => {
        localStorageController.setViewState(viewState);
        if (!tasksGroup) {
            tasksGroup = application.getTasksGroup(localStorageController.getCurrentGroupIdentifier());
        }

        const filteredTasks = viewController.filter(tasksGroup, viewState);
        const filteredSortedTasks = viewController.sort(filteredTasks, viewState);

        renderTasksCount(filteredSortedTasks.length);

        let tasksPage;
        if (!currentTasksPage) {
            tasksPage = tasksPageController.getPageItems(DEFAULT_PAGE, filteredSortedTasks);
            renderTasksPageNav(DEFAULT_PAGE, tasksPageController.pagesTotal(filteredSortedTasks));
            return tasksPage;
        } 
        
        renderTasksPageNav(currentTasksPage, tasksPageController.pagesTotal(filteredSortedTasks));
        return filteredSortedTasks;
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
        const currentFilteredSortedGroup = application.applyViewOptions(application.getViewState(), null, tasksPageNumber);
        const { newPageNumber, newPage } = tasksPageController.movePageForward(tasksPageNumber, currentFilteredSortedGroup);
        renderTasksPageNav(newPageNumber, tasksPageController.pagesTotal(currentFilteredSortedGroup));
        return { newPage, newPageNumber };
    }
    
    moveTasksPageBackwards = (tasksPageNumber) => {
        const currentFilteredSortedGroup = application.applyViewOptions(application.getViewState(), null, tasksPageNumber);
        const { newPageNumber, newPage } = tasksPageController.movePageBackwards(tasksPageNumber, currentFilteredSortedGroup);
        renderTasksPageNav(newPageNumber, tasksPageController.pagesTotal(currentFilteredSortedGroup));
        return { newPage, newPageNumber };
    }
}

export const application = new Application();