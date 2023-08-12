export const localStorageController = {
    getProjectsList: () => {
        let projectsList = localStorage.getItem('TrackIt: projects-list');
        let listStored = true;
        
        if (!projectsList) {
            projectsList = [];
            localStorageController.setProjectsList(projectsList);
            listStored = false;
            return { projectsList, listStored };
        }
        projectsList = JSON.parse(projectsList);
        return { projectsList, listStored };
    },
    setProjectsList: (projectsList) => localStorage.setItem('TrackIt: projects-list', JSON.stringify(projectsList)),

    addTaskList: (newProjectId) => localStorage.setItem(`TrackIt: ${newProjectId}`, JSON.stringify([])),
    removeTaskList: (projectId) => localStorage.removeItem(`TrackIt: ${projectId}`),

    getTasksListByProjectId: (projectId) => {
        const storedTaskList = localStorage.getItem(`TrackIt: ${projectId}`);
        return JSON.parse(storedTaskList);
    },
    setTasksListByProjectId: (projectId, tasksList) => localStorage.setItem(`TrackIt: ${projectId}`, JSON.stringify(tasksList)),

    getAllTasks: () => {
        const { projectsList } = localStorageController.getProjectsList();
        const arrayOfProjectIds = projectsList.map(({ id, name, iconURL }) => ({ id }));
        console.log(`Array of project Id's: ${arrayOfProjectIds}`);

        const allTasksList = arrayOfProjectIds.flatMap(
            ({ id }) => Object.values(localStorageController.getTasksListByProjectId(id))
        );
        console.log(`Array of all tasks: ${allTasksList}`);
        return allTasksList;
    },

    getProjectName: (projectId) => {
        const { projectsList } = localStorageController.getProjectsList();
        const project = projectsList.find((project) => Number(project.id) === Number(projectId));
        return project.name;
    },

    getCurrentGroupIdentifier: () => {
        const storedCurrentGroup = localStorage.getItem('TrackIt: current-group');
        if (!storedCurrentGroup) {
            const newCurrentGroup = 'all';
            return newCurrentGroup;
        }
        return storedCurrentGroup;
    },
    setCurrentGroupIdentifier: (newGroupIdentifier) => localStorage.setItem('TrackIt: current-group', newGroupIdentifier),

    getViewState: () => {
        const storedViewState = localStorage.getItem('TrackIt: view-state');
        if (!storedViewState) {
            const newViewState = {
                flagIncludeHigh: true,
                flagIncludeMedium: true,
                flagIncludeNormal: true,
                flagIncludeOnGoing: true,
                flagIncludeCompleted: true,
                flagIncludeOverdue: true,
                sortBy: 'date',
                ascendingOrder: true,
            }
            return newViewState;
        }
        return JSON.parse(storedViewState);
    },
    setViewState: (viewState) => localStorage.setItem('TrackIt: view-state', JSON.stringify(viewState)),
};