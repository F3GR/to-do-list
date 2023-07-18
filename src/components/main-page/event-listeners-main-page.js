export function addEventListenersMainPage() {
    addEventListenersSidebar();
    addEventListenersViewOptions();
    addEventListenersTaskMenu();
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
