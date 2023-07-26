import { ACTIONS, createElementWithAttributes } from './utils.js';

export function renderMainPage() {
    renderMainPageTemplate();
    renderProjectMenuTemplate();
    renderTaskMenuTemplate();
};

function renderMainPageTemplate() {
    const content = document.querySelector('.content');

    const header = createElementWithAttributes('header', {}, content);

    const sideBarIcon = createElementWithAttributes('img', {
        src: '../src/originals/menu.svg',
        alt: 'Sidebar menu icon',
        class: 'sidebar-icon hidden'
    }, header);

    const heading = createElementWithAttributes('div', {class: 'heading'}, header);

    const logoIcon = createElementWithAttributes('img', { 
        src: '../src/originals/fav-icon.svg',
        class: 'logo',
        alt: 'TrackIt logo'}, heading);

    const headingText = createElementWithAttributes('h1', {}, heading);
    headingText.textContent = 'TrackIt';

    const emptyDiv = createElementWithAttributes('div', {class: 'empty'}, header);

    const viewOptionsIcon = createElementWithAttributes('img', { 
        src: '../src/originals/view-options.svg',
        alt: 'View Options logo',
        class: 'options'
    }, header);

    const sidebar = createElementWithAttributes('aside', {}, content);

    const barTypes = createElementWithAttributes('div', {class: 'bar-types'}, sidebar);

    const tasksAll = createElementWithAttributes('div', {class: 'tasks-all'}, barTypes);
    tasksAll.setAttribute('data-group-id', 'all');
    const tasksAllImage = createElementWithAttributes('img', { 
        src: '../src/originals/calendar-all.svg',
        alt: 'All tasks icon'
    }, tasksAll);
    const tasksAllText = createElementWithAttributes('span', {}, tasksAll);
    tasksAllText.textContent = 'All';

    const tasksToday = createElementWithAttributes('div', {class: 'tasks-today'}, barTypes);
    tasksToday.setAttribute('data-group-id', 'today');
    const tasksTodayImage = createElementWithAttributes('img', {
        src: '../src/originals/calendar-today.svg',
        alt: 'Today tasks icon'
    }, tasksToday);
    const tasksTodayText = createElementWithAttributes('span', {}, tasksToday);
    tasksTodayText.textContent = 'Today';

    const tasksWeek = createElementWithAttributes('div', {class: 'tasks-week'}, barTypes);
    tasksWeek.setAttribute('data-group-id', 'week');
    const tasksWeekImage = createElementWithAttributes('img', {
        src: '../src/originals/calendar-week.svg',
        alt: 'Week tasks icon'
    }, tasksWeek);
    const tasksWeekText = createElementWithAttributes('span', {}, tasksWeek);
    tasksWeekText.textContent = 'Week';

    const tasksCompleted = createElementWithAttributes('div', {class: 'tasks-completed'}, barTypes);
    tasksCompleted.setAttribute('data-group-id', 'completed');
    const tasksCompletedImage = createElementWithAttributes('img', {
        src: '../src/originals/calendar-finished.svg',
        alt: 'Completed tasks icon'
    }, tasksCompleted);
    const tasksCompletedText = createElementWithAttributes('span', {}, tasksCompleted);
    tasksCompletedText.textContent = 'Completed';

    const tasksOverdue = createElementWithAttributes('div', {class: 'tasks-overdue'}, barTypes);
    tasksOverdue.setAttribute('data-group-id', 'overdue');
    const tasksOverdueImage = createElementWithAttributes('img', {
        src: '../src/originals/calendar-overdue.svg',
        alt: 'Overdue tasks icon'
    }, tasksOverdue);
    const tasksOverdueText = createElementWithAttributes('span', {}, tasksOverdue);
    tasksOverdueText.textContent = 'Overdue';

    const barProjects = createElementWithAttributes('div', {class: 'bar-projects'}, sidebar);

    const projectsBarHeader = createElementWithAttributes('div', {class: 'header'}, barProjects);
    const projectsBarHeaderImage = createElementWithAttributes('img', {
        src: '../src/originals/projects.svg',
        alt: 'Projects icon'
    }, projectsBarHeader);
    const projectsBarHeaderText = createElementWithAttributes('span', {}, projectsBarHeader);
    projectsBarHeaderText.textContent = 'Projects (0)';

    const projectsBarHeaderAddImage = createElementWithAttributes('img', {
        src: '../src/originals/add-new.svg',
        alt: 'Add new project icon',
        class: 'add-new',
    }, projectsBarHeader);
    projectsBarHeaderAddImage.setAttribute('data-project-action', ACTIONS.ADDNEW);

    const projectsList = createElementWithAttributes('ul', {class: 'projects-list'}, barProjects);

    const barFooter = createElementWithAttributes('div', {class: 'bar-footer'}, sidebar);

    const footerLink = createElementWithAttributes('a', {
        href: 'https://github.com/F3GR'
    }, barFooter);
    const footerText = createElementWithAttributes('span', {}, footerLink);
    footerText.textContent = '\u00A9 F3GR, 2023';

    const main = createElementWithAttributes('main', {}, content);

    const sidebarCover = createElementWithAttributes('div', {
        class: 'sidebar-cover'
    }, main);

    const mainHeadBox = createElementWithAttributes('div', {class: 'header'}, main);
    const mainHeadImage = createElementWithAttributes('img', { 
        src: '../src/originals/calendar-all.svg',
        alt: 'All tasks icon'
    }, mainHeadBox);
    const mainHeadText = createElementWithAttributes('span', {}, mainHeadBox);
    mainHeadText.textContent = "All";

    const mainTaskBar = createElementWithAttributes('div', {class: 'task-bar'}, main);

    const mainTaskNumber = createElementWithAttributes('div', {class: 'task-number'}, mainTaskBar);
    const taskBarText = createElementWithAttributes('span', {}, mainTaskNumber);
    taskBarText.textContent = 'Tasks (0)';

    const addNewTaskIcon = createElementWithAttributes('img', { 
        src: '../src/originals/add-new.svg',
        alt: 'Add new Task icon',
        class: 'add-new'
    }, mainTaskBar);
    addNewTaskIcon.setAttribute('data-task-action', ACTIONS.ADDNEW);

    const taskList = createElementWithAttributes('ul', {class: 'task-list'}, main);

    const pageMenuBox = createElementWithAttributes('div', {class: 'page-menu', }, main);

    const firstPageIcon = createElementWithAttributes('img', {
        src: '../src/originals/first-page.svg', 
        alt: 'First page icon',
        class: 'first-page'
    }, pageMenuBox);
    const previousPageIcon = createElementWithAttributes('img', {
        src: '../src/originals/previous-page.svg', 
        alt: 'Previous page icon',
        class: 'previous-page'
    }, pageMenuBox);
    const inputPage = createElementWithAttributes('input', {
        type: 'number',
        min: "1",
        max: "99", 
    }, pageMenuBox);
    const nextPageIcon = createElementWithAttributes('img', {
        src: '../src/originals/next-page.svg', 
        alt: 'Next page icon',
        class: 'next-page'
    }, pageMenuBox);
    const lastPageIcon = createElementWithAttributes('img', {
        src: '../src/originals/last-page.svg', 
        alt: 'Last page icon',
        class: 'last-page'
    }, pageMenuBox);
}

function renderProjectMenuTemplate() {
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

    const projectMenuForm = createElementWithAttributes('form', {}, projectMenu);
    
    const formNameLabel = createElementWithAttributes('label', {
        for: 'project-name'
    }, projectMenuForm);
    formNameLabel.textContent = 'Name*:'
    const formName = createElementWithAttributes('input', {
        type: 'text',
        id: 'project-name',
        name: 'name',
        required: 'required'
    }, projectMenuForm);

    const formIconFieldset = createElementWithAttributes('fieldset', {
        required: 'required'
    }, projectMenuForm);
    const formIconLegend = createElementWithAttributes('legend', {}, formIconFieldset);
    formIconLegend.textContent = 'Icon*:'

    const inputCategoryJob = createElementWithAttributes('input', {
        id: 'project-category-job',
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-job.svg',
    }, formIconFieldset);
    inputCategoryJob.setAttribute('data-alt-text', 'Category Job icon');
    const iconCategoryJobLabel = createElementWithAttributes('label', {
        for: 'project-category-job'
    }, formIconFieldset);
    const iconCategoryJob = createElementWithAttributes('img', {
        src: '../src/originals/category-job.svg',
        alt: 'Category Job icon'
    }, iconCategoryJobLabel);

    const inputCategoryStudy = createElementWithAttributes('input', {
        id: 'project-category-study',
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-study.svg',
    }, formIconFieldset);
    inputCategoryStudy.setAttribute('data-alt-text', 'Category Study icon');
    const iconCategoryStudyLabel = createElementWithAttributes('label', {
        for: 'project-category-study',
    }, formIconFieldset);
    const iconCategoryStudy = createElementWithAttributes('img', {
        src: '../src/originals/category-study.svg',
        alt: 'Category Study icon'
    }, iconCategoryStudyLabel);

    const inputCategoryGift = createElementWithAttributes('input', {
        id: 'project-category-gift',
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-gift.svg',
    }, formIconFieldset);
    inputCategoryGift.setAttribute('data-alt-text', 'Category Gift icon');
    const iconCategoryGiftLabel = createElementWithAttributes('label', {
        for: 'project-category-gift',
    }, formIconFieldset);
    const iconCategoryGift = createElementWithAttributes('img', {
        src: '../src/originals/category-gift.svg',
        alt: 'Category Gift icon'
    }, iconCategoryGiftLabel);

    const inputCategoryInternational = createElementWithAttributes('input', {
        id: 'project-category-international-activity',
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-international-activity.svg',
    }, formIconFieldset);
    inputCategoryInternational.setAttribute('data-alt-text', 'Category International activity icon');
    const iconCategoryInternationalLabel = createElementWithAttributes('label', {
        for: 'project-category-international-activity',
    }, formIconFieldset);
    const iconCategoryInternational = createElementWithAttributes('img', {
        src: '../src/originals/category-international-activity.svg',
        alt: 'Category International activity icon'
    }, iconCategoryInternationalLabel);

    const inputCategoryPeople = createElementWithAttributes('input', {
        id: 'project-category-people',
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-people.svg',
    }, formIconFieldset);
    inputCategoryPeople.setAttribute('data-alt-text', 'Category People icon');
    const iconCategoryPeopleLabel = createElementWithAttributes('label', {
        for: 'project-category-people',
    }, formIconFieldset);
    const iconCategoryPeople = createElementWithAttributes('img', {
        src: '../src/originals/category-people.svg',
        alt: 'Category People icon'
    }, iconCategoryPeopleLabel);

    const inputCategoryScience = createElementWithAttributes('input', {
        id: 'project-category-science',
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-science.svg',
    }, formIconFieldset);
    inputCategoryScience.setAttribute('data-alt-text', 'Category Science icon');
    const iconCategoryScienceLabel = createElementWithAttributes('label', {
        for: 'project-category-science',
    }, formIconFieldset);
    const iconCategoryScience = createElementWithAttributes('img', {
        src: '../src/originals/category-science.svg',
        alt: 'Category Science icon'
    }, iconCategoryScienceLabel);

    const inputCategoryIT = createElementWithAttributes('input', {
        id: 'project-category-it',
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-it.svg',
    }, formIconFieldset);
    inputCategoryIT.setAttribute('data-alt-text', 'Category IT icon');
    const iconCategoryITLabel = createElementWithAttributes('label', {
        for: 'project-category-it',
    }, formIconFieldset);
    const iconCategoryIT = createElementWithAttributes('img', {
        src: '../src/originals/category-it.svg',
        alt: 'Category IT icon'
    }, iconCategoryITLabel);

    const inputCategoryOther = createElementWithAttributes('input', {
        id: 'project-category-other',
        type: 'radio',
        name: 'iconURL',
        value: '../src/originals/category-other.svg',
    }, formIconFieldset);
    inputCategoryOther.setAttribute('data-alt-text', 'Category Other icon');
    const iconCategoryOtherLabel = createElementWithAttributes('label', {
        for: 'project-category-other',
    }, formIconFieldset);
    const iconCategoryOther = createElementWithAttributes('img', {
        src: '../src/originals/category-other.svg',
        alt: 'Category Other icon'
    }, iconCategoryOtherLabel);

    const buttonsGrid = createElementWithAttributes('div', {
        class: 'button-box',
    }, projectMenuForm);

    const buttonSubmit = createElementWithAttributes('button', {
        type: 'submit',
        class: 'submit'
    }, buttonsGrid);
    buttonSubmit.textContent = '';

    const buttonCancel = createElementWithAttributes('button', {
        class: 'cancel',
    }, buttonsGrid);
    buttonCancel.textContent = 'Cancel';
}

function renderTaskMenuTemplate() {
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

    const taskMenuExitIcon = createElementWithAttributes('img', {
        class: 'exit',
        src: '../src/originals/close.svg',
        alt: 'Exit icon'
    }, taskMenuTitleBox);

    const taskMenuForm = createElementWithAttributes('form', {
    }, taskMenu);

    const formTitleLabel = createElementWithAttributes('label', {
        for: 'task-title'
    }, taskMenuForm);
    formTitleLabel.textContent = 'Title*:'

    const formTitle = createElementWithAttributes('input', {
        type: 'text',
        id: 'task-title',
        name: 'title',
        required: 'required'
    }, taskMenuForm);

    const formDueDateLabel = createElementWithAttributes('label', {
        for: 'task-dueDate'
    }, taskMenuForm);
    formDueDateLabel.textContent = 'Due Date:'

    const formDueDate = createElementWithAttributes('input', {
        type: 'date',
        id: 'task-dueDate',
        name: 'dueDate',
    }, taskMenuForm);

    const formPriorityFieldset = createElementWithAttributes('fieldset', {
        class: 'priority'
    }, taskMenuForm);

    const formPriorityLegend = createElementWithAttributes('legend', {}, formPriorityFieldset);
    formPriorityLegend.textContent = 'What is the task\'s priority?'

    const radioPriorityHigh = createElementWithAttributes('input', {
        id: 'priority-high',
        type: 'radio',
        name: 'priority',
        value: '2'
    }, formPriorityFieldset);

    const labelPriorityHigh = createElementWithAttributes('label', {
        for: 'priority-high'
    }, formPriorityFieldset);
    labelPriorityHigh.textContent = 'High';

    const radioPriorityMedium = createElementWithAttributes('input', {
        id: 'priority-medium',
        type: 'radio',
        name: 'priority',
        value: '1'
    }, formPriorityFieldset);

    const labelPriorityMedium = createElementWithAttributes('label', {
        for: 'priority-medium'
    }, formPriorityFieldset);
    labelPriorityMedium.textContent = 'Medium';
    
    const radioPriorityNormal = createElementWithAttributes('input', {
        id: 'priority-normal',
        type: 'radio',
        name: 'priority',
        value: '0'
    }, formPriorityFieldset);

    const labelPriorityNormal = createElementWithAttributes('label', {
        for: 'priority-normal'
    }, formPriorityFieldset);
    labelPriorityNormal.textContent = 'Normal';

    const descriptionBox = createElementWithAttributes('div', {
        class: 'description-box',
    }, taskMenuForm);
    const descriptionLabel = createElementWithAttributes('label', {
        for: 'task-description',
    }, descriptionBox);
    descriptionLabel.textContent = 'Description:'
    const descriptionTextarea = createElementWithAttributes('textarea', {
        id: 'task-description',
        name: 'description',
        maxlength: '200'
    }, descriptionBox);

    const notesBox = createElementWithAttributes('div', {
        class: 'notes-box',
    }, taskMenuForm);
    const notesLabel = createElementWithAttributes('label', {
        for: 'task-notes',
    }, notesBox);
    notesLabel.textContent = 'Notes:'
    const notesTextarea = createElementWithAttributes('textarea', {
        id: 'task-notes',
        name: 'notes',
        maxlength: '100'
    }, notesBox);

    const buttonsGrid = createElementWithAttributes('div', {
        class: 'button-box',
    }, taskMenuForm);

    const buttonAdd = createElementWithAttributes('button', {
        type: 'submit',
        class: 'submit',
    }, buttonsGrid);

    const buttonCancel = createElementWithAttributes('button', {
        class: 'cancel',
    }, buttonsGrid);
    buttonCancel.textContent = 'Cancel';
}

