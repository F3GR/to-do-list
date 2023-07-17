import { Project } from './project.js';

const projectController = {
    createNew: function(projectList, newName, newIconURL) {
        if (noDuplicateName(projectList, newName, "")) {
            const newId = Project.getNewId();
            const newProject = new Project(newId, newName, newIconURL);
            Project.incrementNewProjectId();
            return newProject;
        } else {
            return false;
        }
    },

    edit: function(projectList, projectId, editedName, editedIcon) {
        const project = projectList.find((project) => { return project.id === projectId });

        if (noDuplicateName(projectList, editedName, projectId)) {
            if (project.name !== editedName) {
                project.name = editedName;
            }
            if (project.iconURL !== editedIcon) {
                project.iconURL = editedIcon;
            }
            return true;
        } else {
            return false;
        }
    },

    remove: function(projectList, projectId) {
        let index;
        let n = projectList.length;
        let i = 0;
        for (; i < n; i++) {
            if (projectList[i].id === projectId) {
                index = i;
                break;
            }
        }
        return index;
    }
};

function noDuplicateName(projectList, name, projectId) {
    const n = projectList.length;
    let i = 0;
    for (; i < n; i++) {
        if (projectList[i].getProjectId === projectId) {
            continue;
        }
        if (projectList[i].name === name) {
            return false;
        }
    }
    return true;
}

export { projectController };