let taskNodes;

export function getTaskNodes() {
    if (taskNodes) {
        return taskNodes;
    }

    const taskList = document.querySelector('.task-list');

    const main = document.querySelector('.content main');
    const form = document.querySelector('.task-menu form');

    const exitButton = document.querySelector('.task-menu .exit');
    const cancelButton = document.querySelector('.task-menu .cancel');

    const menu = document.querySelector('.content .task-menu');
    const menuCover = document.querySelector('.menu-cover');

    const menuTitle = document.querySelector('.task-menu .title');
    const submitButton = document.querySelector('.task-menu button.submit');

    const titleInput = document.querySelector('.task-menu #task-title');
    const dueDateInput = document.querySelector('.task-menu #task-dueDate');
    const descriptionInput = document.querySelector('.task-menu #task-description');
    const notesInput = document.querySelector('.task-menu #task-notes');

    return taskNodes = {    
        taskList,
        main,
        form,
        exitButton,
        cancelButton,
        menu,
        menuCover,
        menuTitle,
        submitButton,
        titleInput,
        dueDateInput,
        descriptionInput,
        notesInput    
    };
};