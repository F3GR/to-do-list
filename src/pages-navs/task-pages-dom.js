export function renderTaskPageNav(current, total) {
    if (typeof current !== 'number' || 
    current === NaN || 
    typeof total !== 'number' || 
    total === NaN
    ) {
        showErrorModal([ERR_HEADINGS.PROJECTS, ERR_RENDERING.PROJECTS_VALUES]);
        return;
    }

    const { addNewIcon, projectsBarHeader } = getProjectsBarHeaderNodes();
    if (!isHTMLElement(addNewIcon) || !isHTMLElement(projectsBarHeader)) {
        showErrorModal([ERR_HEADINGS.PROJECTS, ERR_RENDERING.PROJECTS_BAR]);
        return;
    }

    const oldProjectsNumber = document.querySelector('.projects-total');
    if (isHTMLElement(oldProjectsNumber)) {
        oldProjectsNumber.remove();
    }
    
    const projectsNumber = document.createElement('span');
    projectsNumber.textContent = `(${current})`;
    projectsNumber.classList.add('projects-total');
    projectsBarHeader.insertBefore(projectsNumber, addNewIcon);
}