export function createElementWithAttributes(tagName, attributes = {}, parentElement) {
    const element = document.createElement(tagName);
  
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  
    if (parentElement) {
      parentElement.appendChild(element);
    }
  
    return element;
}

export function showErrorModal(message) {
    if (!Array.isArray(message)) {
      showErrorModal(['Error (rendering error modal)', 'Heading and/or error message couldn\'t be found']);
      return;
    }
    
    const errorModal = document.querySelector('.error-modal');
    const messageHeading = errorModal.querySelector('.error-heading');
    const messagePara = errorModal.querySelector('.error-message');
    const process = errorModal.querySelector('.error-process');
    const errorCover = document.querySelector('.error-cover');

    if (isValid(message[0])) {
      messageHeading.textContent = message[0];
    } else {
        messageHeading.textContent = 'Invalid input';
    }

    errorModal.classList.add('shown');
    errorCover.classList.add('shown');
    messagePara.textContent = message[1];
    process.textContent = message[2];
}

export function handleExitRemoveMenu(e) {
  const menuCover = document.querySelector('.menu-cover');
  const removeMenu = document.querySelector('.remove-menu');
  const removeHeading = document.querySelector('.remove-heading');
  const removeMessage = document.querySelector('.remove-message');

  if (!isHTMLElement(menuCover) ||
  !isHTMLElement(removeMenu) ||
  !isHTMLElement(removeHeading) ||
  !isHTMLElement(removeMessage)
  ) {
      showErrorModal(['Error (exiting the remove confirmation menu)', 'One or more menu components couldn\'t be found']);
      return;
  }

  removeMenu.classList.remove('shown');
  menuCover.classList.remove('shown');
  removeHeading.textContent = '';
  removeMessage.textContent = '';

  removeMenu.project = null;
  removeMenu.task = null;
  removeMenu.setAttribute('data-project-id', null);
  removeMenu.setAttribute('data-task-id', null);
  removeMenu.setAttribute('data-task-action', null);
  removeMenu.setAttribute('data-project-action', null);
}

export const removeCurrentStatus = (element) => element.removeAttribute('data-value');

export const DEFAULT_PAGE = 1;
export const DEFAULT_GROUP = 'all';
export const NUM_PROJECTS_PAGE = 3;
export const NUM_TASKS_PAGE = 6;

export function isNodeList(element) {
  return element instanceof NodeList;
}

export function isHTMLElement(element) {
  return element instanceof HTMLElement || element instanceof Element;
}

export function isObject(obj) {
  return obj instanceof Object;
}

export function isBoolean(value) {
  return typeof value === 'boolean';
}

export function isValid(value) {
  return value !== undefined && value !== null && value !== '' && value !== false;
}

export function isNotEmpty(value) {
  return value !== '';
}


export function checkIfCurrent(element) {
  if (element.getAttribute('data-value') === 'current') {
    return true;
  }
  return false;
}

export function noDuplicateName(list, name, id) {
  const n = list.length;
  let i = 0;
  for (; i < n; i++) {
      if (Number(list[i].id) === Number(id)) {
          continue;
      }
      if (list[i].name === name) {
          return false;
      }
  }
  return true;
}

export function noDuplicateTitle(list, title, id) {
  const n = list.length;
  let i = 0;
  for (; i < n; i++) {
      if (Number(list[i].id) === Number(id)) {
          continue;
      }
      if (list[i].title === title) {
          return false;
      }
  }
  return true;
}

export function findIndex(list, id) {
  let index;
  let n = list.length;
  let i = 0;
  for (; i < n; i++) {
      if (Number(list[i].id) === Number(id)) {
          index = i;
          break;
      }
  }
  return index;
}


export function Enum(baseEnum) {  
  return new Proxy(baseEnum, {
    get(target, name) {
      if (!baseEnum.hasOwnProperty(name)) {
        throw new Error(`"${name}" value does not exist in the enum`)
      }
      return baseEnum[name]
    },
    set(target, name, value) {
      throw new Error('Cannot add a new value to the enum')
    }
  })
}

export const ACTIONS_PROJECTS = new Enum ({
  ADD_NEW: 'add-new',
  EDIT: 'edit',
  REMOVE: 'remove'
});

export const ACTIONS_TASKS = new Enum ({
  ADD_NEW: 'add-new',
  EDIT: 'edit',
  UPDATE_STATUS: 'update-status',
  REMOVE: 'remove',
  UNFOLD: 'unfold',
});

export const STANDARD_GROUPS = {
  ALL: 'all',
  TODAY: 'today',
  WEEK: 'week',
  COMPLETED: 'completed',
  OVERDUE: 'overdue',
}

export const PRIORITY = {
  NORMAL: '0',
  MEDIUM: '1',
  HIGH: '2',
}

export const SORTBY = {
  DATE: 'date',
  STATUS: 'status',
  PRIORITY: 'priority',
}

export const STATUS = {
  COMPLETED: '0',
  ONGOING: '1',
  OVERDUE: '2',
}







