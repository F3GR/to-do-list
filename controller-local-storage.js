export const localStorageController = {
    getProjectsList: function() {
        const storedProjectList = localStorage.getItem('TrackIt: project-list');
        if (storedProjectList === null || 
            storedProjectList === undefined || 
            storedProjectList === "") {
          const projectList = [];
          this.setProjectsList(projectList);
          return projectList;
        }
        return JSON.parse(storedProjectList);
    },
    setProjectsList: (projectList) => localStorage.setItem('TrackIt: project-list', JSON.stringify(projectList)),  

    getTasksListByProjectId: function (projectId) {
        const storedTaskList = localStorage.getItem(`TrackIt: ${projectId}`);
        return JSON.parse(storedTaskList);
    },
    setTasksListByProjectId: (projectId, tasksList) => localStorage.setItem(`TrackIt: ${projectId}`, JSON.stringify(tasksList)),

    getAllTasks: function() {
        const currentProjectList = this.getProjectsList();
        const arrayOfProjectIds = currentProjectList.map(({ id, name, iconURL }) => ({ id }));
        console.log(`Array of project Id's: ${arrayOfProjectIds}`);

        const allTasksList = arrayOfProjectIds.flatMap(({ id }) => {
            return Object.values(this.getTasksListByProjectId(id));
        });
        console.log(`Array of all tasks: ${allTasksList}`);
        return allTasksList;
    },

    getStandardGroups: () => ['all', 'today', 'week', 'completed', 'overdue'],

    getCurrentGroupIdentifier: function() {
        const storedCurrentGroup = localStorage.getItem('TrackIt: current-group');
        if (!storedCurrentGroup) {
            const newCurrentGroup = 'all';
            return newCurrentGroup;
        }
        return storedCurrentGroup;
    },
    setCurrentGroupIdentifier: (newGroupIdentifier) => localStorage.setItem('TrackIt: current-group', newGroupIdentifier),

    getViewState: function() {
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
    setViewState: (viewState) => localStorage.setItem(`TrackIt: view-state`, JSON.stringify(viewState)),
};