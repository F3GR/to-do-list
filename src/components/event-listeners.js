export function addEventListenersMainPage() {
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

    const selectedMenuCover = document.querySelector('.menu-cover');

    const selectedProjectMenu = document.querySelector('.project-menu');
    const selectedButtonAddNewProject = document.querySelector('img.add-new');
    const selectedProjectMenuTitle = document.querySelector('.project-menu .title-box span');

    selectedButtonAddNewProject.addEventListener('click', function() {
        selectedProjectMenuTitle.textContent = 'Add a new project';
        selectedMenuCover.classList.add('shown');
        selectedProjectMenu.classList.add('shown');
    });

    const selectedExitButton = document.querySelector('.project-menu .exit');
    selectedExitButton.addEventListener('click', function() {
        selectedProjectMenuTitle.textContent = '';
        selectedMenuCover.classList.remove('shown');
        selectedProjectMenu.classList.remove('shown');
    });

    const selectedCancelButton = document.querySelector('.project-menu .cancel');
    selectedCancelButton.addEventListener('click', function() {
        selectedProjectMenuTitle.textContent = '';
        selectedMenuCover.classList.remove('shown');
        selectedProjectMenu.classList.remove('shown');
    });

    const selectedEditButton = document.querySelector('.bar-projects > ul > li > img.edit');
    selectedEditButton.addEventListener('click', function() {
        selectedProjectMenuTitle.textContent = 'Edit the project';
        selectedMenuCover.classList.add('shown');
        selectedProjectMenu.classList.add('shown');
    });
}

