import { createElementWithAttributes } from './utils.js';

export function createExampleTaskPanels() {
    renderExampleTasks();
    addListenersToExampleTasks();
}

function renderExampleTasks() {
    const taskList = document.querySelector('.task-list');
    const exampleTask = createElementWithAttributes('li', {class: `task`}, taskList);
    exampleTask.setAttribute('data-task-id', '0');
    exampleTask.setAttribute('data-task-priority', 'high');
    exampleTask.setAttribute('data-task-status', 'overdue');

    const checkbox = createElementWithAttributes('input', {
        type: `checkbox`, 
        id: `task-status`,
        class: 'status'
    }, exampleTask);

    const label = createElementWithAttributes('label', {
        for: `task-status`, 
        class: 'status-label'
    }, exampleTask);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 20 20');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M2,10 L8,16 L18,5');
    svg.appendChild(path);
    label.appendChild(svg);
    
    const taskNameBox = createElementWithAttributes('div', {class: `task-name-box`}, exampleTask);
    const taskName = createElementWithAttributes('span', {class: `task-name-box`}, taskNameBox);
    taskName.textContent = `New task`;

    const taskOverDueBox = createElementWithAttributes('div', {
        class: 'overdue-box'
    }, exampleTask);
    const taskOverDueIcon = createElementWithAttributes('img', {
        src: `../src/originals/status-overdue.svg`, 
        alt: `Task overdue status icon`,
        class: `overdue`
    }, taskOverDueBox);

    const taskDueDateBox = createElementWithAttributes('div', {class: `task-due-date`, }, exampleTask);
    const taskDueDateText = createElementWithAttributes('span', {class: ``, }, taskDueDateBox);
    taskDueDateText.textContent = `2023-01-07`;

    const taskEditIcon = createElementWithAttributes('img', {
        src: `../src/originals/edit.svg`, 
        alt: `Task edit information icon`,
        class: 'edit'
    }, exampleTask);

    const taskRemoveIcon = createElementWithAttributes('img', {
        src: `../src/originals/delete.svg`, 
        alt: `Task remove icon`,
        class: 'remove'
    }, exampleTask);

    const taskUnfoldIcon = createElementWithAttributes('img', {
        src: `../src/originals/unfold.svg`, 
        alt: `Task information unfold or fold icon`,
        class: 'unfold'
    }, exampleTask);

    const taskUnfoldedPanel = createElementWithAttributes('div', {
        class: 'task-unfold-box',
    }, exampleTask);

    const taskDescriptionBox = createElementWithAttributes('div', {
        class: 'task-description-box',
    }, taskUnfoldedPanel);

    const taskDescriptionTitle = createElementWithAttributes('span', {
        class: 'task-description-title',
    }, taskDescriptionBox);
    taskDescriptionTitle.textContent = 'Description: '

    const taskDescription = createElementWithAttributes('span', {
        class: 'task-description',
    }, taskDescriptionBox);
    taskDescription.textContent = 'New Task description - some info here.'

    const taskNotesBox = createElementWithAttributes('div', {
        class: 'task-notes-box',
    }, taskUnfoldedPanel);

    const taskNotesTitle = createElementWithAttributes('span', {
        class: 'task-notes-title',
    }, taskNotesBox);
    taskNotesTitle.textContent = 'Notes: '

    const taskNotes = createElementWithAttributes('span', {
        class: 'task-notes',
    }, taskNotesBox);
    taskNotes.textContent = 'Here are some notes'

}

function addListenersToExampleTasks() {
    const selectedTaskMenu = document.querySelector('.content .task-menu');
    const selectedTaskMenuTitle = document.querySelector('.task-menu .title');
    const selectedAddTaskButton = document.querySelector('.task-bar > .add-new');
    const selectedMenuCover = document.querySelector('.menu-cover');

    const selectedEditTaskButton = document.querySelector('.task .edit');

    selectedEditTaskButton.addEventListener('click', function() {
        selectedTaskMenuTitle.textContent = 'Edit the task';
        selectedAddTaskButton.textContent = 'Save';
        selectedMenuCover.classList.add('shown');
        selectedTaskMenu.classList.add('shown');
    });

    const selectedRemoveTaskButton = document.querySelector('.task img.remove');
    selectedRemoveTaskButton.addEventListener('click', function() {
        const removedTask = selectedRemoveTaskButton.closest('.task');
        removedTask.remove();
    });

    const selectedUnfoldButton = document.querySelector('.task img.unfold');
    const selectedTaskInfo = document.querySelector('.task-unfold-box');
    selectedUnfoldButton.addEventListener('click', function() {
        const unfoldedTask = selectedUnfoldButton.closest('.task');
        if (!unfoldedTask.classList.contains('unfolded')) {
            unfoldedTask.classList.add('unfolded');
            selectedTaskInfo.classList.add('shown');
            selectedUnfoldButton.setAttribute('src', '../src/originals/unfold.svg');
        } else {
            unfoldedTask.classList.remove('unfolded');
            selectedTaskInfo.classList.remove('shown');
            selectedUnfoldButton.setAttribute('src', '../src/originals/fold.svg');
        }
    });

    const checkbox = document.querySelector('.task input.status');
    const svg = document.querySelector('.task label svg');
    const path = document.querySelector('.task label svg path');

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          svg.classList.add('checked');
        } else {
          svg.classList.remove('checked');
        }
    });
}

export function createExampleProjectPanel() {
    renderExampleProject();
    addListenersToExampleProject();
}

function renderExampleProject() {
    const projectsList = document.querySelector('.projects-list');
    const exampleProject = createElementWithAttributes('li', { class: `project`}, projectsList);
    exampleProject.setAttribute('data-project-id', '0');

    const exampleProjectImage = createElementWithAttributes('img', {
        src: '../src/originals/category-other.svg',
        alt: `Add new project icon`
    }, exampleProject);
    const exampleProjectText = createElementWithAttributes('span', {}, exampleProject);
    exampleProjectText.textContent = `New project`;
    const exampleProjectEditImage = createElementWithAttributes('img', {
        src: '../src/originals/edit.svg',
        alt: `Edit project icon`,
        class: 'edit'
    }, exampleProject);
    const exampleProjectDeleteImage = createElementWithAttributes('img', {
        src: '../src/originals/delete.svg',
        alt: `Remove project icon`,
        class: 'remove'
    }, exampleProject);
}

function addListenersToExampleProject() {
    const selectedProjectMenu = document.querySelector('.project-menu');
    const selectedProjectMenuTitle = document.querySelector('.project-menu .title-box span');
    const selectedSaveProjectButton = document.querySelector('.project-menu button.save');
    const selectedMenuCover = document.querySelector('.menu-cover');

    const selectedEditProjectButton = document.querySelector('.projects-list li img.edit');
    
    selectedEditProjectButton.addEventListener('click', function() {
        selectedProjectMenuTitle.textContent = 'Edit the project';
        selectedSaveProjectButton.textContent = 'Save';
        selectedMenuCover.classList.add('shown');
        selectedProjectMenu.classList.add('shown');
    });

    const selectedProject = document.querySelector('aside .projects-list .project');
    selectedProject.addEventListener('click', function() {
            if (!selectedProject.classList.contains('current')) {
                selectedProject.classList.add('current');
            } else {
                selectedProject.classList.remove('current');
            }
    });

    const selectedRemoveProjectButton = document.querySelector('.projects-list li img.remove');
    selectedRemoveProjectButton.addEventListener('click', function() {
        const removedProject = selectedRemoveProjectButton.closest('.project');
        removedProject.remove();
    });
}