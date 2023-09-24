import { assets } from './assets.js';
import { Enum,createElementWithAttributes, isHTMLElement, showErrorModal, isNodeList, ACTIONS_PROJECTS, ACTIONS_TASKS } from './utils.js';

const ERR_HEADINGS = new Enum ({
    CONTENT: 'Error (webpage content)',
    MAIN_PAGE: 'Error (rendering main page)',
    MENU_TEMPLATE: 'Error (rendering menu template)',
    ERROR_MODAL: 'Error (rendering error modal)',
    REMOVE_MENU: 'Error (rendering remove confirmation menu)',
});

const ERR_MESSAGE = new Enum ({
    CONTENT_NOT_FOUND: 'Content element couldn\'t be found',
    HEADING_NOT_FOUND: 'Heading element couldn\'t be found',
    PARA_NOT_FOUND: 'Message element couldn\'t be found',
    MENU_COVER_NOT_FOUND: 'Menu cover couldn\'t be found',
    REMOVE_BUTTONS_NOT_FOUND: 'Buttons in the remove menu couldn\'t be found',
});

export function renderMainPage() {
    renderMainPageTemplate();
    renderProjectMenuTemplate();
    renderTaskMenuTemplate();
    renderRemoveConfirmationTemplate();
    renderErrorModal();
};

function renderMainPageTemplate() {
    const content = document.querySelector('.content');
    if (!isHTMLElement(content)) {
        showErrorModal([ERR_HEADINGS.MAIN_PAGE, ERR_MESSAGE.CONTENT_NOT_FOUND]);
        return;
    }

    const header = createElementWithAttributes('header', {}, content);

    const sidebarIcon = createElementWithAttributes('img', {
        alt: 'Sidebar menu icon',
        class: 'sidebar-icon hidden'
    }, header);
    sidebarIcon.src = assets.sidebarIconPath;

    const heading = createElementWithAttributes('div', {class: 'heading'}, header);

    const logoIcon = createElementWithAttributes('img', { 
        class: 'logo',
        alt: 'TrackIt logo'}, heading);
    logoIcon.src = assets.logoIconPath;

    const headingText = createElementWithAttributes('h1', {}, heading);
    headingText.textContent = 'TrackIt';

    const emptyDiv = createElementWithAttributes('div', {class: 'empty'}, header);

    const viewOptionsIcon = createElementWithAttributes('img', { 
        alt: 'View Options logo',
        class: 'options'
    }, header);
    viewOptionsIcon.src = assets.viewOptionsIconPath;

    const sidebar = createElementWithAttributes('aside', {}, content);

    const barTypes = createElementWithAttributes('div', {class: 'bar-types'}, sidebar);

    const tasksAll = createElementWithAttributes('div', {class: 'tasks-all'}, barTypes);
    tasksAll.setAttribute('data-group-id', 'all');

    const tasksAllImage = createElementWithAttributes('img', { 
        alt: 'All tasks icon'
    }, tasksAll);
    tasksAllImage.src = assets.tasksAllImagePath;

    const tasksAllText = createElementWithAttributes('span', {}, tasksAll);
    tasksAllText.textContent = 'All';

    const tasksToday = createElementWithAttributes('div', {class: 'tasks-today'}, barTypes);
    tasksToday.setAttribute('data-group-id', 'today');

    const tasksTodayImage = createElementWithAttributes('img', {
        alt: 'Today tasks icon'
    }, tasksToday);
    tasksTodayImage.src = assets.tasksTodayImagePath;

    const tasksTodayText = createElementWithAttributes('span', {}, tasksToday);
    tasksTodayText.textContent = 'Today';

    const tasksWeek = createElementWithAttributes('div', {class: 'tasks-week'}, barTypes);
    tasksWeek.setAttribute('data-group-id', 'week');

    const tasksWeekImage = createElementWithAttributes('img', {
        alt: 'Week tasks icon'
    }, tasksWeek);
    tasksWeekImage.src = assets.tasksWeekImagePath;

    const tasksWeekText = createElementWithAttributes('span', {}, tasksWeek);
    tasksWeekText.textContent = 'Week';

    const tasksCompleted = createElementWithAttributes('div', {class: 'tasks-completed'}, barTypes);
    tasksCompleted.setAttribute('data-group-id', 'completed');

    const tasksCompletedImage = createElementWithAttributes('img', {
        alt: 'Completed tasks icon'
    }, tasksCompleted);
    tasksCompletedImage.src = assets.tasksCompletedImagePath;

    const tasksCompletedText = createElementWithAttributes('span', {}, tasksCompleted);
    tasksCompletedText.textContent = 'Completed';

    const tasksOverdue = createElementWithAttributes('div', {class: 'tasks-overdue'}, barTypes);
    tasksOverdue.setAttribute('data-group-id', 'overdue');

    const tasksOverdueImage = createElementWithAttributes('img', {
        alt: 'Overdue tasks icon'
    }, tasksOverdue);
    tasksOverdueImage.src = assets.tasksOverdueImagePath;

    const tasksOverdueText = createElementWithAttributes('span', {}, tasksOverdue);
    tasksOverdueText.textContent = 'Overdue';

    const barProjects = createElementWithAttributes('div', {class: 'bar-projects'}, sidebar);

    const projectsBarHeader = createElementWithAttributes('div', {class: 'header'}, barProjects);

    const projectsBarHeaderImage = createElementWithAttributes('img', {
        alt: 'Projects icon'
    }, projectsBarHeader);
    projectsBarHeaderImage.src = assets.projectsBarHeaderImagePath;

    const projectsBarHeaderText = createElementWithAttributes('span', {}, projectsBarHeader);
    projectsBarHeaderText.textContent = 'Projects';

    const projectsBarHeaderAddImage = createElementWithAttributes('img', {
        alt: 'Add new project icon',
        class: 'add-new',
    }, projectsBarHeader);
    projectsBarHeaderAddImage.src = assets.projectsBarHeaderAddImagePath;

    projectsBarHeaderAddImage.setAttribute('data-project-action', ACTIONS_PROJECTS.ADD_NEW);

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
        alt: 'All tasks icon'
    }, mainHeadBox);
    mainHeadImage.src = assets.mainHeadImagePath;

    const mainHeadText = createElementWithAttributes('span', {}, mainHeadBox);
    mainHeadText.textContent = "All";

    const mainTaskBar = createElementWithAttributes('div', {class: 'task-bar'}, main);

    const mainTaskNumber = createElementWithAttributes('div', {class: 'task-number'}, mainTaskBar);
    
    const taskBarText = createElementWithAttributes('span', {}, mainTaskNumber);
    taskBarText.textContent = 'Tasks';

    const addNewTaskIcon = createElementWithAttributes('button', { 
        class: 'add-new',
    }, mainTaskBar);
    addNewTaskIcon.ariaLabel = 'Add new task';
    addNewTaskIcon.style.backgroundImage = `url(${assets.addNewTaskIconPath})`;

    addNewTaskIcon.setAttribute('data-task-action', ACTIONS_TASKS.ADD_NEW);

    const taskList = createElementWithAttributes('ul', {class: 'task-list'}, main);

    const pageMenuBox = createElementWithAttributes('div', {class: 'page-menu', }, main);

    const firstPageIcon = createElementWithAttributes('img', {
        alt: 'First page icon',
        class: 'first-page'
    }, pageMenuBox);
    firstPageIcon.src = assets.firstPageIconPath;

    const previousPageIcon = createElementWithAttributes('img', {
        alt: 'Previous page icon',
        class: 'previous-page'
    }, pageMenuBox);
    previousPageIcon.src = assets.previousPageIconPath;

    const inputPage = createElementWithAttributes('input', {
        type: 'number',
        min: "1",
        max: "99", 
    }, pageMenuBox);

    const nextPageIcon = createElementWithAttributes('img', {
        alt: 'Next page icon',
        class: 'next-page'
    }, pageMenuBox);
    nextPageIcon.src = assets.nextPageIconPath;

    const lastPageIcon = createElementWithAttributes('img', {
        alt: 'Last page icon',
        class: 'last-page'
    }, pageMenuBox);
    lastPageIcon.src = assets.lastPageIconPath;
}

function renderProjectMenuTemplate() {
    const content = document.querySelector('.content');
    if (!isHTMLElement(content)) {
        showErrorModal([ERR_HEADINGS.MENU_TEMPLATE, ERR_MESSAGE.CONTENT_NOT_FOUND]);
        return;
    }

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
        alt: 'Exit icon'
    }, projectMenuTitleBox);
    projectMenuExitIcon.src = assets.projectMenuExitIconPath;

    const projectMenuForm = createElementWithAttributes('form', {}, projectMenu);
    
    const formNameLabel = createElementWithAttributes('label', {
        for: 'project-name'
    }, projectMenuForm);
    formNameLabel.textContent = 'Name*:';

    const formName = createElementWithAttributes('input', {
        type: 'text',
        id: 'project-name',
        name: 'name',
        required: 'required'
    }, projectMenuForm);

    const formIconFieldset = createElementWithAttributes('fieldset', {
    }, projectMenuForm);
    const formIconLegend = createElementWithAttributes('legend', {}, formIconFieldset);
    formIconLegend.textContent = 'Icon*:'

    const inputCategoryJob = createElementWithAttributes('input', {
        id: 'project-category-job',
        type: 'radio',
        name: 'iconURL',
        value: './originals/category-job.svg',
    }, formIconFieldset);
    inputCategoryJob.ariaRequired = true;
    inputCategoryJob.setAttribute('data-alt-text', 'Category Job icon');

    const iconCategoryJobLabel = createElementWithAttributes('label', {
        for: 'project-category-job'
    }, formIconFieldset);

    const iconCategoryJob = createElementWithAttributes('img', {
        alt: 'Category Job icon'
    }, iconCategoryJobLabel);
    iconCategoryJob.src = assets.iconCategoryJobPath;

    const inputCategoryStudy = createElementWithAttributes('input', {
        id: 'project-category-study',
        type: 'radio',
        name: 'iconURL',
        value: './originals/category-study.svg',
    }, formIconFieldset);
    inputCategoryStudy.setAttribute('data-alt-text', 'Category Study icon');

    const iconCategoryStudyLabel = createElementWithAttributes('label', {
        for: 'project-category-study',
    }, formIconFieldset);

    const iconCategoryStudy = createElementWithAttributes('img', {
        alt: 'Category Study icon'
    }, iconCategoryStudyLabel);
    iconCategoryStudy.src = assets.iconCategoryStudyPath;

    const inputCategoryGift = createElementWithAttributes('input', {
        id: 'project-category-gift',
        type: 'radio',
        name: 'iconURL',
        value: './originals/category-gift.svg',
    }, formIconFieldset);
    inputCategoryGift.setAttribute('data-alt-text', 'Category Gift icon');

    const iconCategoryGiftLabel = createElementWithAttributes('label', {
        for: 'project-category-gift',
    }, formIconFieldset);

    const iconCategoryGift = createElementWithAttributes('img', {
        alt: 'Category Gift icon'
    }, iconCategoryGiftLabel);
    iconCategoryGift.src = assets.iconCategoryGiftPath;

    const inputCategoryInternational = createElementWithAttributes('input', {
        id: 'project-category-international-activity',
        type: 'radio',
        name: 'iconURL',
        value: './originals/category-international-activity.svg',
    }, formIconFieldset);
    inputCategoryInternational.setAttribute('data-alt-text', 'Category International activity icon');

    const iconCategoryInternationalLabel = createElementWithAttributes('label', {
        for: 'project-category-international-activity',
    }, formIconFieldset);

    const iconCategoryInternational = createElementWithAttributes('img', {
        alt: 'Category International activity icon'
    }, iconCategoryInternationalLabel);
    iconCategoryInternational.src = assets.iconCategoryInternationalPath;

    const inputCategoryPeople = createElementWithAttributes('input', {
        id: 'project-category-people',
        type: 'radio',
        name: 'iconURL',
        value: './originals/category-people.svg',
    }, formIconFieldset);
    inputCategoryPeople.setAttribute('data-alt-text', 'Category People icon');

    const iconCategoryPeopleLabel = createElementWithAttributes('label', {
        for: 'project-category-people',
    }, formIconFieldset);

    const iconCategoryPeople = createElementWithAttributes('img', {
        alt: 'Category People icon'
    }, iconCategoryPeopleLabel);
    iconCategoryPeople.src = assets.iconCategoryPeoplePath;

    const inputCategoryScience = createElementWithAttributes('input', {
        id: 'project-category-science',
        type: 'radio',
        name: 'iconURL',
        value: './originals/category-science.svg',
    }, formIconFieldset);
    inputCategoryScience.setAttribute('data-alt-text', 'Category Science icon');

    const iconCategoryScienceLabel = createElementWithAttributes('label', {
        for: 'project-category-science',
    }, formIconFieldset);

    const iconCategoryScience = createElementWithAttributes('img', {
        alt: 'Category Science icon'
    }, iconCategoryScienceLabel);
    iconCategoryScience.src = assets.iconCategorySciencePath;

    const inputCategoryIT = createElementWithAttributes('input', {
        id: 'project-category-it',
        type: 'radio',
        name: 'iconURL',
        value: './originals/category-it.svg',
    }, formIconFieldset);
    inputCategoryIT.setAttribute('data-alt-text', 'Category IT icon');

    const iconCategoryITLabel = createElementWithAttributes('label', {
        for: 'project-category-it',
    }, formIconFieldset);

    const iconCategoryIT = createElementWithAttributes('img', {
        alt: 'Category IT icon'
    }, iconCategoryITLabel);
    iconCategoryIT.src = assets.iconCategoryITPath;

    const inputCategoryOther = createElementWithAttributes('input', {
        id: 'project-category-other',
        type: 'radio',
        name: 'iconURL',
        value: './originals/category-other.svg',
    }, formIconFieldset);
    inputCategoryOther.setAttribute('data-alt-text', 'Category Other icon');

    const iconCategoryOtherLabel = createElementWithAttributes('label', {
        for: 'project-category-other',
    }, formIconFieldset);

    const iconCategoryOther = createElementWithAttributes('img', {
        alt: 'Category Other icon'
    }, iconCategoryOtherLabel);
    iconCategoryOther.src = assets.iconCategoryOtherPath;

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
    if (!isHTMLElement(content)) {
        showErrorModal([ERR_HEADINGS.MENU_TEMPLATE, ERR_MESSAGE.CONTENT_NOT_FOUND]);
        return;
    }

    const taskMenu = createElementWithAttributes('div', {
        class: 'task-menu'
    }, content);

    const taskMenuTitleBox = createElementWithAttributes('div', {
        class: 'title-box'
    }, taskMenu);

    const taskMenuTitle = createElementWithAttributes('span', {
        class: 'title'
    }, taskMenuTitleBox);

    const taskMenuExitIcon = createElementWithAttributes('button', {
        class: 'exit',
    }, taskMenuTitleBox);
    taskMenuExitIcon.ariaLabel = 'Exit task menu';
    taskMenuExitIcon.style.backgroundImage = `url(${assets.taskMenuExitIconPath})`;

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
    formDueDateLabel.textContent = 'Due Date*:'

    const formDueDate = createElementWithAttributes('input', {
        type: 'date',
        id: 'task-dueDate',
        name: 'dueDate',
    }, taskMenuForm);

    const formPriorityFieldset = createElementWithAttributes('fieldset', {
        class: 'priority'
    }, taskMenuForm);

    const formPriorityLegend = createElementWithAttributes('legend', {}, formPriorityFieldset);
    formPriorityLegend.textContent = 'What is the task\'s priority?*'

    const radioPriorityHigh = createElementWithAttributes('input', {
        id: 'priority-high',
        type: 'radio',
        name: 'priority',
        value: '2'
    }, formPriorityFieldset);
    radioPriorityHigh.ariaRequired = true;

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

function renderRemoveConfirmationTemplate() {
    const content = document.querySelector('.content');
    const menuCover = document.querySelector('.menu-cover');
    if (!isHTMLElement(content)) {
        showErrorModal([ERR_HEADINGS.CONTENT, ERR_MESSAGE.CONTENT_NOT_FOUND]);
        return;
    }
    if (!isHTMLElement(menuCover)) {
        showErrorModal([ERR_HEADINGS.ERROR_MODAL, ERR_MESSAGE.MENU_COVER_NOT_FOUND]);
        return;
    }

    const removeMenu = createElementWithAttributes('div', {
        class: 'remove-menu',
    }, content);

    const exitIcon = createElementWithAttributes('button', {
        class: 'exit',
        alt: 'Exit icon'
    }, removeMenu);
    exitIcon.src = assets.taskMenuExitIconPath;

    const heading  = createElementWithAttributes('h2', {
        class: 'remove-heading',
    }, removeMenu);
    heading.textContent = '';

    const message  = createElementWithAttributes('p', {
        class: 'remove-message',
    }, removeMenu);
    message.textContent = '';

    const buttonConfirm = createElementWithAttributes('button', {
        class: 'remove-confirm',
    }, removeMenu);
    buttonConfirm.textContent = 'Yes';

    const buttonExit = createElementWithAttributes('button', {
        class: 'exit',
    }, removeMenu);
    buttonExit.textContent = 'Cancel';

    const buttons = removeMenu.querySelectorAll('button');
    buttons.forEach(btn => btn.addEventListener('click', (e) => hideRemoveMenu(e)));
    function hideRemoveMenu(e) {
        if (!isNodeList(buttons)) {
            showErrorModal([ERR_HEADINGS.REMOVE_MENU, ERR_MESSAGE.REMOVE_BUTTONS_NOT_FOUND]);
            return;
        }
        if (!isHTMLElement(menuCover)) {
            showErrorModal([ERR_HEADINGS.REMOVE_MENU, ERR_MESSAGE.MENU_COVER_NOT_FOUND]);
            return;
        }
        if (!isHTMLElement(heading)) {
            showErrorModal([ERR_HEADINGS.REMOVE_MENU, ERR_MESSAGE.HEADING_NOT_FOUND]);
            return;
        }
        if (!isHTMLElement(message)) {
            showErrorModal([ERR_HEADINGS.REMOVE_MENU, ERR_MESSAGE.PARA_NOT_FOUND]);
            return;
        }

        removeMenu.classList.remove('shown');
        menuCover.classList.remove('shown');
        heading.textContent = '';
        message.textContent = '';
    }
}

// message === [error type, error message];
// if the the error is not the system (app) error => error type === null 
function renderErrorModal() {
    const content = document.querySelector('.content');
    if (!isHTMLElement(content)) {
        showErrorModal([ERR_HEADINGS.CONTENT, ERR_MESSAGE.CONTENT_NOT_FOUND]);
        return;
    }

    const errorCover = createElementWithAttributes('div', {
        class: 'error-cover'
    }, content);

    const modal = createElementWithAttributes('div', {
        class: 'error-modal',
    }, content);

    const exitIcon = createElementWithAttributes('img', {
        class: 'exit',
        alt: 'Exit icon'
    }, modal);
    exitIcon.src = assets.taskMenuExitIconPath;

    const heading  = createElementWithAttributes('h2', {
        class: 'error-heading',
    }, modal);
    heading.textContent = '';

    const message  = createElementWithAttributes('p', {
        class: 'error-message',
    }, modal);
    message.textContent = '';

    const buttonExit = createElementWithAttributes('button', {
        class: 'exit',
    }, modal);
    buttonExit.textContent = 'OK';

    exitIcon.addEventListener('click', () => {
        if (!isHTMLElement(heading)) {
            showErrorModal([ERR_HEADINGS.ERROR_MODAL, ERR_MESSAGE.HEADING_NOT_FOUND]);
            return;
        }
        if (!isHTMLElement(message)) {
            showErrorModal([ERR_HEADINGS.ERROR_MODAL, ERR_MESSAGE.PARA_NOT_FOUND]);
            return;
        }

        modal.classList.remove('shown');
        errorCover.classList.remove('shown');
        heading.textContent = '';
        message.textContent = '';
    });
    buttonExit.addEventListener('click', () => {
        if (!isHTMLElement(heading)) {
            showErrorModal([ERR_HEADINGS.ERROR_MODAL, ERR_MESSAGE.HEADING_NOT_FOUND]);
            return;
        }
        if (!isHTMLElement(message)) {
            showErrorModal([ERR_HEADINGS.ERROR_MODAL, ERR_MESSAGE.PARA_NOT_FOUND]);
            return;
        }

        modal.classList.remove('shown');
        errorCover.classList.remove('shown');
        heading.textContent = '';
        message.textContent = '';
    });
}


