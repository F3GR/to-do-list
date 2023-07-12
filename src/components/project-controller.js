const projectController = (function() {
    this.createNew = (toDoList, newName, newIconURL) => {
        if (checkIfProjectUnique(toDoList, newName)) {
            const newProject = new Project(newName, newIconURL);
            toDoList.set(newName, newProject);
        } else {
            console.log('The new project is not unique, change the name of the project and try to submit again!')
        }
    }
    !!!TODO!!!
    this.editName = (toDoList, project, editedName) => {
        if (checkIfProjectUnique(toDoList, editedName)) {
            const editedProject = toDoList.get(project);
            toDoList.delete(project);
            toDoList.set(editedName, projectValue);
            projectValue.set('name', editedName);
            toDoList[]
            project['name'] = editedName;
        } else {
            console.log('The edited project is not unique, change the name of the project and try to submit again!')
        }
    }
    this.editIcon = (project, editedIcon) => {
        project['iconURL'] = editedIcon;
    }
    this.remove = (toDoList, projectName) => {
        const removedFoundProject = toDoList.delete(projectName);
        if (!removedFoundProject) {
            console.log('The project is not found, please, enter the existing project')
        }
    }

    function checkIfProjectUnique(map, key) {
        return !map.has(key);
    }
});