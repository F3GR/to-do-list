import './input.css';
import { application } from './components/main-app.js';

application.createMainPage();
application.addEventListenersMainPage();
application.addListenersSidebar();
application.addListenersManageProjects();
application.addListenersManageTasks();
application.getProjectsList();