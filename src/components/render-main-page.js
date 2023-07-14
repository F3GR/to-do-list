import { checkIfCurrent, removeCurrentStatus, createElementWithAttributes } from './utils.js';
import { addEventListenersMainPage } from './event-listeners.js';

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

    const projectsMenu = createElementWithAttributes('div', {class: `projects-menu`}, barProjects);
    const projectsMenuImage = createElementWithAttributes('img', {
        src: '../src/originals/projects.svg',
        alt: `Projects icon`
    }, projectsMenu);
    const projectsMenuText = createElementWithAttributes('span', {}, projectsMenu);
    projectsMenuText.textContent = `Projects (0)`;
    const projectsMenuAddImage = createElementWithAttributes('img', {
        src: '../src/originals/add-new.svg',
        alt: `Add new project icon`,
        class: 'add-new',
    }, projectsMenu);

    const projectsList = createElementWithAttributes('ul', {class: `projects-list`}, barProjects);

    const exampleProject = createElementWithAttributes('li', { class: `project`, data: `0` }, projectsList);
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

    const mainTaskMenu = createElementWithAttributes('div', {class: `task-menu`}, main);

    const mainTaskNumber = createElementWithAttributes('div', {class: `task-number`}, mainTaskMenu);
    const taskMenuText = createElementWithAttributes('span', {}, mainTaskNumber);
    taskMenuText.textContent = `Tasks (0)`;

    const addNewTaskIcon = createElementWithAttributes('img', { 
        src: '../src/originals/add-new.svg',
        alt: `Add new Task icon`,
        class: 'add-new'
    }, mainTaskMenu);

    const taskList = createElementWithAttributes('ul', {class: `task-list`}, main);

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


    renderAddNewProjectMenu();
    addEventListenersMainPage();
};


export function renderAddNewProjectMenu() {
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
        for: 'title'
    }, projectMenuForm);
    formNameLabel.textContent = 'Title*:'
    const formName = createElementWithAttributes('input', {
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

    const buttonAddIcon = createElementWithAttributes('button', {
        class: 'add',
    }, buttonsGrid);
    buttonAddIcon.textContent = 'Add';

    const buttonCancelIcon = createElementWithAttributes('button', {
        class: 'cancel',
    }, buttonsGrid);
    buttonCancelIcon.textContent = 'Cancel';

}