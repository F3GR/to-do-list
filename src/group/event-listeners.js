import {
  isHTMLElement, isPressedKey, showErrorModal,
} from '../utils';
import { ERR_EVENTS } from './errors-text';
import { handleGroupSelection } from './handlers';

export function addListenersSidebar(application) {
  const sidebarIcon = document.querySelector('header > .sidebar-icon');
  const sidebar = document.querySelector('aside');
  const sidebarCover = document.querySelector('.sidebar-cover');
  const standardGroups = document.querySelector('.bar-types');
  const projectGroups = document.querySelector('.projects-list');

  if (!isHTMLElement(sidebarIcon)
        || !isHTMLElement(sidebar)
        || !isHTMLElement(sidebarCover)
        || !isHTMLElement(standardGroups)
        || !isHTMLElement(projectGroups)
  ) {
    showErrorModal(ERR_EVENTS.SIDEBAR_ELEMENTS);
    return;
  }

  sidebarIcon.addEventListener('click', (e) => handleSidebarToggle(e));
  function handleSidebarToggle(e) {
    if (isPressedKey(e)) {
      sidebar.classList.toggle('shown');
      sidebarCover.classList.toggle('shown');
    }
  }

  standardGroups.addEventListener('click', (e) => handleGroupSelection(e, application));
  projectGroups.addEventListener('click', (e) => handleGroupSelection(e, application));
  projectGroups.addEventListener('keydown', (e) => handleGroupSelection(e, application));
}
