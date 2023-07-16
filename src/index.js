import './input.css';
import { application } from './components/main-app.js';


application.createMainPage();
application.addEventListenersMainPage();

application.createExampleProjectPanel();
application.createExampleTaskPanels();

const toDoList = application.getToDoList();
