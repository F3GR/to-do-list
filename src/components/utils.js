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

export function checkIfCurrent(element) {
  if (element.getAttribute('data-value') === 'current') {
    return true;
  }
  return false;
}

export const removeCurrentStatus = (element) => element.removeAttribute('data-value');

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


export const ACTIONS = {
  ADDNEW: 'add-new',
  EDIT: 'edit',
  UPDATE_STATUS: 'update-status',
  REMOVE: 'remove',
  UNFOLD: 'unfold',
}

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







