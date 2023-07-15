import { createElementWithAttributes } from './utils.js';

export function renderNewTask() {
    const taskList = document.querySelector('.task-list');
    const exampleTask = createElementWithAttributes('li', {class: `task`, data: `0`}, taskList);

    const taskStatusIcon  = createElementWithAttributes('img', {
        src: `../src/originals/radio-unchecked.svg`, 
        alt: `Task status icon`,
        class: 'status'
    }, exampleTask);

    const taskNameBox = createElementWithAttributes('div', {class: `task-name-box`}, exampleTask);
    const taskName = createElementWithAttributes('span', {class: `task-name-box`}, taskNameBox);
    taskName.textContent = `New task`;

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

    addListenersToANewTask();
}

export function addListenersToANewTask() {
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
}