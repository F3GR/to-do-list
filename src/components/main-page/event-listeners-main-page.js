export function addEventListenersMainPage() {
    addEventListenersSidebar();
    addEventListenersViewOptions();
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

    let currentGroup;
    const mainGroupIcon = document.querySelector('main .header img');
    const mainGroupName = document.querySelector('main .header span');
    const barTypes = document.querySelector('.bar-types');
    const projectsList = document.querySelector('.projects-list');
    
    barTypes.addEventListener('click', handleGroupSelection);
    projectsList.addEventListener('click', handleGroupSelection);
    
    function handleGroupSelection(e) {
        const target = e.target.closest('.bar-types > *, .projects-list > li.project');
    
        if (target && target !== currentGroup) {
            const selectedGroupIcon = target.querySelector('img');
            const selectedGroupName = target.querySelector('span');
            if (currentGroup) {
                currentGroup.classList.remove('current');
            }
            target.classList.add('current');
            mainGroupIcon.src = selectedGroupIcon.src;
            mainGroupName.textContent = selectedGroupName.textContent;
            currentGroup = target;
        }
    }
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
