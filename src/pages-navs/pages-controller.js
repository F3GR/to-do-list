const pagesController = (numTasksPerPage) => {
    return {
        movePageForward: (currentPage, tasksList) => {
            if (currentPage < pagesTotal(tasksList)) {
                currentPage++;
            }
            return getPageItems(currentPage, tasksList);
        },
        movePageBackwards: (currentPage, tasksList) => {
            if (currentPage > 1) {
                currentPage--;
            }   
            return getPageItems(currentPage, tasksList);
        },
        getPageItems: (currentPage, tasksList) => {
            const startIndex = (currentPage - 1) * numTasksPerPage;
            const endIndex = startIndex + numTasksPerPage;
            return tasksList.slice(startIndex, endIndex);
        },
        pagesTotal: (tasksList) => Math.ceil(tasksList.length / numTasksPerPage),
    };
};

export const projectsPageController = pagesController(3); 
export const tasksPageController = pagesController(6); 