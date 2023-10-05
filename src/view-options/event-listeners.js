import {
  isBoolean, isHTMLElement, isPressedKey, showErrorModal, SORTBY,
} from '../utils';
import { getMainNodes, getViewOptionsNodes } from './static-selectors';
import { ERR_EVENTS } from './errors-text';
import { handleBoxSelection, viewOptionToggleHandler } from './handlers';

export function addListenersViewOptions(application) {
  const {
    inputPriorityHigh,
    inputPriorityMedium,
    inputPriorityNormal,
    inputStatusOnGoing,
    inputStatusCompleted,
    inputStatusOverdue,
    inputSortAscendingOrder,
    viewOptionsIcon,
    viewBox,
    toggleBoxes,
    customSelectBox,
  } = getViewOptionsNodes();
  const {
    taskList,
  } = getMainNodes();
  const selectSortOptions = document.querySelector('.view-options-bar .custom-select > select');

  if (!isHTMLElement(taskList)) {
    showErrorModal(ERR_EVENTS.TASK_LIST_PANEL);
    return;
  }
  if (!isHTMLElement(inputPriorityHigh)
    || !isHTMLElement(inputPriorityMedium)
    || !isHTMLElement(inputPriorityNormal)
    || !isHTMLElement(inputStatusOnGoing)
    || !isHTMLElement(inputStatusCompleted)
    || !isHTMLElement(inputStatusOverdue)
    || !isHTMLElement(inputSortAscendingOrder)
    || !isHTMLElement(selectSortOptions)
  ) {
    showErrorModal(ERR_EVENTS.OPTIONS_NODES);
    return;
  }

  if (!isBoolean(inputPriorityHigh.checked)
    || !isBoolean(inputPriorityMedium.checked)
    || !isBoolean(inputPriorityNormal.checked)
    || !isBoolean(inputStatusOnGoing.checked)
    || !isBoolean(inputStatusCompleted.checked)
    || !isBoolean(inputStatusOverdue.checked)
  ) {
    showErrorModal(ERR_EVENTS.FILTER_VALUES);
    return;
  }
  if (!isBoolean(inputSortAscendingOrder.checked)) {
    showErrorModal(ERR_EVENTS.SORT_ORDER_VALUE);
    return;
  }
  if (!Object.values(SORTBY).includes(selectSortOptions.value)) {
    showErrorModal(ERR_EVENTS.SORT_OPTION_VALUE);
    return;
  }

  const queries = {
    taskList,
    inputPriorityHigh,
    inputPriorityMedium,
    inputPriorityNormal,
    inputStatusOverdue,
    inputStatusOnGoing,
    inputStatusCompleted,
    selectSortOptions,
    inputSortAscendingOrder,
  };

  viewOptionsIcon.addEventListener('click', (e) => handleViewBoxToggle(e));
  function handleViewBoxToggle(e) {
    if (isPressedKey(e)) {
      viewBox.classList.toggle('shown');
    }
  }

  customSelectBox.addEventListener('click', (e) => handleBoxSelection(e, queries, application));
  customSelectBox.addEventListener('keydown', (e) => handleBoxSelection(e, queries, application));

  toggleBoxes.forEach((box) => box.addEventListener('click', (e) => viewOptionToggleHandler(e, queries, application)));
  toggleBoxes.forEach((box) => box.addEventListener('keydown', (e) => viewOptionToggleHandler(e, queries, application)));
}
