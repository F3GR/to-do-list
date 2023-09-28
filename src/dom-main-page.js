import { assets } from './assets.js';
import { Enum,createElementWithAttributes, isHTMLElement, showErrorModal, ACTIONS_PROJECTS, ACTIONS_TASKS, handleExitRemoveMenu, STANDARD_GROUPS, DEFAULT_GROUP } from './utils.js';

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

    const sidebarIcon = createElementWithAttributes('button', {
        class: 'sidebar-icon'
    }, header);
    sidebarIcon.ariaLabel = 'Sidebar menu';
    sidebarIcon.style.backgroundImage = `url(${assets.sidebarIconPath})`;

    const heading = createElementWithAttributes('div', {class: 'heading'}, header);

    const logoIcon = createElementWithAttributes('img', { 
        class: 'logo',
        alt: 'TrackIt logo'}, heading);
    logoIcon.src = assets.logoIconPath;

    const headingText = createElementWithAttributes('h1', {}, heading);
    headingText.textContent = 'TrackIt';

    const emptyDiv = createElementWithAttributes('div', {class: 'empty'}, header);

    const viewOptionsIcon = createElementWithAttributes('button', { 
        class: 'options'
    }, header);
    viewOptionsIcon.ariaLabel = 'View Options';
    viewOptionsIcon.style.backgroundImage = `url(${assets.viewOptionsIconPath})`;

    const sidebar = createElementWithAttributes('aside', {}, content);

    const barTypes = createElementWithAttributes('div', {class: 'bar-types'}, sidebar);

    const tasksAll = createElementWithAttributes('button', {class: 'tasks-all'}, barTypes);
    tasksAll.setAttribute('data-group-id', STANDARD_GROUPS.ALL);

    const imageTasksAll = createElementWithAttributes('img', {
        alt: 'All tasks',
        src: assets.tasksAllImagePath,
    }, tasksAll);

    const tasksAllText = createElementWithAttributes('span', {}, tasksAll);
    tasksAllText.textContent = 'All';

    const tasksToday = createElementWithAttributes('button', {class: 'tasks-today'}, barTypes);
    tasksToday.setAttribute('data-group-id', STANDARD_GROUPS.TODAY);

    const imagetasksToday = createElementWithAttributes('img', {
        alt: 'Tasks today',
        src: assets.tasksTodayImagePath,
    }, tasksToday);

    const tasksTodayText = createElementWithAttributes('span', {}, tasksToday);
    tasksTodayText.textContent = 'Today';

    const tasksWeek = createElementWithAttributes('button', {class: 'tasks-week'}, barTypes);
    tasksWeek.setAttribute('data-group-id', STANDARD_GROUPS.WEEK);

    const imageTasksWeekImage = createElementWithAttributes('img', {
        alt: 'Tasks this week',
        src: assets.tasksWeekImagePath,
    }, tasksWeek);

    const tasksWeekText = createElementWithAttributes('span', {}, tasksWeek);
    tasksWeekText.textContent = 'Week';

    const tasksCompleted = createElementWithAttributes('button', {class: 'tasks-completed'}, barTypes);
    tasksCompleted.setAttribute('data-group-id', STANDARD_GROUPS.COMPLETED);

    const imageTasksCompletedImage = createElementWithAttributes('img', {
        alt: 'Tasks completed',
        src: assets.tasksCompletedImagePath,
    }, tasksCompleted);

    const tasksCompletedText = createElementWithAttributes('span', {}, tasksCompleted);
    tasksCompletedText.textContent = 'Completed';

    const tasksOverdue = createElementWithAttributes('button', {class: 'tasks-overdue'}, barTypes);
    tasksOverdue.setAttribute('data-group-id', STANDARD_GROUPS.OVERDUE);

    const imageTasksOverdueImage = createElementWithAttributes('img', {
        alt: 'Tasks overdue',
        src: assets.tasksOverdueImagePath,
    }, tasksOverdue);

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

    const emptyDivProjectsBar = createElementWithAttributes('div', {}, projectsBarHeader);

    const projectsBarHeaderAddImage = createElementWithAttributes('button', {
        class: 'add-new',
    }, projectsBarHeader);
    projectsBarHeaderAddImage.ariaLabel = 'Add new project';
    projectsBarHeaderAddImage.style.backgroundImage = `url(${assets.projectsBarHeaderAddImagePath})`;

    projectsBarHeaderAddImage.setAttribute('data-project-action', ACTIONS_PROJECTS.ADD_NEW);

    const projectsList = createElementWithAttributes('ul', {class: 'projects-list'}, barProjects);

    const projectsBarNavBox = createElementWithAttributes('div', {class: 'projects-nav'}, barProjects);

    const previousProjectsPageIcon = createElementWithAttributes('button', {
        class: 'projects-previous-page'
    }, projectsBarNavBox);
    previousProjectsPageIcon.ariaLabel = 'Previous projects page';
    previousProjectsPageIcon.style.backgroundImage = `url(${assets.previousPageIconPath})`;

    const projectsPagesNav = createElementWithAttributes('span', {
        class: 'projects-pages-nums',
    }, projectsBarNavBox);

    const nextProjectsPageIcon = createElementWithAttributes('button', {
        class: 'projects-next-page'
    }, projectsBarNavBox);
    nextProjectsPageIcon.ariaLabel = 'Next projects page';
    nextProjectsPageIcon.style.backgroundImage = `url(${assets.nextPageIconPath})`;

    const barFooter = createElementWithAttributes('div', {class: 'bar-footer'}, sidebar);

    const footerLink = createElementWithAttributes('a', {
        href: 'https://github.com/F3GR'
    }, barFooter);
    const footerText = createElementWithAttributes('span', {}, footerLink);
    footerText.textContent = 'F3GR, 2023';

    const main = createElementWithAttributes('main', {}, content);

    const sidebarCover = createElementWithAttributes('div', {
        class: 'sidebar-cover'
    }, main);

    const mainHeadBox = createElementWithAttributes('div', {class: 'header'}, main);

    const mainHeadImage = createElementWithAttributes('img', { 
        alt: 'All tasks icon'
    }, mainHeadBox);
    mainHeadImage.src = assets.mainHeadImagePath;

    const mainHeadText = createElementWithAttributes('h2', {}, mainHeadBox);
    mainHeadText.textContent = `${DEFAULT_GROUP.charAt(0).toUpperCase()}${DEFAULT_GROUP.slice(1)}`;

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

    const tasksList = createElementWithAttributes('ul', {class: 'task-list'}, main);

    const taskPageMenuBox = createElementWithAttributes('div', {class: 'page-menu', }, main);

    const previousTasksPageIcon = createElementWithAttributes('button', {
        class: 'tasks-previous-page'
    }, taskPageMenuBox);
    previousTasksPageIcon.ariaLabel = 'Previous tasks page';
    previousTasksPageIcon.style.backgroundImage = `url(${assets.previousPageIconPath})`;

    const tasksPagesNav = createElementWithAttributes('span', {
        class: 'tasks-pages-nums',
    }, taskPageMenuBox);

    const nextTasksPageIcon = createElementWithAttributes('button', {
        class: 'tasks-next-page'
    }, taskPageMenuBox);
    nextTasksPageIcon.ariaLabel = 'Next tasks page';
    nextTasksPageIcon.style.backgroundImage = `url(${assets.nextPageIconPath})`;
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
        class: 'title'
    }, projectMenu);

    const projectMenuTitle = createElementWithAttributes('h3', {
        class: 'title-text'
    }, projectMenuTitleBox);
    projectMenuTitle.textContent = '';

    const projectMenuExitIcon = createElementWithAttributes('button', {
        class: 'exit',
    }, projectMenuTitleBox);
    projectMenuExitIcon.ariaLabel = 'Exit project menu';
    projectMenuExitIcon.style.backgroundImage = `url(${assets.projectMenuExitIconPath})`;

    const projectMenuForm = createElementWithAttributes('form', {}, projectMenu);

    const asteriskRequiredName = document.createElement('span');
    asteriskRequiredName.textContent = '*';
    asteriskRequiredName.classList.add('asterisk-required');
    
    const formNameLabel = createElementWithAttributes('label', {
        for: 'project-name'
    }, projectMenuForm);
    formNameLabel.appendChild(document.createTextNode('Name'));
    formNameLabel.appendChild(asteriskRequiredName);
    formNameLabel.appendChild(document.createTextNode(':'));

    const formName = createElementWithAttributes('input', {
        type: 'text',
        id: 'project-name',
        name: 'name',
        required: 'required',
        minlength: 1,
        maxlength: 100,
    }, projectMenuForm);

    const asteriskRequiredIcon = document.createElement('span');
    asteriskRequiredIcon.textContent = '*';
    asteriskRequiredIcon.classList.add('asterisk-required');

    const formIconFieldset = createElementWithAttributes('fieldset', {
    }, projectMenuForm);
    const formIconLegend = createElementWithAttributes('legend', {}, formIconFieldset);
    formIconLegend.appendChild(document.createTextNode('Icon'));
    formIconLegend.appendChild(asteriskRequiredIcon);
    formIconLegend.appendChild(document.createTextNode(':'));

    const containerIconOptions = createElementWithAttributes('div', {
        class: 'project-options'
    }, formIconFieldset);

    const containerCategoryJob = createElementWithAttributes('div', {
        class: 'project-icon-option'
    }, containerIconOptions);
    containerCategoryJob.ariaLabel = 'Category Job';
    containerCategoryJob.style.backgroundImage = `url(${assets.iconCategoryJobPath})`;

    const iconCategoryJobLabel = createElementWithAttributes('label', {
        for: 'project-category-job'
    }, containerCategoryJob);

    const inputCategoryJob = createElementWithAttributes('input', {
        id: 'project-category-job',
        type: 'radio',
        name: 'iconURL',
        value: './assets/category-job.svg',
    }, containerCategoryJob);
    inputCategoryJob.ariaRequired = true;
    inputCategoryJob.setAttribute('data-alt-text', 'Category Job icon');

    const containerCategoryStudy = createElementWithAttributes('div', {
        class: 'project-icon-option'
    }, containerIconOptions);
    containerCategoryStudy.ariaLabel = 'Category Study';
    containerCategoryStudy.style.backgroundImage = `url(${assets.iconCategoryStudyPath})`;

    const iconCategoryStudyLabel = createElementWithAttributes('label', {
        for: 'project-category-study',
    }, containerCategoryStudy);

    const inputCategoryStudy = createElementWithAttributes('input', {
        id: 'project-category-study',
        type: 'radio',
        name: 'iconURL',
        value: './assets/category-study.svg',
    }, containerCategoryStudy);
    inputCategoryStudy.setAttribute('data-alt-text', 'Category Study icon');

    const containerCategoryGift = createElementWithAttributes('div', {
        class: 'project-icon-option'
    }, containerIconOptions);
    containerCategoryGift.ariaLabel = 'Category Gift';
    containerCategoryGift.style.backgroundImage = `url(${assets.iconCategoryGiftPath})`;

    const iconCategoryGiftLabel = createElementWithAttributes('label', {
        for: 'project-category-gift',
    }, containerCategoryGift);

    const inputCategoryGift = createElementWithAttributes('input', {
        id: 'project-category-gift',
        type: 'radio',
        name: 'iconURL',
        value: './assets/category-gift.svg',
    }, containerCategoryGift);
    inputCategoryGift.setAttribute('data-alt-text', 'Category Gift icon');

    const containerCategoryInternational = createElementWithAttributes('div', {
        class: 'project-icon-option'
    }, containerIconOptions);
    containerCategoryInternational.ariaLabel = 'Category International activity';
    containerCategoryInternational.style.backgroundImage = `url(${assets.iconCategoryInternationalPath})`;

    const iconCategoryInternationalLabel = createElementWithAttributes('label', {
        for: 'project-category-international-activity',
    }, containerCategoryInternational);

    const inputCategoryInternational = createElementWithAttributes('input', {
        id: 'project-category-international-activity',
        type: 'radio',
        name: 'iconURL',
        value: './assets/category-international-activity.svg',
    }, containerCategoryInternational);
    inputCategoryInternational.setAttribute('data-alt-text', 'Category International activity icon');

    const containerCategoryPeople = createElementWithAttributes('div', {
        class: 'project-icon-option'
    }, containerIconOptions);
    containerCategoryPeople.ariaLabel = 'Category People';
    containerCategoryPeople.style.backgroundImage = `url(${assets.iconCategoryPeoplePath})`;

    const iconCategoryPeopleLabel = createElementWithAttributes('label', {
        for: 'project-category-people',
    }, containerCategoryPeople);

    const inputCategoryPeople = createElementWithAttributes('input', {
        id: 'project-category-people',
        type: 'radio',
        name: 'iconURL',
        value: './assets/category-people.svg',
    }, containerCategoryPeople);
    inputCategoryPeople.setAttribute('data-alt-text', 'Category People icon');

    const containerCategoryScience = createElementWithAttributes('div', {
        class: 'project-icon-option'
    }, containerIconOptions);
    containerCategoryScience.ariaLabel = 'Category Science';
    containerCategoryScience.style.backgroundImage = `url(${assets.iconCategorySciencePath})`;

    const iconCategoryScienceLabel = createElementWithAttributes('label', {
        for: 'project-category-science',
    }, containerCategoryScience);

    const inputCategoryScience = createElementWithAttributes('input', {
        id: 'project-category-science',
        type: 'radio',
        name: 'iconURL',
        value: './assets/category-science.svg',
    }, containerCategoryScience);
    inputCategoryScience.setAttribute('data-alt-text', 'Category Science icon');

    const containerCategoryIT = createElementWithAttributes('div', {
        class: 'project-icon-option'
    }, containerIconOptions);
    containerCategoryIT.ariaLabel = 'Category IT';
    containerCategoryIT.style.backgroundImage = `url(${assets.iconCategoryITPath})`;

    const iconCategoryITLabel = createElementWithAttributes('label', {
        for: 'project-category-it',
    }, containerCategoryIT);

    const inputCategoryIT = createElementWithAttributes('input', {
        id: 'project-category-it',
        type: 'radio',
        name: 'iconURL',
        value: './assets/category-it.svg',
    }, containerCategoryIT);
    inputCategoryIT.setAttribute('data-alt-text', 'Category IT icon');

    const containerCategoryOther = createElementWithAttributes('div', {
        class: 'project-icon-option'
    }, containerIconOptions);
    containerCategoryOther.ariaLabel = 'Category Other';
    containerCategoryOther.style.backgroundImage = `url(${assets.iconCategoryOtherPath})`;

    const iconCategoryOtherLabel = createElementWithAttributes('label', {
        for: 'project-category-other',
    }, containerCategoryOther);

    const inputCategoryOther = createElementWithAttributes('input', {
        id: 'project-category-other',
        type: 'radio',
        name: 'iconURL',
        value: './assets/category-other.svg',
    }, containerCategoryOther);
    inputCategoryOther.setAttribute('data-alt-text', 'Category Other icon');

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
        class: 'title'
    }, taskMenu);

    const taskMenuTitle = createElementWithAttributes('h3', {
        class: 'title-text'
    }, taskMenuTitleBox);

    const taskMenuExitIcon = createElementWithAttributes('button', {
        class: 'exit',
    }, taskMenuTitleBox);
    taskMenuExitIcon.ariaLabel = 'Exit task menu';
    taskMenuExitIcon.style.backgroundImage = `url(${assets.taskMenuExitIconPath})`;

    const taskMenuForm = createElementWithAttributes('form', {
    }, taskMenu);

    const titleBox = createElementWithAttributes('div', {
        class: 'title-box'
    }, taskMenuForm);

    const asteriskRequiredTitle = document.createElement('span');
    asteriskRequiredTitle.textContent = '*';
    asteriskRequiredTitle.classList.add('asterisk-required');

    const formTitleLabel = createElementWithAttributes('label', {
        for: 'task-title'
    }, titleBox);
    formTitleLabel.appendChild(document.createTextNode('Title'));
    formTitleLabel.appendChild(asteriskRequiredTitle);
    formTitleLabel.appendChild(document.createTextNode(':'));

    const formTitle = createElementWithAttributes('input', {
        type: 'text',
        id: 'task-title',
        name: 'title',
        required: 'required',
        minlength: 1,
        maxlength: 100,
    }, titleBox);

    const dueDateBox = createElementWithAttributes('div', {
        class: 'due-date-box'
    }, taskMenuForm);

    const asteriskRequiredDueDate = document.createElement('span');
    asteriskRequiredDueDate.textContent = '*';
    asteriskRequiredDueDate.classList.add('asterisk-required');

    const formDueDateLabel = createElementWithAttributes('label', {
        for: 'task-dueDate'
    }, dueDateBox);
    formDueDateLabel.appendChild(document.createTextNode('Due Date'));
    formDueDateLabel.appendChild(asteriskRequiredDueDate);
    formDueDateLabel.appendChild(document.createTextNode(':'));

    const formDueDate = createElementWithAttributes('input', {
        type: 'date',
        id: 'task-dueDate',
        name: 'dueDate',
        required: 'required',
    }, dueDateBox);

    const formPriorityFieldset = createElementWithAttributes('fieldset', {
        class: 'priority'
    }, taskMenuForm);

    const asteriskRequiredPriority = document.createElement('span');
    asteriskRequiredPriority.textContent = '*';
    asteriskRequiredPriority.classList.add('asterisk-required');

    const formPriorityLegend = createElementWithAttributes('legend', {}, formPriorityFieldset);
    formPriorityLegend.appendChild(document.createTextNode('What is the task\'s priority'));
    formPriorityLegend.appendChild(asteriskRequiredPriority);
    formPriorityLegend.appendChild(document.createTextNode('?'));

    const boxRaradioPriorityHigh = createElementWithAttributes('div', {
        class: 'priority-high-box'
    }, formPriorityFieldset);

    const radioPriorityHigh = createElementWithAttributes('input', {
        id: 'priority-high',
        type: 'radio',
        name: 'priority',
        value: '2',
    }, boxRaradioPriorityHigh);
    radioPriorityHigh.ariaRequired = true;

    const labelPriorityHigh = createElementWithAttributes('label', {
        for: 'priority-high'
    }, boxRaradioPriorityHigh);
    labelPriorityHigh.textContent = 'High';

    const boxRaradioPriorityMedium = createElementWithAttributes('div', {
        class: 'priority-medium-box'
    }, formPriorityFieldset);

    const radioPriorityMedium = createElementWithAttributes('input', {
        id: 'priority-medium',
        type: 'radio',
        name: 'priority',
        value: '1'
    }, boxRaradioPriorityMedium);

    const labelPriorityMedium = createElementWithAttributes('label', {
        for: 'priority-medium'
    }, boxRaradioPriorityMedium);
    labelPriorityMedium.textContent = 'Medium';

    const boxRaradioPriorityNormal = createElementWithAttributes('div', {
        class: 'priority-normal-box'
    }, formPriorityFieldset);
    
    const radioPriorityNormal = createElementWithAttributes('input', {
        id: 'priority-normal',
        type: 'radio',
        name: 'priority',
        value: '0'
    }, boxRaradioPriorityNormal);

    const labelPriorityNormal = createElementWithAttributes('label', {
        for: 'priority-normal'
    }, boxRaradioPriorityNormal);
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

    const titleBox = createElementWithAttributes('div', {
        class: 'title',
    }, removeMenu);

    const heading  = createElementWithAttributes('h3', {
        class: 'remove-heading',
    }, titleBox);
    heading.textContent = '';

    const projectMenuExitIcon = createElementWithAttributes('button', {
        class: 'exit',
    }, titleBox);
    projectMenuExitIcon.ariaLabel = 'Exit confirmation menu';
    projectMenuExitIcon.style.backgroundImage = `url(${assets.projectMenuExitIconPath})`;

    const message  = createElementWithAttributes('p', {
        class: 'remove-message',
    }, removeMenu);
    message.textContent = '';

    const buttonBox = createElementWithAttributes('div', {
        class: 'button-box',
    }, removeMenu);

    const buttonConfirm = createElementWithAttributes('button', {
        class: 'remove-confirm',
    }, buttonBox);
    buttonConfirm.textContent = 'Yes';

    const buttonExit = createElementWithAttributes('button', {
        class: 'exit',
    }, buttonBox);
    buttonExit.textContent = 'Cancel';

    const buttons = removeMenu.querySelectorAll('.exit');
    buttons.forEach(btn => btn.addEventListener('click', (e) => handleExitRemoveMenu(e)));
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

    const titleBox = createElementWithAttributes('div', {
        class: 'title',
    }, modal);

    const heading  = createElementWithAttributes('h3', {
        class: 'error-heading',
    }, titleBox);
    heading.textContent = '';

    const exitIcon = createElementWithAttributes('button', {
        class: 'exit',
    }, titleBox);
    exitIcon.ariaLabel = 'Exit the error modal';
    exitIcon.style.backgroundImage = `url(${assets.taskMenuExitIconPath})`;

    const message  = createElementWithAttributes('p', {
        class: 'error-message',
    }, modal);
    message.textContent = '';

    const buttonExit = createElementWithAttributes('button', {
        class: 'exit-ok',
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


