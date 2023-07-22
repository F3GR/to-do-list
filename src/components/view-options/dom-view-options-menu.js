import { createElementWithAttributes } from "../utils";

export function renderFilterOptionsMenu(savedState) {

    const main = document.querySelector('.content main');

    const viewOptionsBox = createElementWithAttributes('div', {
        class: 'view-options-bar'
    }, main);

    const priorityOptionsText = createElementWithAttributes('h2', {
        class: `priority-header`
    }, viewOptionsBox);
    priorityOptionsText.textContent = `Priority:`;

    const labelPriorityHigh = createElementWithAttributes('label', {
        for: 'view-priority-high'
    }, viewOptionsBox);

    const checkboxPriorityHigh = createElementWithAttributes('input', {
        id: 'view-priority-high',
        type: 'checkbox'
    }, labelPriorityHigh);

    const textPriorityHigh = createElementWithAttributes('span', {
        class: `priority-high`}, labelPriorityHigh);
    textPriorityHigh.textContent = `High`;

    const labelPriorityMedium = createElementWithAttributes('label', {
        for: 'view-priority-medium'
    }, viewOptionsBox);

    const checkboxPriorityMedium = createElementWithAttributes('input', {
        id: 'view-priority-medium',
        type: 'checkbox'
    }, labelPriorityMedium);

    const textPriorityMedium = createElementWithAttributes('span', {
        class: `priority-medium`}, labelPriorityMedium);
    textPriorityMedium.textContent = `Medium`;

    const labelPriorityNormal = createElementWithAttributes('label', {
        for: 'view-priority-normal'
    }, viewOptionsBox);

    const checkboxPriorityNormal = createElementWithAttributes('input', {
        id: 'view-priority-normal',
        type: 'checkbox'
    }, labelPriorityNormal);

    const textPriorityNormal = createElementWithAttributes('span', {
        class: `priority-normal`}, labelPriorityNormal);
    textPriorityNormal.textContent = `Normal`;
    

    const textOptionsStatus = createElementWithAttributes('h2', {
        class: `status-header`
    }, viewOptionsBox);
    textOptionsStatus.textContent = `Status:`;

    const labelStatusOverdue = createElementWithAttributes('label', {
        for: 'view-status-overdue'
    }, viewOptionsBox);

    const checkboxStatusOverdue = createElementWithAttributes('input', {
        id: 'view-status-overdue',
        type: 'checkbox'
    }, labelStatusOverdue);

    const textStatusOverdue = createElementWithAttributes('span', {
        class: `status-overdue`}, labelStatusOverdue);
    textStatusOverdue.textContent = `Overdue`;

    const labelStatusOnGoing = createElementWithAttributes('label', {
        for: 'view-status-ongoing'
    }, viewOptionsBox);
    
    const checkboxStatusOnGoing = createElementWithAttributes('input', {
        id: 'view-status-ongoing',
        type: 'checkbox'
    }, labelStatusOnGoing);
    
    const textStatusOnGoing = createElementWithAttributes('span', {
        class: `status-ongoing`}, labelStatusOnGoing);
    textStatusOnGoing.textContent = `Ongoing`;

    const labelStatusCompleted = createElementWithAttributes('label', {
        for: 'view-status-completed'
    }, viewOptionsBox);
    
    const checkboxStatusCompleted = createElementWithAttributes('input', {
        id: 'view-status-completed',
        type: 'checkbox'
    }, labelStatusCompleted);
    
    const textStatusCompleted = createElementWithAttributes('span', {
        class: `status-completed`}, labelStatusCompleted);
    textStatusCompleted.textContent = `Completed`;


    const sortOptionsBox = createElementWithAttributes('div', {
        class: 'sort-options-box'
    }, viewOptionsBox);

    const sortOptionsText = createElementWithAttributes('label', {class: ``}, sortOptionsBox);
    sortOptionsText.textContent = 'Sort by:';

    const selectSortOptions = createElementWithAttributes('select', {
        name: `sort-by`
    }, sortOptionsBox);

    const sortByDate = createElementWithAttributes('option', {
        value: `date`
    },selectSortOptions);
    sortByDate.textContent = `Date`;

    const sortByPriority = createElementWithAttributes('option', {
        value: `priority`
    },selectSortOptions);
    sortByPriority.textContent = `Priority`;

    const sortByStatus = createElementWithAttributes('option', {
        value: `status`
    },selectSortOptions);
    sortByStatus.textContent = `Status`;

    const labelSortOrder = createElementWithAttributes('label', { 
        class: 'sort-order',
        for: 'sort-order'
    }, sortOptionsBox);

    const checkboxSortAscendingOrder = createElementWithAttributes('input', { 
        type: 'checkbox',
        id: 'sort-order',
    }, labelSortOrder);

    const sortOrderIcon = createElementWithAttributes('img', { 
        src: '../src/originals/arrow-downward.svg',
        alt: `Sort order icon`,
        class: 'sort-arrow'
    }, labelSortOrder);

    checkboxPriorityHigh.checked = savedState.flagIncludeHigh;
    checkboxPriorityMedium.checked = savedState.flagIncludeMedium;
    checkboxPriorityNormal.checked = savedState.flagIncludeNormal;
    checkboxStatusOverdue.checked = savedState.flagIncludeOverdue;
    checkboxStatusOnGoing.checked = savedState.flagIncludeOnGoing;
    checkboxStatusCompleted.checked = savedState.flagIncludeCompleted;
    selectSortOptions.value = savedState.sortBy;
    checkboxSortAscendingOrder.checked = savedState.ascendingOrder;
}