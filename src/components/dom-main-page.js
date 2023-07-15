import { createElementWithAttributes } from './utils.js';

export function renderMainPage() {
    const content = document.querySelector('.content');

    const header = createElementWithAttributes('header', {}, content);

    const sideBarIcon = createElementWithAttributes('img', {
        src: '../src/originals/menu.svg',
        alt: `Sidebar menu icon`,
        class: 'sidebar-icon hidden'
    }, header);

    const heading = createElementWithAttributes('div', {class: `heading`}, header);

    const logoIcon = createElementWithAttributes('img', { 
        src: '../src/originals/fav-icon.svg',
        class: `logo`,
        alt: `ToDo List logo`}, heading);

    const headingText = createElementWithAttributes('h1', {}, heading);
    headingText.textContent = `ToDo List`;

    const emptyDiv = createElementWithAttributes('div', {class: 'empty'}, header);

    const viewOptionsIcon = createElementWithAttributes('img', { 
        src: '../src/originals/view-options.svg',
        alt: `View Options logo`,
        class: 'options'
    }, header);

    const sidebar = createElementWithAttributes('aside', {}, content);

    const barTypes = createElementWithAttributes('div', {class: `bar-types`}, sidebar);

    const tasksAll = createElementWithAttributes('div', {class: `tasks-all`}, barTypes);
    const tasksAllImage = createElementWithAttributes('img', { 
        src: '../src/originals/calendar-all.svg',
        alt: `All tasks icon`
    }, tasksAll);
    const tasksAllText = createElementWithAttributes('span', {}, tasksAll);
    tasksAllText.textContent = `All`;

    const tasksToday = createElementWithAttributes('div', {class: `tasks-today`}, barTypes);
    const tasksTodayImage = createElementWithAttributes('img', {
        src: '../src/originals/calendar-today.svg',
        alt: `Today tasks icon`
    }, tasksToday);
    const tasksTodayText = createElementWithAttributes('span', {}, tasksToday);
    tasksTodayText.textContent = `Today`;

    const tasksWeek = createElementWithAttributes('div', {class: `tasks-week`}, barTypes);
    const tasksWeekImage = createElementWithAttributes('img', {
        src: '../src/originals/calendar-week.svg',
        alt: `Week tasks icon`
    }, tasksWeek);
    const tasksWeekText = createElementWithAttributes('span', {}, tasksWeek);
    tasksWeekText.textContent = `Week`;

    const tasksCompleted = createElementWithAttributes('div', {class: `tasks-Completed`}, barTypes);
    const tasksCompletedImage = createElementWithAttributes('img', {
        src: '../src/originals/calendar-finished.svg',
        alt: `Completed tasks icon`
    }, tasksCompleted);
    const tasksCompletedText = createElementWithAttributes('span', {}, tasksCompleted);
    tasksCompletedText.textContent = `Completed`;

    const tasksOverdue = createElementWithAttributes('div', {class: `tasks-overdue`}, barTypes);
    const tasksOverdueImage = createElementWithAttributes('img', {
        src: '../src/originals/calendar-overdue.svg',
        alt: `Overdue tasks icon`
    }, tasksOverdue);
    const tasksOverdueText = createElementWithAttributes('span', {}, tasksOverdue);
    tasksOverdueText.textContent = `Overdue`;

    const barProjects = createElementWithAttributes('div', {class: `bar-projects`}, sidebar);

    const projectsBar = createElementWithAttributes('div', {class: `projects-bar`}, barProjects);
    const projectsBarImage = createElementWithAttributes('img', {
        src: '../src/originals/projects.svg',
        alt: `Projects icon`
    }, projectsBar);
    const projectsBarText = createElementWithAttributes('span', {}, projectsBar);
    projectsBarText.textContent = `Projects (0)`;
    const projectsBarAddImage = createElementWithAttributes('img', {
        src: '../src/originals/add-new.svg',
        alt: `Add new project icon`,
        class: 'add-new',
    }, projectsBar);

    const projectsList = createElementWithAttributes('ul', {class: `projects-list`}, barProjects);

    const barFooter = createElementWithAttributes('div', {class: `bar-footer`}, sidebar);

    const footerLink = createElementWithAttributes('a', {
        href: 'https://github.com/F3GR'
    }, barFooter);
    const footerText = createElementWithAttributes('span', {}, footerLink);
    footerText.textContent = `\u00A9 F3GR, 2023`;

    const main = createElementWithAttributes('main', {}, content);

    const sidebarCover = createElementWithAttributes('div', {
        class: 'sidebar-cover'
    }, main);

    const viewOptionsBox = createElementWithAttributes('div', {
        class: 'view-options-bar'
    }, main);

    const viewOptionsText = createElementWithAttributes('span', {class: ``}, viewOptionsBox);
    viewOptionsText.textContent = `Filter options:`;

    const buttonHighPriority = createElementWithAttributes('button', {
        class: `high-priority enabled`}, viewOptionsBox);
    buttonHighPriority.textContent = `High`;

    const buttonMediumPriority = createElementWithAttributes('button', {
        class: `medium-priority enabled`}, viewOptionsBox);
    buttonMediumPriority.textContent = `Medium`;

    const buttonNormalPriority = createElementWithAttributes('button', {
        class: `normal-priority enabled`}, viewOptionsBox);
    buttonNormalPriority.textContent = `Normal`;

    const buttonCompleted = createElementWithAttributes('button', {
        class: `completed enabled`}, viewOptionsBox);
    buttonCompleted.textContent = `Completed`;

    const buttonOverdue = createElementWithAttributes('button', {
        class: `overdue enabled`}, viewOptionsBox);
    buttonOverdue.textContent = `Overdue`;

    const selectSortOption = createElementWithAttributes('select', {name: `sorting-option`}, viewOptionsBox);
    selectSortOption.textContent = `Sort by: `;

    const sortByDate = createElementWithAttributes('option', {value: `date-from-oldest`},selectSortOption);
    sortByDate.textContent = `Date`;

    const sortByPriority = createElementWithAttributes('option', {value: `priority-from-highest`},selectSortOption);
    sortByPriority.textContent = `Priority`;

    const sortByStatus = createElementWithAttributes('option', {value: `priority-from-due`},selectSortOption);
    sortByStatus.textContent = `Status`;

    const mainHeadBox = createElementWithAttributes('div', {class: `header`}, main);
    const mainHeadImage = createElementWithAttributes('img', { 
        src: '../src/originals/calendar-all.svg',
        alt: `All tasks icon`
    }, mainHeadBox);
    const mainHeadText = createElementWithAttributes('span', {}, mainHeadBox);
    mainHeadText.textContent = "All";

    const mainTaskBar = createElementWithAttributes('div', {class: `task-bar`}, main);

    const mainTaskNumber = createElementWithAttributes('div', {class: `task-number`}, mainTaskBar);
    const taskBarText = createElementWithAttributes('span', {}, mainTaskNumber);
    taskBarText.textContent = `Tasks (0)`;

    const addNewTaskIcon = createElementWithAttributes('img', { 
        src: '../src/originals/add-new.svg',
        alt: `Add new Task icon`,
        class: 'add-new'
    }, mainTaskBar);

    const taskList = createElementWithAttributes('ul', {class: `task-list`}, main);

    const pageMenuBox = createElementWithAttributes('div', {class: `page-menu`, }, main);

    const firstPageIcon = createElementWithAttributes('img', {
        src: `../src/originals/first-page.svg`, 
        alt: `First page icon`,
        class: 'first-page'
    }, pageMenuBox);
    const previousPageIcon = createElementWithAttributes('img', {
        src: `../src/originals/previous-page.svg`, 
        alt: `Previous page icon`,
        class: 'previous-page'
    }, pageMenuBox);
    const inputPage = createElementWithAttributes('input', {
        type: 'number',
        min: "1",
        max: "99", 
    }, pageMenuBox);
    const nextPageIcon = createElementWithAttributes('img', {
        src: `../src/originals/next-page.svg`, 
        alt: `Next page icon`,
        class: 'next-page'
    }, pageMenuBox);
    const lastPageIcon = createElementWithAttributes('img', {
        src: `../src/originals/last-page.svg`, 
        alt: `Last page icon`,
        class: 'last-page'
    }, pageMenuBox);

    renderTaskMenu();
    renderProjectMenu();
    
    addEventListenersMainPage();
};

export function renderProjectMenu() {
    const content = document.querySelector('.content');

    const menuCover = createElementWithAttributes('div', {
        class: 'menu-cover'
    }, content);

    const projectMenu = createElementWithAttributes('div', {
        class: 'project-menu'
    }, content);

    const projectMenuTitleBox = createElementWithAttributes('div', {
        class: 'title-box'
    }, projectMenu);

    const projectMenuTitle = createElementWithAttributes('span', {
        class: 'title'
    }, projectMenuTitleBox);
    projectMenuTitle.textContent = '';

    const projectMenuExitIcon = createElementWithAttributes('img', {
        class: 'exit',
        src: '../src/originals/close.svg',
        alt: 'Exit icon'
    }, projectMenuTitleBox);

    const projectMenuForm = createElementWithAttributes('form', {
    }, projectMenu);
    
    const formNameLabel = createElementWithAttributes('label', {
        for: 'name'
    }, projectMenuForm);
    formNameLabel.textContent = 'Name*:'
    const formName = createElementWithAttributes('input', {
        type: 'text',
        id: 'name',
        name: 'projectName',
        required: 'required'
    }, projectMenuForm);

    const formIconFieldset = createElementWithAttributes('fieldset', {}, projectMenuForm);
    const formIconLegend = createElementWithAttributes('legend', {}, formIconFieldset);
    formIconLegend.textContent = 'Icon*:'

    const iconCategoryJobLabel = createElementWithAttributes('label', {}, formIconFieldset);
    const buttonCategoryJob = createElementWithAttributes('input', {
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-job.svg'
    }, iconCategoryJobLabel);
    const iconCategoryJob = createElementWithAttributes('img', {
        src: '../src/originals/category-job.svg',
        alt: 'Category Job icon'
    }, iconCategoryJobLabel);

    const iconCategoryStudyLabel = createElementWithAttributes('label', {}, formIconFieldset);
    const buttonCategoryStudy = createElementWithAttributes('input', {
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-study.svg'
    }, iconCategoryStudyLabel);
    const iconCategoryStudy = createElementWithAttributes('img', {
        src: '../src/originals/category-study.svg',
        alt: 'Category Study icon'
    }, iconCategoryStudyLabel);

    const iconCategoryGiftLabel = createElementWithAttributes('label', {}, formIconFieldset);
    const buttonCategoryGift = createElementWithAttributes('input', {
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-gift.svg'
    }, iconCategoryGiftLabel);
    const iconCategoryGift = createElementWithAttributes('img', {
        src: '../src/originals/category-gift.svg',
        alt: 'Category Gift icon'
    }, iconCategoryGiftLabel);

    const iconCategoryInternationalLabel = createElementWithAttributes('label', {}, formIconFieldset);
    const buttonCategoryInternational = createElementWithAttributes('input', {
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-international-activity.svg'
    }, iconCategoryInternationalLabel);
    const iconCategoryInternational = createElementWithAttributes('img', {
        src: '../src/originals/category-international-activity.svg',
        alt: 'Category International activity icon'
    }, iconCategoryInternationalLabel);

    const iconCategoryPeopleLabel = createElementWithAttributes('label', {}, formIconFieldset);
    const buttonCategoryPeople = createElementWithAttributes('input', {
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-people.svg'
    }, iconCategoryPeopleLabel);
    const iconCategoryPeople = createElementWithAttributes('img', {
        src: '../src/originals/category-people.svg',
        alt: 'Category People icon'
    }, iconCategoryPeopleLabel);

    const iconCategoryScienceLabel = createElementWithAttributes('label', {}, formIconFieldset);
    const buttonCategoryScience = createElementWithAttributes('input', {
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-science.svg'
    }, iconCategoryScienceLabel);
    const iconCategoryScience = createElementWithAttributes('img', {
        src: '../src/originals/category-science.svg',
        alt: 'Category Science icon'
    }, iconCategoryScienceLabel);

    const iconCategoryITLabel = createElementWithAttributes('label', {}, formIconFieldset);
    const buttonCategoryIT = createElementWithAttributes('input', {
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-it.svg'
    }, iconCategoryITLabel);
    const iconCategoryIT = createElementWithAttributes('img', {
        src: '../src/originals/category-it.svg',
        alt: 'Category IT icon'
    }, iconCategoryITLabel);

    const iconCategoryOtherLabel = createElementWithAttributes('label', {}, formIconFieldset);
    const buttonCategoryOther = createElementWithAttributes('input', {
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-other.svg'
    }, iconCategoryOtherLabel);
    const iconCategoryOther = createElementWithAttributes('img', {
        src: '../src/originals/category-other.svg',
        alt: 'Category Other icon'
    }, iconCategoryOtherLabel);

    const buttonsGrid = createElementWithAttributes('div', {
        class: 'button-box',
    }, projectMenuForm);

    const buttonSaveIcon = createElementWithAttributes('button', {
        class: 'save',
    }, buttonsGrid);
    buttonSaveIcon.textContent = '';

    const buttonCancelIcon = createElementWithAttributes('button', {
        class: 'cancel',
    }, buttonsGrid);
    buttonCancelIcon.textContent = 'Cancel';
}

export function renderTaskMenu() {
    const content = document.querySelector('.content');

    const taskMenu = createElementWithAttributes('div', {
        class: 'task-menu'
    }, content);

    const taskMenuTitleBox = createElementWithAttributes('div', {
        class: 'title-box'
    }, taskMenu);

    const taskMenuTitle = createElementWithAttributes('span', {
        class: 'title'
    }, taskMenuTitleBox);
    taskMenuTitle.textContent = '';

    const taskMenuExitIcon = createElementWithAttributes('img', {
        class: 'exit',
        src: '../src/originals/close.svg',
        alt: 'Exit icon'
    }, taskMenuTitleBox);

    const taskMenuForm = createElementWithAttributes('form', {
    }, taskMenu);

    const formTitleLabel = createElementWithAttributes('label', {
        for: 'title'
    }, taskMenuForm);
    formTitleLabel.textContent = 'Title*:'

    const formTitle = createElementWithAttributes('input', {
        type: 'text',
        id: 'title',
        name: 'title',
        required: 'required'
    }, taskMenuForm);

    const formDueDateLabel = createElementWithAttributes('label', {
        for: 'dueDate'
    }, taskMenuForm);
    formDueDateLabel.textContent = 'Due Date:'

    const formDueDate = createElementWithAttributes('input', {
        type: 'date',
        id: 'dueDate',
        name: 'dueDate',
    }, taskMenuForm);

    const formStatusFieldset = createElementWithAttributes('fieldset', {
        class: 'status'
    }, taskMenuForm);

    const formStatusLegend = createElementWithAttributes('legend', {}, formStatusFieldset);
    formStatusLegend.textContent = 'Is the task finished?'

    const radioStatusInProgress = createElementWithAttributes('input', {
        id: 'status-in-progress',
        type: 'radio',
        name: 'status',
        value: 'in-progress'
    }, formStatusFieldset);

    const labelStatusInProgress = createElementWithAttributes('label', {
        for: 'status-in-progress'
    }, formStatusFieldset);
    labelStatusInProgress.textContent = 'In progress';

    const radioStatusCompleted = createElementWithAttributes('input', {
        id: 'status-completed',
        type: 'radio',
        name: 'status',
        value: 'completed'
    }, formStatusFieldset);

    const labelStatusCompleted = createElementWithAttributes('label', {
        for: 'status-completed'
    }, formStatusFieldset);
    labelStatusCompleted.textContent = 'Completed';

    const formPriorityFieldset = createElementWithAttributes('fieldset', {
        class: 'priority'
    }, taskMenuForm);

    const formPriorityLegend = createElementWithAttributes('legend', {}, formPriorityFieldset);
    formPriorityLegend.textContent = 'What is the task\'s priority?'

    const radioPriorityHigh = createElementWithAttributes('input', {
        id: 'priority-high',
        type: 'radio',
        name: 'priority',
        value: 'high'
    }, formPriorityFieldset);

    const labelPriorityHigh = createElementWithAttributes('label', {
        for: 'priority-high'
    }, formPriorityFieldset);
    labelPriorityHigh.textContent = 'High';

    const radioPriorityMedium = createElementWithAttributes('input', {
        id: 'priority-medium',
        type: 'radio',
        name: 'priority',
        value: 'medium'
    }, formPriorityFieldset);

    const labelPriorityMedium = createElementWithAttributes('label', {
        for: 'priority-medium'
    }, formPriorityFieldset);
    labelPriorityMedium.textContent = 'Medium';
    
    const radioPriorityNormal = createElementWithAttributes('input', {
        id: 'priority-normal',
        type: 'radio',
        name: 'priority',
        value: 'normal'
    }, formPriorityFieldset);

    const labelPriorityNormal = createElementWithAttributes('label', {
        for: 'priority-normal'
    }, formPriorityFieldset);
    labelPriorityNormal.textContent = 'Normal';

    const descriptionBox = createElementWithAttributes('div', {
        class: 'description-box',
    }, taskMenuForm);
    const descriptionLabel = createElementWithAttributes('label', {
        for: 'description',
    }, descriptionBox);
    descriptionLabel.textContent = 'Description:'
    const descriptionTextarea = createElementWithAttributes('textarea', {
        id: 'description',
        name: 'description',
        maxlength: '200'
    }, descriptionBox);

    const notesBox = createElementWithAttributes('div', {
        class: 'notes-box',
    }, taskMenuForm);
    const notesLabel = createElementWithAttributes('label', {
        for: 'notes',
    }, notesBox);
    notesLabel.textContent = 'Notes:'
    const notesTextarea = createElementWithAttributes('textarea', {
        id: 'notes',
        name: 'notes',
        maxlength: '100'
    }, notesBox);

    const buttonsGrid = createElementWithAttributes('div', {
        class: 'button-box',
    }, taskMenuForm);

    const buttonAddIcon = createElementWithAttributes('button', {
        class: 'add',
    }, buttonsGrid);
    buttonAddIcon.textContent = 'Add';

    const buttonCancelIcon = createElementWithAttributes('button', {
        class: 'cancel',
    }, buttonsGrid);
    buttonCancelIcon.textContent = 'Cancel';
}

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
    const selectedAddNewProjectButton = document.querySelector('img.add-new');
    const selectedProjectMenuTitle = document.querySelector('.project-menu .title-box span');
    const selectedSaveProjectButton = document.querySelector('.project-menu button.save');

    selectedAddNewProjectButton.addEventListener('click', function() {
        selectedProjectMenuTitle.textContent = 'Add a new project';
        selectedSaveProjectButton.textContent = 'Add';
        selectedMenuCover.classList.add('shown');
        selectedProjectMenu.classList.add('shown');
    });

    const selectedExitButton = document.querySelector('.project-menu .exit');
    selectedExitButton.addEventListener('click', function() {
        selectedProjectMenuTitle.textContent = '';
        selectedSaveProjectButton.textContent = '';
        selectedMenuCover.classList.remove('shown');
        selectedProjectMenu.classList.remove('shown');
    });

    const selectedCancelButton = document.querySelector('.project-menu .cancel');
    selectedCancelButton.addEventListener('click', function() {
        selectedProjectMenuTitle.textContent = '';
        selectedSaveProjectButton.textContent = '';
        selectedMenuCover.classList.remove('shown');
        selectedProjectMenu.classList.remove('shown');
    });

    const selectedTaskMenu = document.querySelector('.content .task-menu');
    const selectedTaskMenuTitle = document.querySelector('.task-menu .title');
    const selectedAddTaskButton = document.querySelector('.task-bar > .add-new');

    selectedAddTaskButton.addEventListener('click', function() {
        selectedTaskMenuTitle.textContent = 'Add a new task';
        selectedAddTaskButton.textContent = 'Add';
        selectedMenuCover.classList.add('shown');
        selectedTaskMenu.classList.add('shown');
    });

    const selectedTaskExitButton = document.querySelector('.task-menu .exit');
    selectedTaskExitButton.addEventListener('click', function() {
        selectedTaskMenuTitle.textContent = '';
        selectedAddTaskButton.textContent = '';
        selectedMenuCover.classList.remove('shown');
        selectedTaskMenu.classList.remove('shown');
    });

    const selectedTaskCancelButton = document.querySelector('.task-menu .cancel');
    selectedTaskCancelButton.addEventListener('click', function() {
        selectedTaskMenuTitle.textContent = '';
        selectedAddTaskButton.textContent = '';
        selectedMenuCover.classList.remove('shown');
        selectedTaskMenu.classList.remove('shown');
    });
}

