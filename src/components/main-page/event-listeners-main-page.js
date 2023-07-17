import { renderNewProject, addListenersToANewProject } from '../project/dom-project.js';
import { application } from '../main-app.js';

export function addEventListenersMainPage() {
    addEventListenersSidebar();
    addEventListenersViewOptions();
    addEventListenersProjectMenu();
    addEventListenersTaskMenu();
}

function addEventListenersProjectMenu() {
    const selectedMenuCover = document.querySelector('.menu-cover');

    const selectedProjectMenu = document.querySelector('.project-menu');
    const selectedAddNewProjectButton = document.querySelector('img.add-new');
    const selectedProjectMenuTitle = document.querySelector('.project-menu .title-box span');
    const selectedSubmitProjectButton = document.querySelector('.project-menu button.submit');

    selectedAddNewProjectButton.addEventListener('click', function() {
        selectedProjectMenuTitle.textContent = 'Add a new project';
        selectedSubmitProjectButton.textContent = 'Add';
        selectedMenuCover.classList.add('shown');
        selectedProjectMenu.classList.add('shown');
        selectedProjectMenu.classList.add('add');
    });

    const selectedExitButton = document.querySelector('.project-menu .exit');
    selectedExitButton.addEventListener('click', function() {
        selectedProjectMenuTitle.textContent = '';
        selectedSubmitProjectButton.textContent = '';
        selectedMenuCover.classList.remove('shown');
        selectedProjectMenu.classList.remove('shown');
        selectedProjectMenu.classList.remove('add');
    });

    const selectedCancelButton = document.querySelector('.project-menu .cancel');
    selectedCancelButton.addEventListener('click', function() {
        selectedProjectMenuTitle.textContent = '';
        selectedSubmitProjectButton.textContent = '';
        selectedMenuCover.classList.remove('shown');
        selectedProjectMenu.classList.remove('shown');
        selectedProjectMenu.classList.remove('add');
    });

    const selectedForm = document.querySelector('.project-menu form');
    selectedForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const selectedIcon = document.querySelector('input[name="iconURL"]:checked');
        if (!selectedIcon) {
          alert('Please select an icon');
          return;
        }

        if (selectedProjectMenu.classList.contains('add')) {
            const selectNameInput = document.querySelector('.project-menu #name');
            const selectIconInput = document.querySelector('input[name="iconURL"]:checked');
            const newProject = application.createNewProject(
                selectNameInput.value, selectIconInput.value);
            if (newProject) {
                renderNewProject(newProject.name, newProject.iconURL, newProject.getNewProjectId);
            } else {
                alert('The project with this title already exists!');
            }
        }
    });

}

function addEventListenersTaskMenu() {
    const selectedMenuCover = document.querySelector('.menu-cover');

    const selectedTaskMenu = document.querySelector('.task-menu');
    const selectedTaskMenuTitle = document.querySelector('.task-menu .title');
    const selectedAddTaskButton = document.querySelector('.task-bar > .add-new');

    selectedAddTaskButton.addEventListener('click', function() {
        selectedTaskMenuTitle.textContent = 'Add a new task';
        selectedAddTaskButton.textContent = 'Add';
        selectedMenuCover.classList.add('shown');
        selectedTaskMenu.classList.add('shown');
        selectedTaskMenu.classList.add('add');
    });

    const selectedTaskExitButton = document.querySelector('.task-menu .exit');
    selectedTaskExitButton.addEventListener('click', function() {
        selectedTaskMenuTitle.textContent = '';
        selectedAddTaskButton.textContent = '';
        selectedMenuCover.classList.remove('shown');
        selectedTaskMenu.classList.remove('shown');
        selectedTaskMenu.classList.remove('add');
    });

    const selectedTaskCancelButton = document.querySelector('.task-menu .cancel');
    selectedTaskCancelButton.addEventListener('click', function() {
        selectedTaskMenuTitle.textContent = '';
        selectedAddTaskButton.textContent = '';
        selectedMenuCover.classList.remove('shown');
        selectedTaskMenu.classList.remove('shown');
        selectedTaskMenu.classList.remove('add');
    });
}

function addEventListenersSidebar() {
    const selectedSideBarIcon = document.querySelector('header > img.sidebar-icon');
    const selectedSideBar = document.querySelector('.content aside');
    const selectedMain = document.querySelector('.content main');
    const selectedSidebarCover = document.querySelector('main .sidebar-cover');

    selectedSideBarIcon.addEventListener('click', function() {
        if (!selectedSideBar.classList.contains('shown')) {
            selectedSideBar.classList.add('shown');
            selectedSidebarCover.classList.add('shown');
        } else {
            selectedSideBar.classList.remove('shown');
            selectedSidebarCover.classList.remove('shown');
        }
    });

    const selectedViewOptions = document.querySelector('header > img.options');
    const selectedViewBox = document.querySelector('main > .view-options-bar');
    selectedViewOptions.addEventListener('click', function() {
        if (!selectedViewBox.classList.contains('shown')) {
            selectedViewBox.classList.add('shown');
        } else {
            selectedViewBox.classList.remove('shown');
        }
    });
}

function addEventListenersViewOptions() {
    const selectedButtonsFilterOptions = document.querySelectorAll('.view-options-bar button');
    selectedButtonsFilterOptions.forEach((button) => {
        button.addEventListener('click', function() {
            if (!button.classList.contains('enabled')) {
                button.classList.add('enabled');
            } else {
                button.classList.remove('enabled');
            }
        });
    });

    const selectedSidebarDisplayTypes = document.querySelectorAll('aside .bar-types > *');
    selectedSidebarDisplayTypes.forEach((button) => {
        button.addEventListener('click', function() {
            if (!button.classList.contains('current')) {
                button.classList.add('current');
            } else {
                button.classList.remove('current');
            }
        });
    });

    const selectedSortOrderIcon = document.querySelector('.sort-options-box img');
    selectedSortOrderIcon.addEventListener('click', function() {
        if (!selectedSortOrderIcon.classList.contains('is-upward')) {
            selectedSortOrderIcon.classList.add('is-upward');
            selectedSortOrderIcon.setAttribute('src', '../src/originals/arrow-upward.svg');
        } else {
            selectedSortOrderIcon.classList.remove('is-upward');
            selectedSortOrderIcon.setAttribute('src', '../src/originals/arrow-downward.svg');
        }
    });
}