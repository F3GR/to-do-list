import { getProjectsBarFooterNodes } from './static-selectors';
import { handleMovePrevProjectsPage, handleMoveNextProjectsPage } from './projects-handlers';

export function addListenersProjectsPagesNav(application) {
  const { prevPageBtn, nextPageBtn } = getProjectsBarFooterNodes();

  prevPageBtn.addEventListener('click', (e) => handleMovePrevProjectsPage(e, application));
  nextPageBtn.addEventListener('click', (e) => handleMoveNextProjectsPage(e, application));
}
