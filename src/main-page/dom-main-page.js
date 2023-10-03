import { assets } from './assets.js';
import { Enum,createElementWithAttributes, isHTMLElement, showErrorModal, ACTIONS_PROJECTS, ACTIONS_TASKS, handleExitRemoveMenu, STANDARD_GROUPS, DEFAULT_GROUP, isPressedKey } from '../utils.js';

const ERR = new Enum ({
    ERROR_MODAL_CONTENT_NOT_FOUND: ['Application error', 'The content couldn\'t be found', 'Process: rendering the error modal template'],
    ERROR_MODAL_BUTTON_EXIT_NOT_FOUND: ['Application error', 'The Exit button couldn\'t be found', 'Process: applying events on the error modal'],
    ERROR_MODAL_HEADING_NOT_FOUND: ['Application error', 'The Heading couldn\'t be found', 'Process: applying events on the error modal'],
    ERROR_MODAL_PARA_NOT_FOUND: ['Application error', 'The Message couldn\'t be found', 'Process: applying events on the error modal'],
    REMOVE_MENU_CONTENT_NOT_FOUND: ['Application error', 'The content couldn\'t be found', 'Process: rendering the remove confirmation menu template'],
    PROJECT_MENU_TEMPLATE_CONTENT_NOT_FOUND: ['Application error', 'The content couldn\'t be found', 'Process: rendering the projects menu template'],
    TASK_MENU_TEMPLATE_CONTENT_NOT_FOUND: ['Application error', 'The content couldn\'t be found', 'Process: rendering the tasks menu template'],
    MAIN_PAGE_CONTENT_NOT_FOUND: ['Application error', 'The content couldn\'t be found', 'Process: rendering the main page'],
    FILTER_OPTIONS_MAIN_NOT_FOUND: ['Application error', 'The main panel couldn\'t be found', 'Process: rendering the filter options menu template'],
    CONTENT_CONTENT_NOT_FOUND: ['Application error', 'One or more core elements of the main page couldn\'t be found', 'Process: rendering the content of the main page'],
});

export function renderMainPage() {
    renderErrorModal();
    renderRemoveConfirmationTemplate();
    renderProjectMenuTemplate();
    renderTaskMenuTemplate();
    renderMainPageFrame();
    renderMainPageTemplate();
};

// message === [error type, error message, process when error occurred]; 
function renderErrorModal() {
    const content = document.querySelector('.content');
    if (!isHTMLElement(content)) {
        showErrorModal(ERR.ERROR_MODAL_CONTENT_NOT_FOUND);
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

    const process  = createElementWithAttributes('span', {
        class: 'error-process',
    }, modal);
    process.textContent = '';

    const buttonBox = createElementWithAttributes('div', {
        class: 'button-box',
    }, modal);

    const buttonExit = createElementWithAttributes('button', {
        class: 'exit-ok',
    }, buttonBox);
    buttonExit.textContent = 'OK';

    exitIcon.addEventListener('click', (e) => exitMenu(e));
    buttonExit.addEventListener('click', (e) => exitMenu(e));
    function exitMenu(e) {
        if (isPressedKey(e)) {
            if (!isHTMLElement(heading)) {
                showErrorModal(ERR.ERROR_MODAL_HEADING_NOT_FOUND);
                return;
            }
            if (!isHTMLElement(message)) {
                showErrorModal(ERR.ERROR_MODAL_PARA_NOT_FOUND);
                return;
            }
    
            modal.classList.remove('shown');
            errorCover.classList.remove('shown');
            heading.textContent = '';
            message.textContent = '';
        }
    }
}

function renderRemoveConfirmationTemplate() {
    const content = document.querySelector('.content');
    if (!isHTMLElement(content)) {
        showErrorModal(ERR.REMOVE_MENU_CONTENT_NOT_FOUND);
        return;
    }

    const menuCover = createElementWithAttributes('div', {
        class: 'menu-cover'
    }, content);

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
    buttons.forEach(btn => btn.addEventListener('keydown', (e) => handleExitRemoveMenu(e)));
    function handleExitRemoveMenu(e) {
        if (isPressedKey(e)) {        
            if (!isHTMLElement(menuCover) ||
            !isHTMLElement(removeMenu) ||
            !isHTMLElement(heading) ||
            !isHTMLElement(message)
            ) {
                showErrorModal(['Error (exiting the remove confirmation menu)', 'One or more menu components couldn\'t be found']);
                return;
            }
        
            removeMenu.classList.remove('shown');
            menuCover.classList.remove('shown');
            heading.textContent = '';
            message.textContent = '';
        
            removeMenu.project = null;
            removeMenu.task = null;
            removeMenu.setAttribute('data-project-id', null);
            removeMenu.setAttribute('data-task-id', null);
            removeMenu.setAttribute('data-task-action', null);
            removeMenu.setAttribute('data-project-action', null);
        }
    }
}

function renderProjectMenuTemplate() {
    const content = document.querySelector('.content');
    if (!isHTMLElement(content)) {
        showErrorModal(ERR.PROJECT_MENU_TEMPLATE_CONTENT_NOT_FOUND);
        return;
    }

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

    const projectNameBox = createElementWithAttributes('div', {
        class: 'title-box'
    }, projectMenuForm);

    const asteriskRequiredName = document.createElement('span');
    asteriskRequiredName.textContent = '*';
    asteriskRequiredName.classList.add('asterisk-required');
    
    const formNameLabel = createElementWithAttributes('label', {
        for: 'project-name'
    }, projectNameBox);
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
    }, projectNameBox);

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
        class: 'project-icon-option',
        tabindex: 0,
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
        class: 'project-icon-option',
        tabindex: 0,
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
        class: 'project-icon-option',
        tabindex: 0,
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
        class: 'project-icon-option',
        tabindex: 0,
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
        class: 'project-icon-option',
        tabindex: 0,
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
        class: 'project-icon-option',
        tabindex: 0,
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
        class: 'project-icon-option',
        tabindex: 0,
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
        class: 'project-icon-option',
        tabindex: 0,
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
        showErrorModal(ERR.TASK_MENU_TEMPLATE_CONTENT_NOT_FOUND);
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
        maxlength: '200'
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

function renderMainPageFrame() {
    const content = document.querySelector('.content');
    if (!isHTMLElement(content)) {
        showErrorModal(ERR.MAIN_PAGE_CONTENT_NOT_FOUND);
        return;
    }

    const header = createElementWithAttributes('header', {}, content);
    const sidebar = createElementWithAttributes('aside', {}, content);
    sidebar.setAttribute('current-group', DEFAULT_GROUP);
    const main = createElementWithAttributes('main', {}, content);
    const barTypes = createElementWithAttributes('div', {class: 'bar-types'}, sidebar);
    const barProjects = createElementWithAttributes('div', {class: 'bar-projects'}, sidebar);
    const projectsBarHeader = createElementWithAttributes('div', {class: 'header'}, barProjects);
    const projectsList = createElementWithAttributes('ul', {class: 'projects-list'}, barProjects);
    const barFooter = createElementWithAttributes('button', {class: 'bar-footer'}, sidebar);
    renderFilterOptionsMenu();
    const mainHeadBox = createElementWithAttributes('div', {class: 'header'}, main);
    const mainTaskBar = createElementWithAttributes('div', {class: 'task-bar'}, main);
    const tasksList = createElementWithAttributes('ul', {class: 'task-list'}, main);
}

function renderFilterOptionsMenu() {
    const main = document.querySelector('main');
    if (!isHTMLElement(main)) {
        showErrorModal(ERR.FILTER_OPTIONS_MAIN_NOT_FOUND);
        return;
    }

    const viewOptionsBox = createElementWithAttributes('div', {
        class: 'view-options-bar'
    }, main);

    const priorityContainer = createElementWithAttributes('div', {
        class: 'priority-main-box'
    }, viewOptionsBox);

    const priorityOptionsText = createElementWithAttributes('div', {
        class: 'priority-header'
    }, priorityContainer);
    priorityOptionsText.textContent = 'Priority:';

    const priorityBorderContainer = createElementWithAttributes('div', {
        class: 'priority-border-box'
    }, priorityContainer);

    const priorityHighBox = createElementWithAttributes('div', {
        class: 'priority-high-box option-button',
        tabindex: 0,
    }, priorityBorderContainer);

    const inputPriorityHigh = createElementWithAttributes('input', {
        id: 'view-priority-high',
        type: 'checkbox'
    }, priorityHighBox);

    const indicatorPriorityHigh = createElementWithAttributes('div', {
        class: 'radio-button priority-high'
    }, priorityHighBox);

    const labelPriorityHigh = createElementWithAttributes('label', {
        for: 'view-priority-high'
    }, priorityHighBox);
    labelPriorityHigh.textContent = 'High';

    const priorityMediumBox = createElementWithAttributes('div', {
        class: 'priority-medium-box option-button',
        tabindex: 0,
    }, priorityBorderContainer);
    
    const inputPriorityMedium = createElementWithAttributes('input', {
        id: 'view-priority-medium',
        type: 'checkbox'
    }, priorityMediumBox);

    const indicatorPriorityMedium = createElementWithAttributes('div', {
        class: 'radio-button priority-medium'
    }, priorityMediumBox);

    const labelPriorityMedium = createElementWithAttributes('label', {
        for: 'view-priority-medium'
    }, priorityMediumBox);
    labelPriorityMedium.textContent = 'Medium';

    const priorityNormalBox = createElementWithAttributes('div', {
        class: 'priority-normal-box option-button',
        tabindex: 0,
    }, priorityBorderContainer);

    const inputPriorityNormal = createElementWithAttributes('input', {
        id: 'view-priority-normal',
        type: 'checkbox'
    }, priorityNormalBox);

    const indicatorPriorityNormal = createElementWithAttributes('div', {
        class: 'radio-button priority-normal'
    }, priorityNormalBox);

    const labelPriorityNormal = createElementWithAttributes('label', {
        for: 'view-priority-normal'
    }, priorityNormalBox);
    labelPriorityNormal.textContent = 'Normal';

    const statusContainer = createElementWithAttributes('div', {
        class: 'status-main-box',
    }, viewOptionsBox);

    const textOptionsStatus = createElementWithAttributes('div', {
        class: 'status-header'
    }, statusContainer);
    textOptionsStatus.textContent = 'Status:';

    const statusBorderContainer = createElementWithAttributes('div', {
        class: 'status-border-box',
    }, statusContainer);

    const statusOverdueBox = createElementWithAttributes('div', {
        class: 'status-overdue-box option-button',
        tabindex: 0,
    }, statusBorderContainer);

    const inputStatusOverdue = createElementWithAttributes('input', {
        id: 'view-status-overdue',
        type: 'checkbox'
    }, statusOverdueBox);

    const indicatorStatusOverdue = createElementWithAttributes('div', {
        class: 'radio-button status-overdue'
    }, statusOverdueBox);

    const labelStatusOverdue = createElementWithAttributes('label', {
        for: 'view-status-overdue'
    }, statusOverdueBox);
    labelStatusOverdue.textContent = 'Overdue';

    const statusOnGoingBox = createElementWithAttributes('div', {
        class: 'status-ongoing-box option-button',
        tabindex: 0,
    }, statusBorderContainer);
    
    const inputStatusOnGoing = createElementWithAttributes('input', {
        id: 'view-status-ongoing',
        type: 'checkbox'
    }, statusOnGoingBox);

    const indicatorStatusOnGoing = createElementWithAttributes('div', {
        class: 'radio-button status-ongoing'
    }, statusOnGoingBox);

    const labelStatusOnGoing = createElementWithAttributes('label', {
        for: 'view-status-ongoing'
    }, statusOnGoingBox);
    labelStatusOnGoing.textContent = 'Ongoing';
    
    const statusCompletedBox = createElementWithAttributes('div', {
        class: 'status-completed-box option-button',
        tabindex: 0,
    }, statusBorderContainer);

    const inputStatusCompleted = createElementWithAttributes('input', {
        id: 'view-status-completed',
        type: 'checkbox'
    }, statusCompletedBox);

    const indicatorStatusCompleted = createElementWithAttributes('div', {
        class: 'radio-button status-completed'
    }, statusCompletedBox);

    const labelStatusCompleted = createElementWithAttributes('label', {
        for: 'view-status-completed'
    }, statusCompletedBox);
    labelStatusCompleted.textContent = 'Completed';
    
    const sortOptionsBox = createElementWithAttributes('div', {
        class: 'sort-options-main-box',
    }, viewOptionsBox);

    const sortOptionsText = createElementWithAttributes('div', {
        class: 'sort-header'
    }, sortOptionsBox);
    sortOptionsText.textContent = 'Sort by:';

    const sortOptionsBorderContainer = createElementWithAttributes('div', {
        class: 'sort-options-border-box',
    }, sortOptionsBox);

    const selectSortOptionsCustom = createElementWithAttributes('div', {
        class: 'custom-select',
    }, sortOptionsBorderContainer);

    const selectSortOptions = createElementWithAttributes('select', {
        name: 'sort-by'
    }, selectSortOptionsCustom);

    const sortByDate = createElementWithAttributes('option', {
        value: 'date'
    },selectSortOptions);
    sortByDate.textContent = 'Date';

    const sortByPriority = createElementWithAttributes('option', {
        value: 'priority'
    },selectSortOptions);
    sortByPriority.textContent = 'Priority';

    const sortByStatus = createElementWithAttributes('option', {
        value: 'status'
    },selectSortOptions);
    sortByStatus.textContent = 'Status';

    const sortOrderBox = createElementWithAttributes('div', { 
        class: 'sort-arrow option-button',
        tabindex: 0,
    }, sortOptionsBorderContainer);
    sortOrderBox.style.backgroundImage = `url(${assets.sortOrderIconPath})`;

    const checkboxSortAscendingOrder = createElementWithAttributes('input', { 
        type: 'checkbox',
        id: 'sort-order',
    }, sortOrderBox);

    const labelSortOrder = createElementWithAttributes('label', { 
        class: 'sort-order',
        for: 'sort-order'
    }, sortOrderBox);

    renderCustomDropDownMenu();
}

function renderCustomDropDownMenu() {
    let x, i, j, l, ll, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.setAttribute("tabindex", 0); // Make the select box focusable
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 0; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        // Set the 'value' attribute for the custom option
        c.setAttribute("value", selElmnt.options[j].value);
        c.setAttribute("tabindex", 0); // Make the option focusable
        c.addEventListener("click", function (e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          let y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
  
        // Attach event listeners for 'keydown' ('Enter' and 'Space') events
        c.addEventListener("keydown", function (e) {
          if (e.code === 'Enter') {
            e.preventDefault(); // Prevent the default behavior (e.g., scrolling)
            this.click(); // Trigger the click event when 'Enter' or 'Space' is pressed
            closeAllSelect(this);
          }
        });
  
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
  
      // Add a focus event listener to open the menu on 'Enter' or 'Space' keydown
      a.addEventListener("keydown", function (e) {
        if (e.code === 'Enter') {
          e.preventDefault();
          this.click();
          closeAllSelect(this);
        }
      });
    }
    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
      except the current select box: */
      let x, y, i, xl, yl, arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i) === -1) {
          x[i].classList.add("select-hide");
        }
      }
    }
}

function renderMainPageTemplate() {
    const content = document.querySelector('.content');
    const main = document.querySelector('main');
    const header = document.querySelector('header');
    const sidebar = document.querySelector('aside');
    const barProjects = document.querySelector('.bar-projects');
    const projectsBarHeader = document.querySelector('.bar-projects .header');
    const mainTaskBar = document.querySelector('main .task-bar');
    const barTypes = document.querySelector('aside .bar-types');
    const projectsList = document.querySelector('.projects-list');
    const barFooter = document.querySelector('aside .bar-footer');
    const mainHeadBox = document.querySelector('main .header');
    const tasksList = document.querySelector('.task-list');

    if (!isHTMLElement(content) || 
    !isHTMLElement(main) ||
    !isHTMLElement(header) ||
    !isHTMLElement(sidebar) ||
    !isHTMLElement(tasksList) ||
    !isHTMLElement(barProjects) ||
    !isHTMLElement(projectsList) ||
    !isHTMLElement(barTypes) ||
    !isHTMLElement(barFooter) ||
    !isHTMLElement(projectsBarHeader) ||
    !isHTMLElement(mainHeadBox) ||
    !isHTMLElement(mainTaskBar)
    ) {
        showErrorModal(ERR.CONTENT_CONTENT_NOT_FOUND);
        return;
    }

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

    const footerLink = createElementWithAttributes('a', {
        href: 'https://github.com/F3GR',
        target: '_blank',
        tabindex: -1,
    }, barFooter);
    const footerText = createElementWithAttributes('span', {}, footerLink);
    footerText.textContent = 'F3GR, 2023';

    const sidebarCover = createElementWithAttributes('div', {
        class: 'sidebar-cover'
    }, main);

    const mainHeadImage = createElementWithAttributes('img', { 
        alt: 'All tasks icon'
    }, mainHeadBox);
    mainHeadImage.src = assets.mainHeadImagePath;

    const mainHeadText = createElementWithAttributes('h2', {}, mainHeadBox);
    mainHeadText.textContent = `${DEFAULT_GROUP.charAt(0).toUpperCase()}${DEFAULT_GROUP.slice(1)}`;

    const mainTaskNumber = createElementWithAttributes('div', {class: 'task-number'}, mainTaskBar);
    
    const taskBarText = createElementWithAttributes('span', {}, mainTaskNumber);
    taskBarText.textContent = 'Tasks';

    const addNewTaskIcon = createElementWithAttributes('button', { 
        class: 'add-new',
    }, mainTaskBar);
    addNewTaskIcon.ariaLabel = 'Add new task';
    addNewTaskIcon.style.backgroundImage = `url(${assets.addNewTaskIconPath})`;

    addNewTaskIcon.setAttribute('data-task-action', ACTIONS_TASKS.ADD_NEW);

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





