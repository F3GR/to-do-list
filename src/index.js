import './input.css';
import { application } from './components/main-app.js';

application.createMainPage();
application.addListenersSidebar();
application.addListenersViewOptions();
application.addListenersManageProjects();
application.addListenersManageTasks();
application.getProjectsList();