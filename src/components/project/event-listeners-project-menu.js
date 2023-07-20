import { application } from '../main-app.js';
import { renderProject } from './dom-project.js';

export function addListenersManageProjects() {
    const selectedMenuCover = document.querySelector('.menu-cover');
    const selectedProjectMenu = document.querySelector('.project-menu');
    const selectedProjectMenuTitle = document.querySelector('.project-menu .title-box span');
    const selectedSubmitProjectButton = document.querySelector('.project-menu button.submit');
    const selectedProjectBar = document.querySelector('aside .bar-projects');
    const selectedForm = document.querySelector('.project-menu form');
    const mainGroupIcon = document.querySelector('main .header img');
    const mainGroupName = document.querySelector('main .header span');

    selectedProjectBar.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const target = e.target;
    
        if (target.classList.contains('add-new')) {
            selectedProjectMenu.setAttribute('data-project-action', 'add-new');
            const selectedSubmitProjectButton = document.querySelector('.project-menu[data-project-action="add-new"] button.submit');
            const selectedForm = document.querySelector('.project-menu[data-project-action="add-new"] form');
        
            selectedMenuCover.classList.add('shown');
            selectedProjectMenu.classList.add('shown');
            selectedProjectMenuTitle.textContent = 'Add a new project';
            selectedSubmitProjectButton.textContent = 'Add'; 

        } else if (target.classList.contains('edit')) {
            selectedProjectMenu.setAttribute('data-project-action', 'edit');
            const selectedProject = target.closest('.project');
            const id = selectedProject.getAttribute('data-project-id');
            selectedProjectMenu.setAttribute('data-project-id', id);

            selectedMenuCover.classList.add('shown');
            selectedProjectMenu.classList.add('shown');
            selectedProjectMenuTitle.textContent = 'Edit the project';
            selectedSubmitProjectButton.textContent = 'Save';

        } else if (target.classList.contains('remove')) {
            const selectedProject = target.closest('.project');
            const id = selectedProject.getAttribute('data-project-id');
            const removedProject = application.removeProject(id);
        
            if (removedProject) {
                /**** TODO ****/
                if (selectedProject.classList.contains('current')) {
                    mainGroupIcon.src = ``;
                    mainGroupName.textContent = ``;
                }
                
                selectedProject.remove();
            } else {
                alert('Error: project wasn\'t found');
            }
        }
    });

    selectedForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        const selectNameInput = document.querySelector('.project-menu[data-project-action="add-new"] #name');
        const selectIconInput = document.querySelector('.project-menu[data-project-action="add-new"] input[name="iconURL"]:checked');
        
        if (selectedProjectMenu.getAttribute('data-project-action') === 'add-new') {
            if (!selectIconInput || !selectIconInput.value) {
                alert('Please select an icon');
                return;
            }
    
            const newProject = application.createNewProject(selectNameInput.value, selectIconInput.value);
            if (newProject) {
                renderProject(newProject.name, newProject.iconURL, newProject.id);
            } else {
                alert('The project with this title already exists!');
            }
            
        } else if (selectedProjectMenu.getAttribute('data-project-action') === 'edit') {
            if (!selectIconInput || !selectIconInput.value) {
                alert('Please select an icon');
                return;
            }
            const id = selectedProjectMenu.getAttribute('data-project-id');
    
            const editProject = application.editProject(id, selectNameInput.value, selectIconInput.value);
            if (editProject) {
                const oldIcon = document.querySelector(`.project[data-project-id="${id}"] .icon`);
                const oldName = document.querySelector(`.project[data-project-id="${id}"] span`);
                oldIcon.src = selectIconInput.value;
                oldName.textContent = selectNameInput.value;

                const editedProject = document.querySelector(`.project[data-project-id="${id}"]`);
                if (editedProject.classList.contains('current')) {
                    mainGroupIcon.src = selectIconInput.value;
                    mainGroupName.textContent = selectNameInput.value;
                }
            } else {
                alert('The project with this title already exists!');
            }
        }
    });

    const selectedExitButton = document.querySelector('.project-menu .exit');
    selectedExitButton.addEventListener('click', function(e) {
        e.preventDefault();
        selectedProjectMenuTitle.textContent = '';
        selectedSubmitProjectButton.textContent = '';
        
        selectedMenuCover.classList.remove('shown');
        selectedProjectMenu.classList.remove('shown');
        selectedProjectMenu.removeAttribute(`data-project-action`);
        selectedProjectMenu.removeAttribute(`data-project-id`);
    });

    const selectedCancelButton = document.querySelector('.project-menu .cancel');
    selectedCancelButton.addEventListener('click', function(e) {
        e.preventDefault();
        selectedProjectMenuTitle.textContent = '';
        selectedSubmitProjectButton.textContent = '';

        selectedMenuCover.classList.remove('shown');
        selectedProjectMenu.classList.remove('shown');
        selectedProjectMenu.removeAttribute(`data-project-action`);
        selectedProjectMenu.removeAttribute(`data-project-id`);
    });
}




