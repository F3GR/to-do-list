import { createElementWithAttributes } from '../utils.js';

export function renderTask(projectId, taskId, title, dueDate, status, priority, description, notes) {
    const taskList = document.querySelector('.task-list');
    const task = createElementWithAttributes('li', {class: `task`}, taskList);
    task.setAttribute('data-project-id', `${projectId}`);
    task.setAttribute('data-task-id', `${taskId}`);
    task.setAttribute('data-task-status', `${status}`);
    task.setAttribute('data-task-priority', `${priority}`);
    

    const checkbox = createElementWithAttributes('input', {
        type: `checkbox`, 
        id: `task-status`,
        class: 'status'
    }, task);

    const label = createElementWithAttributes('label', {
        for: `task-status`, 
        class: 'status-label'
    }, task);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 20 20');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M2,10 L8,16 L18,5');
    svg.appendChild(path);
    label.appendChild(svg);
    
    const taskTitleBox = createElementWithAttributes('div', {class: `task-title-box`}, task);
    const taskTitle = createElementWithAttributes('span', {class: `task-title`}, taskTitleBox);
    taskTitle.textContent = `${title}`;

    const taskOverDueBox = createElementWithAttributes('div', {
        class: 'overdue-box'
    }, task); 
    const taskOverDueIcon = createElementWithAttributes('img', {
        src: `../src/originals/status-overdue.svg`, 
        alt: `Task overdue status icon`,
        class: `overdue`
    }, taskOverDueBox);

    const taskDueDateBox = createElementWithAttributes('div', {class: `task-due-date`, }, task);
    const taskDueDateText = createElementWithAttributes('span', {class: ``, }, taskDueDateBox);
    taskDueDateText.textContent = `${dueDate}`;

    const taskEditIcon = createElementWithAttributes('img', {
        src: `../src/originals/edit.svg`, 
        alt: `Task edit information icon`,
        class: 'edit'
    }, task);

    const taskRemoveIcon = createElementWithAttributes('img', {
        src: `../src/originals/delete.svg`, 
        alt: `Task remove icon`,
        class: 'remove'
    }, task);

    const taskUnfoldIcon = createElementWithAttributes('img', {
        src: `../src/originals/unfold.svg`, 
        alt: `Task information unfold or fold icon`,
        class: 'unfold'
    }, task);

    const taskUnfoldedPanel = createElementWithAttributes('div', {
        class: 'task-unfold-box',
    }, task);

    const taskDescriptionBox = createElementWithAttributes('div', {
        class: 'task-description-box',
    }, taskUnfoldedPanel);

    const taskDescriptionTitle = createElementWithAttributes('span', {
        class: 'task-description-title',
    }, taskDescriptionBox);
    taskDescriptionTitle.textContent = 'Description: ';

    const taskDescription = createElementWithAttributes('span', {
        class: 'task-description',
    }, taskDescriptionBox);
    taskDescription.textContent = `${description}`;

    const taskNotesBox = createElementWithAttributes('div', {
        class: 'task-notes-box',
    }, taskUnfoldedPanel);

    const taskNotesTitle = createElementWithAttributes('span', {
        class: 'task-notes-title',
    }, taskNotesBox);
    taskNotesTitle.textContent = 'Notes: ';

    const taskNotes = createElementWithAttributes('span', {
        class: 'task-notes',
    }, taskNotesBox);
    taskNotes.textContent = `${notes}`;
}