import { getProjectNodes } from './static-selectors';
import {
  showErrorModal,
  ACTIONS_PROJECTS,
  isHTMLElement,
  isValid,
  handleExitRemoveMenu,
  isNodeList,
  isPressedKey,
} from '../utils';
import { ERR_EVENTS } from './errors-text';
import {
  removeHandler, submitHandler, exitHandler,
} from './handlers';

export function addListenersManageProjects(application) {
  const {
    projectsBar,
    form,
    exitButton,
    cancelButton,
    removeMenu,
    removeConfirm,
    optionsIconsContainer,
    allOptions,
  } = getProjectNodes();

  if (!isHTMLElement(projectsBar)
    || !isHTMLElement(form)
    || !isHTMLElement(removeMenu)
    || !isHTMLElement(removeConfirm)
    || !isHTMLElement(exitButton)
    || !isHTMLElement(cancelButton)
    || !isHTMLElement(optionsIconsContainer)
    || !isNodeList(allOptions)
  ) {
    showErrorModal(ERR_EVENTS.APPLY_EVENTS_PROJECT_MENU_RENDERING);
    return;
  }

  optionsIconsContainer.addEventListener('click', (e) => handleProjectIconSelection(e));
  optionsIconsContainer.addEventListener('keydown', (e) => handleProjectIconSelection(e));
  function handleProjectIconSelection(e) {
    if (isPressedKey(e)
            && e.target.tagName === 'DIV'
            && e.target.classList.contains('project-icon-option')
    ) {
      allOptions.forEach((optionNode) => optionNode.classList.remove('selected'));

      const inputSelected = e.target.querySelector('input');
      inputSelected.checked = true;
      e.target.classList.add('selected');
    }
  }

  projectsBar.addEventListener('click', (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    openMenuHandler(e);
  });
  projectsBar.addEventListener('keydown', (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    openMenuHandler(e);
  });
  form.addEventListener('submit', (e) => submitHandler(e, application));

  removeConfirm.addEventListener('click', (e) => handleProjectRemove(e));
  function handleProjectRemove(e) {
    if (isPressedKey(e)) {
      if (!isHTMLElement(removeMenu)) {
        showErrorModal(ERR_EVENTS.APPLY_EVENTS_PROJECT_MENU_RENDERING);
        return;
      }

      const projectAction = removeMenu.getAttribute('data-project-action');
      if (projectAction && projectAction !== 'null') {
        removeHandler(e, application);
        handleExitRemoveMenu(e);
      }
    }
  }

  exitButton.addEventListener('click', (e) => {
    if (isPressedKey(e)) {
      exitHandler(e);
    }
  });
  cancelButton.addEventListener('click', (e) => {
    if (isPressedKey(e)) {
      exitHandler(e);
    }
  });
}

const openMenuHandler = (e) => {
  if (isPressedKey(e) && e.target.tagName === 'BUTTON') {
    e.preventDefault();
    e.stopImmediatePropagation();

    const action = e.target.getAttribute('data-project-action');
    if (!isValid(action)) {
      return;
    }

    openMenu(action, e.target);
  }
};

const openMenu = (action, target) => {
  const {
    menuCover,
    menu,
    menuTitle,
    submitButton,
    removeMenu,
    removeHeading,
    removeMessage,
    inputsAllOptions,
    inputProjectName,
  } = getProjectNodes();

  if (!isHTMLElement(menu)
    || !isHTMLElement(menuCover)
    || !isHTMLElement(menuTitle)
    || !isHTMLElement(submitButton)
    || !isHTMLElement(removeMenu)
    || !isHTMLElement(removeHeading)
    || !isHTMLElement(removeMessage)
    || !isHTMLElement(inputProjectName)
    || !isNodeList(inputsAllOptions)
  ) {
    showErrorModal(ERR_EVENTS.PROJECT_MENU_SHOWING);
    return;
  }

  switch (action) {
    case ACTIONS_PROJECTS.ADD_NEW: {
      menu.setAttribute('data-project-action', action);
      menuCover.classList.add('shown');
      menu.classList.add('shown');
      menuTitle.textContent = 'Add a new project';
      submitButton.textContent = 'Add';
      break;
    }

    case ACTIONS_PROJECTS.EDIT: {
      const editedProject = target.closest('.project');
      const editedProjectId = editedProject.getAttribute('data-group-id');

      if (!isHTMLElement(editedProject) || !isValid(editedProjectId)) {
        showErrorModal(ERR_EVENTS.EDITED_PROJECT);
        return;
      }

      const projectsName = editedProject.querySelector('span').textContent;
      const projectsIconURL = editedProject.querySelector('img').getAttribute('src');
      if (!projectsName || !projectsIconURL) {
        showErrorModal(ERR_EVENTS.EDITED_PROJECT_VALUES);
        return;
      }

      let selectedInput;
      for (const input of inputsAllOptions) {
        if (input.value === projectsIconURL) {
          selectedInput = input;
          break;
        }
      }
      const div = selectedInput.closest('.project-icon-option');
      if (!selectedInput || !isHTMLElement(div)) {
        showErrorModal(ERR_EVENTS.EDITED_PROJECT_URL);
        return;
      }

      div.classList.add('selected');
      inputProjectName.value = projectsName;
      selectedInput.checked = true;

      menu.setAttribute('data-project-action', action);
      menu.setAttribute('data-group-id', editedProjectId);
      menuCover.classList.add('shown');
      menu.classList.add('shown');

      menuTitle.textContent = 'Edit the project';
      submitButton.textContent = 'Save';
      break;
    }

    case ACTIONS_PROJECTS.REMOVE: {
      const { currentGroupIcon, currentGroupName } = getProjectNodes();
      const project = target.closest('.project');
      const projectId = project.getAttribute('data-group-id');

      if (!isHTMLElement(currentGroupIcon) || !isHTMLElement(currentGroupName)) {
        showErrorModal(ERR_EVENTS.REMOVED_PROJECT_NODES);
        return;
      }
      if (!isHTMLElement(project) || !isValid(projectId)) {
        showErrorModal(ERR_EVENTS.REMOVED_PROJECT);
        return;
      }

      removeMenu.project = project;
      removeMenu.setAttribute('data-project-id', projectId);
      removeMenu.setAttribute('data-project-action', action);

      menuCover.classList.add('shown');
      removeMenu.classList.add('shown');
      removeHeading.textContent = 'Remove the project';
      removeMessage.textContent = 'Are you sure you want to delete the project? All tasks of the project will be removed!';
      break;
    }

    default:
      showErrorModal(ERR_EVENTS.SHOWING_DEFAULT_ACTION);
  }
};
