import { isHTMLElement, showErrorModal } from '../utils.js';
import { getViewOptionsNodes } from './static-selectors.js';
import { SORTBY, isBoolean } from '../utils.js';
import { application } from '../main-app.js';
import { ERR_HEADINGS, ERR_RENDERING } from './errors-text.js';

export function applySavedViewState() {
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