import { createElementWithAttributes, isHTMLElement, showErrorModal } from '../utils.js';
import { getMainNodes, getViewOptionsNodes } from './static-selectors.js';
import { SORTBY, isBoolean } from '../utils.js';
import { application } from '../main-app.js';
import { assets } from './assets.js';
import { ERR_HEADINGS, ERR_RENDERING } from './errors-text.js';

export function renderFilterOptionsMenu() {
    const { main } = getMainNodes();
    if (!isHTMLElement(main)) {
        showErrorModal([ERR_HEADINGS.RENDERING, ERR_RENDERING.MAIN_PANEL]);
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

    const labelPriorityHigh = createElementWithAttributes('label', {
        for: 'view-priority-high'
    }, priorityBorderContainer);

    const inputPriorityHigh = createElementWithAttributes('input', {
        id: 'view-priority-high',
        type: 'checkbox'
    }, labelPriorityHigh);

    const indicatorPriorityHigh = createElementWithAttributes('div', {
        class: 'radio-button priority-high'
    }, labelPriorityHigh);

    const btnPriorityHigh = createElementWithAttributes('button', {
        class: 'priority-high'
    }, labelPriorityHigh);
    btnPriorityHigh.textContent = 'High';

    const labelPriorityMedium = createElementWithAttributes('label', {
        for: 'view-priority-medium'
    }, priorityBorderContainer);

    const inputPriorityMedium = createElementWithAttributes('input', {
        id: 'view-priority-medium',
        type: 'checkbox'
    }, labelPriorityMedium);

    const indicatorPriorityMedium = createElementWithAttributes('div', {
        class: 'radio-button priority-medium'
    }, labelPriorityMedium);

    const btnPriorityMedium = createElementWithAttributes('button', {
        class: 'priority-medium'}, labelPriorityMedium);
    btnPriorityMedium.textContent = 'Medium';

    const labelPriorityNormal = createElementWithAttributes('label', {
        for: 'view-priority-normal'
    }, priorityBorderContainer);

    const inputPriorityNormal = createElementWithAttributes('input', {
        id: 'view-priority-normal',
        type: 'checkbox'
    }, labelPriorityNormal);

    const indicatorPriorityNormal = createElementWithAttributes('div', {
        class: 'radio-button priority-normal'
    }, labelPriorityNormal);

    const btnPriorityNormal = createElementWithAttributes('button', {
        class: 'priority-normal'
    }, labelPriorityNormal);
    btnPriorityNormal.textContent = 'Normal';
    
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

    const labelStatusOverdue = createElementWithAttributes('label', {
        for: 'view-status-overdue'
    }, statusBorderContainer);

    const inputStatusOverdue = createElementWithAttributes('input', {
        id: 'view-status-overdue',
        type: 'checkbox'
    }, labelStatusOverdue);

    const indicatorStatusOverdue = createElementWithAttributes('div', {
        class: 'radio-button status-overdue'
    }, labelStatusOverdue);

    const btnStatusOverdue = createElementWithAttributes('button', {
        class: 'status-overdue'
    }, labelStatusOverdue);
    btnStatusOverdue.textContent = 'Overdue';

    const labelStatusOnGoing = createElementWithAttributes('label', {
        for: 'view-status-ongoing'
    }, statusBorderContainer);
    
    const inputStatusOnGoing = createElementWithAttributes('input', {
        id: 'view-status-ongoing',
        type: 'checkbox'
    }, labelStatusOnGoing);

    const indicatorStatusOnGoing = createElementWithAttributes('div', {
        class: 'radio-button status-ongoing'
    }, labelStatusOnGoing);
    
    const btnStatusOnGoing = createElementWithAttributes('button', {
        class: 'status-ongoing'
    }, labelStatusOnGoing);
    btnStatusOnGoing.textContent = 'Ongoing';

    const labelStatusCompleted = createElementWithAttributes('label', {
        for: 'view-status-completed'
    }, statusBorderContainer);
    
    const inputStatusCompleted = createElementWithAttributes('input', {
        id: 'view-status-completed',
        type: 'checkbox'
    }, labelStatusCompleted);

    const indicatorStatusCompleted = createElementWithAttributes('div', {
        class: 'radio-button status-completed'
    }, labelStatusCompleted);
    
    const btnStatusCompleted = createElementWithAttributes('button', {
        class: 'status-completed'
    }, labelStatusCompleted);
    btnStatusCompleted.textContent = 'Completed';

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

    const selectSortOptions = createElementWithAttributes('select', {
        name: 'sort-by'
    }, sortOptionsBorderContainer);

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

    const labelSortOrder = createElementWithAttributes('label', { 
        class: 'sort-order',
        for: 'sort-order'
    }, sortOptionsBorderContainer);

    const checkboxSortAscendingOrder = createElementWithAttributes('input', { 
        type: 'checkbox',
        id: 'sort-order',
    }, labelSortOrder);

    const sortOrderIcon = createElementWithAttributes('button', { 
        class: 'sort-arrow'
    }, labelSortOrder);
    sortOrderIcon.ariaLabel = 'Sort order (ascending or descending)';
    sortOrderIcon.style.backgroundImage = `url(${assets.sortOrderIconPath})`;

    applySavedViewState();
}

function applySavedViewState() {
    const viewState = application.getViewState();
    const { 
        flagIncludeHigh, 
        flagIncludeMedium, 
        flagIncludeNormal, 
        flagIncludeOverdue,
        flagIncludeOnGoing,
        flagIncludeCompleted,
        sortBy,
        ascendingOrder 
    } = viewState;
    const { 
        inputPriorityHigh,
        inputPriorityMedium,
        inputPriorityNormal,
        inputStatusOnGoing,
        inputStatusCompleted,
        inputStatusOverdue,
        inputSortAscendingOrder,
    } = getViewOptionsNodes();
    const selectSortOptions = document.querySelector('.view-options-bar select');

    if (!isHTMLElement(inputPriorityHigh) ||
    !isHTMLElement(inputPriorityMedium) ||
    !isHTMLElement(inputPriorityNormal) ||
    !isHTMLElement(inputStatusOnGoing) ||
    !isHTMLElement(inputStatusCompleted) ||
    !isHTMLElement(inputStatusOverdue) ||
    !isHTMLElement(inputSortAscendingOrder) ||
    !isHTMLElement(selectSortOptions)
    ) {
        showErrorModal([ERR_HEADINGS.RENDERING, ERR_RENDERING.OPTIONS_NODES]);
        return;
    }

    if (!isBoolean(flagIncludeHigh) || 
    !isBoolean(flagIncludeMedium) || 
    !isBoolean(flagIncludeNormal) ||
    !isBoolean(flagIncludeOnGoing) || 
    !isBoolean(flagIncludeCompleted) || 
    !isBoolean(flagIncludeOverdue)
    ) {
        showErrorModal(ERR_HEADINGS.RENDERING, ERR_RENDERING.FILTER_VALUES);
        return;
    }
    if (!isBoolean(ascendingOrder)) {
        showErrorModal(ERR_HEADINGS.RENDERING, ERR_RENDERING.SORT_ORDER_VALUE);
        return;
    }
    if (!Object.values(SORTBY).includes(sortBy)) {
        showErrorModal(ERR_HEADINGS.RENDERING, ERR_RENDERING.SORT_OPTION_VALUE);
        return;
    }

   inputPriorityHigh.checked = flagIncludeHigh;
   inputPriorityMedium.checked = flagIncludeMedium;
   inputPriorityNormal.checked = flagIncludeNormal;
   inputStatusOverdue.checked = flagIncludeOverdue;
   inputStatusOnGoing.checked = flagIncludeOnGoing;
   inputStatusCompleted.checked = flagIncludeCompleted;
    selectSortOptions.value = sortBy;
   inputSortAscendingOrder.checked = ascendingOrder;
}