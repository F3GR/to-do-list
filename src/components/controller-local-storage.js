export const localStorageController = {
    getProjectsList: () => {
        const storedProjectList = localStorage.getItem('TrackIt: projects-list');
        return JSON.parse(storedProjectList);
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
        const currentProjectList = localStorageController.getProjectsList();
        const arrayOfProjectIds = currentProjectList.map(({ id, name, iconURL }) => ({ id }));
        console.log(`Array of project Id's: ${arrayOfProjectIds}`);

        const allTasksList = arrayOfProjectIds.flatMap(
            ({ id }) => Object.values(localStorageController.getTasksListByProjectId(id))
        );
        console.log(`Array of all tasks: ${allTasksList}`);
        return allTasksList;
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