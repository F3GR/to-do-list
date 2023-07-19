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

export function removeCurrentStatus(element) {
  element.removeAttribute('data-value');
}

export function updateProjectsList(projectList) {
  localStorage.setItem('TrackIt: project-list', JSON.stringify(projectList));
}

export function updateTasksList(projectId, tasksList) {
  localStorage.setItem(`TrackIt: ${projectId}`, JSON.stringify(tasksList));
}

export function noDuplicateName(list, name, id) {
  const n = list.length;
  let i = 0;
  for (; i < n; i++) {
      if (list[i].id === id) {
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