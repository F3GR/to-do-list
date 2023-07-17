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

export function updateLocalStorage(projectList) {
  localStorage.setItem('TrackIt: project-list', JSON.stringify(projectList));
}