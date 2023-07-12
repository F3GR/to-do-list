import { checkIfCurrent, removeCurrentStatus, createElementWithAttributes } from './utils.js';

const content = document.querySelector('.content');

const header = createElementWithAttributes('header', {}, content);

const asideIcon = createElementWithAttributes('div', {class: `aside-icon`}, header);

const heading = createElementWithAttributes('div', {class: `heading`}, header);

const logoIcon = createElementWithAttributes('img', { 
    src: '../src/originals/fav-icon.svg',
    class: `logo`,
    alt: `ToDo List logo`}, heading);

const headingText = createElementWithAttributes('h1', {}, heading);
headingText.textContent = `ToDo List`;

const emptyDiv = createElementWithAttributes('div', {}, header);

const viewOptionsIcon = createElementWithAttributes('img', { 
    src: '../src/originals/view-options.svg',
    class: `view-options`,
    alt: `View Options logo`}, header);

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
    alt: `Add new project icon`
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
    alt: `Edit project icon`
}, exampleProject);
const exampleProjectDeleteImage = createElementWithAttributes('img', {
    src: '../src/originals/delete.svg',
    alt: `Remove project icon`
}, exampleProject);


const barFooter = createElementWithAttributes('div', {class: `bar-footer`}, sidebar);

const footerText = createElementWithAttributes('span', {}, barFooter);
footerText.textContent = `\u00A9 F3GR, 2023`;

const main = createElementWithAttributes('main', {}, content);

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

const buttonsTaskSubMenu = createElementWithAttributes('div', {class: `buttons-task-submenu`}, mainTaskMenu);

const buttonHighPriority = createElementWithAttributes('button', {class: `high-priority`}, buttonsTaskSubMenu);
buttonHighPriority.textContent = `High`;

const buttonMediumPriority = createElementWithAttributes('button', {class: `medium-priority`}, buttonsTaskSubMenu);
buttonMediumPriority.textContent = `Medium`;

const buttonNormalPriority = createElementWithAttributes('button', {class: `normal-priority`}, buttonsTaskSubMenu);
buttonNormalPriority.textContent = `Normal`;

const selectSortOption = createElementWithAttributes('select', {name: `sorting-option`}, buttonsTaskSubMenu);
selectSortOption.textContent = `Sort by: `;

const sortByDate = createElementWithAttributes('option', {value: `date-from-oldest`},selectSortOption);
sortByDate.textContent = `Date`;

const sortByPriority = createElementWithAttributes('option', {value: `priority-from-highest`},selectSortOption);
sortByPriority.textContent = `Priority`;

const sortByStatus = createElementWithAttributes('option', {value: `priority-from-due`},selectSortOption);
sortByStatus.textContent = `Status`;

const addNewProjectIcon = createElementWithAttributes('img', { 
    src: '../src/originals/add-new.svg',
    alt: `Add new project icon`
}, mainTaskMenu);

const taskList = createElementWithAttributes('ul', {class: `task-list`}, main);

const exampleTask = createElementWithAttributes('li', {class: `task`, data: `0`}, taskList);

const taskStatusIcon  = createElementWithAttributes('img', {
    src: `../src/originals/radio-unchecked.svg`, 
    alt: `Task status icon`
}, exampleTask);

const taskNameBox = createElementWithAttributes('div', {class: `task-name-box`}, exampleTask);
const taskName = createElementWithAttributes('span', {class: `task-name-box`}, taskNameBox);
taskName.textContent = `New task`;

const taskDueDateBox = createElementWithAttributes('div', {class: `task-due-date`, }, exampleTask);
const taskDueDateText = createElementWithAttributes('span', {class: ``, }, taskDueDateBox);
taskDueDateText.textContent = `2023-01-07`;

const taskEditIcon = createElementWithAttributes('img', {
    src: `../src/originals/edit.svg`, 
    alt: `Task edit information icon`
}, exampleTask);

const taskRemoveIcon = createElementWithAttributes('img', {
    src: `../src/originals/delete.svg`, 
    alt: `Task remove icon`
}, exampleTask);

const taskUnfoldIcon = createElementWithAttributes('img', {
    src: `../src/originals/unfold.svg`, 
    alt: `Task information unfold or fold icon`
}, exampleTask);