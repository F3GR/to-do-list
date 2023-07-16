import './input.css';
import { Application } from './components/main-app.js';

(function() {
    const application = new Application();
    const toDoList = application.getToDoList();
    application.createMainPage();
    application.createExampleProjectPanel();
    application.createExampleTaskPanels();
})();
