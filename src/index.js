import { checkIfCurrent, removeCurrentStatus, createElementWithAttributes } from './components/utils.js';
import './input.css';
import { Application } from './components/main-app.js';

(function() {
    const application = new Application();
    application.initialize();
    const toDoList = application.getToDoList();
    

})();
