import { getTasksBarFooterNodes } from './static-selectors';
import { handleMovePrevTasksPage, handleMoveNextTasksPage } from './tasks-handlers';

export function addListenersTasksPagesNav(application) {
  const { prevPageBtn, nextPageBtn } = getTasksBarFooterNodes();

  prevPageBtn.addEventListener('click', (e) => handleMovePrevTasksPage(e, application));
  nextPageBtn.addEventListener('click', (e) => handleMoveNextTasksPage(e, application));
}
