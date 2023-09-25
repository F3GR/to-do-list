import { NUM_PROJECTS_PAGE, NUM_TASKS_PAGE } from '../utils';
import { ERR_CONTROLLER } from './errors-text';

const pagesController = (numTasksPerPage) => {
    return {
        movePageForward: (currentPage, listArr) => {
            if (typeof currentPage !== 'number') {
                throw new Error(ERR_CONTROLLER.NUM);
            }
            if (!Array.isArray(listArr)) {
                throw new Error(ERR_CONTROLLER.LIST);
            }

            if (currentPage < pagesController(numTasksPerPage).pagesTotal(listArr)) {
                currentPage++;
            }
            const newPage = pagesController(numTasksPerPage).getPageItems(currentPage, listArr);
            return { newPageNumber: currentPage, newPage };
        },
        movePageBackwards: (currentPage, listArr) => {
            if (typeof currentPage !== 'number') {
                throw new Error(ERR_CONTROLLER.NUM);
            }
            if (!Array.isArray(listArr)) {
                throw new Error(ERR_CONTROLLER.LIST);
            }

            if (currentPage > 1) {
                currentPage--;
            }   
            const newPage = pagesController(numTasksPerPage).getPageItems(currentPage, listArr);
            return { newPageNumber: currentPage, newPage };
        },
        getPageItems: (currentPage, listArr) => {
            const startIndex = (currentPage - 1) * numTasksPerPage;
            const endIndex = startIndex + numTasksPerPage;
            return listArr.slice(startIndex, endIndex);
        },
        pagesTotal: (listArr) => Math.ceil(listArr.length / numTasksPerPage),
    };
};

export const projectsPageController = pagesController(NUM_PROJECTS_PAGE); 
export const tasksPageController = pagesController(NUM_TASKS_PAGE); 